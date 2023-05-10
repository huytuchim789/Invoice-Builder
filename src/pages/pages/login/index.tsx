import React, { ReactNode } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import LoginContainer from 'src/containers/LoginContainers'

function LoginPage() {

  return <LoginContainer />
}
LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
export default LoginPage
