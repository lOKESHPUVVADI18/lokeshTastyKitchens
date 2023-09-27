/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import RestaurantBanner from '../RestaurantBanner'
import './index.css'
import FoodItemsCard from '../FoodItemsCard'
import Footer from '../Footer'

class RestaurantDetails extends Component {
  state = {restaurantData: {}, foodItemList: [], isLoading: true}

  componentDidMount() {
    this.renderRestaurantData()
  }

  renderRestaurantData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const api = `https://apis.ccbp.in/restaurants-list/${id}`
    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const restaurantDetails = await fetch(api, options)
    if (restaurantDetails.ok) {
      const res = await restaurantDetails.json()
      const restaurantData = {
        costForTwo: res.cost_for_two,
        cuisine: res.cuisine,
        id: res.id,
        imageUrl: res.image_url,
        itemCount: res.items_count,
        location: res.location,
        name: res.name,
        opensAt: res.opens_at,
        rating: res.rating,
        reviewsCount: res.reviews_count,
      }
      const foodItems = res.food_items.map(e => ({
        cost: e.cost,
        foodType: e.food_type,
        id: e.id,
        imageUrl: e.image_url,
        name: e.name,
        rating: e.rating,
      }))
      this.setState({
        restaurantData,
        foodItemList: foodItems,
        isLoading: false,
      })
    }
  }

  renderLoader = () => (
    <div className="restaurant-loader" testid="restaurant-details-loader">
      <Loader
        type="ThreeDots"
        color="#F7931E"
        height={50}
        width={50}
        testid="restaurants-list-loader"
      />
    </div>
  )

  renderRestaurantItems = () => {
    const {restaurantData, foodItemList} = this.state
    return (
      <>
        <RestaurantBanner details={restaurantData} />
        <ul className="food-items-list">
          {foodItemList.map(each => (
            <FoodItemsCard key={each.id} foodItem={each} />
          ))}
        </ul>
      </>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <>
        <Header />
        {isLoading ? this.renderLoader() : this.renderRestaurantItems()}
        <Footer />
      </>
    )
  }
}

export default RestaurantDetails
