/* eslint-disable react/no-unknown-property */
import {Link} from 'react-router-dom'
import {ImStarFull} from 'react-icons/im'
import './index.css'

const Restaurants = props => {
  const {details} = props
  const {name, imageUrl, userRating, cuisine, id} = details
  const {rating, totalReviews} = userRating
  return (
    <Link to={`/restaurant/${id}`} className="restaurant-link">
      <li className="restaurant-card" testid="restaurant-item">
        <img src={imageUrl} alt="restaurant-img" className="restaurant-image" />
        <div className="restaurant-details">
          <h1 className="restaurant-name">{name}</h1>
          <h3 className="restaurant-type">{cuisine}</h3>
          <div className="rating-box">
            <ImStarFull className="star" />
            <p className="restaurant-rating">{rating}</p>
            <p className="user-total-reviews">{`(${totalReviews} ratings)`}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default Restaurants
