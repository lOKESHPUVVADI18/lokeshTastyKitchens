import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import Carousel from '../Carousel'
import PopularRestaurants from '../PopularRestaurants'
import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <Header />
      <Carousel />

      <div className="home-container">
        <PopularRestaurants />
      </div>
      <Footer />
    </>
  )
}

export default Home
