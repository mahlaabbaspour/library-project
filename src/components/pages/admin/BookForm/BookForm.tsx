'use client'

import { useEffect, useState } from 'react'

import { Button, Card, CardContent, FormControl, Grid2, InputLabel, MenuItem, Select, TextField } from '@mui/material'

import CkEditor from '@/components/pages/admin/CKEditor/CkEditor'
import MultiSelect from '@/components/pages/admin/MultiSelect/MultiSelect'
import { useCreateBook, useGetBooks } from '@/hooks/admin/books/useBooks'
import FileUploader from '@/components/pages/admin/FileUploader/FileUploader'

interface BookFormProps {
  mode: 'create' | 'edit' | 'show'
  id?: number
}

export default function BookForm({ mode, id }: BookFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    publisher_id: '',
    publish_year: '',
    price: '',
    isbn: '',
    pages: '',
    print_number: '',
    book_type_id: '',
    book_size_id: '',
    author_ids: [] as string[],
    translatorName: [] as string[],
    writerName: [] as string[],
    editorName: [] as string[],
    category_id: [] as string[],
    description: ''
  })

  const { mutate, isPending } = useCreateBook()

  const handleSubmit = () => {
    mutate(formData, {
      onSuccess: data => {
        console.log(data)
      },
      onError: error => {
        console.log(error)
      }
    })
  }

  const { data, isLoading } = useGetBooks(id! ?? 0)

  useEffect(() => {
    if (!data) return

    setFormData({
      title: data.title,
      publisher_id: data.publisher_id,
      publish_year: data.publish_year,
      price: data.price,
      isbn: data.isbn,
      pages: data.pages,
      print_number: data.print_number,
      book_type_id: data.book_type_id,
      book_size_id: data.book_size_id,
      author_ids: data.author_ids,
      translatorName: data.translatorName,
      writerName: data.writerName,
      editorName: data.editorName,
      category_id: data.category_id,
      description: data.description
    })
  }, [data])

  return (
    <Card>
      <Grid2 container spacing={1}>
        <Grid2 size={3}>
          <CardContent>
            <TextField
              fullWidth
              id='name'
              label='نام کتاب'
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
            />
          </CardContent>
        </Grid2>

        <Grid2 size={3}>
          <CardContent>
            <MultiSelect
              label='نویسندگان'
              value={formData.author_ids}
              onChange={value => setFormData({ ...formData, author_ids: value })}
            />
          </CardContent>
        </Grid2>

        <Grid2 size={3}>
          <CardContent>
            <MultiSelect
              label='مترجمان'
              value={formData.translatorName}
              onChange={value => setFormData({ ...formData, translatorName: value })}
            />
          </CardContent>
        </Grid2>

        <Grid2 size={3}>
          <CardContent>
            <MultiSelect
              label='مولفان'
              value={formData.writerName}
              onChange={value => setFormData({ ...formData, writerName: value })}
            />
          </CardContent>
        </Grid2>

        <Grid2 size={3}>
          <CardContent>
            <MultiSelect
              label='ویراستاران'
              value={formData.editorName}
              onChange={value => setFormData({ ...formData, editorName: value })}
            />
          </CardContent>
        </Grid2>

        <Grid2 size={3}>
          <CardContent>
            <TextField
              fullWidth
              type='number'
              id='publisher-code'
              label='کد انتشارات'
              value={formData.publisher_id}
              onChange={e => setFormData({ ...formData, publisher_id: e.target.value })}
            />
          </CardContent>
        </Grid2>

        <Grid2 size={3}>
          <CardContent>
            <TextField
              fullWidth
              type='number'
              id='publish-year'
              label='سال انتشار'
              value={formData.publish_year}
              onChange={e => {
                setFormData({ ...formData, publish_year: e.target.value })
              }}
            />
          </CardContent>
        </Grid2>

        <Grid2 size={3}>
          <CardContent>
            <MultiSelect
              label='دسته بندی'
              value={formData.category_id}
              onChange={value => setFormData({ ...formData, category_id: value })}
            />
          </CardContent>
        </Grid2>

        <Grid2 size={2}>
          <CardContent>
            <FormControl fullWidth>
              <InputLabel id='book-type-label'>نوع کتاب</InputLabel>
              <Select
                labelId='book-type-label'
                id='book-type'
                label='نوع کتاب'
                value={formData.book_type_id}
                onChange={e => {
                  setFormData({ ...formData, book_type_id: e.target.value })
                }}
              >
                <MenuItem value='الکترونیکی'>الکترونیکی</MenuItem>
                <MenuItem value='فیزیکی'>فیزیکی</MenuItem>
              </Select>
            </FormControl>
          </CardContent>
        </Grid2>

        <Grid2 size={2}>
          <CardContent>
            <TextField
              type='number'
              id='price'
              label='قیمت'
              value={formData.price}
              onChange={e => {
                setFormData({ ...formData, price: e.target.value })
              }}
            />
          </CardContent>
        </Grid2>

        <Grid2 size={2}>
          <CardContent>
            <TextField
              type='number'
              id='isbn'
              label='شابک'
              value={formData.isbn}
              onChange={e => setFormData({ ...formData, isbn: e.target.value })}
            />
          </CardContent>
        </Grid2>

        <Grid2 size={3}>
          <CardContent>
            <FormControl fullWidth>
              <InputLabel id='book-size-label'>قطع کتاب</InputLabel>
              <Select
                label='قطع کتاب'
                labelId='book-size-label'
                id='book-size'
                value={formData.book_size_id}
                onChange={e => {
                  setFormData({ ...formData, book_size_id: e.target.value })
                }}
              >
                <MenuItem value='one'>one</MenuItem>
                <MenuItem value='two'>two</MenuItem>
                <MenuItem value='three'>three</MenuItem>
                <MenuItem value='four'>four</MenuItem>
              </Select>
            </FormControl>
          </CardContent>
        </Grid2>

        <Grid2 size={2}>
          <CardContent>
            <TextField
              type='number'
              id='page-count'
              label='تعداد صفحات'
              value={formData.pages}
              onChange={e => {
                setFormData({ ...formData, pages: e.target.value })
              }}
            />
          </CardContent>
        </Grid2>

        <Grid2 size={12}>
          <CardContent>
            <TextField
              type='number'
              id='edition'
              label='نوبت چاپ'
              value={formData.print_number}
              onChange={e => {
                setFormData({ ...formData, print_number: e.target.value })
              }}
            />
          </CardContent>
        </Grid2>

        <Grid2 size={6}>
          <FileUploader />
        </Grid2>

        <Grid2 size={6}>
          <FileUploader />
        </Grid2>

        <Grid2 size={12}>
          <CardContent>
            <CkEditor
              value={formData.description}
              onChange={value =>
                setFormData(prev => ({
                  ...prev,
                  description: value
                }))
              }
            />
          </CardContent>
        </Grid2>

        <Grid2 size={12} display='flex' justifyContent='flex-end'>
          <CardContent>
            <Button variant='contained' onClick={handleSubmit} disabled={isPending}>
              ثبت
            </Button>
          </CardContent>
        </Grid2>
      </Grid2>
    </Card>
  )
}
