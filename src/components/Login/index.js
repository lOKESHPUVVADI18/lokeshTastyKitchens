import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMessage: '', isError: false}

  onChangeUser = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 1})
    history.replace('/')
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const fetchData = await fetch(url, options)
    const data = await fetchData.json()
    if (fetchData.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.setState({isError: true, errorMessage: data.error_msg})
    }
  }

  render() {
    const {username, password, isError, errorMessage} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <>
        <div className="app-container">
          <img
            src="https://res.cloudinary.com/dd4ujvcon/image/upload/v1694613335/Rectangle_1457_ifdc0a.png"
            className="login-sm-image"
            alt="website login"
          />
          <div className="login-image-container">
            <img
              src="https://res.cloudinary.com/dd4ujvcon/image/upload/v1694613207/Rectangle_1456_1_b5skas.png"
              className="login-bg-image"
              alt="website login"
            />
          </div>
          <div className="login-form-container">
            <form className="form-container" onSubmit={this.onSubmitForm}>
              <div>
                <img
                  src="https://res.cloudinary.com/dd4ujvcon/image/upload/v1694612564/Group_7420_tyh0gf.png"
                  className="logo"
                  alt="website logo"
                />
              </div>
              <h1 className="login-heading">Tasty Kitchens</h1>
              <h1 className="login-text">Login</h1>
              <div className="login-details">
                <label htmlFor="USERNAME" className="form-label">
                  USERNAME
                </label>
                <input
                  id="USERNAME"
                  type="text"
                  className="form-input"
                  value={username}
                  onChange={this.onChangeUser}
                />
                <label htmlFor="PASSWORD" className="form-label">
                  PASSWORD
                </label>
                <input
                  type="password"
                  id="PASSWORD"
                  className="form-input"
                  value={password}
                  onChange={this.onChangePassword}
                />
                {isError && <p className="error-text">{errorMessage}</p>}
                <button type="submit" className="login-button">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    )
  }
}

export default Login
