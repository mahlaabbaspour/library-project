'use client'

import {
  Box,
  Card,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import dayjs from 'dayjs'

import { useGetBorrowing } from '@/hooks/admin/borrowing/useBorrowing'
import CustomDatePicker from '@/components/elements/date_picker_text_filed'

type Props = {
  open: boolean
  id: number | null
  onClose: () => void
}

export default function ShowBorrowing({ open, id, onClose }: Props) {
  const { data, isLoading, isError } = useGetBorrowing(id)

  const borrowing = data?.data

  return (
    <Card>
      <Dialog fullWidth open={open} maxWidth='md' scroll='body' onClose={onClose}>
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 12, right: 12, zIndex: 1 }}>
          <CloseIcon />
        </IconButton>

        <DialogTitle>مشاهده امانت</DialogTitle>

        <DialogContent sx={{ pb: 6, mt: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 } }}>
          {isLoading && (
            <Box display='flex' justifyContent='center' py={10}>
              <CircularProgress />
            </Box>
          )}

          {isError && (
            <Typography color='error' textAlign='center'>
              خطا در دریافت اطلاعات امانت
            </Typography>
          )}

          {borrowing && (
            <Grid container spacing={6}>
              <Grid item xs={12} />

              <Grid item md={4}>
                <TextField
                  fullWidth
                  label='کتاب'
                  value={borrowing.books?.map(books => books.name).join('، ') ?? ''}
                  InputProps={{ readOnly: true }}
                  disabled
                />
              </Grid>

              <Grid item md={4}>
                <TextField
                  fullWidth
                  label='عضو'
                  value={borrowing.membership?.name ?? ''}
                  InputProps={{ readOnly: true }}
                  disabled
                />
              </Grid>

              <Grid item md={4}>
                <TextField
                  fullWidth
                  label='کارمند'
                  value={borrowing.staff?.name ?? ''}
                  InputProps={{ readOnly: true }}
                  disabled
                />
              </Grid>

              <Grid item md={4}>
                <CustomDatePicker
                  onChange={() => {}}
                  label='زمان امانت'
                  value={borrowing.borrowed_at ? dayjs(borrowing.borrowed_at) : null}
                  disabled
                />
              </Grid>

              <Grid item md={4}>
                <CustomDatePicker
                  onChange={() => {}}
                  label='زمان موعد برگشت'
                  value={borrowing.due_date ? dayjs(borrowing.due_date) : null}
                  disabled
                />
              </Grid>

              <Grid item md={4}>
                <CustomDatePicker
                  onChange={() => {}}
                  label='زمان برگشت'
                  value={borrowing.returned_at ? dayjs(borrowing.returned_at) : null}
                  disabled
                />
              </Grid>

              <Grid item md={6}>
                <TextField
                  fullWidth
                  label='مبلغ جریمه'
                  value={borrowing.penalty ?? ''}
                  InputProps={{ readOnly: true }}
                  disabled
                />
              </Grid>

              <Grid item md={6}>
                <TextField
                  fullWidth
                  label='وضعیت'
                  value={borrowing.status?.name ?? ''}
                  InputProps={{ readOnly: true }}
                  disabled
                />
              </Grid>

              <Grid item md={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={5}
                  value={(borrowing.description ?? '').replace(/<[^>]*>/g, '')}
                  InputProps={{ readOnly: true }}
                  disabled
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  )
}
