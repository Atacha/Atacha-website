import { useForm } from "react-hook-form"
import { useAuth } from "../hooks/useAuth"
import { useRouter } from "next/router"
import Link from "next/link"

import styles from "../assets/styles/components/LoginForm.module.scss"

interface SingUpData {
  name: string
  email: string
  password: string
}

const SignUpForm: React.FC = () => {
  const auth = useAuth()
  const router = useRouter()

  const { register, errors, handleSubmit } = useForm()

  const onSubmit = (data: SingUpData) => {
    auth.signUp(data).then((user: any) => {
      if (user) {
        if (auth.error) {
          auth.setError(null)
        }
        router.push("/login")
      }
    })
  }
  const reCorto: RegExp = /\S+@\S+\.\S+/

  return (
    <div className={styles.singUpForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.formTitle}>Registrate</h2>
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
        </div>
        <div className="mt-6">
          <div className={styles.Input}>
            <i className="fas fa-user"></i>
            <input
              id="name"
              placeholder="Nombre ..."
              type="text"
              name="password"
              ref={register({
                required: "Por favor ingresa tu nombre",
                minLength: {
                  value: 6,
                  message: "Debe tener al menos 6 caracteres",
                },
              })}
            />
            {errors.password && <div>{errors.password.message}</div>}
          </div>
        </div>
        <div>
          <button className={styles.submitButtom} type="submit">
            Registro
          </button>
        </div>
        <div className={styles.RegisterOption}>
          <p>¿Ya tienes cuenta?</p>
          <div className={styles.resgisterLink}>
            <Link href="/login">
              <a href="#">Ingresa</a>
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}
export default SignUpForm
