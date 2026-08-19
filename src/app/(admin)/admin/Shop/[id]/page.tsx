import ShowBook from '@/components/pages/admin/ShowBook/ShowBook'

export default function ShowBookInfo({ params }: { params: { id: string } }) {
  return <ShowBook id={Number(params.id)} />
}
