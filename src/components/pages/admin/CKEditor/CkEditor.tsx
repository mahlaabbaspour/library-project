'use client'

import {
  ClassicEditor,
  Essentials,
  Paragraph,
  Bold,
  Italic,
  Heading,
  List,
  Link,
  Table,
  Image,
  ImageToolbar,
  ImageUpload,
  Underline,
  Strikethrough,
  BlockQuote,
  TableToolbar,
  Indent
} from 'ckeditor5'
import { CKEditor } from '@ckeditor/ckeditor5-react'

import 'ckeditor5/ckeditor5.css'
import { GlobalStyles } from '@mui/material'

type Props = {
  value: string
  onChange: (value: string) => void
}

export default function CkEditor({ value, onChange }: Props) {
  return (
    <>
      <GlobalStyles
        styles={{
          '.ck-editor__editable': {
            minHeight: 300,
            direction: 'rtl',
            textAlign: 'right'
          },
          '.ck.ck-content': {
            direction: 'rtl',
            textAlign: 'right'
          }
        }}
      />

      <CKEditor
        editor={ClassicEditor}
        data={value}
        onChange={(event, editor) => {
          onChange(editor.getData())
        }}
        config={{
          licenseKey: 'GPL',
          language: 'fa',
          plugins: [
            Essentials,
            Paragraph,
            Heading,
            Bold,
            Italic,
            Underline,
            Strikethrough,
            List,
            Link,
            BlockQuote,
            Table,
            TableToolbar,
            Indent,
            Image,
            ImageToolbar,
            ImageUpload
          ],
          toolbar: [
            'undo',
            'redo',
            '|',
            'heading',
            '|',
            'bold',
            'italic',
            'underline',
            'strikethrough',
            '|',
            'bulletedList',
            'numberedList',
            '|',
            'outdent',
            'indent',
            '|',
            'link',
            'insertTable',
            'blockQuote',
            '|',
            'imageUpload'
          ],
          placeholder: 'توضیحات کتاب را وارد کنید...'
        }}
      />
    </>
  )
}
