import { Box } from '@mui/material'
import SearchTab from './search-tab'
import TableHeaderButtons from './buttons'

const FilterHeaderTable = () => {
  return (
    <Box display='flex' gap={5} alignContent='center' padding={3}>
      <Box flex={1}>
        <SearchTab />
      </Box>
      <TableHeaderButtons />
    </Box>
  )
}

export default FilterHeaderTable
