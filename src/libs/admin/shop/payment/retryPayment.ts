import { api } from '@/libs/api'

export const retryPayment = async (paymentId: number) => {
  const { data } = await api.post(`/payment/retry/${paymentId}`)

  return data as { paymentUrl: string }
}
