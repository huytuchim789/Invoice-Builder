import { TextField } from '@mui/material'
import { ChangeEvent, useContext, useEffect, useState } from 'react'
import useDebounce from 'src/@core/hooks/useDebounce'
import { useRouter } from 'next/router'
import { ItemListContext } from '../..'

const SearchTab = () => {
  const router = useRouter()
  const { setKeyword } = useContext(ItemListContext) as { setKeyword: (keyword: string) => void }
  const [value, setValue] = useState<string>('')
  const keywordDebounce = useDebounce(value, 1500)

  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    setTimeout(() => {
      router.push({
        pathname: '/item/list',
        query: {
          ...router.query,
          keyword: event.target.value,
          page: 1
        }
      })
    }, 1500)
  }

  useEffect(() => {
    setKeyword(keywordDebounce as string)
  }, [keywordDebounce])

  return (
    <TextField value={value} fullWidth size='small' placeholder="Search customer'sname" onChange={handleChangeValue} />
  )
}

export default SearchTab
