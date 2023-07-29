import { InputAdornment, Button } from '@mui/material'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import { useRouter } from 'next/router'
import { useQueryClient } from '@tanstack/react-query'
import { QUERY_INVOICE_KEYS } from 'src/@core/utils/keys/invoice'
import { markAsPaid } from 'src/@core/utils/api/invoice/markAsPaid'
import { useSnackbarWithContext } from 'src/@core/common/snackbar'

export const AddPaymentButton = () => {
  const queryClient = useQueryClient()
  const snackbar = useSnackbarWithContext()

  const { query } = useRouter()
  const router = useRouter()
  const invoiceData = queryClient.getQueryData([QUERY_INVOICE_KEYS.INVOICE_DETAIL, query?.id]) as any
  const payInvoice = async () => {
    try {
      if (!query?.id) return
      const response = await markAsPaid(query?.id as string)
      console.log(response.data.data)

      queryClient.invalidateQueries([QUERY_INVOICE_KEYS.INVOICE_DETAIL, query?.id])
      queryClient.setQueryData([QUERY_INVOICE_KEYS.INVOICE_DETAIL, query?.id], (previousItem: any | undefined) =>
        response?.data?.data ? response?.data?.data : previousItem
      )
    } catch (error: any) {
      snackbar.error(error.message)
      console.error(error)
    }
  }
  return !invoiceData.is_paid ? (
    <Button
      fullWidth
      variant='contained'
      color='warning'
      onClick={payInvoice}
      startIcon={
        <InputAdornment position='start'>
          <AttachMoneyIcon style={{ color: '#FFF' }} />
        </InputAdornment>
      }
    >
      Mark as Unpaid
    </Button>
  ) : (
    <Button
      fullWidth
      variant='contained'
      color='success'
      onClick={payInvoice}
      startIcon={
        <InputAdornment position='start'>
          <AttachMoneyIcon style={{ color: '#FFF' }} />
        </InputAdornment>
      }
    >
      Mark as paid
    </Button>
  )
}
