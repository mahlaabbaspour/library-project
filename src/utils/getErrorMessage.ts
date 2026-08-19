import { AxiosError } from 'axios'

export function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data

    if (data?.errors) {
      const firstField = Object.keys(data.errors)[0]
      const firstMessage = data.errors[firstField]?.[0]

      if (firstMessage) return firstMessage
    }

    if (data?.message) return data.message

    if (error.response?.status === 401) return 'دسترسی غیرمجاز'
    if (error.response?.status === 404) return 'یافت نشد'
    if (error.response?.status === 500) return 'خطای سرور، لطفاً بعداً تلاش کنید'
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'خطای ناشناخته رخ داد'
}
