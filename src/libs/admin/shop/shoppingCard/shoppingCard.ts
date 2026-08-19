import { api } from '@/libs/api'

export const getCart = async () => {
  try {
    const res = await api.get('/shopping-cart')

    return res.data
  } catch (error) {
    throw error
  }
}
