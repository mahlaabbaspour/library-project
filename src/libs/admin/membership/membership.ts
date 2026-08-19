import { api } from '@/libs/api'

export const createMember = async ({ payload }: any) => {
  try {
    const res = await api.post(`/memberships/store`, payload)

    return res.data
  } catch (error) {
    throw error
  }
}

export const getMember = async (id: number | string) => {
  try {
    const res = await api.get(`/memberships/show/${id}`)

    return res.data
  } catch (error) {
    throw error
  }
}

export const updateMember = async ({ id, payload }: { id: number | string; payload: any }) => {
  try {
    const res = await api.post(`/memberships/update/${id}`, payload)

    return res.data
  } catch (error) {
    throw error
  }
}
