'use client'

import { useMemo, useState } from 'react'

import { useRouter } from 'next/navigation'

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
  TextField,
  Typography
} from '@mui/material'

import CustomChip from '@/@core/components/mui/Chip'
import { getImageUrl } from '@/utils/getImageUrl'
import Breadcrumb from '@/components/Breakcrumb'

interface Category {
  id: number
  name: string
}

interface Book {
  id: number
  name: string
  image: string
  price: number
  categories: Category[]
}

interface BookListProps {
  bookShop: Book[]
}

export default function BookList({ bookShop }: BookListProps) {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const router = useRouter()

  const categories = useMemo(() => {
    const map = new Map<number, { id: number; name: string }>()

    bookShop?.forEach(book => {
      book.categories?.forEach(category => {
        map.set(category.id, category)
      })
    })

    return [...map.values()]
  }, [bookShop])

  const filteredBooks = useMemo(() => {
    const keyword = search.trim().toLowerCase()

    return (
      bookShop?.filter(book => {
        const matchSearch = (book.name ?? '').toLowerCase().includes(keyword)

        const matchCategory =
          selectedCategory === null || book.categories?.some(category => category.id === selectedCategory)

        return matchSearch && matchCategory
      }) ?? []
    )
  }, [bookShop, search, selectedCategory])

  const items = [{ title: 'داشبورد', to: '/admin' }, { title: ' فروشگاه کتاب' }]

  return (
    <>
      <Breadcrumb items={items} />
      <Card>
        <CardHeader title=' فروشگاه کتاب' sx={{ display: 'flex', justifyContent: 'center' }} />

        <Divider />

        <CardContent>
          <Box>
            <TextField
              size='small'
              placeholder='جستجوی کتاب...'
              value={search}
              onChange={e => setSearch(e.target.value)}
              sx={{ width: 300 }}
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              gap: 1,
              flexWrap: 'wrap',
              mt: 3
            }}
          >
            <CustomChip
              clickable
              label='همه'
              skin='light'
              color={selectedCategory === null ? 'primary' : undefined}
              onClick={() => setSelectedCategory(null)}
            />

            {categories.map(category => (
              <CustomChip
                key={category.id}
                clickable
                label={category.name}
                skin='light'
                color={selectedCategory === category.id ? 'primary' : undefined}
                onClick={() => setSelectedCategory(category.id)}
              />
            ))}
          </Box>

          <Divider sx={{ mt: 10, mb: 5 }} />

          <Grid container spacing={6}>
            {filteredBooks?.map(book => (
              <Grid item md={4} key={book.id}>
                <Card
                  sx={{
                    transition: 'all 0.5s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 20
                    }
                  }}
                >
                  <CardMedia
                    component='img'
                    image={getImageUrl(book.image)}
                    alt={book.name}
                    sx={{ height: 180, width: '100%', objectFit: 'cover' }}
                  />

                  <CardContent>
                    <Typography variant='h6' sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                      {book.name}
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                      {book.categories?.map(categories => (
                        <CustomChip key={categories.id} skin='light' color='primary' label={categories.name} />
                      ))}
                    </Box>

                    <Typography variant='body2' sx={{ display: 'flex', justifyContent: 'center' }}>
                      {Number(book.price).toLocaleString('fa-IR')} تومان
                    </Typography>
                  </CardContent>

                  <Button
                    size='large'
                    variant='contained'
                    sx={{ width: '100%', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
                    onClick={() => {
                      console.log('book', book.id)
                      router.push(`/admin/Shop/${book.id}`)
                    }}
                  >
                    مشاهده
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>

          {filteredBooks.length === 0 && (
            <Box
              sx={{
                py: 8,
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Typography color='text.secondary'>کتابی با این مشخصات پیدا نشد.</Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </>
  )
}
