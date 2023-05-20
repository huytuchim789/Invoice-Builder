// ** Next Imports
import React, { useEffect } from 'react'
import Head from 'next/head'
import { Router } from 'next/router'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/cache'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'

// ** Contexts
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** Store Imports
import { IDataOpenAlert, useStatusAlert } from 'src/stores/useStatusAlert'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'
import 'react-quill/dist/quill.snow.css'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-phone-input-2/lib/style.css'

// ** Global css styles
import '../../styles/globals.css'
import { IDataLogin, useDataLogin } from 'src/stores/useDataLogin'
import { getCookie, hasCookie } from 'cookies-next'
import { USER_INFO } from 'src/@core/models'

// ** Extend App Props with Emotion

//Import snackbar
import { SnackbarProvider } from 'notistack'
import { withAuth } from 'src/@core/hocs/with-auth'

type ExtendedAppProps = AppProps & {
  Component: NextPage
  emotionCache: EmotionCache
}

const clientSideEmotionCache = createEmotionCache()
const queryClient = new QueryClient()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

// ** Configure JSS & ClassName
export function App(props: ExtendedAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const [statusAlert, update] = useStatusAlert((state: IDataOpenAlert) => [state.statusAlert, state.update])
  const [updateUserInfo] = useDataLogin((state: IDataLogin) => [state.updateUserInfo])

  useEffect(() => {
    if (hasCookie(USER_INFO)) {
      const data = getCookie(USER_INFO) as string

      updateUserInfo(JSON.parse(data))
    }
  }, [])

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    update({ message: '', severity: 'success', open: false })
  }

  // Variables
  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)

  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider value={emotionCache}>
        <>
          {/**@ts-ignore */}
          <SnackbarProvider>
            <Head>
              <title>{`${themeConfig.templateName} - Material Design React Admin Template`}</title>
              <meta
                name='description'
                content={`${themeConfig.templateName} – Material Design React Admin Dashboard Template – is the most developer friendly & highly customizable Admin Dashboard Template based on MUI v5.`}
              />
              <meta name='keywords' content='Material Design, MUI, Admin Template, React Admin Template' />
              <meta name='viewport' content='initial-scale=1, width=device-width' />
            </Head>

            <Snackbar open={statusAlert.open} autoHideDuration={3000} onClose={handleClose}>
              <Alert onClose={handleClose} severity={statusAlert.severity} sx={{ width: '100%' }}>
                {statusAlert.message}
              </Alert>
            </Snackbar>

            <SettingsProvider>
              <SettingsConsumer>
                {({ settings }) => {
                  //@ts-ignore
                  return <ThemeComponent settings={settings}>{getLayout(<Component {...pageProps} />)}</ThemeComponent>
                }}
              </SettingsConsumer>
            </SettingsProvider>
          </SnackbarProvider>
        </>
      </CacheProvider>
    </QueryClientProvider>
  )
}
export default withAuth(App)
