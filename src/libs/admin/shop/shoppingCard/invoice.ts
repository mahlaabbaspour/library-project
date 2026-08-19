import { api } from '@/libs/api'

export const createInvoice = async (items: any[]) => {
  try {
    const res = await api.post('/invoice/store', {
      items
    })

    return res.data.data
  } catch (error: any) {
    console.log(error.response.data)

    throw error
  }
}

export const getInvoice = async (id: number) => {
  try {
    const res = await api.get(`/invoice/show/${id}`)

    return res.data.data
  } catch (error) {
    throw error
  }
}
