import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '@/libs/api'

export const useChangeCartQuantity = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ book_id, quantity }: { book_id: number; quantity: number }) =>
      api.get('shopping-cart/quantity', {
        params: {
          book_id,
          quantity
        }
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['shopping-cart']
      })
    }
  })
}
