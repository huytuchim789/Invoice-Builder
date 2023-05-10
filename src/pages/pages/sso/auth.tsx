import { CircularProgress } from '@mui/material'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import Router from 'next/router'
import { useEffect } from 'react'
import { useLoginController } from 'src/containers/LoginContainers/controller'

export default function SSOContainer() {
  const sessionController = useLoginController()

  useEffect(() => {
    sessionController.onLogin()
  }, [])

  return <CircularProgress />
}
