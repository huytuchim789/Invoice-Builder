import { Button, Stack, TextField } from '@mui/material'

import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useState } from 'react'
import { useListInvoiceStore } from '../../store'
import useDebounce from 'src/@core/hooks/useDebounce'

export const ParamsTab = () => {
  const router = useRouter()
  const { setKeyword } = useListInvoiceStore((state: any) => state.searchTabStore)

  const [value, setValue] = useState<string>('')
  const keyword = useDebounce(value, 2000)

  useEffect(() => {
    setKeyword(keyword)
  }, [keyword])

  return (
    <Stack direction='row' alignItems='center' gap={3} justifyContent='flex-end'>
      <TextField
        size='small'
        placeholder='Search Invoice'
        onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
      />
      <Button variant='contained' onClick={() => router.push('/invoice/add')}>
        Create Invoice
      </Button>
    </Stack>
  )
}
