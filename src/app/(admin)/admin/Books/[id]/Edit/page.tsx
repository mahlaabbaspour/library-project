'use client'

import { useEffect, useState } from 'react'

import { useParams, useRouter } from 'next/navigation'

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField
} from '@mui/material'

import CkEditor from '@/components/pages/admin/CKEditor/CkEditor'
import MultiSelect from '@/components/pages/admin/MultiSelect/MultiSelect'
import { useBookUpsertData, useGetBook, useUpdateBook } from '@/hooks/admin/books/useBooks'
import FileUploader from '@/components/pages/admin/FileUploader/FileUploader'
import Breadcrumb from '@/components/Breakcrumb'
import SwitchesBasic from '@/components/elements/SwitchBasic'

export default function EditBook() {
  const { id } = useParams()
  const bookId = Number(id)

  const [formData, setFormData] = useState({
    name: '',
    publisher_id: '',
    publish_year: '',
    price: '',
    isbn: '',
    pages: '',
    print_number: '',
    book_type_id: '',
    book_size_id: '',
    authors: [] as string[],
    translators: [] as string[],
    writer: [] as string[],
    editor_ids: [] as string[],
    categories: [] as string[],
    description: '',
    status: 0
  })

  const [image, setImage] = useState<File | null>(null)
  const [document, setDocument] = useState<File | null>(null)

  const { mutateAsync: updateBook, isPending } = useUpdateBook()
  const { data: upsertData, isLoading: isUpsertLoading } = useBookUpsertData()
  const { data: book, isLoading: isBookLoading } = useGetBook(bookId)

  const router = useRouter()

  useEffect(() => {
    if (!book) return

    setFormData({
      name: book.name || '',
      publisher_id: String(book.publisher?.id ?? ''),
      publish_year: String(book.publish_year ?? ''),
      price: String(book.price ?? ''),
      isbn: String(book.isbn ?? ''),
      pages: String(book.pages ?? ''),
      print_number: String(book.print_number ?? ''),
      book_type_id: String(book.book_type?.id ?? ''),
      book_size_id: String(book.book_size?.id ?? ''),
      authors: (book.authors || []).map((a: { id: number }) => String(a.id)),
      translators: (book.translators || []).map((a: { id: number }) => String(a.id)),
      writer: (book.writer || []).map((a: { id: number }) => String(a.id)),
      editor_ids: (book.editor_ids || []).map((a: { id: number }) => String(a.id)),
      categories: (book.categories || []).map((a: { id: number }) => String(a.id)),
      description: book.description || '',
      status: book.status ?? 0
    })
  }, [book])

  if (isUpsertLoading || isBookLoading) return <div>درحال بارگزاری...</div>

  const handleSubmit = async () => {
    const form = new FormData()

    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(item => form.append(`${key}[]`, item))
      } else {
        form.append(key, value)
      }
    })

    if (image) form.append('image', image)
    if (document) form.append('document', document)
    console.log(form, 'form')

    try {
      await updateBook({ id: bookId, payload: form })
      router.push('/admin/Books')
    } catch (error) {
      console.error(error)
    }
  }

  const publishers = upsertData?.data?.publishers ?? []
  const authors = upsertData?.data?.authors ?? []
  const categories = upsertData?.data?.categories ?? []
  const bookTypes = upsertData?.data?.bookTypes ?? []
  const bookSizes = upsertData?.data?.bookSizes ?? []

  const imageUrl = book?.image ? `http://192.168.1.177:8000/storage/${book.image}` : undefined
  const documentUrl = book?.document ? `http://192.168.1.177:8000/storage/${book.document}` : undefined

  const items = [
    { title: 'داشبورد', to: '/admin' },
    { title: 'فهرست کتاب ها', to: '/admin/Books' },
    { title: 'ویرایش کتاب' }
  ]

  return (
    <>
      <Breadcrumb items={items} />
      <CardHeader
        title='ویرایش کتاب'
        titleTypographyProps={{
          align: 'center',
          variant: 'h4'
        }}
      />

      <Divider />

      <Card>
        <CardContent>
          <Grid container spacing={1}>
            <Grid item md={8}>
              <TextField
                fullWidth
                id='name'
                label='نام کتاب'
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </Grid>

            <Grid item md={4}>
              <TextField
                type='number'
                label='شابک'
                value={formData.isbn}
                onChange={e => setFormData({ ...formData, isbn: e.target.value })}
              />
            </Grid>

            <Grid item md={6}>
              <MultiSelect
                label='نویسندگان'
                options={authors}
                value={formData.authors}
                onChange={value => setFormData({ ...formData, authors: value })}
              />
            </Grid>

            <Grid item md={6}>
              <MultiSelect
                label='مترجمان'
                options={authors}
                value={formData.translators}
                onChange={value => setFormData({ ...formData, translators: value })}
              />
            </Grid>

            <Grid item md={6}>
              <MultiSelect
                label='مولفان'
                options={authors}
                value={formData.writer}
                onChange={value => setFormData({ ...formData, writer: value })}
              />
            </Grid>

            <Grid item md={6}>
              <MultiSelect
                label='ویراستاران'
                options={authors}
                value={formData.editor_ids}
                onChange={value => setFormData({ ...formData, editor_ids: value })}
              />
            </Grid>

            <Grid item md={3}>
              <FormControl fullWidth>
                <InputLabel id='publisher-label'>انتشارات</InputLabel>
                <Select
                  labelId='publisher-label'
                  label='انتشارات'
                  value={formData.publisher_id}
                  onChange={e => setFormData({ ...formData, publisher_id: e.target.value })}
                >
                  {publishers.map(item => (
                    <MenuItem key={item.id} value={String(item.id)}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item md={3}>
              <TextField
                fullWidth
                type='number'
                label='سال انتشار'
                value={formData.publish_year}
                onChange={e => setFormData({ ...formData, publish_year: e.target.value })}
              />
            </Grid>

            <Grid item md={2}>
              <TextField
                type='number'
                label='نوبت چاپ'
                value={formData.print_number}
                onChange={e => setFormData({ ...formData, print_number: e.target.value })}
              />
            </Grid>

            <Grid item md={2}>
              <TextField
                type='number'
                label='تعداد صفحات'
                value={formData.pages}
                onChange={e => setFormData({ ...formData, pages: e.target.value })}
              />
            </Grid>

            <Grid item md={2}>
              <TextField
                type='number'
                label='قیمت'
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: e.target.value })}
              />
            </Grid>

            <Grid item md={6}>
              <FormControl fullWidth>
                <MultiSelect
                  label='دسته بندی'
                  options={categories}
                  value={formData.categories}
                  onChange={value => setFormData({ ...formData, categories: value })}
                />
              </FormControl>
            </Grid>

            <Grid item md={3}>
              <FormControl fullWidth>
                <InputLabel id='book-type-label'>نوع کتاب</InputLabel>
                <Select
                  labelId='book-type-label'
                  label='نوع کتاب'
                  value={formData.book_type_id}
                  onChange={e => setFormData({ ...formData, book_type_id: e.target.value })}
                >
                  {bookTypes.map(item => (
                    <MenuItem key={item.id} value={String(item.id)}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item md={3}>
              <FormControl fullWidth>
                <InputLabel id='book-size-label'>قطع کتاب</InputLabel>
                <Select
                  labelId='book-size-label'
                  label='قطع کتاب'
                  value={formData.book_size_id}
                  onChange={e => setFormData({ ...formData, book_size_id: e.target.value })}
                >
                  {bookSizes.map(item => (
                    <MenuItem key={item.id} value={String(item.id)}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item md={6}>
              <FileUploader
                defaultImage={imageUrl}
                accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
                onChange={file => setImage(file)}
              />
            </Grid>

            <Grid item md={6}>
              <FileUploader
                defaultFile={documentUrl}
                accept={{
                  'application/pdf': ['.pdf'],
                  'application/msword': ['.doc'],
                  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
                }}
                onChange={file => setDocument(file)}
              />
            </Grid>

            <Grid item md={12}>
              <CkEditor
                value={formData.description}
                onChange={value => setFormData(prev => ({ ...prev, description: value }))}
              />
            </Grid>

            <Grid item md={12}>
              <SwitchesBasic
                checked={formData.status === 1}
                onChange={(value: boolean) => setFormData({ ...formData, status: value ? 1 : 0 })}
              />
            </Grid>

            <Grid item md={12} display='flex' justifyContent='space-between'>
              <Link component='button' underline='hover' onClick={() => router.back()} color='error'>
                بازگشت
              </Link>
              <Button variant='contained' color='success' onClick={handleSubmit} disabled={isPending}>
                ویرایش
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}
