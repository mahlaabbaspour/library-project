'use client'

import Image from 'next/image'

import styles from './Book3D.module.css'

export interface Book3DProps {
  image: string
  title?: string
  width?: number
  height?: number
}

export default function Book3D({ image, title = 'Book Cover', width = 280, height = 420 }: Book3DProps) {
  return (
    <div
      className={styles.scene}
      style={
        {
          '--book-width': `${width}px`,
          '--book-height': `${height}px`
        } as React.CSSProperties
      }
    >
      <div className={styles.book}>
        {/* صفحات بالا */}
        <div className={styles.topPages}></div>

        {/* صفحات کنار */}
        <div className={styles.sidePages}></div>

        {/* عطف کتاب */}
        <div className={styles.spine}></div>

        {/* جلد */}
        <div className={styles.cover}>
          <Image
            src={image}
            alt={title}
            fill
            priority
            className={styles.coverImage}
            sizes='(max-width:765px) 220px, 280px'
          />
        </div>

        {/* سایه زیر کتاب */}
        <div className={styles.shadow}></div>
      </div>
    </div>
  )
}
