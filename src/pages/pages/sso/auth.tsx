import { CircularProgress, Stack } from '@mui/material'
import { ReactNode, useEffect } from 'react'
import { globalStore } from 'src/@core/hocs/global-store'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { useLoginController } from 'src/containers/LoginContainers/controller'

function SSOContainer() {
  const sessionController = useLoginController()
  const { user, setUser } = globalStore(state => state.userStore)
  useEffect(() => {
    sessionController.onLogin(setUser)
  }, [])

  return (
    <Stack width={'100%'} height={'100vh'} direction='row' justifyContent={'center'} alignItems={'center'}>
      <CircularProgress />
    </Stack>
  )
}
SSOContainer.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
export default SSOContainer
