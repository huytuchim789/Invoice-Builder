import { useContext } from 'react'
import { InvoiceEditContext } from '..'
import { LoadingButton } from '@mui/lab'

export const SaveButton = () => {
  const { isSaveInvoiceLoading } = useContext(InvoiceEditContext) as any
  return (
    <LoadingButton loading={isSaveInvoiceLoading} type='submit' fullWidth variant='outlined'>
      Save
    </LoadingButton>
  )
}
