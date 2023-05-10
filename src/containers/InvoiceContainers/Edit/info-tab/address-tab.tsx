import { Typography, Box } from '@mui/material'

export const AddressTab = () => {
  return (
    <>
      <Typography variant='h6'>Invoice</Typography>
      <Box marginTop={4}>
        <Typography fontSize={12} color={'#808080'}>
          Office 149, 450 South Brand Brooklyn
          <br />
          San Diego County, CA 91905, USA
          <br />
          +1 (123) 456 7891, +44 (876) 543 2198
        </Typography>
      </Box>
    </>
  )
}
