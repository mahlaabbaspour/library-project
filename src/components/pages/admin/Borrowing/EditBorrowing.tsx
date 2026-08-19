'use client'

import { useEffect, useState } from 'react'

import {
  Box,
  Button,
  Card,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { SaveIcon } from 'lucide-react'

import { Controller, useForm } from 'react-hook-form'

import type { Dayjs } from 'dayjs'

import dayjs from 'dayjs'

import MultiSelect from '../MultiSelect/MultiSelect'
import CkEditor from '../CKEditor/CkEditor'
import CustomDatePicker from '@/components/elements/date_picker_text_filed'
import { useBorrowingUpsertData, useGetBorrowing, useUpdateBorrowing } from '@/hooks/admin/borrowing/useBorrowing'

type Props = {
  open: boolean
  id: number | string | null
  onClose: () => void
}

type FormValues = {
  book_ids: number[]
  membership_id: number | ''
  staff_id: number | ''
  penalty: number
  borrowing_status: number | ''
  description: string
}

export default function EditBorrowing({ open, id, onClose }: Props) {
  const [borrowedAt, setBorrowedAt] = useState<Dayjs | null>(null)
  const [dueDate, setDueDate] = useState<Dayjs | null>(null)
  const [returnedAt, setReturnedAt] = useState<Dayjs | null>(null)

  const getDefaultDueDate = () => {
    return dayjs().add(7, 'day')
  }

  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      book_ids: [],
      membership_id: '',
      staff_id: '',
      penalty: 0,
      borrowing_status: '',
      description: ''
    }
  })

  const { data, isLoading } = useGetBorrowing(id)

  const { data: upsertData, isLoading: isUpsertLoading } = useBorrowingUpsertData()

  const books = upsertData?.data?.books ?? []
  const memberships = upsertData?.data?.memberships ?? []
  const staffs = upsertData?.data?.staffs ?? []
  const status = upsertData?.data?.status ?? []

  const { mutate, isPending } = useUpdateBorrowing()

  useEffect(() => {
    if (!data?.data || !upsertData?.data) return

    const item = data.data

    console.log('data', data)

    reset({
      book_ids: item.books?.map((book: any) => book.id) ?? [],
      membership_id: item.membership?.id ?? '',
      staff_id: item.staff?.id ?? '',
      penalty: item.penalty ?? 0,
      borrowing_status: item.status?.id ?? '',
      description: item.description ?? ''
    })

    setBorrowedAt(item.borrowed_at ? dayjs(item.borrowed_at) : null)

    setDueDate(item.due_date ? dayjs(item.due_date) : getDefaultDueDate())

    setReturnedAt(item.returned_at ? dayjs(item.returned_at) : null)
  }, [data, upsertData, reset])

  const onSubmit = (values: any) => {
    if (!id) return

    mutate(
      {
        id,
        payload: {
          ...values,
          borrowed_at: borrowedAt,
          due_date: dueDate,
          returned_at: returnedAt
        }
      },
      {
        onSuccess: () => {
          onClose()
        }
      }
    )
  }

  const loading = isLoading || isUpsertLoading

  return (
    <Card>
      <Dialog
        fullWidth
        open={open}
        maxWidth='md'
        scroll='body'
        onClose={() => onClose()}
        PaperProps={{ component: 'form', onSubmit: handleSubmit(onSubmit) }}
      >
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 12, right: 12, zIndex: 1 }}>
          <CloseIcon />
        </IconButton>

        <DialogTitle>ویرایش امانت</DialogTitle>

        <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          {loading ? (
            <Box display='flex' justifyContent='center' py={10}>
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={6}>
              <Grid item md={12} />
              <Grid item md={4}>
                <Controller
                  name='book_ids'
                  control={control}
                  render={({ field, fieldState }) => (
                    <MultiSelect
                      label='کتاب ها'
                      value={field.value}
                      options={books}
                      onChange={field.onChange}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item md={4}>
                <Controller
                  name='membership_id'
                  control={control}
                  render={({ field, fieldState }) => (
                    <FormControl fullWidth error={!!fieldState.error}>
                      <InputLabel>عضو</InputLabel>
                      <Select
                        label='عضو'
                        {...field}
                        value={field.value != null ? String(field.value) : ''}
                        onChange={e => field.onChange(Number(e.target.value))}
                      >
                        {memberships.map((item: any) => (
                          <MenuItem key={item.id} value={String(item.id)}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid item md={4}>
                <Controller
                  name='staff_id'
                  control={control}
                  render={({ field, fieldState }) => (
                    <FormControl fullWidth error={!!fieldState.error}>
                      <InputLabel>کارمند</InputLabel>
                      <Select
                        label='کارمند'
                        {...field}
                        value={field.value != null ? String(field.value) : ''}
                        onChange={e => field.onChange(Number(e.target.value))}
                      >
                        {staffs.map((item: any) => (
                          <MenuItem key={item.id} value={String(item.id)}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid item md={4}>
                <CustomDatePicker label='زمان امانت' value={borrowedAt} onChange={date => setBorrowedAt(date)} />
              </Grid>

              <Grid item md={4}>
                <CustomDatePicker label='زمان موعد برگشت' value={dueDate} onChange={setDueDate} />
              </Grid>

              <Grid item md={4}>
                <CustomDatePicker label='زمان برگشت' value={returnedAt} onChange={setReturnedAt} />
              </Grid>

              <Grid item md={6}>
                <Controller
                  name='penalty'
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      fullWidth
                      label='مبلغ جریمه'
                      type='number'
                      {...field}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item md={6}>
                <Controller
                  name='borrowing_status'
                  control={control}
                  render={({ field, fieldState }) => (
                    <FormControl fullWidth error={!!fieldState.error}>
                      <InputLabel>وضعیت</InputLabel>
                      <Select
                        label='وضعیت'
                        {...field}
                        value={field.value != null ? String(field.value) : ''}
                        onChange={e => field.onChange(Number(e.target.value))}
                      >
                        {status.map((item: any) => (
                          <MenuItem key={item.id} value={String(item.id)}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid item md={12}>
                <Controller
                  name='description'
                  control={control}
                  render={({ field }) => <CkEditor value={field.value ?? ''} onChange={field.onChange} />}
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>

        <DialogActions sx={{ pb: { xs: 8, sm: 12.5 }, justifyContent: 'end' }}>
          <Button onClick={() => onClose()} color='error'>
            بازگشت
          </Button>
          <Button startIcon={<SaveIcon />} variant='contained' color='success' type='submit' disabled={isPending}>
            {isPending ? 'در حال ثبت...' : 'ثبت'}
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}
