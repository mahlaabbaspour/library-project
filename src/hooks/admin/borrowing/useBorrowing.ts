import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { toast } from 'react-toastify'

import { createBorrowing, getBorrowing, getUpsertBorrowing, updateBorrowing } from '@/libs/admin/borrowing/borrowing'
import { getErrorMessage } from '@/utils/getErrorMessage'

export const useBorrowingUpsertData = () => {
  return useQuery({
    queryKey: ['borrowing-upsert-data'],
    queryFn: getUpsertBorrowing
  })
}

export function useCreateBorrowing() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createBorrowing,

    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ['borrowing'] })
      toast.success('با موفقیت ایجاد شد')
    },

    onError: (error: any) => {
      toast.error(getErrorMessage(error))
      throw error
    }
  })

  return mutation
}

export function useGetBorrowing(id: number | string | null) {
  return useQuery({
    queryKey: ['borrowing', id],
    queryFn: () => getBorrowing(id as number | string),
    enabled: !!id
  })
}

export function useUpdateBorrowing() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: updateBorrowing,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['borrowing'] })
      toast.success('با موفقیت ویرایش شد')
    },

    onError: (error: any) => {
      toast.error(getErrorMessage(error))
      throw error
    }
  })

  return mutation
}
