import { Box, Typography, styled } from '@mui/material'
import { getStatusIcons } from '../component'

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

const StatusCell = ({ params }: any) => {
  return (
    <StatusCellComponent>
      <Box className='status-icon'>{getStatusIcons(params.status)}</Box>
      <Typography>{params.status}</Typography>
    </StatusCellComponent>
  )
}

export default StatusCell
