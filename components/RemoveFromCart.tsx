import { useMutation } from "@apollo/client"
import gql from "graphql-tag"
import { CURRENT_USER_QUERY } from "../hooks/useUser"

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`
const REMOVE_TO_CART_MUTATION = gql`
  mutation REMOVE_TO_CART_MUTATION($id: ID!) {
    removeToCart(productId: $id) {
      id
    }
  }
`

const update = (cache: any, payload: any) => {
  cache.evict(cache.identify(payload.data.deleteCartItem))
}

const RemoveFromCart = ({ id }: any) => {
  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
    variables: { id },
    update,
    //  optimisticResponse: {
    //    deleteCartItem: {
    //      __typename: 'CartItem',
    //      id,
    //    },
    //  },
  })

  const [removeToCart, { loading: removeLoading }] = useMutation(REMOVE_TO_CART_MUTATION, {
    variables: { id },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  })

  return (
    <button
      onClick={removeToCart}
      disabled={removeLoading}
      type="button"
      title="Remove This Item from Cart"
    >
      eliminar
    </button>
  )
}
export default RemoveFromCart
