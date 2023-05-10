import { Box, Typography, TextField } from '@mui/material'

export const SalePerson = () => {
  return (
    <>
      <Box display='flex' gap={2} alignItems='center'>
        <Typography>Saleperson:</Typography>
        <TextField size='small' defaultValue='Tommy Shelby' />
      </Box>
      <TextField size='small' defaultValue='Thanks for your business' style={{ marginTop: '10px' }} />
    </>
  )
}
