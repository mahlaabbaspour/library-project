'use client'

import { useEffect } from 'react'

import {
  Button,
  Card,
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
import { SaveIcon } from 'lucide-react'
import moment from 'moment-jalaali'

import CloseIcon from '@mui/icons-material/Close'
import { Controller, useForm } from 'react-hook-form'

import CkEditor from '../CKEditor/CkEditor'
import { useBorrowingUpsertData, useCreateBorrowing } from '@/hooks/admin/borrowing/useBorrowing'
import MultiSelect from '../MultiSelect/MultiSelect'

type Props = {
  open: boolean
  onClose: () => void
}

type FormValue = {
  book_ids: string[]
  membership_id: number | null
  staff_id: number | null
  description: string
  due_date: string
}

export default function CreateBorrowing({ open, onClose }: Props) {
  const { mutateAsync: createBorrowing, isPending } = useCreateBorrowing()
  const { data: upsertData } = useBorrowingUpsertData()

  const books = upsertData?.data?.books ?? []
  const memberships = upsertData?.data?.memberships ?? []
  const staffs = upsertData?.data?.staffs ?? []

  console.log('data', upsertData)

  const { control, reset, handleSubmit, setError } = useForm<FormValue>({
    defaultValues: {
      book_ids: [],
      membership_id: null,
      staff_id: null,
      description: '',
      due_date: ''
    }
  })

  useEffect(() => {
    if (open) {
      const dueDate = moment().add(7, 'days').format('jYYYY/jMM/jDD')

      reset({
        book_ids: [],
        membership_id: null,
        staff_id: null,
        description: '',
        due_date: dueDate
      })
    }
  }, [open, reset])

  const onSubmit = async (values: FormValue) => {
    try {
      const formData = new FormData()

      Object.entries(values).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach(item => {
            formData.append(`${key}[]`, item)
          })
        } else if (value !== null && value !== undefined) {
          formData.append(key, value)
        }
      })
      await createBorrowing({ payload: formData })
      reset()
      onClose()
    } catch (error: any) {
      const errors = error?.response?.data?.errors

      if (errors) {
        Object.keys(errors).forEach((field: any) => {
          setError(field as keyof FormValue, {
            type: 'server',
            message: errors[field][0]
          })
        })
      }
    }
  }

  return (
    <Card>
      <Dialog
        fullWidth
        scroll='body'
        maxWidth='md'
        open={open}
        onClose={onClose}
        PaperProps={{ component: 'form', onSubmit: handleSubmit(onSubmit) }}
      >
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 12, right: 12, zIndex: 1 }}>
          <CloseIcon />
        </IconButton>

        <DialogTitle>ایجاد امانت جدید</DialogTitle>

        <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <Grid container spacing={6}>
            <Grid item md={12}>
              <Controller
                name='book_ids'
                control={control}
                render={({ field, fieldState }) => (
                  <FormControl fullWidth>
                    <MultiSelect
                      label='کتاب‌ها'
                      value={field.value}
                      options={books}
                      onChange={field.onChange}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  </FormControl>
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
                      value={field.value ?? ''}
                      onChange={e => field.onChange(Number(e.target.value))}
                    >
                      {memberships.map(item => (
                        <MenuItem key={item.id} value={item.id}>
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
                      value={field.value ?? ''}
                      onChange={e => field.onChange(Number(e.target.value))}
                    >
                      {staffs.map(item => (
                        <MenuItem key={item.id} value={item.id}>
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
                name='due_date'
                control={control}
                render={({ field }) => <TextField {...field} fullWidth disabled label='زمان موعد برگشت' />}
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
