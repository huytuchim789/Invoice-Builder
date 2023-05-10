import { TextField, Box, Typography } from '@mui/material'

export const CostCell = () => {
  return (
    <>
      <TextField sx={{ width: '150px' }} type='number' size='small' variant='outlined' />
      <Box mt={2}>
        <Typography fontSize={12} color={'#808080'}>
          Discount:
        </Typography>
        <Typography fontSize={12} color={'#808080'}>
          0% 0% 0%
        </Typography>
      </Box>
    </>
  )
}
