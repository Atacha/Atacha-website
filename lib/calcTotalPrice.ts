export const calcTotalPrice = (cart: any) => {
  return cart.reduce((tally: number, cartItem: any) => {
    if (!cartItem.product) return tally // products can be deleted, but they could still be in your cart
    return tally + cartItem.quantity * cartItem.product.price
  }, 0)
}