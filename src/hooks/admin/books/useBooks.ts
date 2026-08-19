import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { toast } from 'react-toastify'

import { createBook, getBook, getUpsertBook, updateBook } from '@/libs/admin/books/books'

type ApiValidationError = {
  response?: {
    data?: {
      errors?: {
        [key: string]: string[]
      }
      message?: string
    }
  }
}

const handleMutationError = (error: any) => {
  const errors = error?.response?.data?.errors

  if (errors) {
    toast.error('لطفاً فیلد های الزامی را پر کنید')
  } else {
    toast.error(error?.response?.data?.message ?? 'خطایی رخ داد')
  }
}

export function useCreateBook() {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending, error } = useMutation<any, ApiValidationError, FormData>({
    mutationFn: createBook,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['books']
      })

      toast.success('کتاب با موفقیت ایجاد شد')
    },

    onError: handleMutationError
  })

  return {
    mutateAsync,
    isPending,
    error
  }
}

export function useUpdateBook() {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateBook,

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['books']
      })

      queryClient.invalidateQueries({
        queryKey: ['book', variables.id]
      })

      toast.success('کتاب با موفقیت ویرایش شد')
    },

    onError: handleMutationError
  })

  return {
    mutateAsync,
    isPending
  }
}

export const useGetBook = (id: number) => {
  return useQuery({
    queryKey: ['book', id],
    queryFn: () => getBook(id),
    enabled: !!id
  })
}

export const useBookUpsertData = () => {
  return useQuery({
    queryKey: ['book-upsert-data'],
    queryFn: getUpsertBook
  })
}
