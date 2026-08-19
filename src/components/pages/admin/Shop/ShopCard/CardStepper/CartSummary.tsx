import { Button, Card, CardContent, Stack, Typography } from '@mui/material'

import { useCreateInvoice } from '@/hooks/admin/shop/shoppingCard/useInvoice'

interface CartItemType {
  id: number
  book_id: number
  book_name: string
  quantity: number
  unit_price: string
  price: string
  created_at: string
}

interface CartSummaryProps {
  totalPrice: number
  cartItems: CartItemType[]
  handleNext: () => void
  setInvoiceId: React.Dispatch<React.SetStateAction<number | null>>
}

export default function CartSummary({ totalPrice, cartItems, handleNext, setInvoiceId }: CartSummaryProps) {
  const { mutate: createInvoice, isPending } = useCreateInvoice()

  const handleCreateInvoice = () => {
    const items = cartItems.map(item => ({
      book_id: item.book_id,
      quantity: item.quantity,
      unit_price: Number(item.unit_price)
    }))

    createInvoice(items, {
      onSuccess: data => {
        setInvoiceId(data.id)

        handleNext()
      }
    })
  }

  return (
    <Card>
      <CardContent>
        <Stack spacing={3}>
          <Stack direction='row' justifyContent='space-between'>
            <Typography>مبلغ کل سفارش</Typography>

            <Typography>{totalPrice.toLocaleString('fa-IR')} تومان</Typography>
          </Stack>

          <Button fullWidth variant='contained' disabled={isPending} onClick={handleCreateInvoice}>
            ثبت سفارش
          </Button>
        </Stack>
      </CardContent>
    </Card>
  )
}
