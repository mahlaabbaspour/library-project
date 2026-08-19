'use client'
import { useRef } from 'react'

import { Avatar, Badge, IconButton, Box } from '@mui/material'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'

type Props = {
  previewUrl: string | null
  onChange: (file: File | null) => void
}

export default function AvatarUploadField({ previewUrl, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null

    onChange(file)
  }

  return (
    <Box display='flex' justifyContent='center' mb={2}>
      <Badge
        overlap='circular'
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={
          <IconButton
            size='small'
            sx={{ bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' } }}
            onClick={() => inputRef.current?.click()}
          >
            <PhotoCameraIcon fontSize='small' />
          </IconButton>
        }
      >
        <Avatar src={previewUrl ?? undefined} sx={{ width: 96, height: 96 }} />
      </Badge>

      <input ref={inputRef} type='file' accept='image/*' hidden onChange={handleFileChange} />
    </Box>
  )
}
