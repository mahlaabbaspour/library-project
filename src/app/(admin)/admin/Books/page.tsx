'use client'

import { useMemo } from 'react'

import { useRouter } from 'next/navigation'

import { Box, Chip, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'

import CustomTable from '@/components/pages/admin/Table/CustomTable'
import Breadcrumb from '@/components/Breakcrumb'
import { api } from '@/libs/api'

export default function BooksTable() {
  const router = useRouter()

  const items = [{ title: 'داشبورد', to: '/admin' }, { title: 'فهرست کتاب ها' }]

  const { data: upsertData } = useQuery({
    queryKey: ['book-upsert-data'],
    queryFn: async () => {
      const res = await api.get('/book/upsert-data')

      return res.data?.data
    },
    staleTime: 5 * 60 * 1000
  })

  const dataStruct = useMemo(
    () => ({
      rowId: ['id'],

      title: ['اطلاعات کتاب', 'نویسنده', 'انتشارات', 'وضعیت'],

      name: [['name'], ['authors.0.name'], ['publisher.name'], ['status']],

      align: ['center', 'center', 'center', 'center'],

      sort: ['name', 'author', 'publisher', 'status'],

      filter: [true, true, true, true],

      filterType: ['checklist', 'checklist', 'checklist', 'checklist'],

      filterName: ['category_id', 'author_id', 'publisher_id', 'status'],

      filterOptions: [
        upsertData?.categories ?? [],
        upsertData?.authors ?? [],
        upsertData?.publishers ?? [],
        [
          { id: 1, name: 'فعال' },
          { id: 0, name: 'غیرفعال' }
        ]
      ],

      width: ['60%', '15%', '15%', '10%'],

      customCol: [
        (val: any, index: number, row: any) => {
          return (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 0.5,
                width: '100%'
              }}
            >
              <Box
                sx={{
                  display: 'flex',

                  justifyContent: 'space-between',

                  alignItems: 'center',
                  flexWrap: 'wrap'
                }}
              >
                <Typography fontWeight={600} noWrap>
                  {row.name}
                </Typography>

                <Chip label={row.book_type?.name} size='small' color='primary' />
              </Box>

              <Typography variant='body2' color='text.secondary' sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                {row.categories?.map((cat: any) => cat.name).join('، ')}
              </Typography>
            </Box>
          )
        },

        null,

        null,

        (val: any) => {
          return (
            <Chip label={val[0] === 1 ? 'فعال' : 'غیرفعال'} color={val[0] === 1 ? 'success' : 'error'} size='small' />
          )
        }
      ]
    }),
    [upsertData]
  )

  return (
    <>
      <Breadcrumb items={items} />

      <CustomTable
        titleTable={{
          title: 'فهرست کتاب ها',
          description: 'تمام کتاب های ثبت شده'
        }}
        checkboxEnabled={true}
        cardHeader={{
          status: true
        }}
        queryKey='books'
        baseUrl='/book'
        textBtn='ایجاد کتاب'
        btnShow={true}
        dataStruct={dataStruct}
        showBulkDelete={false}
        btnOperation={{
          status: () => true,
          delete: () => true,
          edit: () => true,
          show: () => true,

          onShow: (row: any) => {
            router.push(`/admin/Books/${row.id}/Show`)
          },

          onEdit: (row: any) => {
            console.log('EDIT CLICKED =>', row)
            router.push(`/admin/Books/${row.id}/Edit`)
          }
        }}
      />
    </>
  )
}
