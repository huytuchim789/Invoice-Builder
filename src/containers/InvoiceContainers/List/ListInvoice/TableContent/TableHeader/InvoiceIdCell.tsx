import { Link } from '@mui/material'
import { useRouter } from 'next/router'

const InvoiceIdCell = ({ params }: any) => {
  const router = useRouter()

  return (
    <Link href={`/invoice/preview/${params.invoice_id}?page=${router.query.page ?? 1}`}>{params.invoice?.code}</Link>
  )
}

export default InvoiceIdCell
