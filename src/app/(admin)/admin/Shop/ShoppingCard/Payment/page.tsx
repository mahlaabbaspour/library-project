'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

export default function PaymentResult() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const status = searchParams.get('status')
  const success = status === 'success'

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: 8
          }}
        >
          {success ? (
            <CheckCircleOutlineIcon color='success' sx={{ fontSize: 80, mb: 3 }} />
          ) : (
            <ErrorOutlineIcon color='error' sx={{ fontSize: 80, mb: 3 }} />
          )}

          <Typography variant='h4' fontWeight='bold' gutterBottom>
            {success ? 'پرداخت با موفقیت انجام شد' : 'پرداخت ناموفق بود'}
          </Typography>

          <Typography color='text.secondary' sx={{ mb: 6 }}>
            {success ? 'از خرید شما سپاسگزاریم.' : 'متأسفانه پرداخت شما انجام نشد. لطفاً دوباره تلاش کنید.'}
          </Typography>

          <Stack direction='row' spacing={2}>
            <Button variant='contained' onClick={() => router.push('/admin/Shop')}>
              بازگشت به فروشگاه
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  )
}
