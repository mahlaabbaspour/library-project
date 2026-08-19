export function getAvatarUrl(path: string | null | undefined): string | undefined {
  if (!path) return undefined

  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }

  const backendOrigin = (process.env.NEXT_PUBLIC_BASE_API_URL ?? '').replace(/\/api\/?$/, '')

  return `${backendOrigin}${path.startsWith('/') ? path : `/${path}`}`
}
