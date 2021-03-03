import * as React from "react"
import { AppProps } from "next/app"
import { ApolloProvider } from "@apollo/client"
// import { AuthProvider, useAuth } from "../hooks/useAuth"
// import { useRouter } from "next/router"

import Page from "../components/Page"
// import LoginPage from "./login"

import Router from "next/router"
import Head from "next/head"
import WithData from "../lib/withData"

import Nprogress from "nprogress"
import "nprogress/nprogress.css"
import "../assets/styles/Global.scss"

Router.events.on("routeChangeStart", () => Nprogress.start())
Router.events.on("routeChangeComplete", () => Nprogress.done())
Router.events.on("routeChangeError", () => Nprogress.done())

function MyApp({ Component, pageProps, apollo }: AppProps | any): JSX.Element {
  // const user = useAuth()
  // const router = useRouter()

  // React.useEffect(() => {
  //   if (router.pathname == "/" && user!) {
  //     router.push("/login")
  //   }
  // }, [user])
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Atacha</title>
      </Head>
      <ApolloProvider client={apollo}>
        <Page>
          {/* <AuthProvider>{user ? <Component {...pageProps} /> : <LoginPage />}</AuthProvider> */}
          <Component {...pageProps} />
        </Page>
      </ApolloProvider>
    </>
  )
}

MyApp.getInitialProps = async function ({ Component, ctx }: any) {
  let pageProps = {}
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }
  //@ts-ignore
  pageProps.query = ctx.query
  return { pageProps }
}

export default WithData(MyApp)
