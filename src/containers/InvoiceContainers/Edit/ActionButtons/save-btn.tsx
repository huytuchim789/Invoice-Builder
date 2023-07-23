import { useContext } from 'react'
import { InvoiceAddContext } from '..'
import { LoadingButton } from '@mui/lab'

export const SaveButton = () => {
  const { isSaveInvoiceLoading } = useContext(InvoiceAddContext) as any
  return (
    <LoadingButton loading={isSaveInvoiceLoading} type='submit' fullWidth variant='outlined'>
      Save
    </LoadingButton>
  )
}
