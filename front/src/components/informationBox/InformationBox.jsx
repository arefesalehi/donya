/* eslint-disable react/prop-types */
import './informationBox.css'
const InformationBox = ({ title, icon, count }) => {
  return (
    <>
      <div className="information">
        <h1>- {title} -</h1>
        <div className="details">
          <span>{count}</span>
          <span>{icon}</span>
        </div>
        <div className="desc">{title} در یک ماه گذشته</div>
      </div>
    </>
  )
}

export default InformationBox
