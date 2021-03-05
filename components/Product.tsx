import Link from "next/link"
import DeleteProduct from "./DeleteProduct"
import formatMoney from "../lib/formatMoney"
import AddToCart from "./AddCart"

const Product = ({ product }: any) => {
  return (
    <div>
      <img src={product?.photo?.image?.publicUrlTransformed} alt={product.name} />
      <div>
        <Link href={`/product/${product?.id}`}>{product?.name}</Link>
      </div>
      <p>{formatMoney(product?.price)}</p>
      <p>{product?.description}</p>
      <div>
        <Link
          href={{
            pathname: "update",
            query: {
              id: product?.id,
            },
          }}
        >
          Editar
        </Link>
        <AddToCart id={product?.id} />
        <DeleteProduct id={product?.id}>Eliminar</DeleteProduct>
      </div>
    </div>
  )
}
export default Product
