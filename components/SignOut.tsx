import { useMutation } from "@apollo/client"
import gql from "graphql-tag"
import { CURRENT_USER_QUERY } from "../hooks/useUser"

const SIGN_OUT_MUTATION = gql`
  mutation {
    endSession
  }
`

const SignOut = () => {
  const [signout] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  })
  return (
    <button type="button" onClick={signout}>
      Cerrar Session
    </button>
  )
}
export default SignOut