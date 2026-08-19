import { useQuery } from '@tanstack/react-query'

import { getCart } from '@/libs/admin/shop/shoppingCard/shoppingCard'

export const useGetCart = () => {
  return useQuery({
    queryKey: ['shopping-cart'],
    queryFn: getCart
  })
}
