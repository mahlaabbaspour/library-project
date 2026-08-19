'use client'

import { useState } from 'react'

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

import { Box, Card, CardMedia, Divider, IconButton, Stack, Typography } from '@mui/material'

import { useChangeCartQuantity } from '@/hooks/admin/shop/shoppingCard/useChangeCartQuantity'

//این برای چیزاییه که توی همین کامپوننت استفاده میشه
interface CartItemType {
  id: number
  book_id: number
  book_name: string
  quantity: number
  unit_price: string
  price: string
  created_at: string
  image: string
}

//این برای چیزاییه که از بیرون دریافت میکنه
interface Props {
  item: CartItemType
  onDelete: (id: number) => void
  onQuantityChange: (bookId: number, quantity: number) => void
}

export default function CartItem({ item, onDelete, onQuantityChange }: Props) {
  const [quantity, setQuantity] = useState(item.quantity)

  //این هوک یه تابع میده بهمون که ما اسمشو عوض میکنیم
  const { mutate: changeQuantity } = useChangeCartQuantity()

  const increase = () => {
    const newQuantity = quantity + 1

    setQuantity(newQuantity)

    changeQuantity({
      book_id: item.book_id,
      quantity: newQuantity
    })

    onQuantityChange(item.book_id, newQuantity)
  }

  const decrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1

      setQuantity(newQuantity)

      changeQuantity({
        book_id: item.book_id,
        quantity: newQuantity
      })

      onQuantityChange(item.book_id, newQuantity)
    }
  }

  const totalPrice = quantity * Number(item.unit_price)

  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 2
      }}
    >
      <Stack direction='row-reverse' spacing={3} justifyContent='space-between'>
        <Box flex={1}>
          <Typography fontWeight={700} fontSize={18}>
            {item.book_name}
          </Typography>

          <Typography color='text.secondary' mt={1}>
            قیمت واحد : {Number(item.unit_price).toLocaleString('fa-IR')} تومان
          </Typography>

          <Typography color='primary' mt={1}>
            تعداد : {quantity}
          </Typography>
        </Box>

        <CardMedia
          component='img'
          image={item.image}
          alt={item.book_name}
          sx={{
            width: 120,
            height: 150,
            objectFit: 'fill',
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider'
          }}
        />
      </Stack>

      <Divider sx={{ my: 3 }} />

      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Stack
          direction='row'
          spacing={1}
          alignItems='center'
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            px: 1
          }}
        >
          <IconButton onClick={decrease}>
            <RemoveIcon />
          </IconButton>

          <Typography fontWeight={700} width={30} textAlign='center'>
            {quantity}
          </Typography>

          <IconButton onClick={increase}>
            <AddIcon />
          </IconButton>
        </Stack>

        <Typography fontWeight={700} fontSize={18}>
          {totalPrice.toLocaleString('fa-IR')} تومان
        </Typography>

        <IconButton color='error' onClick={() => onDelete(item.book_id)}>
          <DeleteOutlineIcon />
        </IconButton>
      </Stack>
    </Card>
  )
}
