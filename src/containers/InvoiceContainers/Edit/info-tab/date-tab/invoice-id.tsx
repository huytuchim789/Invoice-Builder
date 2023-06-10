import { Typography } from '@mui/material'

import { useInvoiceEditStore } from '../../store'

const InvoiceID = () => {
  const { invoiceId } = useInvoiceEditStore((state: any) => state.invoiceIdStore)

  return <Typography>{invoiceId}</Typography>
}

export default InvoiceID
