import { useMutation } from "@apollo/client"
import gql from "graphql-tag"
// import { CURRENT_USER_QUERY } from "../hooks/useUser"

const REMOVE_ONE_TO_CART_MUTATION = gql`
  mutation REMOVE_ONE_TO_CART_MUTATION($id: ID!) {
    removeOneToCart(productId: $id) {
      id
      quantity
    }
  }
`
const update = (cache: any, payload: any): void => {
  cache.evict(cache.identify(payload.data.removeOneToCart))
}

const RemoveOneToCart = ({ id }: any) => {
  const [removeOneToCart, { error, loading }] = useMutation(REMOVE_ONE_TO_CART_MUTATION, {
    variables: { id },
    // refetchQueries: [{ query: CURRENT_USER_QUERY }],
    update,
  })

  return (
    <>
      <button
        onClick={removeOneToCart}
        disabled={loading}
        type="button"
        title="Remove One Item from Cart"
      >
        -
      </button>
      {error ? <p>{error.message} </p> : null}
    </>
  )
}

export default RemoveOneToCart
