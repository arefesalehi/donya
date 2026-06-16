import './userTicket.css'
import ShowTicketBox from '../ShowTicketBox/ShowTicketBox'
import { Link } from 'react-router-dom'
import TicketBox from '../TicketBox/TicketBox'
import { useEffect, useState } from 'react'
import axios from 'axios'
const UserTicket = () => {
  const [allTickets, setAllTickets] = useState([])
  useEffect(() => {
    axios({
      url: 'http://localhost:4000/v1/tickets',
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('user')).token
        }`,
      },
    }).then((data) => {
      console.log('allticket:', data.data)
      setAllTickets(data.data)
    })
  }, [])
  return (
    <>
      <div className="send-ticket">
        <div className="ticktick">
          <div>
            <h1> همه تیکت ها </h1>
          </div>
          <div className="btntick">
            <button>
              <Link to="/my-account/send-ticket" className="btn-ticket">
                ارسال تیکت جدید{' '}
              </Link>
            </button>
          </div>
        </div>

        <TicketBox />

        <div className="selectTicket">
          <div className="selectTicket-right">
            <select name="" id="">
              <option value="">همه</option>
            </select>
            <select name="" id="">
              <option value="">همه</option>
            </select>
            <select name="" id="">
              <option value="">همه</option>
            </select>
            <button>اعمال</button>
          </div>
          <div className="selectTicket-left"></div>
        </div>

        <p className="mt-20 font-bold">نمایش یک تیکت</p>

        {allTickets.map((allticket) => {
          return (
            <>
              <ShowTicketBox key={allticket._id} {...allticket} />
            </>
          )
        })}
      </div>
    </>
  )
}

export default UserTicket
