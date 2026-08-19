import { api } from '@/libs/api'

export type CreateBookDto = FormData

export const createBook = async (payload: FormData) => {
  const response = await api.post('/book/store', payload, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  if (!response.data.status) {
    throw response.data.message
  }

  return response.data
}

// export const updateBook = async ({ id, payload }: { id: number; payload: FormData }) => {
//   payload.append('_method', 'PUT')

//   const response = await api.post(`/book/update/${id}`, payload, {
//     headers: {
//       'Content-Type': 'multipart/form-data'
//     }
//   })

//   if (!response.data.status) {
//     throw response.data.message
//   }

//   return response.data
// }

export const updateBook = async ({ id, payload }: { id: number; payload: FormData }) => {
  // alert('updateBook')

  payload.set('_method', 'PUT')

  const response = await api.post(`/book/update/${id}`, payload)

  return response.data
}

export const getBook = async (id: number) => {
  const response = await api.get(`/book/show/${id}`)

  return response.data.data
}

export const getUpsertBook = async () => {
  const response = await api.get('/book/upsert-data')

  console.log('RESPONSE DATA:', response.data)
  console.log('STATUS:', response.data.status)

  if (!response.data.status) {
    console.log('THROWN')
    throw new Error(response.data.message ?? 'Unknown error')
  }

  return response.data
}
