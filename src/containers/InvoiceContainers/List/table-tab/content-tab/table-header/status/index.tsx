import { Box, Typography, styled } from '@mui/material'
import { getStatusIcons } from '../../component'

const StatusCellComponent = styled(Box)({
  display: 'flex',
  alignContent: 'center',
  gap: '10px',
  '& p': {
    textTransform: 'capitalize'
  },
  '& .status-icon': {
    display: 'flex',
    alignItems: 'center'
  }
})

export const StatusCell = ({ params }: any) => {
  return (
    <StatusCellComponent>
      <Box className='status-icon'>{getStatusIcons(params.row.status)}</Box>
      <Typography>{params.row.status}</Typography>
    </StatusCellComponent>
  )
}
