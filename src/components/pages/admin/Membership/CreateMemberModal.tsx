'use client'
import { useState } from 'react'

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

import CloseIcon from '@mui/icons-material/Close'
import { SaveIcon } from 'lucide-react'

import { Controller, useForm } from 'react-hook-form'

import type { Dayjs } from 'dayjs'

import dayjs from 'dayjs'

import CustomDatePicker from '@/components/elements/date_picker_text_filed'
import AvatarUploadField from '@/components/elements/AvatarUploadField'
import { useCreateMember } from '@/hooks/admin/membership/useMembership'
import SwitchesBasic from '@/components/elements/SwitchBasic'

type Props = {
  open: boolean
  onClose: () => void
}

type FormValue = {
  national_code: number | null
  first_name: string
  last_name: string
  gender_id: number | null
  address: string
  mobile: number | null
  postal_code: string
  job: string
  status: number
}

const GENDERS = [
  { id: 1, name: 'مرد' },
  { id: 2, name: 'زن' }
]

export default function CreateMemberModal({ open, onClose }: Props) {
  const [dateTime, setDateTime] = useState<Dayjs | null>(dayjs())
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const { mutateAsync: createMember, isPending } = useCreateMember()

  const handleAvatarChange = (file: File | null) => {
    setAvatarFile(file)
    setAvatarPreview(file ? URL.createObjectURL(file) : null)
  }

  const { control, reset, handleSubmit, setError } = useForm<FormValue>({
    defaultValues: {
      national_code: null,
      first_name: '',
      last_name: '',
      gender_id: null,
      address: '',
      mobile: null,
      postal_code: '',
      job: '',
      status: 1
    }
  })

  const onSubmit = async (values: FormValue) => {
    try {
      const formData = new FormData()

      Object.entries(values).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, String(value))
        }
      })

      if (dateTime) {
        formData.append('membership_date', dateTime.toDate().toISOString())
      }

      if (avatarFile) {
        formData.append('avatar', avatarFile)
      }

      await createMember({ payload: formData })
      reset()
      setAvatarFile(null)
      setAvatarPreview(null)
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
        open={open}
        maxWidth='md'
        scroll='body'
        onClose={() => onClose()}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit(onSubmit)
        }}
      >
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 12, right: 12, zIndex: 1 }}>
          <CloseIcon />
        </IconButton>

        <DialogTitle>ایجاد عضو جدید</DialogTitle>

        <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <Grid container spacing={6}>
            <Grid item md={12}>
              <AvatarUploadField previewUrl={avatarPreview} onChange={handleAvatarChange} />
            </Grid>

            <Grid item md={3}>
              <Controller
                name='national_code'
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    fullWidth
                    label='کد ملی'
                    type='number'
                    {...field}
                    value={field.value ?? ''}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>

            <Grid item md={3}>
              <Controller
                name='first_name'
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    fullWidth
                    label='نام'
                    type='text'
                    {...field}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>

            <Grid item md={4}>
              <Controller
                name='last_name'
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    fullWidth
                    label='نام خانوادگی'
                    type='text'
                    {...field}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>

            <Grid item md={2}>
              <Controller
                name='gender_id'
                control={control}
                render={({ field, fieldState }) => (
                  <FormControl fullWidth error={!!fieldState.error}>
                    <InputLabel>جنسیت</InputLabel>
                    <Select
                      label='جنسیت'
                      {...field}
                      value={field.value ?? ''}
                      onChange={e => field.onChange(Number(e.target.value))}
                    >
                      {GENDERS.map(gender => (
                        <MenuItem key={gender.id} value={gender.id}>
                          {gender.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item md={4}>
              <CustomDatePicker label='تاریخ عضویت' value={dateTime} onChange={setDateTime} />{' '}
            </Grid>

            <Grid item md={8}>
              <Controller
                name='job'
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    fullWidth
                    label='شغل'
                    type='text'
                    {...field}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>

            <Grid item md={6}>
              <Controller
                name='mobile'
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    fullWidth
                    label='موبایل'
                    type='number'
                    {...field}
                    value={field.value ?? ''}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>

            <Grid item md={6}>
              <Controller
                name='postal_code'
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    fullWidth
                    label='کد پستی'
                    type='text'
                    {...field}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>

            <Grid item md={12}>
              <Controller
                name='address'
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    fullWidth
                    label='نشانی'
                    type='text'
                    {...field}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item md={12}>
              <Controller
                name='status'
                control={control}
                render={({ field }) => (
                  <SwitchesBasic
                    checked={field.value === 1}
                    onChange={(value: boolean) => field.onChange(value ? 1 : 0)}
                  />
                )}
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
