import { useMutation, useQuery } from '@tanstack/react-query'

import { createInvoice, getInvoice } from '@/libs/admin/shop/shoppingCard/invoice'

export const useCreateInvoice = () => {
  return useMutation({
    mutationFn: createInvoice
  })
}

export const useGetInvoice = (id: number) => {
  return useQuery({
    queryKey: ['invoice', id],
    queryFn: () => getInvoice(id),
    enabled: !!id
  })
}
