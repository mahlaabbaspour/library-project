import { api } from '@/libs/api'

export const createPayment = async (invoiceId: number) => {
  const res = await api.post(`/payment/${invoiceId}`)

  console.log('Axios response:', res.data)

  return res.data
}
