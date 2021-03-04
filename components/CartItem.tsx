import React from "react"
import formatMoney from "../lib/formatMoney"

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
    </li>
  )
}

export default CartItem
