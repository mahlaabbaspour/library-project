export const getImageUrl = (path?: string | null): string => {
  if (!path) return '/images/placeholder-book.png'

  if (path.startsWith('http')) {
    return path
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/api\/?$/, '')

  return `${baseUrl}/storage/${path}`
}
