import { useMutation } from "@apollo/client"
import gql from "graphql-tag"

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`
const RemoveFromCart = ({ id }: any) => {
  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
    variables: { id },
  })
  return (
    <button
      onClick={removeFromCart}
      disabled={loading}
      type="button"
      title="Remove All Item from Cart"
    >
      &times;
    </button>
  )
}

export default RemoveFromCart
