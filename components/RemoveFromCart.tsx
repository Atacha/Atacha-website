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
  console.log("cache:", cache)
  console.log("payload:", payload)

  // cache.evict(cache.identify(payload.data.uoCartItem))
}

const RemoveFromCart = ({ id }: any) => {
  // const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
  //   variables: { id },
  //   update,
  //   //  optimisticResponse: {
  //   //    deleteCartItem: {
  //   //      __typename: 'CartItem',
  //   //      id,
  //   //    },
  //   //  },
  // })
  console.log(id);
  const [removeToCart, { data, loading: removeLoading }] = useMutation(REMOVE_TO_CART_MUTATION, {
    variables: { id },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  })
  console.log(data);

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
