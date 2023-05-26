import { Button } from '@mui/material'
import { useRouter } from 'next/router'

export const CreateInvoice = () => {
  const router = useRouter()

  return (
    <Button variant='contained' onClick={() => router.push('/invoice/add')}>
      Create Invoice
    </Button>
  )
}
