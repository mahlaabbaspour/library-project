'use client'

import { useEffect, useState } from 'react'

import { useParams, useRouter } from 'next/navigation'

import { Card, CardContent, CardHeader, Divider, Grid, Link, TextField } from '@mui/material'

import { useGetBook } from '@/hooks/admin/books/useBooks'
import FileUploader from '@/components/pages/admin/FileUploader/FileUploader'
import SwitchesBasic from '@/components/elements/SwitchBasic'
import Breadcrumb from '@/components/Breakcrumb'

export default function ShowBooks() {
  const [formData, setFormData] = useState({
    name: '',
    publisher: '',
    publish_year: '',
    price: '',
    isbn: '',
    pages: '',
    print_number: '',
    book_type: '',
    book_size: '',
    authors: [] as { id: number; name: string }[],
    translators: [] as { id: number; name: string }[],
    writer: [] as { id: number; name: string }[],
    editor_ids: [] as { id: number; name: string }[],
    categories: '',
    description: '',
    status: 0
  })

  const { id } = useParams()

  const { data, isLoading } = useGetBook(Number(id))

  console.log(data)

  const router = useRouter()

  useEffect(() => {
    if (!data) return

    setFormData({
      name: data.name || '',
      publisher: data.publisher?.name || '',
      publish_year: data.publish_year || '',
      price: data.price || '',
      isbn: data.isbn || '',
      pages: data.pages || '',
      print_number: data.print_number || '',
      book_type: data.book_type?.name || '',
      book_size: data.book_size?.name || '',
      categories: data.category?.name || '',
      authors: data.authors || [],
      translators: data.translators || [],
      writer: data.writer || [],
      editor_ids: data.editor_ids || [],
      description: data.description || '',
      status: data.status || ''
    })
  }, [data])
  if (isLoading) return <div>درحال بارگزاری...</div>

  const imageUrl = data?.image ? `http://192.168.1.177:8000/storage/${data.image}` : undefined
  const documentUrl = data?.document ? `http://192.168.1.177:8000/storage/${data.document}` : undefined

  const items = [
    { title: 'داشبورد', to: '/admin' },
    { title: 'فهرست کتاب ها', to: '/admin/Books' },
    { title: 'نمایش کتاب' }
  ]

  return (
    <>
      <Breadcrumb items={items} />

      <Card>
        <CardHeader
          title='نمایش کتاب'
          titleTypographyProps={{
            align: 'center',
            variant: 'h4'
          }}
        />

        <Divider />

        <CardContent>
          <Grid container spacing={6}>
            <Grid item md={8}>
              <TextField fullWidth id='name' label='نام کتاب' value={formData.name} inputProps={{ readOnly: true }} />
            </Grid>

            <Grid item md={4}>
              <TextField fullWidth type='number' label='شابک' value={formData.isbn} inputProps={{ readOnly: true }} />
            </Grid>

            <Grid item md={6}>
              <TextField
                fullWidth
                label='نویسندگان'
                value={formData.authors.map(author => author.name).join('')}
                inputProps={{ readOnly: true }}
              />
            </Grid>

            <Grid item md={6}>
              <TextField
                fullWidth
                label='مترجمان'
                value={formData.translators.map(translator => translator.name).join('')}
                inputProps={{ readOnly: true }}
              />
            </Grid>

            <Grid item md={6}>
              <TextField
                fullWidth
                label='مولفان'
                value={formData.writer.map(writer => writer.name).join('')}
                inputProps={{ readOnly: true }}
              />
            </Grid>

            <Grid item md={6}>
              <TextField
                fullWidth
                label='ویراستاران'
                value={formData.editor_ids.map(editor => editor.name).join('')}
                inputProps={{ readOnly: true }}
              />
            </Grid>

            <Grid item md={3}>
              <TextField fullWidth label='انتشارات' value={formData.publisher} inputProps={{ readOnly: true }} />
            </Grid>

            <Grid item md={3}>
              <TextField
                fullWidth
                type='number'
                label='سال انتشار'
                value={formData.publish_year}
                inputProps={{ readOnly: true }}
              />
            </Grid>

            <Grid item md={2}>
              <TextField type='number' label='نوبت چاپ' value={formData.print_number} inputProps={{ readOnly: true }} />
            </Grid>

            <Grid item md={2}>
              <TextField type='number' label='تعداد صفحات' value={formData.pages} inputProps={{ readOnly: true }} />
            </Grid>

            <Grid item md={2}>
              <TextField type='number' label='قیمت' value={formData.price} inputProps={{ readOnly: true }} />
            </Grid>

            <Grid item md={6}>
              <TextField fullWidth label='دسته بندی' value={formData.categories} inputProps={{ readOnly: true }} />
            </Grid>

            <Grid item md={3}>
              <TextField fullWidth label='نوع کتاب' value={formData.book_type} inputProps={{ readOnly: true }} />
            </Grid>

            <Grid item md={3}>
              <TextField fullWidth label='قطع کتاب' value={formData.book_size} inputProps={{ readOnly: true }} />
            </Grid>

            <Grid item md={6}>
              <FileUploader disabled defaultImage={imageUrl} accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }} />
            </Grid>

            <Grid item md={6}>
              <FileUploader
                disabled
                defaultFile={documentUrl}
                accept={{
                  'application/pdf': ['.pdf'],
                  'application/msword': ['.doc'],
                  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
                }}
              />
            </Grid>

            <Grid item md={12}>
              <TextField multiline rows={7} fullWidth inputProps={{ readOnly: true }} value={formData.description} />
            </Grid>

            <Grid item md={12}>
              <SwitchesBasic checked={formData.status === 1} onChange={() => {}} disabled />
            </Grid>

            <Grid item md={12} display='flex' justifyContent='flex-end'>
              <Link color='error' onClick={() => router.back()}>
                بازگشت
              </Link>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}
