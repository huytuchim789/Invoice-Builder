import { Box, Typography } from '@mui/material'

import { useUserSelectStore } from './store'

const UserInfo = () => {
  const { user } = useUserSelectStore()
  return (
    <Box marginTop={2}>
      <Typography fontSize={12} color={'#808080'}>
        {user.name}
        <br />
        {user.address}
        <br />
        {user.contact_number}
        <br />
        {user.email}
      </Typography>
    </Box>
  )
}

export default UserInfo
