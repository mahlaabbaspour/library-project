import { Box, Chip, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'

type Option = {
  id: string | number
  name: string
}

type MultiSelectProps = {
  label: string
  value: (string | number)[]
  options: Option[]
  onChange: (value: (string | number)[]) => void
  error?: boolean
  helperText?: string
}

export default function MultiSelect({ label, value, options, onChange, error, helperText }: MultiSelectProps) {
  const labelId = `${label}-label`
  const stringValue = value.map(String)

  return (
    <FormControl fullWidth error={error}>
      <InputLabel id={labelId}>{label}</InputLabel>

      <Select
        labelId={labelId}
        multiple
        value={stringValue}
        onChange={e => {
          const raw = e.target.value
          const arr = typeof raw === 'string' ? raw.split(',') : raw

          onChange(arr.map(Number))
        }}
        label={label}
        renderValue={selected => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {(selected as string[]).map(id => {
              const option = options.find(o => String(o.id) === id)

              return option ? (
                <Chip
                  key={id}
                  label={option.name}
                  onDelete={() => {
                    onChange(value.filter(v => String(v) !== id))
                  }}
                  onMouseDown={e => {
                    e.stopPropagation()
                  }}
                />
              ) : null
            })}
          </Box>
        )}
      >
        {options.map(option => (
          <MenuItem key={option.id} value={String(option.id)}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  )
}
