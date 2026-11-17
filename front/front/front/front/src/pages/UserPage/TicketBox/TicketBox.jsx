import './TicketBox.css'
import { HiOutlineTicket } from 'react-icons/hi'
import { VscCircleFilled } from 'react-icons/vsc'
const TicketBox = () => {
  return (
    <>
      <div className="allticketBox">
        <div className="grid ticketBox">
          <span className="">
            <HiOutlineTicket />
            <p>بسته</p>
            <p>1</p>
          </span>
        </div>

        <div className="ticketBox">
          <VscCircleFilled />
          <HiOutlineTicket />
          <p>بسته</p>
          <p>1</p>
        </div>

        <div className="ticketBox">
          <VscCircleFilled />
          <HiOutlineTicket />
          <p>بسته</p>
          <p>1</p>
        </div>

        <div className="ticketBox">
          <HiOutlineTicket />
          <p>بسته</p>
          <p>1</p>
        </div>
      </div>
    </>
  )
}

export default TicketBox
