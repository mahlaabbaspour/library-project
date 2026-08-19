import { api } from '@/libs/api'

export const verifyPayment = async ({
  paymentId,
  authority,
  status
}: {
  paymentId: number
  authority: string
  status: string
}) => {
  const { data } = await api.get(`/payment/verify/${paymentId}?Authority=${authority}&Status=${status}`)

  return data
}
