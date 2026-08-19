import { useQuery } from '@tanstack/react-query'

import { getBookShop, getShowBook } from '@/libs/admin/shop/shop'

export const useGetBookShop = () => {
  return useQuery({
    queryKey: ['books'],
    queryFn: getBookShop
  })
}

export const useGetShowBook = (id: number) => {
  return useQuery({
    queryKey: ['book', id],
    queryFn: () => getShowBook(id),
    enabled: !!id
  })
}
