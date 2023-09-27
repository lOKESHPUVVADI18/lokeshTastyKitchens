import {Component} from 'react'
import CartListView from '../CartListView'
import EmptyCart from '../EmptyCart'
import Header from '../Header'
import Footer from '../Footer'
import CartContext from '../../context/CartContext'
import './index.css'

class Cart extends Component {
  render() {
    return (
      <>
        <CartContext.Consumer>
          {value => {
            const {cartList} = value
            const isEmpty = cartList.length === 0
            return (
              <>
                <Header />
                <div className="cart-container">
                  {isEmpty ? <EmptyCart /> : <CartListView />}
                </div>
                <Footer />
              </>
            )
          }}
        </CartContext.Consumer>
      </>
    )
  }
}

export default Cart
