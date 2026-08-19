'use client'

import BookList from '@/components/pages/admin/Shop/BookList'
import { useGetBookShop } from '@/hooks/admin/shop/useShop'

export default function BookShop() {
  const { data } = useGetBookShop()
  const bookShop = data?.data?.data

  return <BookList bookShop={bookShop} />
}
