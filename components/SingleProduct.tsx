import { useQuery } from "@apollo/client"
import gql from "graphql-tag"
import DisplayError from "./ErrorMessage"
import Head from "next/head"
import formatMoney from "../lib/formatMoney"

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      name
      price
      description
      id
      photo {
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`

const SingleProduct = ({ id }: any) => {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id,
    },
  })
  if (loading) return <p>Loading...</p>
  const { Product } = data
  return (
    <div>
      <Head>
        <title>Atacha | {Product?.name}</title>
      </Head>
      <DisplayError error={error?.message} />
      <img src={Product?.photo.image.publicUrlTransformed} alt={Product?.photo.altText} />
      <div>
        <h2>{Product?.name}</h2>
        <p>{Product?.description}</p>
        <p> Precio: {formatMoney(Product?.price)} </p>
      </div>
    </div>
  )
}
export default SingleProduct
