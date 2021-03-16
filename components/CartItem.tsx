import formatMoney from "../lib/formatMoney"
import RemoveOneToCart from "./RemoveOneToCart"
import RemoveFromCart from "./RemoveFromCart"

const CartItem = ({ cartItem }: any) => {
  const { product } = cartItem
  if (!product) return null
  return (
    <li>
      <img width="100" src={product.photo.image.publicUrlTransformed} alt={product.name} />
      <div>
        <h3>{product.name}</h3>
        <p>
          {cartItem.quantity} &times; {formatMoney(product.price)} =
          <em> total: {formatMoney(product.price * cartItem.quantity)}</em>
        </p>
      </div>
      <RemoveOneToCart id={cartItem.product.id} />
      <RemoveFromCart id={cartItem.id} />
    </li>
  )
}

export default CartItem
