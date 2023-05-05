import { CircularProgress } from '@mui/material'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import Router from 'next/router'
import { useEffect } from 'react'
import { useSnackbarWithContext } from 'src/@core/common/snackbar'

export default function SSOContainer() {
  const snackbar = useSnackbarWithContext()

  const router = useRouter()

  useEffect(() => {
    snackbar.success('Success message', { anchorOrigin: { vertical: 'top', horizontal: 'center' } })
  }, [])

  return <div />
}
