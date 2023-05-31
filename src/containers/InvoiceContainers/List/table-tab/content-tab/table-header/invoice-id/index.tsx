import { Link } from '@mui/material'
import { useRouter } from 'next/router'

export const InvoiceIdTab = ({ params }: any) => {
  const router = useRouter()

  return (
    <Link href={`/invoice/preview/${params.row.invoice_id}?page=${router.query.page ?? 0}`}>
      {params.row.invoice_id}
    </Link>
  )
}
