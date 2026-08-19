'use client'

// React Imports
import React from 'react'

// MUI Imports
import MuiChip from '@mui/material/Chip'
import { styled } from '@mui/material'
import type { ChipProps } from '@mui/material/Chip'
import type { Theme } from '@mui/material/styles'

export type CustomChipProps = ChipProps & {
  round?: 'true' | 'false'
  skin?: 'filled' | 'light' | 'light-static'
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'
}

const Chip = styled(MuiChip)<CustomChipProps>(({ theme, skin, color, round }) => {
  return {
    ...(round === 'true' && {
      borderRadius: 500
    }),
    ...(skin === 'light' &&
      color && {
        backgroundColor: `var(--mui-palette-${color}-lightOpacity)`,
        color: `var(--mui-palette-${color}-main)`,
        '& .MuiChip-deleteIcon': {
          color: `var(--mui-palette-${color}-main)`
        }
      })
  }
})

const CustomChip = (props: CustomChipProps) => <Chip {...props} />

export default CustomChip
