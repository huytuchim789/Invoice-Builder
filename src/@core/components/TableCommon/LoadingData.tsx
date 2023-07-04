import { Box, CircularProgress } from '@mui/material'

const LoadingData = () => {
  return (
    <Box display='flex' justifyContent='center' padding={10} width='100%'>
      <CircularProgress color='primary' />
    </Box>
  )
}

export default LoadingData
