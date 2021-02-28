import { useMutation, useQuery } from "@apollo/client"
import DisplayError from "./ErrorMessage"
import gql from "graphql-tag"
import useForm from "../hooks/useForm"

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
      price
    }
  }
`
const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION($id: ID!, $name: String, $description: String, $price: Int) {
    updateProduct(id: $id, data: { name: $name, description: $description, price: $price }) {
      id
      name
      description
      price
    }
  }
`

const UpdateProduct: React.FC = ({ id }) => {
  const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  })

  const [
    updateProduct,
    { data: updateData, errror: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_PRODUCT_MUTATION)

  const { inputs, handleChange, clearForm, resetForm } = useForm(data?.Product)
  console.log(inputs)

  if (loading) return <p>loading...</p>
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        const res = await updateProduct({
          variables: {
            id,
            name: inputs.name,
            description: inputs.description,
            price: inputs.price,
          },
        }).catch(console.error)
        console.log(res)
        // Submit the inputfields to the backend:
        // TODO: Handle Submit!!!
        // const res = await createProduct();
        // clearForm();
        // // Go to that product's page!
        // Router.push({
        //   pathname: `/product/${res.data.createProduct.id}`,
        // });
      }}
    >
      <DisplayError error={error || updateError} />
      <fieldset disabled={updateLoading}>
        <label htmlFor="name">
          Nombre
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          precio
          <input
            type="number"
            id="price"
            name="price"
            placeholder="price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Descripcion
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Actualizar producto</button>
      </fieldset>
    </form>
  )
}
export default UpdateProduct
