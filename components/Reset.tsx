import gql from "graphql-tag"
import { useMutation } from "@apollo/client"
import useForm from "../hooks/useForm"
import DisplayError from "./ErrorMessage"
import Link from "next/link"

import styles from "../assets/styles/components/LoginForm.module.scss"

const RESET_MUTATION = gql`
  mutation RESET_MUTATION($email: String!, $password: String!, $token: String!) {
    redeemUserPasswordResetToken(email: $email, token: $token, password: $password) {
      code
      message
    }
  }
`
const Reset = ({ token }: any) => {
  const { inputs, handleChange, resetForm } = useForm({
    email: "",
    password: "",
    token,
  })
  const [reset, { data, loading, error }] = useMutation(RESET_MUTATION, {
    variables: inputs,
  })

  const successfulError = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
    : undefined

  const handleSubmit = async (e: any) => {
    e.preventDefault() // stop the form from submitting
    console.log(inputs)
    const res = await reset().catch(console.error)
    console.log(res)
    console.log({ data, loading, error })
    resetForm()
    // Send the email and password to the graphqlAPI
  }
  if (data?.redeemUserPasswordResetToken === null) {
    return (
      <div className={styles.singUpForm}>
        <p className={styles.formTitle}>Felicitaciones! ahora puesde iniciar session </p>
        <button className={styles.submitButtom} type="submit">
          <Link href="/login">
            <a href="#">Ingresa</a>
          </Link>
        </button>
      </div>
    )
  }
  return (
    <div className={styles.singUpForm}>
      <form method="POST" onSubmit={handleSubmit}>
        <h2 className={styles.formTitle}>Cambio de contraseña</h2>
        <div>
          <div className={styles.Input}>
            <p>@</p>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email ..."
              onChange={handleChange}
              value={inputs.email}
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
              onChange={handleChange}
              value={inputs.password}
            />
          </div>
        </div>
        <div>
          <button className={styles.submitButtom} type="submit" disabled={loading}>
            Cambiar contraseña
          </button>
          <DisplayError error={error || successfulError} />
        </div>
      </form>
    </div>
  )
}
export default Reset
