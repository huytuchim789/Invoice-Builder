import { CircularProgress } from '@mui/material'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import Router from 'next/router'
import { useEffect } from 'react'
import { useSessionsController } from '../login/controller'

export default function SSOContainer() {
  const router = useRouter()
  const sessionController = useSessionsController()

  useEffect(() => {
    sessionController.onLogin()
  }, [])

  return <CircularProgress />
}
