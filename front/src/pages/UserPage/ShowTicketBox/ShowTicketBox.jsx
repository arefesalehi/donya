/* eslint-disable react/prop-types */

import './showticketbox.css'

import { IoEllipsisVerticalSharp } from 'react-icons/io5'
import { VscCircleFilled } from 'react-icons/vsc'
import { Link } from 'react-router-dom'
const ShowTicketBox = (props) => {
  return (
    <>
      <div className="showTicket">
        <div className="bg-[#efe9ff] showTicketBox">
          <Link
            className="font-bold text-[#7642ff] text-2xl"
            to={`answer/${props._id}`}
          >
            {' '}
            {props.title}
          </Link>
          <p> {props.departmentSubID}</p>
          <div>
            <p> {props.user}</p>
            <span className="answer">
              <VscCircleFilled
                className={props.answer === 0 ? 'no-answer' : 'yes-answer'}
              />{' '}
              {props.answer === 0 ? 'پاسخ داده نشده ' : 'پاسخ داده شده'}{' '}
            </span>
            <span>{props.createdAt.slice(0, 10)}</span>
          </div>

          <button>
            <IoEllipsisVerticalSharp />
            {props.departmentID}{' '}
          </button>
        </div>
      </div>
    </>
  )
}

export default ShowTicketBox
