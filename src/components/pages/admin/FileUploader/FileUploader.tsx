import { useState } from 'react'

import type { SyntheticEvent } from 'react'

import type { TypographyProps } from '@mui/material'

import { Box, styled, Typography } from '@mui/material'

import { useDropzone } from 'react-dropzone'

import Link from '@/components/Link'

interface FileProp {
  name: string
  type: string
  size: number
}

type FileUploaderProps = {
  accept: {
    [key: string]: string[]
  }
  onChange?: (file: File) => void
  defaultImage?: string
  defaultFile?: string
  disabled?: boolean
}

const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    marginRight: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  },
  [theme.breakpoints.down('sm')]: {
    width: 250
  }
}))

const HeadingTypography = styled(Typography)<TypographyProps>(({ theme }) => ({
  marginBottom: theme.spacing(5),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(4)
  }
}))

export default function FileUploader({ accept, onChange, defaultImage, disabled, defaultFile }: FileUploaderProps) {
  const [files, setFiles] = useState<File[]>([])

  const { getRootProps, getInputProps } = useDropzone({
    disabled,
    multiple: false,
    accept,
    onDrop: (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]

      setFiles([file])

      if (onChange) {
        onChange(file)
      }
    }
  })

  const handleLinkClick = (event: SyntheticEvent) => {
    event.preventDefault()
  }

  const img = files.map((file: FileProp) => (
    <img
      key={file.name}
      alt={file.name}
      src={URL.createObjectURL(file as any)}
      style={{
        width: 180,
        height: 220,
        objectFit: 'cover',
        borderRadius: 8
      }}
    />
  ))

  return (
    <Box
      {...getRootProps({ className: 'dropzone' })}
      sx={
        files.length
          ? {
              height: 220,
              width: 220,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }
          : {}
      }
    >
      <input {...getInputProps()} />
      {files.length ? (
        img
      ) : defaultImage ? (
        <img
          src={defaultImage}
          alt='book'
          style={{
            width: 180,
            height: 220,
            objectFit: 'cover',
            borderRadius: 8
          }}
        />
      ) : defaultFile ? (
        <Box sx={{ textAlign: 'center' }}>
          <Typography sx={{ mb: 2 }}>{defaultFile.split('/').pop()}</Typography>

          <Link href={defaultFile} target='_blank'>
            مشاهده فایل
          </Link>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'], alignItems: 'center' }}>
          <Img width={150} alt='Upload img' src='/images/misc/upload.png' />
          <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: ['center', 'center', 'inherit'] }}>
            <HeadingTypography variant='h5'>برای آپلود فایل بکشید یا کلیک کنید</HeadingTypography>
            <Typography color='textSecondary'>
              فایل را بکشید یا کلیک کنید
              <Link href='/' onClick={handleLinkClick}>
                انتخاب کنید
              </Link>
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  )
}
