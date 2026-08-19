import { api } from '@/libs/api'

export const getUpsertBorrowing = async () => {
  const res = await api.get('/borrowing/upsert-data')

  if (!res.data.status) {
    throw new Error(res.data.message ?? 'Unknown error')
  }

  return res.data
}

export const createBorrowing = async ({ payload }: any) => {
  try {
    const res = await api.post('/borrowing/store', payload)

    return res.data
  } catch (error) {
    throw error
  }
}

export const getBorrowing = async (id: number | string) => {
  try {
    const res = await api.get(`/borrowing/show/${id}`)

    return res.data
  } catch (error) {
    throw error
  }
}

export const updateBorrowing = async ({ id, payload }: { id: number | string; payload: any }) => {
  try {
    const res = await api.post(`/borrowing/update/${id}`, payload)

    return res.data
  } catch (error) {
    throw error
  }
}
