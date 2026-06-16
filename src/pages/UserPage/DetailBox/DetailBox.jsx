/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
const DetailBox = ({ href, title }) => {
  return (
    <>
      <div className="info-box">
        <Link to={href}>{title}</Link>
      </div>
    </>
  )
}

export default DetailBox
