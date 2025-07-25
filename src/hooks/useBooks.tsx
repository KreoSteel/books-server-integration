import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import http from '@/utils/http'
import type { Book } from '@/utils/interfaces'


export default function useBooks() {
    const queryClient = useQueryClient()

    // Use ['getBooks'] for all book-related queries and mutations
    // Remove books from return value since it's not used
    const { data: books = []} = useQuery({
        queryKey: ['getBooks'],
        queryFn: async () => {
            const response = await http.get('/books')
            return response.data
        },
    })


    const { mutate: createBookMutation } = useMutation({
        mutationKey: ['getBooks'],
        mutationFn: async (book: Book) => {
            const response = await http.post('/books', book)
            return response.data
        },
        onMutate: async (newBook: Book) => {
            await queryClient.cancelQueries({ queryKey: ['getBooks'] });
            const previousBooks = queryClient.getQueryData<Book[]>(['getBooks']);
            queryClient.setQueryData<Book[]>(['getBooks'], (old = []) => [
                ...old,
                { ...newBook, id: Date.now() }
            ]);
            return { previousBooks };
        },
        onError: (err, newBook, context) => {
            if (context?.previousBooks) {
                queryClient.setQueryData(['getBooks'], context.previousBooks);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['getBooks'] });
        }
    })

    const { mutate: deleteBookMutation } = useMutation({
        mutationKey: ['getBooks'],
        mutationFn: async (id: number) => {
            const response = await http.delete(`/books/${id}`)
            return response.data
        },
        onMutate: async (id: number) => {
            await queryClient.cancelQueries({ queryKey: ['getBooks'] });
            const previousBooks = queryClient.getQueryData<Book[]>(['getBooks']);
            queryClient.setQueryData<Book[]>(['getBooks'], (old = []) =>
                (old || []).filter((book) => book.id !== id)
            );
            return { previousBooks };
        },
        onError: (err, id, context) => {
            if (context?.previousBooks) {
                queryClient.setQueryData(['getBooks'], context.previousBooks);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['getBooks'] });
        }
    })

    const { mutate: updateBookMutation } = useMutation({
        mutationKey: ['getBooks'],
        mutationFn: async (book: Book) => {
            const response = await http.patch(`/books/${book.id}`, book)
            return response.data
        },
        onMutate: async (updatedBook: Book) => {
            await queryClient.cancelQueries({ queryKey: ['getBooks'] });
            const previousBooks = queryClient.getQueryData<Book[]>(['getBooks']);
            queryClient.setQueryData<Book[]>(['getBooks'], (old = []) =>
                (old || []).map((book) => book.id === updatedBook.id ? { ...book, ...updatedBook } : book)
            );
            return { previousBooks };
        },
        onError: (err, updatedBook, context) => {
            if (context?.previousBooks) {
                queryClient.setQueryData(['getBooks'], context.previousBooks);
            }
            console.log(err)
            console.log(updatedBook)
            console.log(context)
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['getBooks'] });
        }
    })

    return {
        createBookMutation,
        deleteBookMutation,
        updateBookMutation
    }
}