import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '@/libs/api'

export const useDeleteCart = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => api.delete(`shopping-cart/remove-book/${id}`),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['shopping-cart']
      })
    }
  })
}
