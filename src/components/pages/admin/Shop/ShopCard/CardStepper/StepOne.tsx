'use client'

import { useEffect, useState } from 'react'

import { CircularProgress, Grid, Stack, Typography } from '@mui/material'

import CartItem from './CartItem'
import CartSummary from './CartSummary'
import { useGetCart } from '@/hooks/admin/shop/shoppingCard/useShoppinCard'
import { useDeleteCart } from '@/hooks/admin/shop/shoppingCard/useDeleteCart'

interface CartItemType {
  id: number
  book_id: number
  book_name: string
  quantity: number
  unit_price: string
  price: string
  created_at: string
}

interface StepOneProps {
  handleNext: () => void
  setInvoiceId: React.Dispatch<React.SetStateAction<number | null>>
}

export default function StepOne({ handleNext, setInvoiceId }: StepOneProps) {
  const { data, isLoading, isError } = useGetCart()

  const { mutate: deleteCart } = useDeleteCart()

  const [cartItems, setCartItems] = useState<CartItemType[]>([])

  useEffect(() => {
    if (data?.data) {
      setCartItems(data.data)
    }
  }, [data])

  const totalPrice = cartItems.reduce((sum, item) => sum + item.quantity * Number(item.unit_price), 0)

  const handleQuantityChange = (bookId: number, quantity: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.book_id === bookId
          ? {
              ...item,
              quantity,
              price: String(quantity * Number(item.unit_price))
            }
          : item
      )
    )
  }

  const handleDelete = (id: number) => {
    deleteCart(id)
  }

  if (isLoading) {
    return <CircularProgress />
  }

  if (isError) {
    return <Typography color='error'>خطا در دریافت اطلاعات سبد خرید</Typography>
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          {cartItems.length === 0 ? (
            <Typography textAlign='center'>سبد خرید شما خالی است.</Typography>
          ) : (
            cartItems.map(item => (
              <CartItem key={item.id} item={item} onDelete={handleDelete} onQuantityChange={handleQuantityChange} />
            ))
          )}
        </Stack>
      </Grid>

      <Grid item xs={12} md={4}>
        <CartSummary
          cartItems={cartItems}
          totalPrice={totalPrice}
          handleNext={handleNext}
          setInvoiceId={setInvoiceId}
        />
      </Grid>
    </Grid>
  )
}
