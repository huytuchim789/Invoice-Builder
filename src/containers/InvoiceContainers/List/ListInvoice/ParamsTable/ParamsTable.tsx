import { ChangeEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { LoadingButton } from '@mui/lab'
import { Box, Button, Stack, Switch, TextField, Typography } from '@mui/material'

import { useSearchInvoiceStore } from '../store'

import useDebounce from 'src/@core/hooks/useDebounce'
import { useSnackbarWithContext } from 'src/@core/common/snackbar'
import { useTableMutilCheckStore } from 'src/@core/components/TableCommon/store'

import { sendMultipleInvoiceByMail } from 'src/@core/utils/api/invoice/sendInvoiceByMail'
import { QUERY_INVOICE_KEYS } from 'src/@core/utils/keys/invoice'
import { useConfirm } from 'material-ui-confirm'
import { payInvoices } from 'src/@core/utils/api/payment'
import { useInvoiceTotalSum } from 'src/@core/hooks/invoice/useInvoiceData'

const ParamsTable = () => {
  const router = useRouter()
  const snackbar = useSnackbarWithContext()
  const queryClient = useQueryClient()
  const confirm = useConfirm()

  const { checkedSelected, setCheckedSelectedAll } = useTableMutilCheckStore()
  const { setKeyword, isPaymentMode, setIsPaymentMode } = useSearchInvoiceStore()
  const { data } = useInvoiceTotalSum(checkedSelected, isPaymentMode)

  const [value, setValue] = useState<string>('')
  const keyword = useDebounce(value, 2000)
  useEffect(() => {
    setCheckedSelectedAll([])
  }, [isPaymentMode])

  useEffect(() => {
    setKeyword(keyword)
    router.push({
      pathname: '/invoice/list',
      query: {
        ...router.query,
        keyword: keyword
      }
    })
  }, [keyword])

  const sendEmails = async (): Promise<any> => {
    return await sendMultipleInvoiceByMail({
      emailtransaction_ids: checkedSelected
    })
  }
  const payInvoicesApi = async (): Promise<any> => {
    return await payInvoices(checkedSelected)
  }
  const handleChangeEdit = (e: { target: { checked: boolean | ((prevState: boolean) => boolean) } }) => {
    setIsPaymentMode(e.target.checked as boolean)
  }
  const { mutate, isLoading: isSendLoading } = useMutation({
    mutationFn: (): Promise<any> => sendEmails(),
    onSuccess: (data: { data: { message: string } }) => {
      queryClient.invalidateQueries([QUERY_INVOICE_KEYS.EMAIL_TRANSACTION])

      snackbar.success(data.data.message)
    },
    onError: (err: { response: { data: { message: string } } }) => {
      const { response } = err

      snackbar.error(response.data.message)
    }
  })

  const { mutate: mutatePayInvoice, isSuccess: isPayInvoice } = useMutation({
    mutationFn: (): Promise<any> => payInvoicesApi(),
    onSuccess: (data: { data: { message: string } }) => {
      snackbar.success(data.data.message)
    },
    onError: (err: { response: { data: { message: string } } }) => {
      const { response } = err
      snackbar.error(response.data.message)
    }
  })
  return (
    <Stack direction='row' alignItems='center' justifyContent='space-between'>
      <Box display='flex' gap={3} alignItems='center'>
        <Typography>Payment Mode</Typography>
        <Switch onChange={handleChangeEdit} defaultChecked={isPaymentMode} />
      </Box>
      <Stack direction='row' alignItems='center' gap={3} justifyContent='flex-end'>
        <TextField
          size='small'
          placeholder='Search Invoice'
          onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        />
        {isPaymentMode ? (
          <LoadingButton
            loading={isSendLoading}
            variant='contained'
            onClick={() => {
              confirm({
                description: (
                  <Box>
                    Confirm payment for {`${checkedSelected.length}`} invoices with
                    <Typography component={'span'} fontWeight={'500'}>{` ${data?.toFixed(2) || 0} `}</Typography>$
                  </Box>
                )
              })
                .then(() => {
                  mutatePayInvoice()
                })
                .catch(() => console.log('Deletion cancelled.'))
            }}
            disabled={checkedSelected.length === 0}
          >
            Pay Invoice
          </LoadingButton>
        ) : (
          <LoadingButton
            loading={isSendLoading}
            variant='contained'
            onClick={() => mutate()}
            disabled={checkedSelected.length === 0}
          >
            Send Invoice
          </LoadingButton>
        )}
        <Button variant='contained' onClick={() => router.push('/invoice/add')}>
          Create Invoice
        </Button>
      </Stack>
    </Stack>
  )
}

export default ParamsTable
