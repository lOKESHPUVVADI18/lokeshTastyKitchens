import {Component} from 'react'
import CartContext from '../../context/CartContext'
import CartTotal from '../CartTotal'
import CartItem from '../CartItem'
import Payment from '../Payment'
import './index.css'

class CartListView extends Component {
  state = {isOrdered: false}

  orderPlaced = () => {
    this.setState(prevState => ({isOrdered: !prevState.isOrdered}))
  }

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const getTheList = localStorage.getItem('cartData')
          const parsedCartList = JSON.parse(getTheList)
          const {isOrdered} = this.state
          return isOrdered ? (
            <Payment />
          ) : (
            <div className="cart-content-container">
              <div className="cart-headers-cont">
                <p className="cart-header-items">Item</p>
                <div className="qty-price-cont">
                  <p className="cart-header-qty">Quantity</p>
                  <p className="cart-header-price">Price</p>
                </div>
              </div>
              <ul className="cart-list">
                {parsedCartList.map(eachItem => (
                  <CartItem
                    key={eachItem.id}
                    cartItem={eachItem}
                    value={value}
                  />
                ))}
              </ul>
              <CartTotal orderPlaced={this.orderPlaced} />
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}
export default CartListView
