import gql from "graphql-tag"
import { useMutation } from "@apollo/client"
import DisplayError from "./ErrorMessage"

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`

const DeleteProduct: React.FC = ({ id, children }: any) => {
  const update = (cache: any, payload: any): void => {
    cache.evict(cache.identify(payload.data.deleteProduct))
  }

  const [deleteProduct, { loading, error }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: { id },
    update,
  })

  const handleClick = () => {
    if (confirm("¿Seguro que deseas eleminar este producto?")) {
      deleteProduct()
    }
  }
  return (
    <>
      <DisplayError error={error?.message} />
      <button type="button" onClick={handleClick} disabled={loading}>
        {children}
      </button>
    </>
  )
}

export default DeleteProduct
