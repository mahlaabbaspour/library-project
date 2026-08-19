import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { api } from '@/libs/api'

export const useAddToCart = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (book_id: number) =>
      api.post('shopping-cart/add-book', {
        book_id
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['shopping-cart']
      })
      toast.success('با موفقیت اضافه شد')
    }
  })
}
