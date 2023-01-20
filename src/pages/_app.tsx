import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material'
import UserLayout from '../layout/UserLayout'
import { theme } from '../theme'
import Head from 'next/head'
import { SWRConfig } from 'swr'
import axiosInstance from '../utils/fetchWithTimeOut'
import camelcaseKeys from 'camelcase-keys'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <ThemeProvider theme={theme}>
        <SWRConfig
          value={{
            fetcher: (url) => axiosInstance({ url }).then((res: any) => camelcaseKeys(res.data.results)),
          }}
        >
          <UserLayout>
            <Component {...pageProps} />
          </UserLayout>
        </SWRConfig>
      </ThemeProvider>
    </>
  )
}
