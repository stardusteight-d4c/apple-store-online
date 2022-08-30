import '../styles/global.css'
import type { AppProps } from 'next/app'
import { store } from '../redux/store'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    // Higher order component
    <SessionProvider session={session}>
      <Provider store={store}>
        <Toaster />
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  )
}

export default MyApp
