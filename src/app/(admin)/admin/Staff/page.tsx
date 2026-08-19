'use client'

import { useState } from 'react'

import { Avatar, Box } from '@mui/material'

import CustomTable from '@/components/pages/admin/Table/CustomTable'
import { getAvatarUrl } from '@/utils/getAvatarUrl'
import CreateStaffModal from '@/components/pages/admin/Staff/CreateStaffModal'
import EditStaffModal from '@/components/pages/admin/Staff/EditStaffModal'
import ShowStaffModal from '@/components/pages/admin/Staff/ShowStaffModal'
import Breadcrumb from '@/components/Breakcrumb'

const dataStruct = {
  rowId: ['id'],

  title: ['آواتار', 'نام و نام خانوادگی', 'کد ملی', 'موبایل', 'تاریخ استخدام', 'شماره پرسنلی'],

  name: [['avatar'], ['full_name'], ['national_code'], ['mobile'], ['employment_date'], ['personnel_number']],

  align: ['center', 'center', 'center', 'center', 'center', 'center', 'center'],

  sort: ['avatar', 'full_name', 'national_code', 'mobile', 'employment_date', 'personnel_number'],

  width: ['5%', '30%', '15%', '15%', '15%', '20%'],

  filter: [false, false, false, false, false, false],

  customCol: [
    (_val: any, _index: number, row: any) => (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Avatar src={getAvatarUrl(row.avatar)} />
      </Box>
    ),

    (_val: any, _index: number, row: any) => `${row.first_name} ${row.last_name}`
  ]
}

export default function StaffTable() {
  const [open, setOpen] = useState<boolean>(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [showId, setShowId] = useState<number | null>(null)

  const items = [{ title: 'داشبورد', to: '/admin' }, { title: 'فهرست کارمندان' }]

  return (
    <>
      <Breadcrumb items={items} />
      <CustomTable
        titleTable={{
          title: 'فهرست کارمندان',
          description: 'تمام کارمندان ثبت شده'
        }}
        queryKey='staff'
        baseUrl='/staff'
        textBtn='ایجاد کارمند'
        btnShow={true}
        checkboxEnabled={true}
        dataStruct={dataStruct}
        onClickBtn={() => setOpen(true)}
        btnOperation={{
          status: () => true,
          delete: () => true,
          show: () => true,
          edit: () => true,

          onShow: (row: any) => {
            console.log('row:', row)
            setShowId(row.id)
          },
          onEdit: (row: any) => setEditId(row.id)
        }}
      />

      <CreateStaffModal open={open} onClose={() => setOpen(false)} />

      <EditStaffModal open={!!editId} id={editId} onClose={() => setEditId(null)} />

      <ShowStaffModal open={!!showId} id={showId} onClose={() => setShowId(null)} />
    </>
  )
}
