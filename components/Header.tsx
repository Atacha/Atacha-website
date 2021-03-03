import Link from "next/link"
import styles from "../assets/styles/components/Header.module.scss"
import SearchBar from "./SearchBar"
import Image from "next/image"
import React from "react"

const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logoContainer}>
        <Link href="/">
          {/* // mejorar seo */}
          <a className={styles.logo}>
            <Image src="/images/logo2.png" alt="logo" layout="responsive" width={150} height={62} />
          </a>
        </Link>
      </div>
      <SearchBar />
    </div>
  )
}

export default Header
