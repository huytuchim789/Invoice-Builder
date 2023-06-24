import { Box, Typography } from '@mui/material'

import { IUserSelectInvoiceTo } from 'src/@core/models/api/invoice/invoice.interface'

interface Props {
  user: IUserSelectInvoiceTo
}

const UserInfo = ({ user }: Props) => {
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
