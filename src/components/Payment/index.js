import {Link} from 'react-router-dom'
import CartContext from '../../context/CartContext'
import './index.css'

const Payment = () => (
  <CartContext.Consumer>
    {value => {
      const {removeAllCartItem} = value

      const removeItems = () => {
        removeAllCartItem()
      }
      return (
        <div className="payment-container">
          <div className="payment-card">
            <img
              src="https://res.cloudinary.com/dd4ujvcon/image/upload/v1695694246/Vector_apgtz6.png"
              alt="success"
              className="payment-image"
            />
            <h1 className="payment-heading">Payment SuccessFul</h1>
            <p className="payment-text">
              Thank you for ordering Your payment is successfully completed.
            </p>
            <Link to="/">
              <button type="button" onClick={removeItems} className="home-btn">
                Go To Home Page
              </button>
            </Link>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default Payment
