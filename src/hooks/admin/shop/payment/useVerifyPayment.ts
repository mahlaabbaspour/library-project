import { useMutation } from '@tanstack/react-query'

import { verifyPayment } from '@/libs/admin/shop/payment/verifyPayment'

export const useVerifyPayment = () => {
  return useMutation({
    mutationFn: verifyPayment
  })
}
