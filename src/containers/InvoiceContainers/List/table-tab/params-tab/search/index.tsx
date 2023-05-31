import { ChangeEvent, useEffect, useState } from 'react'
import { TextField } from '@mui/material'
import useDebounce from 'src/@core/hooks/useDebounce'
import { useListInvoiceStore } from '../../../store'

export const SearchInvoice = () => {
  const { setKeyword } = useListInvoiceStore((state: any) => state.searchTabStore)
  const [value, setValue] = useState<string>('')
  const keyword = useDebounce(value, 2000)

  useEffect(() => {
    setKeyword(keyword)
  }, [keyword])

  return (
    <TextField
      size='small'
      placeholder='Search Invoice'
      onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
    />
  )
}
