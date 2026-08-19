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

import { useGetMember } from '@/hooks/admin/membership/useMembership'
import { getAvatarUrl } from '@/utils/getAvatarUrl'

type Props = {
  open: boolean
  id: number | null
  onClose: () => void
}

export default function ShowMemberModal({ open, id, onClose }: Props) {
  const { data, isLoading, isError } = useGetMember(id)

  console.log('member response', data)

  const member = data?.data.membership

  return (
    <Card>
      <Dialog fullWidth open={open} maxWidth='md' scroll='body' onClose={onClose}>
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 12, right: 12, zIndex: 1 }}>
          <CloseIcon />
        </IconButton>

        <DialogTitle>مشاهده عضو</DialogTitle>

        <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 } }}>
          {isLoading && (
            <Box display='flex' justifyContent='center' py={10}>
              <CircularProgress />
            </Box>
          )}

          {isError && (
            <Typography color='error' textAlign='center'>
              خطا در دریافت اطلاعات عضو
            </Typography>
          )}

          {member && (
            <Grid container spacing={6}>
              <Grid item xs={12} display='flex' justifyContent='center'>
                <Avatar src={getAvatarUrl(member.avatar)} sx={{ width: 96, height: 96 }} />
              </Grid>

              <Grid item md={3} xs={12}>
                <TextField
                  fullWidth
                  label='کد ملی'
                  value={member.national_code ?? ''}
                  InputProps={{ readOnly: true }}
                  disabled
                />
              </Grid>

              <Grid item md={3} xs={12}>
                <TextField
                  fullWidth
                  label='نام'
                  value={member.first_name ?? ''}
                  InputProps={{ readOnly: true }}
                  disabled
                />
              </Grid>

              <Grid item md={4} xs={12}>
                <TextField
                  fullWidth
                  label='نام خانوادگی'
                  value={member.last_name ?? ''}
                  InputProps={{ readOnly: true }}
                  disabled
                />
              </Grid>

              <Grid item md={2} xs={12}>
                <TextField
                  fullWidth
                  label='جنسیت'
                  value={member.gender?.name ?? ''}
                  InputProps={{ readOnly: true }}
                  disabled
                />
              </Grid>

              <Grid item md={4} xs={12}>
                <TextField
                  fullWidth
                  label='تاریخ عضویت'
                  value={member.membership_date ?? ''}
                  InputProps={{ readOnly: true }}
                  disabled
                />
              </Grid>

              <Grid item md={4} xs={12}>
                <TextField
                  fullWidth
                  label='تاریخ انقضای عضویت'
                  value={member.membership_expire_date ?? ''}
                  InputProps={{ readOnly: true }}
                  disabled
                />
              </Grid>

              <Grid item md={4} xs={12}>
                <TextField fullWidth label='شغل' value={member.job ?? ''} InputProps={{ readOnly: true }} disabled />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label='موبایل'
                  value={member.mobile ?? ''}
                  InputProps={{ readOnly: true }}
                  disabled
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label='کد پستی'
                  value={member.postal_code ?? ''}
                  InputProps={{ readOnly: true }}
                  disabled
                />
              </Grid>

              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  label='نشانی'
                  value={member.address ?? ''}
                  InputProps={{ readOnly: true }}
                  disabled
                />
              </Grid>

              <Grid item md={4} xs={12}>
                <TextField
                  fullWidth
                  label='وضعیت'
                  value={member.status ? 'فعال' : 'غیرفعال'}
                  InputProps={{ readOnly: true }}
                  disabled
                />
              </Grid>

              <Grid item md={12}>
                <Button onClick={() => onClose()} color='error'>
                  انصراف
                </Button>
              </Grid>
            </Grid>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  )
}
