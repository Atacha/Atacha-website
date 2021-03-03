import gql from "graphql-tag"
import { useMutation } from "@apollo/client"
import Link from "next/link"
import useForm from "../hooks/useForm"
import DisplayError from "./ErrorMessage"
import { useRouter } from "next/router"
import styles from "../assets/styles/components/LoginForm.module.scss"

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!) {
    createUser(data: { email: $email, name: $name, password: $password }) {
      id
      email
      name
    }
  }
`

const SignUp = () => {
  const router = useRouter()
  const { inputs, handleChange, resetForm } = useForm({
    email: "",
    name: "",
    password: "",
  })

  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
    variables: inputs,
  })

  const handleSubmit = async (e: any) => {
    e.preventDefault() // stop the form from submitting
    await signup().catch(console.error)
    console.log({ data, loading, error })
    resetForm()
    router.push("/login")
    // Send the email and password to the graphqlAPI
  }

  return (
    <div className={styles.singUpForm}>
      <form method="POST" onSubmit={handleSubmit}>
        <h2 className={styles.formTitle}>Registrate</h2>
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
        <div className="mt-6">
          <div className={styles.Input}>
            <i className="fas fa-user"></i>
            <input
              id="name"
              placeholder="Nombre ..."
              type="text"
              name="name"
              onChange={handleChange}
              value={inputs.name}
            />
          </div>
        </div>
        <div>
          <button className={styles.submitButtom} type="submit" disabled={loading}>
            Registro
          </button>
          <DisplayError error={error} />
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
export default SignUp
