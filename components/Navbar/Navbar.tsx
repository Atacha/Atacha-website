import { useRouter } from "next/router"
import Link from "next/link"
import React from "react"
import Image from "next/image"
import { useAuth } from "../../hooks/useAuth"

import styles from "./Navbar.module.scss"

const Navbar: React.FC = () => {
  const router = useRouter()
  const { uid } = useAuth()

  if (
    (router.pathname == "/" && uid!) ||
    router.pathname == "/registro" ||
    router.pathname == "/login"
  ) {
    return null
  }
  return (
    <div className={styles.navbar}>
      <Link href="/inventory">
        <div
          className={router.pathname == "/inventory" ? styles.navbarItemActive : styles.navbarItem}
        >
          <div className={styles.image}>
            <Image src="/images/mochila.png" alt="logo" layout="responsive" width={0} height={0} />
          </div>
        </div>
      </Link>
      <Link href="/shop">
        <div
          className={
            router.pathname == "/shop" || router.pathname == "/"
              ? styles.navbarItemActive
              : styles.navbarItem
          }
        >
          <div className={styles.image}>
            <Image
              src="/images/mercadillo.png"
              alt="logo"
              layout="responsive"
              width={0}
              height={0}
            />
          </div>
        </div>
      </Link>
      <Link href="/wishes">
        <div className={router.pathname == "/wishes" ? styles.navbarItemActive : styles.navbarItem}>
          <div className={styles.image}>
            <Image src="/images/dreams.png" alt="logo" layout="responsive" width={0} height={0} />
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Navbar
