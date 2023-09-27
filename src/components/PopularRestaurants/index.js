/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {RiArrowDropLeftLine, RiArrowDropRightLine} from 'react-icons/ri'
import Restaurants from '../Restaurants'
import RestaurantHeader from '../RestaurantHeader'
import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class PopularRestaurants extends Component {
  state = {
    popularRestaurantsList: [],
    activePage: 1,
    limit: 9,
    sortOption: sortByOptions[1].value,
    apiStatus: false,
    totalPages: 0,
  }

  componentDidMount() {
    this.renderAllRestaurants()
  }

  onChangeOption = option => {
    this.setState({sortOption: option}, this.renderAllRestaurants)
  }

  renderAllRestaurants = async () => {
    const {sortOption, limit, activePage} = this.state
    this.setState({apiStatus: true})
    const token = Cookies.get('jwt_token')
    const offset = (activePage - 1) * limit
    const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${sortOption}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const fetchRestaurants = await fetch(apiUrl, options)
    const restaurantDetails = await fetchRestaurants.json()
    const totalRestaurants = restaurantDetails.total
    const totalPages = Math.ceil(totalRestaurants / limit)
    if (fetchRestaurants.ok) {
      const modifiedData = restaurantDetails.restaurants.map(eachItem => ({
        id: eachItem.id,
        costForTwo: eachItem.cost_for_two,
        cuisine: eachItem.cuisine,
        groupByTime: eachItem.group_by_time,
        hasOnlineDelivery: eachItem.has_online_delivery,
        hasTableBooking: eachItem.has_table_booking,
        imageUrl: eachItem.image_url,
        isDeliveringNow: eachItem.is_delivering_now,
        location: eachItem.location,
        menuType: eachItem.menu_type,
        name: eachItem.name,
        opensAt: eachItem.opens_at,
        userRating: {
          rating: eachItem.user_rating.rating,
          ratingColor: eachItem.user_rating.rating_color,
          totalReviews: eachItem.user_rating.total_reviews,
        },
      }))
      this.setState({
        popularRestaurantsList: modifiedData,
        apiStatus: false,
        totalPages,
      })
    }
  }

  displayRestaurants = () => {
    const {popularRestaurantsList} = this.state
    return (
      <ul className="restaurants-list" testid="foodItem">
        {popularRestaurantsList.map(eachItem => (
          <Restaurants key={eachItem.id} details={eachItem} />
        ))}
      </ul>
    )
  }

  decrementPage = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState(
        prevState => ({
          activePage: prevState.activePage - 1,
        }),
        this.renderAllRestaurants,
      )
    }
  }

  incrementPage = () => {
    const {activePage} = this.state
    if (activePage < 4) {
      this.setState(
        prevState => ({
          activePage: prevState.activePage + 1,
        }),
        this.renderAllRestaurants,
      )
    }
  }

  renderLoader = () => (
    <div className="carousel-loader" testid="restaurants-list-loader">
      <Loader type="ThreeDots" color="#F7931E" height={50} width={50} />
    </div>
  )

  render() {
    const {activePage, totalPages, apiStatus, sortOption} = this.state
    return (
      <>
        <RestaurantHeader
          sortOption={sortOption}
          sortByOptions={sortByOptions}
          updateOption={this.onChangeOption}
        />
        <hr className="hr-line" />
        {apiStatus ? this.renderLoader() : this.displayRestaurants()}
        <div className="pagination-container">
          <button
            type="button"
            className="pagination-button"
            onClick={this.decrementPage}
            testid="pagination-left-button"
          >
            <RiArrowDropLeftLine size={20} />
          </button>
          <p className="page-count" testid="active-page-number">
            {activePage}
          </p>
          <span
            className="page-count"
            style={{marginLeft: '5px', marginRight: '5px'}}
          >
            of
          </span>
          <p className="page-count"> {totalPages}</p>
          <button
            type="button"
            className="pagination-button"
            onClick={this.incrementPage}
            testid="pagination-right-button"
          >
            <RiArrowDropRightLine size={20} />
          </button>
        </div>
      </>
    )
  }
}

export default PopularRestaurants
