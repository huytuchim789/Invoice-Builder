import { Avatar, Box, Typography, styled } from '@mui/material'

const ClientCellComponent = styled(Box)({
  display: 'flex',
  alignContent: 'center',
  gap: '10px'
})

export const ClientCell = ({ params }: any) => {
  return (
    <ClientCellComponent>
      <Avatar>{params.row.invoice.customer.name[0]}</Avatar>
      <Box>
        <Typography fontSize={12}>{params.row.invoice.customer.name}</Typography>
        <Typography fontSize={12}>{params.row.invoice.customer.email}</Typography>
      </Box>
    </ClientCellComponent>
  )
}
