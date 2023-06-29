import { Typography } from '@mui/material'
import GridComponent from '../atoms/GridComponent'
import { useInvoiceIdStore } from './store'

const InvoiceIdInfo = () => {
  const { invoiceId } = useInvoiceIdStore()

  return <GridComponent content='Invoice ID' component={<Typography>{invoiceId}</Typography>} />
}

export default InvoiceIdInfo
