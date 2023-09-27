import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoIosCloseCircle} from 'react-icons/io'
import Cookies from 'js-cookie'
import './index.css'

class Header extends Component {
  state = {onClickMenu: false}

  onToggleMenu = () => {
    this.setState(prevState => ({onClickMenu: !prevState.onClickMenu}))
  }

  onCloseButton = () => {
    this.setState({onClickMenu: false})
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    const {onClickMenu} = this.state
    console.log(onClickMenu)
    return (
      <>
        <nav className="nav-container">
          <Link to="/" className="link-text">
            <div className="nav-logo-container">
              <img
                src="https://res.cloudinary.com/dd4ujvcon/image/upload/v1694612564/Group_7420_tyh0gf.png"
                alt="website logo"
                className="nav-logo"
              />
              <h1 className="nav-text">Tasty Kitchens</h1>
            </div>
          </Link>
          <button
            type="button"
            className="nav-button"
            onClick={this.onToggleMenu}
          >
            <GiHamburgerMenu className="nav-hamburg" />
          </button>
          <ul className="nav-list-bg">
            <Link to="/" className="link-text">
              <li className="nav-items">Home</li>
            </Link>
            <Link to="/cart" className="link-text">
              <li className="nav-items">Cart</li>
            </Link>
            <li>
              <button
                type="button"
                className="logout-button"
                onClick={this.onClickLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
        {onClickMenu ? (
          <div className="menu-list">
            <ul className="nav-list">
              <Link to="/">
                <li className="nav-items">Home</li>
              </Link>
              <Link to="/cart">
                <li className="nav-items">Cart</li>
              </Link>
              <li>
                <button
                  type="button"
                  className="logout-button"
                  onClick={this.onClickLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
            <button
              type="button"
              className="nav-button"
              onClick={this.onCloseButton}
            >
              <IoIosCloseCircle className="close-button" />
            </button>
          </div>
        ) : null}
      </>
    )
  }
}

export default withRouter(Header)
