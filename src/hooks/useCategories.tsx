import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import http from '@/utils/http'
import type { Category } from '@/utils/interfaces'

export default function useCategories() {
    const queryClient = useQueryClient()

    const { data: categories = [] }= useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const response = await http.get('/categories')
            return response.data
        }
    })

    const { mutate: createCategoryMutation } = useMutation({
        mutationKey: ['categories'],
        mutationFn: async (category: Omit<Category, 'id'>) => {
            const response = await http.post('/categories', category)
            return response.data
        },
        onMutate: async (newCategory: Omit<Category, 'id'>) => {
            await queryClient.cancelQueries({ queryKey: ['categories'] })
            const previousCategories = queryClient.getQueryData<Category[]>(['categories'])
            queryClient.setQueryData<Category[]>(['categories'], (old = []) => [...old, { ...newCategory, id: Date.now() }])
            return { previousCategories }
        },
        onError: (err, newCategory, context) => {
            console.error('Create category error:', err)
            if (context?.previousCategories) {
                queryClient.setQueryData(['categories'], context.previousCategories)
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] })
        }
    })

    const { mutate: updateCategoryMutation } = useMutation({
        mutationKey: ['categories'],
        mutationFn: async (category: Category) => {
            const response = await http.patch(`/categories/${category.id}`, category)
            return response.data
        },
        onMutate: async (updatedCategory: Category) => {
            await queryClient.cancelQueries({ queryKey: ['categories'] })
            const previousCategories = queryClient.getQueryData<Category[]>(['categories'])
            queryClient.setQueryData<Category[]>(['categories'], (old = []) => old.map(c => c.id === updatedCategory.id ? updatedCategory : c))
            return { previousCategories }
        },
        onError: (err, updatedCategory, context) => {
            console.error('Update category error:', err)
            if (context?.previousCategories) {
                queryClient.setQueryData(['categories'], context.previousCategories)
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] })
        }
    })

    const { mutate: deleteCategoryMutation } = useMutation({
        mutationKey: ['categories'],
        mutationFn: async (id: number) => {
            const response = await http.delete(`/categories/${id}`)
            return response.data
        },
        onMutate: async (id: number) => {
            await queryClient.cancelQueries({ queryKey: ['categories'] })
            const previousCategories = queryClient.getQueryData<Category[]>(['categories'])
            queryClient.setQueryData<Category[]>(['categories'], (old = []) => old.filter(c => c.id !== id))
            return { previousCategories }
        },
        onError: (err, id, context) => {
            console.error('Delete category error:', err)
            if (context?.previousCategories) {
                queryClient.setQueryData(['categories'], context.previousCategories)
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] })
        }
    })

    return {
        categories,
        createCategoryMutation,
        updateCategoryMutation,
        deleteCategoryMutation,
    }
}