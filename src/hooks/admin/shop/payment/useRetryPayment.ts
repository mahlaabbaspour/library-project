import { useMutation } from '@tanstack/react-query'

import { retryPayment } from '@/libs/admin/shop/payment/retryPayment'

export const useRetryPayment = () => {
  return useMutation({
    mutationFn: retryPayment
  })
}
