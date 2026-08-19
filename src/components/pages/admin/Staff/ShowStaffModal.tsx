'use client'

import {
  Avatar,
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
  CircularProgress,
  Box,
  Button
} from '@mui/material'

import CloseIcon from '@mui/icons-material/Close'

import { getAvatarUrl } from '@/utils/getAvatarUrl'
import { useGetStaff } from '@/hooks/admin/staff/useStaff'

type Props = {
  open: boolean
  id: number | null
  onClose: () => void
}

export default function ShowStaffModal({ open, id, onClose }: Props) {
  const { data, isLoading, isError } = useGetStaff(id)

  console.log('member response', data)

  const staff = data?.data?.staff

  return (
    <Card>
      <Dialog fullWidth open={open} maxWidth='md' scroll='body' onClose={onClose}>
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 12, right: 12, zIndex: 1 }}>
          <CloseIcon />
        </IconButton>

        <DialogTitle>مشاهده کارمند</DialogTitle>

        <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 } }}>
          {isLoading && (
            <Box display='flex' justifyContent='center' py={10}>
              <CircularProgress />
            </Box>
          )}

          {isError && (
            <Typography color='error' textAlign='center'>
              خطا در دریافت اطلاعات کارمند
            </Typography>
          )}

          {staff && (
            <Grid container spacing={6}>
              <Grid item xs={12} display='flex' justifyContent='center'>
                <Avatar src={getAvatarUrl(staff.avatar)} sx={{ width: 96, height: 96 }} />
              </Grid>

              <Grid item md={3} xs={12}>
                <TextField
                  fullWidth
                  label='کد ملی'
                  value={staff.national_code ?? ''}
                  InputProps={{ readOnly: true }}
                  disabled
                />
              </Grid>

              <Grid item md={3} xs={12}>
                <TextField
                  fullWidth
                  label='نام'
                  value={staff.first_name ?? ''}
                  InputProps={{ readOnly: true }}
                  disabled
                />
              </Grid>

              <Grid item md={4} xs={12}>
                <TextField
                  fullWidth
                  label='نام خانوادگی'
                  value={staff.last_name ?? ''}
                  InputProps={{ readOnly: true }}
                  disabled
                />
              </Grid>

              <Grid item md={2} xs={12}>
                <TextField
                  fullWidth
                  label='جنسیت'
                  value={staff.gender?.name ?? ''}
                  InputProps={{ readOnly: true }}
                  disabled
                />
              </Grid>

              <Grid item md={4} xs={12}>
                <TextField
                  fullWidth
                  label='تاریخ استخدام'
                  value={staff.employment_date ?? ''}
                  InputProps={{ readOnly: true }}
                  disabled
                />
              </Grid>

              <Grid item md={8} xs={12}>
                <TextField
                  fullWidth
                  label='شماره پرسنلی'
                  value={staff.personnel_number ?? ''}
                  InputProps={{ readOnly: true }}
                  disabled
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label='موبایل'
                  value={staff.mobile ?? ''}
                  InputProps={{ readOnly: true }}
                  disabled
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label='کد پستی'
                  value={staff.postal_code ?? ''}
                  InputProps={{ readOnly: true }}
                  disabled
                />
              </Grid>

              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  label='نشانی'
                  value={staff.address ?? ''}
                  InputProps={{ readOnly: true }}
                  disabled
                />
              </Grid>

              <Grid item md={4} xs={12}>
                <TextField
                  fullWidth
                  label='وضعیت'
                  value={staff.status ? 'فعال' : 'غیرفعال'}
                  InputProps={{ readOnly: true }}
                  disabled
                />
              </Grid>

              <Grid item md={12}>
                <Button href='/admin/Staff' onClick={() => onClose()} color='error'>
                  بازگشت
                </Button>
              </Grid>
            </Grid>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  )
}
