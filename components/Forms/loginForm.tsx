import { useState } from "react"
import { useForm } from "react-hook-form"
import { useAuth } from "../../hooks/useAuth"
import { useRouter } from "next/router"

import Image from "next/image"
import Link from "next/link"

import styles from "./loginForm.module.scss"

interface LoginData {
  email: string
  password: string
}

const LoginForm: React.FC = () => {
  const [error, setError] = useState({
    code: "",
    message: "",
  })
  const [emailLogin, setEmailLogin] = useState(false)
  const { register, errors, handleSubmit } = useForm()
  const auth = useAuth()
  const router = useRouter()

  const onSubmit = (data: LoginData) => {
    setError({
      code: "",
      message: "",
    })
    return auth.signIn(data).then((response: any) => {
      response?.error ? setError(response.error) : router.push("/account")
    })
  }
  const loginFB = () => {
    setError({
      code: "",
      message: "",
    })
    return auth.fbLogin().then((response: any) => {
      response?.error ? setError(response.error) : router.push("/account")
    })
  }

  const loginGoogle = () => {
    setError({
      code: "",
      message: "",
    })
    return auth.ggLogin().then((response: any) => {
      response?.error ? setError(response.error) : router.push("/account")
    })
  }

  const reCorto: RegExp = /\S+@\S+\.\S+/

  return (
    <div className={styles.loginForm}>
      {emailLogin ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className={styles.formTitle}>Ingresa</h2>
          <div>
            <div className={styles.Input}>
              <p>@</p>

              <input
                id="email"
                type="email"
                name="email"
                placeholder="Email ..."
                ref={register({
                  required: "Por favor ingresa tu email",
                  pattern: {
                    value: reCorto,
                    message: "Email no valido",
                  },
                })}
              />
              {errors.email && <div>{errors.email.message}</div>}
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
                ref={register({
                  required: "Por favor ingresa una contraseña",
                  minLength: {
                    value: 6,
                    message: "Debe tener al menos 6 caracteres",
                  },
                })}
              />
              {errors.password && <div>{errors.password.message}</div>}
            </div>
            {error?.message && (
              <div>
                <span>{error.message}</span>
              </div>
            )}
          </div>
          <div>
            <button className={styles.submitButtom} type="submit">
              Ingresar
            </button>
          </div>
          <div className={styles.loginOptions}>
            <p>o inicia sesión con ...</p>
            <div className={styles.optionsContainer}>
              <button
                onClick={loginGoogle}
                className={`${styles.loginOption} ${styles.loginOptionSmall}`}
              >
                <div className={styles.imageContainer}>
                  <Image src="/images/google.svg" alt="logo" width={31} height={31} />
                </div>
              </button>

              <button
                onClick={loginFB}
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

          <button onClick={loginGoogle} className={styles.loginOption}>
            <div className={styles.imageContainer}>
              <Image src="/images/google.svg" alt="logo" width={31} height={31} />
            </div>
            <p>Ingresa con Google</p>
          </button>

          <button onClick={loginFB} className={`${styles.loginOption} ${styles.facebookLogin}`}>
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
export default LoginForm
