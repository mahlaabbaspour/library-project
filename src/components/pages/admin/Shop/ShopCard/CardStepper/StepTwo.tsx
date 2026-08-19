import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  Typography
} from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import PaymentIcon from '@mui/icons-material/Payment'

import { useGetInvoice } from '@/hooks/admin/shop/shoppingCard/useInvoice'
import { usePayment } from '@/hooks/admin/shop/payment/usePayment'

type Book = {
  id: number
  name: string
  isbn: string
  price: string
}

type InvoiceItem = {
  id: number
  book_id: number
  book_name: string
  quantity: number
  unit_price: string
  price: string
}

type Invoice = {
  id: number
  title: string
  invoice_number: string
  invoice_date: string
  price_total: string
  status: number | null
  items: InvoiceItem[]
}

type Props = {
  handleBack: () => void
  invoiceId: number | null
}

export default function StepTwo({ handleBack, invoiceId }: Props) {
  const { data: invoice, isLoading, error } = useGetInvoice(invoiceId ?? 0)
  const { mutate: payment } = usePayment()

  if (isLoading) return <CircularProgress />

  if (error) return <Typography>خطا در دریافت اطلاعات</Typography>

  return (
    <Stack spacing={6}>
      <Card>
        <CardHeader title='فاکتور فروش' />

        <Divider />

        <CardContent>
          <Grid container spacing={6}>
            <Grid item md={6}>
              <Typography>تاریخ: </Typography>
              <Typography>{invoice?.invoice_date}</Typography>
            </Grid>
            <Grid item md={6}>
              <Typography>شماره :</Typography>
              <Typography>{invoice?.invoice_number}</Typography>
            </Grid>
            <Grid item md={12}>
              <Typography>مبلغ کل:</Typography>
              <Typography>{Number(invoice?.price_total).toLocaleString('fa-IR')} تومان</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <CardHeader title='اقلام فاکتور فروش' />

        <Divider />

        <CardContent>
          <Grid container spacing={6}>
            {invoice?.items?.map(item => (
              <Grid item xs={12} key={item.id}>
                <Card variant='outlined'>
                  <CardContent>
                    <Typography>نام کتاب: {item.book_name}</Typography>

                    <Typography>تعداد: {item.quantity}</Typography>

                    <Typography>فی واحد: {Number(item.unit_price).toLocaleString('fa-IR')} تومان</Typography>

                    <Typography>مبلغ: {item.price}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button color='inherit' startIcon={<ArrowForwardIcon />} onClick={handleBack}>
          بازگشت
        </Button>

        <Button
          variant='contained'
          endIcon={<PaymentIcon />}
          onClick={() => {
            if (!invoiceId) return
            payment(invoiceId, {
              onSuccess: data => {
                console.log('onSuccess data:', data)

                if (data?.payment_url) {
                  window.location.href = data.payment_url
                }
              }
            })
          }}
        >
          پرداخت
        </Button>
      </Box>
    </Stack>
  )
}
