import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'
import './index.css'

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="logo-container">
        <img
          src="https://res.cloudinary.com/dd4ujvcon/image/upload/v1694613699/Frame_275_epnezk.png"
          alt="website-footer-logo"
          className="footer-logo"
        />
        <h1 className="footer-heading">Tasty Kitchens</h1>
      </div>
      <p className="footer-text">
        The only thing we are serious about is food. <br />
        Contact us on
      </p>

      <div>
        <FaPinterestSquare
          className="social-media-icons"
          testid="pintrest-social-icon"
        />
        <FaInstagram
          className="social-media-icons"
          testid="instagram-social-icon"
        />
        <FaTwitter
          className="social-media-icons"
          testid="twitter-social-icon"
        />
        <FaFacebookSquare
          className="social-media-icons"
          testid="facebook-social-icon"
        />
      </div>
    </div>
  )
}
