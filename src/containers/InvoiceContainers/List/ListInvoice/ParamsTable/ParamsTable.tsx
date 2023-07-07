import { ChangeEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { LoadingButton } from '@mui/lab'
import { Button, Menu, MenuItem, Stack, TextField } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

import { useSearchInvoiceStore } from '../store'

import useDebounce from 'src/@core/hooks/useDebounce'
import { useSnackbarWithContext } from 'src/@core/common/snackbar'
import { useTableMutilCheckStore } from 'src/@core/components/TableCommon/store'

import { sendInvoiceByMail } from 'src/@core/utils/api/invoice/sendInvoiceByMail'
import { QUERY_INVOICE_KEYS } from 'src/@core/utils/keys/invoice'

interface IMenuItem {
  name: string
  value: 'web' | 'mail'
}

const sendingMethod: IMenuItem[] = [
  {
    name: 'Web Sending',
    value: 'web'
  },
  {
    name: 'Mail Sending',
    value: 'mail'
  }
]

const ParamsTable = () => {
  const router = useRouter()
  const snackbar = useSnackbarWithContext()
  const queryClient = useQueryClient()

  const { checkedSelected } = useTableMutilCheckStore()
  const { setKeyword } = useSearchInvoiceStore()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [value, setValue] = useState<string>('')

  const open = Boolean(anchorEl)
  const keyword = useDebounce(value, 2000)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

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

  const handleUploadPdf = async (method: 'web' | 'mail'): Promise<any> => {
    const selectedData = checkedSelected.map(item => JSON.parse(item)?.invoice_id)
    return await sendInvoiceByMail(
      {
        invoice_ids: selectedData,
        send_method: method,
        subject: 'a',
        message: 'nbnb'
      },
      Number(router.query.page || '1')
    )
  }

  const { mutate, isLoading: isSendLoading } = useMutation({
    mutationFn: (method: 'web' | 'mail'): Promise<any> => handleUploadPdf(method),
    onSuccess: (data: { data: { message: string } }) => {
      queryClient.invalidateQueries([QUERY_INVOICE_KEYS.EMAIL_TRANSACTION])

      snackbar.success(data.data.message)
    },
    onError: (err: { response: { data: { message: string } } }) => {
      const { response } = err

      snackbar.error(response.data.message)
    }
  })

  return (
    <Stack direction='row' alignItems='center' gap={3} justifyContent='flex-end'>
      <TextField
        size='small'
        placeholder='Search Invoice'
        onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
      />
      <LoadingButton
        id='basic-button'
        variant='outlined'
        aria-haspopup='true'
        loading={isSendLoading}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        disabled={checkedSelected.length === 0}
        endIcon={<ArrowDropDownIcon />}
        onClick={handleClick}
      >
        Sending
      </LoadingButton>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        {sendingMethod.map((method: IMenuItem) => {
          return (
            <MenuItem key={method.value} onClick={() => mutate(method.value)}>
              {method.name}
            </MenuItem>
          )
        })}
      </Menu>
      <Button variant='contained' onClick={() => router.push('/invoice/add')}>
        Create Invoice
      </Button>
    </Stack>
  )
}

export default ParamsTable
