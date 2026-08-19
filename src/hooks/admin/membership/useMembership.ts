import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { createMember, getMember, updateMember } from '@/libs/admin/membership/membership'
import { getErrorMessage } from '@/utils/getErrorMessage'

export function useCreateMember() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createMember,

    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ['memberships'] })
      toast.success('با موفقیت ایجاد شد')
    },

    onError: (error: any) => {
      toast.error(getErrorMessage(error))
      throw error
    }
  })

  return mutation
}

export function useGetMember(id: number | string | null) {
  return useQuery({
    queryKey: ['members', id],
    queryFn: () => getMember(id as number | string),
    enabled: !!id
  })
}

export function useUpdateMember() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: updateMember,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memberships'] })
      toast.success('با موفقیت ویرایش شد')
    },

    onError: (error: any) => {
      toast.error(getErrorMessage(error))
      throw error
    }
  })

  return mutation
}
