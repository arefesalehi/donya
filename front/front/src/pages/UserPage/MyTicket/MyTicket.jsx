/* eslint-disable react-hooks/exhaustive-deps */
import './myTicket.css'
import { Link, useParams } from 'react-router-dom'
import { FaChevronCircleRight } from 'react-icons/fa'
import { FaMicrophoneAlt } from 'react-icons/fa'
import { MdAttachFile } from 'react-icons/md'
import { useContext, useEffect, useState } from 'react'
import AuthContext from '../../../context/Context'
import axios from 'axios'

const MyTicket = () => {
  const [answerTicket, setAnswerTicket] = useState([])
  const [admin, setAdmin] = useState([])
  const authContext = useContext(AuthContext)
  console.log(authContext)

  const { id } = useParams()

  useEffect(() => {
    axios({
      url: `http://localhost:4000/v1/tickets/answer/${id}`,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('user')).token
        }`,
      },
    }).then((data) => {
      console.log('answerTicket:', data.data)
      setAnswerTicket(data.data)
    })
  }, [])

  useEffect(() => {
    axios({
      url: `http://localhost:4000/v1/infos/p-admin`,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('user')).token
        }`,
      },
    }).then((data) => {
      console.log('admin:', data.data)
      setAdmin(data.data)
    })
  }, [])

  return (
    <>
      <div className="send-ticket">
        <div className="row ticktick">
          <div className="col-md-12">
            <h1> همه تیکت ها </h1>
          </div>

          <div className="btntick col-md-12">
            <Link to="/my-account/send-ticket" className="btn-ticket">
              ارسال تیکت جدید{' '}
            </Link>
          </div>
        </div>

        <div className="ticket-first">
          <div className="ticket-title">
            <FaChevronCircleRight />
            <div>
              <div>تیکت تست</div>
              <div>شناسه تیکت : 2302</div>
            </div>
          </div>

          <div className="ticket-icon">
            <span className="first">
              <FaMicrophoneAlt /> 0
            </span>
            <span>
              <MdAttachFile /> 0
            </span>
            <button>+ ارسال پاسخ</button>
          </div>
        </div>

        <div className="first-msg">
          <div>{answerTicket.ticket}</div>
        </div>
        <div className="msg-detail">
          <p>{authContext.userInfo.name} </p>
          <p>{authContext.userInfo.createdAt?.slice(0, 10)}</p>
          <p>{authContext.userInfo.createdAt?.slice(11, 16)}</p>
          <button>+ پاسخ ها</button>
        </div>

        <div>
          <div className="answer-msg">
            {answerTicket.answer === null
              ? 'هنوز پاسخی داده نشده است'
              : answerTicket.answer}
          </div>
        </div>
        <span className="msg-detail1">
          <p> {admin.adminName} </p>
          <p>20/4/2015</p>
          <p>14:05</p>
        </span>
      </div>
    </>
  )
}

export default MyTicket
