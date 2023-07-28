import { Box, Skeleton, Typography } from '@mui/material'

import { useFormContext } from 'react-hook-form'

interface Props {
  isLoading?: boolean
}

const UserInfo = ({ isLoading }: Props) => {
  const { watch } = useFormContext()
  const user = JSON.parse(watch('user_id') || '{}')

  if (!user) return <Box></Box>

  if (isLoading)
    return (
      <Box marginTop={2}>
        <Skeleton width={150} />
        <Skeleton width={150} />
        <Skeleton width={150} />
        <Skeleton width={150} />
      </Box>
    )

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
