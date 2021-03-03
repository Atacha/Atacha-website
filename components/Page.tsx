import React from "react"
import Header from "./Header"
import Navbar from "./Navbar"
import { useRouter } from "next/router"
import styles from "../assets/styles/components/Page.module.scss"

interface IProps {
  children: React.ReactNode
}

const Page: React.FC<IProps> = ({ children }) => {
  const router = useRouter()
  if (
    (router.pathname == "/" && uid!) ||
    router.pathname == "/register" ||
    router.pathname == "/login" ||
    router.pathname == "/request" ||
    router.pathname == "/reset"
  ) {
    return <>{children}</>
  }
  return (
    <main className={styles.main}>
      <Header />
      {children}
      <Navbar />
    </main>
  )
}

export default Page
