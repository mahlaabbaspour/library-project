'use client'
import { useState } from 'react'

import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import {
  IconButton,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography
} from '@mui/material'

import { getImageUrl } from '@/utils/getImageUrl'
import { useGetShowBook } from '@/hooks/admin/shop/useShop'
import Breadcrumb from '@/components/Breakcrumb'
import { useAddToCart } from '@/hooks/admin/shop/shoppingCard/useAddToCart'

type Props = {
  id: number
}

export default function ShowBook({ id }: Props) {
  const { data, isLoading } = useGetShowBook(id)
  const [quantity, setQuantity] = useState(0)
  const { mutate: addToCart, isPending } = useAddToCart()
  const book = data

  const items = [
    { title: 'داشبورد', to: '/admin' },
    { title: 'فروشگاه کتاب', to: '/admin/Shop' },
    { title: 'خرید کتاب' }
  ]

  const totalPrice = Number(book?.price) * quantity

  if (isLoading) {
    return <Typography>درحال دریافت اطلاعات...</Typography>
  }

  if (!book) {
    return <Typography>کتاب پیدا نشد!</Typography>
  }

  return (
    <>
      <Breadcrumb items={items} />
      <Card>
        <CardContent>
          <Typography variant='h5' sx={{ mb: 5 }}>
            اطلاعات کتاب
          </Typography>
          <Grid container spacing={7}>
            <Grid item md={4} xs={12}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: 4,
                  bgcolor: 'background.paper',
                  border: theme => `1px solid ${theme.palette.divider}`,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxShadow: theme => theme.shadows[2],
                  transition: '.3s',

                  '&:hover': {
                    boxShadow: theme => theme.shadows[8],
                    transform: 'translateY(-4px)'
                  }
                }}
              >
                <CardMedia
                  component='img'
                  image={getImageUrl(book.image)}
                  alt={book.name}
                  sx={{
                    width: '100%',
                    maxWidth: 300,
                    height: 420,
                    objectFit: 'fill',
                    borderRadius: 2
                  }}
                />
              </Box>
            </Grid>
            {/* <Grid
            item
            md={6}
            xs={12}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 450
            }}
          >
            <Book3D image={getImageUrl(book.image)} width={220} height={330} />
          </Grid> */}

            <Grid item md={8} xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Grid container spacing={4}>
                <Grid item md={8} xs={12}>
                  <Stack spacing={3}>
                    <Card variant='outlined' sx={{ borderRadius: 3 }}>
                      <CardContent>
                        <Typography variant='caption' color='text.secondary'>
                          نام کتاب
                        </Typography>

                        <Typography variant='h4' fontWeight={700} mt={1}>
                          {book.name}
                        </Typography>
                      </CardContent>
                    </Card>

                    <Card variant='outlined' sx={{ borderRadius: 3 }}>
                      <CardContent>
                        <Typography variant='subtitle2' color='text.secondary' mb={2}>
                          دسته بندی
                        </Typography>

                        <Stack direction='row' spacing={1} flexWrap='wrap' useFlexGap>
                          {book.categories.map(category => (
                            <Chip
                              key={category.id}
                              label={category.name}
                              color='primary'
                              variant='outlined'
                              sx={{
                                borderRadius: 5,
                                fontWeight: 600
                              }}
                            />
                          ))}
                        </Stack>
                      </CardContent>
                    </Card>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={12} xs={12}>
              <Card
                sx={{
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider'
                }}
              >
                <CardContent
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 3,
                    py: 2
                  }}
                >
                  <Box>
                    <Typography variant='body1' sx={{ mt: 3 }}>
                      قیمت
                    </Typography>

                    <Typography variant='h5' fontWeight={700} color='success.main'>
                      {(quantity === 0 ? Number(book.price) : totalPrice).toLocaleString('fa-IR')} تومان
                    </Typography>
                  </Box>

                  {quantity === 0 ? (
                    <Button
                      sx={{ mt: 3 }}
                      variant='contained'
                      color='success'
                      disabled={isPending}
                      onClick={() => {
                        addToCart(book.id)
                        setQuantity(1)
                      }}
                    >
                      افزودن به سبد خرید
                    </Button>
                  ) : (
                    <Stack
                      direction='row'
                      alignItems='center'
                      spacing={1}
                      sx={{
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 2,
                        px: 1,
                        mt: 3
                      }}
                    >
                      <IconButton onClick={() => setQuantity(prev => Math.max(0, prev - 1))}>
                        <RemoveIcon />
                      </IconButton>

                      <Typography fontWeight={700}>{quantity}</Typography>

                      <IconButton onClick={() => setQuantity(prev => prev + 1)}>
                        <AddIcon />
                      </IconButton>
                    </Stack>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Divider sx={{ mt: 5, mb: 5 }} />

          <Typography variant='h5' mb={4}>
            مشخصات کتاب
          </Typography>

          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <Card variant='outlined' sx={{ borderRadius: 3, height: '100%' }}>
                <CardContent>
                  <Typography color='text.secondary' mb={2}>
                    نویسندگان
                  </Typography>

                  <Stack spacing={1}>
                    {book.authors?.map(author => (
                      <Chip key={author.id} label={author.name} color='secondary' variant='outlined' />
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid item md={6} xs={12}>
              <Card variant='outlined' sx={{ borderRadius: 3, height: '100%' }}>
                <CardContent>
                  <Typography color='text.secondary' mb={2}>
                    مترجمان
                  </Typography>

                  <Stack spacing={1}>
                    {book.translators?.map(translator => (
                      <Chip key={translator.id} label={translator.name} color='info' variant='outlined' />
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card variant='outlined' sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Typography variant='h6' mb={2}>
                    درباره کتاب
                  </Typography>

                  <Typography
                    color='text.secondary'
                    sx={{
                      lineHeight: 2.3,
                      whiteSpace: 'pre-line'
                    }}
                  >
                    {book.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}
