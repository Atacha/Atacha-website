import Link from "next/link"
import DeleteProduct from "./DeleteProduct"
import formatMoney from "../lib/formatMoney"

const Product = ({ product }: any) => {
  return (
    <div>
      <img src={product?.photo?.image?.publicUrlTransformed} alt={product.name} />
      <div>
        <Link href={`/product/${product?.id}`}>{product?.name}</Link>
      </div>
      <p>f{formatMoney(product?.price)}</p>
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
        <DeleteProduct id={product?.id}>Eliminar</DeleteProduct>
      </div>
    </div>
  )
}
export default Product
