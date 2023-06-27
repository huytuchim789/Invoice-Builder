import React from 'react'

import { Box, Typography, TextField } from '@mui/material'

import { globalStore } from 'src/@core/hocs/global-store'

export const SalePerson = () => {
  const { user } = globalStore((state: any) => state.userStore)

  return (
    <React.Fragment>
      <Box display='flex' gap={2} alignItems='center'>
        <Typography>Saleperson:</Typography>
        <TextField size='small' value={user.name} />
      </Box>
      <TextField size='small' value='Thanks for your business' style={{ marginTop: '10px' }} disabled />
    </React.Fragment>
  )
}
