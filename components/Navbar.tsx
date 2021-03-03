import { useRouter } from "next/router"
import Link from "next/link"
import React from "react"
import Image from "next/image"

import styles from "../assets/styles/components/Navbar.module.scss"

const Navbar: React.FC = () => {
  const router = useRouter()

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
      <Link href="/products">
        <div
          className={
            router.pathname == "/products" || router.pathname == "/"
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
