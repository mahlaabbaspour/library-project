import { useMutation } from '@tanstack/react-query'

import { createPayment } from '@/libs/admin/shop/payment/payment'

export const usePayment = () => {
  return useMutation({
    mutationFn: createPayment
  })
}
