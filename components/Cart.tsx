import React from "react"
import { useUser } from "../hooks/useUser"
import { calcTotalPrice } from "../lib/calcTotalPrice"
import formatMoney from "../lib/formatMoney"
import CartItem from "./CartItem"

const Cart = () => {
  const user = useUser()
  if (!user) return null
  return (
    <div>
      <header>{user.name} </header>
      <ul>
        {user.cart.map((cartItem: any) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
      <footer>
        <p>Total a pagar: {formatMoney(calcTotalPrice(user.cart))}</p>
      </footer>
    </div>
  )
}

export default Cart
