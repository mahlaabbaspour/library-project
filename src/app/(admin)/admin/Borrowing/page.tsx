'use client'

import { useState } from 'react'

import CustomTable from '@/components/pages/admin/Table/CustomTable'
import Breadcrumb from '@/components/Breakcrumb'
import CreateBorrowing from '@/components/pages/admin/Borrowing/CreateBorrowing'

import EditBorrowing from '@/components/pages/admin/Borrowing/EditBorrowing'
import ShowBorrowing from '@/components/pages/admin/Borrowing/ShowBorrowing'

const dataStruct = {
  rowId: ['id'],

  title: ['عضو', 'کارمند', 'زمان امانت', 'موعد بازگشت', 'وضعیت'],

  name: [['membership'], ['staff'], ['created_at'], ['due_date'], ['borrowing_status']],

  customCol: [
    (value: any[]) => {
      const member = value[0]

      return member ? `${member.first_name} ${member.last_name}` : '-'
    },

    (value: any[]) => {
      const staff = value[0]

      return staff ? `${staff.first_name} ${staff.last_name}` : '-'
    },

    (value: any[]) => {
      const date = value[0]

      return date ? date.split('T')[0].replaceAll('-', '/') : '-'
    },

    undefined,

    (value: any[]) => {
      const borrowingStatus = value[0]

      return borrowingStatus?.name ?? '-'
    }
  ],

  align: ['center', 'center', 'center', 'center', 'center'],

  width: ['20%', '20%', '20%', '20%', '20%'],

  sort: ['membership', 'staff', 'created_at', 'due_date', 'status'],

  filter: [false, false, false, false, false]
}

export default function BorrowingTable() {
  const [open, setOpen] = useState<boolean>(false)

  const [editId, setEditId] = useState<number | null>(null)
  const [showId, setShowId] = useState<number | null>(null)

  const items = [{ title: 'داشبورد', to: '/admin' }, { title: 'فهرست امانت ها' }]

  return (
    <>
      <Breadcrumb items={items} />

      <CustomTable
        titleTable={{
          title: 'فهرست امانت ها',
          description: 'تمام امانت های ثبت شده'
        }}
        queryKey='borrowing'
        baseUrl='/borrowing'
        textBtn='ایجاد امانت'
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
            setShowId(row.id)
          },
          onEdit: (row: any) => setEditId(row.id)
        }}
      />

      <CreateBorrowing open={open} onClose={() => setOpen(false)} />

      <EditBorrowing open={!!editId} id={editId} onClose={() => setEditId(null)} />

      <ShowBorrowing open={!!showId} id={showId} onClose={() => setShowId(null)} />
    </>
  )
}
