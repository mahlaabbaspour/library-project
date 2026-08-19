import { api } from '@/libs/api'

export const getBookShop = async () => {
  try {
    const res = await api.get(`/book`)

    return res.data
  } catch (error) {
    throw error
  }
}

export const getShowBook = async (id: number) => {
  const res = await api.get(`/book/show/${id}`)

  return res.data.data
}
