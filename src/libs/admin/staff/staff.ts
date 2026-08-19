import { api } from '@/libs/api'

export const createStaff = async ({ payload }: any) => {
  try {
    const res = await api.post(`/staff/store`, payload)

    return res.data
  } catch (error) {
    throw error
  }
}

export const getStaff = async (id: number | string) => {
  try {
    const res = await api.get(`/staff/show/${id}`)

    return res.data
  } catch (error) {
    throw error
  }
}

export const updateStaff = async ({ id, payload }: { id: number | string; payload: any }) => {
  try {
    const res = await api.post(`/staff/update/${id}`, payload)

    return res.data
  } catch (error) {
    throw error
  }
}
