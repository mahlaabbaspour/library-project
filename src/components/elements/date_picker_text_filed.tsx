'use client'

import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import jalaliday from 'jalaliday'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

dayjs.extend(jalaliday)

export default function CustomDatePicker({
  label,
  onChange,
  error = false,
  helperText,
  value,
  minDate,
  maxDate,
  readOnly,
  disabled
}: {
  label: string
  error?: boolean
  onChange: (value: Dayjs | null) => void
  value?: Dayjs | null
  minDate?: Dayjs | Date
  maxDate?: Dayjs | Date
  readOnly?: boolean
  helperText?: string
  disabled?: boolean
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='fa'>
      <DatePicker
        label={label}
        value={value}
        onChange={date => onChange(date)}
        minDate={minDate}
        maxDate={maxDate}
        readOnly={readOnly}
        disabled={disabled ?? false}
        format='YYYY/MM/DD'
        slotProps={{
          textField: {
            fullWidth: true,
            error,
            helperText
          }
        }}
      />
    </LocalizationProvider>
  )
}
