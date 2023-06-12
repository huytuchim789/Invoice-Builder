import { TextField } from '@mui/material'
import { useFilterData } from '../../../component/filter'
import { ChangeEvent, useEffect, useState } from 'react'
import useDebounce from 'src/@core/hooks/useDebounce'

const SearchTab = () => {
  const { searchValue, handleChangeSearchParams } = useFilterData()

  const [value, setValue] = useState<string>('')
  const keyword = useDebounce(value, 2000)

  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  useEffect(() => {
    handleChangeSearchParams(keyword)
  }, [keyword])

  return (
    <TextField
      value={searchValue}
      fullWidth
      size='small'
      placeholder="Search customer'sname"
      onChange={handleChangeValue}
    />
  )
}

export default SearchTab
