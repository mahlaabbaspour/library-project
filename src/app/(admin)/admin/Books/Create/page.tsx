'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

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
import { useBookUpsertData, useCreateBook } from '@/hooks/admin/books/useBooks'
import FileUploader from '@/components/pages/admin/FileUploader/FileUploader'
import SwitchesBasic from '@/components/elements/SwitchBasic'
import Breadcrumb from '@/components/Breakcrumb'

export default function CreateNewBook() {
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

  const { mutateAsync, isPending, error } = useCreateBook()

  // const { data, isLoading } = useBookUpsertData()

  const { data, isLoading } = useBookUpsertData()

  const validationErrors = error?.response?.data?.errors

  console.log(data)

  const router = useRouter()

  if (isLoading) return <div>درحال بارگزاری...</div>

  const handleSubmit = async () => {
    const form = new FormData()

    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(item => {
          form.append(`${key}[]`, item)
        })
      } else {
        form.append(key, value)
      }
    })

    if (image) {
      form.append('image', image)
    }

    if (document) {
      form.append('document', document)
    }

    try {
      await mutateAsync(form)

      router.push('/admin/Books')
    } catch (error) {
      console.error(error)
    }
  }

  const publishers = data?.data?.publishers ?? []
  const authors = data?.data?.authors ?? []
  const categories = data?.data?.categories ?? []
  const bookTypes = data?.data?.bookTypes ?? []
  const bookSizes = data?.data?.bookSizes ?? []

  const items = [
    { title: 'داشبورد', to: '/admin' },
    { title: 'فهرست کتاب ها', to: '/admin/Books' },
    { title: 'ایجاد کتاب' }
  ]

  return (
    <>
      <Breadcrumb items={items} />
      <Card>
        <CardHeader
          title='ایجاد کتاب'
          titleTypographyProps={{
            align: 'center',
            variant: 'h4'
          }}
        />

        <Divider />

        <CardContent>
          <Grid container spacing={6}>
            <Grid item md={8}>
              <TextField
                fullWidth
                id='name'
                label='نام کتاب'
                value={formData.name}
                error={Boolean(validationErrors?.name)}
                helperText={validationErrors?.name?.[0]}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </Grid>

            <Grid item md={4}>
              <TextField
                fullWidth
                type='number'
                id='isbn'
                label='شابک'
                value={formData.isbn}
                error={Boolean(validationErrors?.isbn)}
                helperText={validationErrors?.isbn?.[0]}
                onChange={e => setFormData({ ...formData, isbn: e.target.value })}
              />
            </Grid>

            <Grid item md={6}>
              <MultiSelect
                label='نویسندگان'
                options={authors}
                value={formData.authors}
                error={Boolean(validationErrors?.authors)}
                helperText={validationErrors?.authors?.[0]}
                onChange={value => setFormData({ ...formData, authors: value })}
              />
            </Grid>

            <Grid item md={6}>
              <MultiSelect
                label='مترجمان'
                options={authors}
                value={formData.translators}
                error={Boolean(validationErrors?.translators)}
                helperText={validationErrors?.translators?.[0]}
                onChange={value => setFormData({ ...formData, translators: value })}
              />
            </Grid>

            <Grid item md={6}>
              <MultiSelect
                label='مولفان'
                options={authors}
                value={formData.writer}
                error={Boolean(validationErrors?.writer)}
                helperText={validationErrors?.writer?.[0]}
                onChange={value => setFormData({ ...formData, writer: value })}
              />
            </Grid>

            <Grid item md={6}>
              <MultiSelect
                label='ویراستاران'
                options={authors}
                value={formData.editor_ids}
                error={Boolean(validationErrors?.editor_ids)}
                helperText={validationErrors?.editor_ids?.[0]}
                onChange={value => setFormData({ ...formData, editor_ids: value })}
              />
            </Grid>

            <Grid item md={3}>
              <FormControl fullWidth>
                <InputLabel id='publisher-label'>انتشارات</InputLabel>
                <Select
                  labelId='publisher-label'
                  id='publisher-type'
                  label='انتشارات'
                  value={formData.publisher_id}
                  error={Boolean(validationErrors?.publisher_id)}
                  onChange={e => {
                    setFormData({ ...formData, publisher_id: e.target.value })
                  }}
                >
                  {publishers.map(item => (
                    <MenuItem key={item.id} value={item.id}>
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
                id='publish-year'
                label='سال انتشار'
                value={formData.publish_year}
                error={Boolean(validationErrors?.publish_year)}
                helperText={validationErrors?.publish_year?.[0]}
                onChange={e => {
                  setFormData({ ...formData, publish_year: e.target.value })
                }}
              />
            </Grid>

            <Grid item md={2}>
              <TextField
                type='number'
                id='edition'
                label='نوبت چاپ'
                value={formData.print_number}
                error={Boolean(validationErrors?.print_number)}
                helperText={validationErrors?.print_number?.[0]}
                onChange={e => {
                  setFormData({ ...formData, print_number: e.target.value })
                }}
              />
            </Grid>

            <Grid item md={2}>
              <TextField
                type='number'
                id='page-count'
                label='تعداد صفحات'
                value={formData.pages}
                error={Boolean(validationErrors?.pages)}
                helperText={validationErrors?.pages?.[0]}
                onChange={e => {
                  setFormData({ ...formData, pages: e.target.value })
                }}
              />
            </Grid>

            <Grid item md={2}>
              <TextField
                type='number'
                id='price'
                label='قیمت'
                value={formData.price}
                error={Boolean(validationErrors?.price)}
                helperText={validationErrors?.price?.[0]}
                onChange={e => {
                  setFormData({ ...formData, price: e.target.value })
                }}
              />
            </Grid>

            <Grid item md={6}>
              <MultiSelect
                label='دسته بندی'
                options={categories}
                value={formData.categories}
                error={Boolean(validationErrors?.categories)}
                helperText={validationErrors?.categories?.[0]}
                onChange={value => setFormData({ ...formData, categories: value })}
              />
            </Grid>

            <Grid item md={3}>
              <FormControl fullWidth>
                <InputLabel id='book-type-label'>نوع کتاب</InputLabel>
                <Select
                  labelId='book-type-label'
                  id='book-type'
                  label='نوع کتاب'
                  value={formData.book_type_id}
                  error={Boolean(validationErrors?.book_type_id)}
                  onChange={e => {
                    setFormData({ ...formData, book_type_id: e.target.value })
                  }}
                >
                  {bookTypes.map(item => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item md={3}>
              <FormControl fullWidth>
                <InputLabel id='book-type-label'>قطع کتاب</InputLabel>
                <Select
                  labelId='book-type-label'
                  id='book-type'
                  label='قطع کتاب'
                  value={formData.book_size_id}
                  error={Boolean(validationErrors?.book_size_id)}
                  onChange={e => {
                    setFormData({ ...formData, book_size_id: e.target.value })
                  }}
                >
                  {bookSizes.map(item => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item md={6}>
              <FileUploader accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }} onChange={file => setImage(file)} />
            </Grid>

            <Grid item md={6}>
              <FileUploader
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
                onChange={value =>
                  setFormData(prev => ({
                    ...prev,
                    description: value
                  }))
                }
              />
            </Grid>

            <Grid item md={12}>
              <SwitchesBasic
                error={Boolean(validationErrors?.status)}
                helperText={validationErrors?.status?.[0]}
                checked={formData.status === 1}
                onChange={(value: boolean) => setFormData({ ...formData, status: value ? 1 : 0 })}
              />
            </Grid>

            <Grid item md={12} display='flex' justifyContent='space-between'>
              <Link component='button' underline='hover' onClick={() => router.back()} color='error'>
                بازگشت
              </Link>
              <Button variant='contained' color='success' onClick={handleSubmit} disabled={isPending}>
                ثبت
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}
