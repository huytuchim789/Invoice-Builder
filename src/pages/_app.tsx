import '../styles/globals.css';

// eslint-disable-next-line import/no-unresolved
import { Analytics } from '@vercel/analytics/react';

import type { AppProps } from 'next/app';

import { Alert, Snackbar } from '@mui/material';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { GLOBAL_MUI_THEME } from '../styles/global.theme';
import { IDataOpenAlert, useStatusAlert } from 'src/stores/useStatusAlert';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import { UserLayout } from 'src/helpers/layout/UserLayout';

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [statusAlert, update] = useStatusAlert((state: IDataOpenAlert) => [
    state.statusAlert,
    state.update,
  ]);

  const getLayout = Component.getLayout ?? ((page) => <UserLayout>{page}</UserLayout>);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    update({ message: '', severity: 'success', open: false });
  };

  return (
    <StyledEngineProvider injectFirst>
      <Snackbar open={statusAlert.open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={statusAlert.severity} sx={{ width: '100%' }}>
          {statusAlert.message}
        </Alert>
      </Snackbar>

      <ThemeProvider theme={GLOBAL_MUI_THEME}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {getLayout(<Component {...pageProps} />)}
          <Analytics />
        </LocalizationProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default MyApp;
