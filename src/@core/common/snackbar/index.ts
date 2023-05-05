import { useSnackbar } from 'notistack'

function useSnackbarWithContext() {
  const { enqueueSnackbar } = useSnackbar()

  const snackbar = {
    success: (message: string | JSX.Element, config = {}) => {
      enqueueSnackbar(message, {
        variant: 'success',
        autoHideDuration: 3000,
        ...config
      })
    },
    error: (message: string | JSX.Element, config = {}) => {
      enqueueSnackbar(message, {
        variant: 'error',
        autoHideDuration: 3000,
        ...config
      })
    },
    warning: (message: string | JSX.Element, config = {}) => {
      enqueueSnackbar(message, {
        variant: 'warning',
        autoHideDuration: 3000,
        ...config
      })
    },
    info: (message: string | JSX.Element, config = {}) => {
      enqueueSnackbar(message, {
        variant: 'info',
        autoHideDuration: 3000,
        ...config
      })
    }
  }

  return snackbar
}

export { useSnackbarWithContext }
