import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import http from '@/utils/http'
import type { Author } from '@/utils/interfaces'


export default function useAuthors() {
    const queryClient = useQueryClient()
    const { data: authors = [] } = useQuery({
        queryKey: ['getAuthors'],
        queryFn: async () => {
            const response = await http.get('/authors')
            return response.data
        }
    })

    const { mutate: createAuthorMutation } = useMutation({
        mutationKey: ['getAuthors'],
        mutationFn: async (author: Omit<Author, 'id'>) => {
            const response = await http.post('/authors', author)
            return response.data
        },
        onMutate: async (newAuthor: Omit<Author, 'id'>) => {
            await queryClient.cancelQueries({ queryKey: ['getAuthors'] })
            const previousAuthors = queryClient.getQueryData<Author[]>(['getAuthors'])
            // Use Date.now() for a temporary optimistic id
            queryClient.setQueryData<Author[]>(['getAuthors'], (old = []) => [...old, { ...newAuthor, id: Date.now() }])
            return { previousAuthors }
        },
        onError: (err, newAuthor, context) => {
            if (context?.previousAuthors) {
                queryClient.setQueryData(['getAuthors'], context.previousAuthors)
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['getAuthors'] })
        }
    })
    
    const { mutate: updateAuthorMutation } = useMutation({
        mutationKey: ['getAuthors'],
        mutationFn: async (author: Author) => {
            const response = await http.patch(`/authors/${author.id}`, author)
            return response.data
        },
        onMutate: async (updatedAuthor: Author) => {
            await queryClient.cancelQueries({ queryKey: ['getAuthors'] })
            const previousAuthors = queryClient.getQueryData<Author[]>(['getAuthors'])
            queryClient.setQueryData<Author[]>(['getAuthors'], (old = []) =>
                (old || []).map((author) => author.id === updatedAuthor.id ? { ...author, ...updatedAuthor } : author)
            );
            return { previousAuthors }
        },
        onError: (err, updatedAuthor, context) => {
            if (context?.previousAuthors) {
                queryClient.setQueryData(['getAuthors'], context.previousAuthors)
            }
            console.log(err)
            console.log(updatedAuthor)
            console.log(context)
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['getAuthors'] })
        }
    })

    const { mutate: deleteAuthorMutation } = useMutation({
        mutationKey: ['getAuthors'],
        mutationFn: async (id: number) => {
            const response = await http.delete(`/authors/${id}`)
            return response.data
        },
        onMutate: async (id: number) => {
            await queryClient.cancelQueries({ queryKey: ['getAuthors'] })
            const previousAuthors = queryClient.getQueryData<Author[]>(['getAuthors'])
            queryClient.setQueryData<Author[]>(['getAuthors'], (old = []) => old.filter(a => a.id !== id))
            return { previousAuthors }
        },
        onError: (err, id, context) => {
            if (context?.previousAuthors) {
                queryClient.setQueryData(['getAuthors'], context.previousAuthors)
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['getAuthors'] })
        }
    })

    return { authors, createAuthorMutation, updateAuthorMutation, deleteAuthorMutation }
}