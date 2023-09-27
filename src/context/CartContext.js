import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  removeAllCartItem: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
})

export default CartContext
