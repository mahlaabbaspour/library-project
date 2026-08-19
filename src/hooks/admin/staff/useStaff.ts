import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { getErrorMessage } from '@/utils/getErrorMessage'
import { createStaff, getStaff, updateStaff } from '@/libs/admin/staff/staff'

export function useCreateStaff() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createStaff,

    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ['staff'] })
      toast.success('با موفقیت ایجاد شد')
    },

    onError: (error: any) => {
      toast.error(getErrorMessage(error))
      throw error
    }
  })

  return mutation
}

export function useGetStaff(id: number | string | null) {
  return useQuery({
    queryKey: ['staff', id],
    queryFn: () => getStaff(id as number | string),
    enabled: !!id
  })
}

export function useUpdateStaff() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: updateStaff,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff'] })
      toast.success('با موفقیت ویرایش شد')
    },

    onError: (error: any) => {
      toast.error(getErrorMessage(error))
      throw error
    }
  })

  return mutation
}
