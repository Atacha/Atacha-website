import { useState } from "react"
import gql from "graphql-tag"
import { useMutation } from "@apollo/client"
import { CURRENT_USER_QUERY } from "../hooks/useUser"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import useForm from "../hooks/useForm"
import DisplayError from "./ErrorMessage"

import styles from "../assets/styles/components/LoginForm.module.scss"

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`

const SignIn = () => {
  const router = useRouter()
  const { inputs, handleChange, resetForm } = useForm({
    email: "",
    password: "",
  })

  const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: inputs,
    // refectch the currently logged in user
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  })

  const [emailLogin, setEmailLogin] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault() // stop the form from submitting
    await signin()
    resetForm()
    router.push("/account")
    // Send the email and password to the graphqlAPI
  }
  const error =
    data?.authenticateUserWithPassword.__typename === "UserAuthenticationWithPasswordFailure"
      ? data?.authenticateUserWithPassword
      : null

  return (
    <div className={styles.loginForm}>
      {emailLogin ? (
        <form method="POST" onSubmit={handleSubmit}>
          <h2 className={styles.formTitle}>Ingresa</h2>
          <div>
            <div className={styles.Input}>
              <p>@</p>

              <input
                id="email"
                type="email"
                name="email"
                placeholder="Email ..."
                value={inputs.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mt-6">
            <div className={styles.Input}>
              <i className="fas fa-lock"></i>
              <input
                id="password"
                placeholder="Contaseña ..."
                type="password"
                name="password"
                value={inputs.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <button className={styles.submitButtom} type="submit" disabled={loading}>
              Ingresar
            </button>
          </div>
          <DisplayError error={error} />
          <div className={styles.RegisterOption}>
            <p>¿Olvidaste tu constraseña</p>
            <div className={styles.resgisterLink}>
              <Link href="/reset">
                <a href="#">Recuperala</a>
              </Link>
            </div>
          </div>
          <div className={styles.loginOptions}>
            <p>o inicia sesión con ...</p>
            <div className={styles.optionsContainer}>
              <button
                // onClick={loginGoogle}
                className={`${styles.loginOption} ${styles.loginOptionSmall}`}
              >
                <div className={styles.imageContainer}>
                  <Image src="/images/google.svg" alt="logo" width={31} height={31} />
                </div>
              </button>

              <button
                // onClick={loginFB}
                className={`${styles.loginOption} ${styles.loginOptionSmall} ${styles.facebookLogin}`}
              >
                <div className={styles.imageContainer}>
                  <Image src="/images/fb.svg" alt="logo" width={31} height={31} />
                </div>
              </button>
            </div>
          </div>
        </form>
      ) : (
        <>
          <div>
            <button
              onClick={() => {
                setEmailLogin(true)
              }}
              className={styles.loginOption}
            >
              <div className={styles.imageContainer}>
                <Image src="/images/email.svg" alt="logo" width={31} height={31} />
              </div>
              <p>Ingresa con correro electrónico</p>
            </button>
          </div>

          <button className={styles.loginOption}>
            <div className={styles.imageContainer}>
              <Image src="/images/google.svg" alt="logo" width={31} height={31} />
            </div>
            <p>Ingresa con Google</p>
          </button>

          <button className={`${styles.loginOption} ${styles.facebookLogin}`}>
            <div className={styles.imageContainer}>
              <Image src="/images/fb.svg" alt="logo" width={31} height={31} />
            </div>
            <p>Ingresa con Facebook</p>
          </button>

          <div className={styles.RegisterOption}>
            <p>¿Eres nuevo en Atacha?</p>
            <div className={styles.resgisterLink}>
              <Link href="/register">
                <a href="#">Registrate</a>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default SignIn
