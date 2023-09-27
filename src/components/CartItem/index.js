/* eslint-disable react/no-unknown-property */
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {FaRupeeSign} from 'react-icons/fa'

import CartContext from '../../context/CartContext'
import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {incrementCartItemQuantity, decrementCartItemQuantity} = value
      const {cartItem} = props
      const {id, name, quantity, cost, imageUrl} = cartItem
      const increaseQuantity = () => {
        incrementCartItemQuantity(id)
      }
      const decreaseQuantity = () => {
        decrementCartItemQuantity(id)
      }
      return (
        <div className="cart-item" testid="cartItem">
          <div className="cart-item-info">
            <img src={imageUrl} alt={name} className="cart-item-image" />
            <h1 className="cart-item-desktop-name">{name}</h1>
          </div>
          <div className="cart-qty-price-cont">
            <h1 className="cart-item-mobile-name">{name}</h1>
            <div className="cart-qty-container">
              <button
                testid="decrement-quantity"
                className="decrement-quantity"
                type="button"
                onClick={decreaseQuantity}
              >
                <BsDashSquare size={16} />
              </button>
              <p className="item-quantity" testid="item-quantity">
                {quantity}
              </p>
              <button
                className="increment-quantity"
                testid="increment-quantity"
                type="button"
                onClick={increaseQuantity}
              >
                <BsPlusSquare size={16} />
              </button>
            </div>
            <p className="price">
              <FaRupeeSign size={12} /> {cost * quantity}
            </p>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
