'use client'

import { useState } from 'react'

import { Avatar, Box } from '@mui/material'

import CustomTable from '@/components/pages/admin/Table/CustomTable'
import CreateMemberModal from '@/components/pages/admin/Membership/CreateMemberModal'
import EditMemberModal from '@/components/pages/admin/Membership/EditMemberModal'
import ShowMemberModal from '@/components/pages/admin/Membership/ShowMemberModal'
import { getAvatarUrl } from '@/utils/getAvatarUrl'
import Breadcrumb from '@/components/Breakcrumb'

const dataStruct = {
  rowId: ['id'],

  title: ['آواتار', 'نام و نام خانوادگی', 'کد ملی', 'موبایل', 'تاریخ عضویت', 'تاریخ انقضای عضویت'],

  name: [['avatar'], ['full_name'], ['national_code'], ['mobile'], ['membership_date'], ['membership_expire_date']],

  align: ['left', 'center', 'center', 'center', 'center', 'center'],

  width: ['5%', '30%', '15%', '15%', '15%', '20%'],

  sort: ['avatar', 'full_name', 'national_code', 'mobile', 'membership_date', 'membership_expire_date'],

  filter: [false, false, false, false, false, false],

  customCol: [
    (_val: any, _index: number, row: any) => (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
        <Avatar src={getAvatarUrl(row.avatar)} />
      </Box>
    ),

    (_val: any, _index: number, row: any) => `${row.first_name} ${row.last_name}`
  ]
}

export default function MemberShipTable() {
  const [open, setOpen] = useState<boolean>(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [showId, setShowId] = useState<number | null>(null)

  const items = [{ title: 'داشبورد', to: '/admin' }, { title: 'فهرست اعضا' }]

  return (
    <>
      <Breadcrumb items={items} />

      <CustomTable
        titleTable={{
          title: 'فهرست اعضا',
          description: 'تمام اعضای ثبت شده'
        }}
        queryKey='memberships'
        baseUrl='/memberships'
        textBtn='ایجاد عضو'
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

      <CreateMemberModal open={open} onClose={() => setOpen(false)} />

      <EditMemberModal open={!!editId} id={editId} onClose={() => setEditId(null)} />

      <ShowMemberModal open={!!showId} id={showId} onClose={() => setShowId(null)} />
    </>
  )
}
