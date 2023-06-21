import { CircularProgress, Stack } from '@mui/material'

export const LoadingComponent = () => {
  return (
    <Stack width={'100%'} height={'100vh'} direction='row' justifyContent={'center'} alignItems={'center'}>
      <CircularProgress />
    </Stack>
  )
}
