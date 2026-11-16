/* eslint-disable react/prop-types */
import './headingtitle.css'
import { Link } from 'react-router-dom'
const HeadingTitle = ({ title, buttonTitle, link }) => {
  return (
    <>
      <div className="container">
        <div className="heading-title">
          <div className="heading-title-right">
            <span className="heading-title-right-text">{title}</span>
          </div>
          <div className="heading-title-left">
            {buttonTitle && (
              <Link to={`/${link}`}>
                <button>{buttonTitle}</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default HeadingTitle
