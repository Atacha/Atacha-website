import gql from "graphql-tag"
import { useMutation } from "@apollo/client"
import useForm from "../hooks/useForm"
import DisplayError from "./ErrorMessage"

import styles from "../assets/styles/components/LoginForm.module.scss"
import Link from "next/link"

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`

const SignIn = () => {
  const { inputs, handleChange, resetForm } = useForm({
    email: "",
  })
  const [signup, { data, loading, error }] = useMutation(REQUEST_RESET_MUTATION, {
    variables: inputs,
    // refectch the currently logged in user
    // refetchQueries: [{ query: CURRENT_USER_QUERY }],
  })

  const handleSubmit = async (e: any) => {
    e.preventDefault() // stop the form from submitting
    console.log(inputs)
    const res = await signup().catch(console.error)
    console.log(res)
    console.log({ data, loading, error })
    resetForm()
    // Send the email and password to the graphqlAPI
  }
  return (
    <div className={styles.singUpForm}>
      <form method="POST" onSubmit={handleSubmit}>
        {data?.sendUserPasswordResetLink === null && (
          <p>Exelente! Revisa tu email te enviamos un link!</p>
        )}
        <h2 className={styles.formTitle}>Olivde mi contraseña</h2>
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
        <div>
          <button className={styles.submitButtom} type="submit" disabled={loading}>
            Recuperar
          </button>
          <DisplayError error={error} />
        </div>
        <div className={styles.RegisterOption}>
          <p>¿La recordaste?</p>
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
export default SignIn
