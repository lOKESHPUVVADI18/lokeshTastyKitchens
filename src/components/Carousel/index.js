/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

class Carousel extends Component {
  state = {carouselImagesList: [], apiStatus: true}

  componentDidMount() {
    this.getCarouseImages()
  }

  displayCarouselImages = () => {
    const {carouselImagesList} = this.state
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
    }
    return (
      <ul className="carousal-container">
        <Slider {...settings} className="carousal">
          {carouselImagesList.map(each => (
            <li key={each.id}>
              <img
                src={each.image_url}
                alt="offer"
                className="carousal-item-image"
              />
            </li>
          ))}
        </Slider>
      </ul>
    )
  }

  getCarouseImages = async () => {
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const fetchCarouse = await fetch(url, options)
    const carouseImage = await fetchCarouse.json()
    if (fetchCarouse.ok) {
      const images = carouseImage.offers
      this.setState({
        carouselImagesList: images,
        apiStatus: false,
      })
    }
  }

  renderLoader = () => (
    <div
      className="restaurants-offers-loader"
      testid="restaurants-offers-loader"
    >
      <Loader type="ThreeDots" color="#F7931E" height={50} width={50} />
    </div>
  )

  render() {
    const {apiStatus} = this.state
    return apiStatus ? this.renderLoader() : this.displayCarouselImages()
  }
}

export default Carousel
