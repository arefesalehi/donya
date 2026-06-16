import { useEffect, useState } from 'react'
import AdminTitle from '../../../components/AdminTitle/AdminTitle'
import './tickets.css'
import axios from 'axios'
import swal from 'sweetalert'
import { BsCheckAll, BsCheck } from 'react-icons/bs'
const Tickets = () => {
  const [tickets, setTickets] = useState([])

  useEffect(() => {
    getAllTicket()
  }, [])

  const getAllTicket = () => {
    const localStorageData = JSON.parse(localStorage.getItem('user'))
    axios({
      url: 'http://localhost:4000/v1/tickets',
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    }).then((data) => {
      console.log('tickets:', data.data)
      setTickets(data.data)
    })
  }

  const seeTicket = (ticketbody) => {
    swal({
      title: ticketbody,
    })
  }

  const answerTicket = (ticketID) => {
    swal({
      title: 'لطفا پاسخ خود را وارد نمایید',
      content: 'input',
      buttons: 'ثبت پاسخ',
    }).then((data) => {
      if (data.length) {
        const localStorageData = JSON.parse(localStorage.getItem('user'))
        axios({
          url: `http://localhost:4000/v1/tickets/answer`,
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
          data: {
            body: data,
            ticketID: ticketID,
          },
        }).then((res) => {
          console.log('res:', res)
          if (res.status === 200) {
            swal({
              title: 'پاسخ شما با موفقیت ثبت شد',
              icon: 'success',
              buttons: 'تایید',
            })
          }
        })
      }
    })
  }

  return (
    <>
      <div className="admin-titles">
        <AdminTitle title="تیکت ها" />
      </div>

      <div
        className="relative shadow-md mt-10 mr-20 sm:rounded-lg overflow-x-auto"
        style={{ width: '90%', borderRadius: '20px' }}
      >
        <table className="w-full text-gray-500 text-left text-xlg dark:text-gray-400">
          <thead className="text-right bg-purple-100 dark:bg-gray-700 text-gray-700 text-xlg dark:text-gray-400 uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                شناسه
              </th>
              <th scope="col" className="px-6 py-3">
                کاربر
              </th>
              <th scope="col" className="px-6 py-3">
                عنوان
              </th>
              <th scope="col" className="px-6 py-3">
                نوع تیکت
              </th>

              <th scope="col" className="px-6 py-3">
                اولویت
              </th>
              <th scope="col" className="px-6 py-3">
                مشاهده
              </th>
              <th scope="col" className="px-6 py-3">
                پاسخ
              </th>
            </tr>
          </thead>
          <tbody className="text-right">
            {tickets.map((ticket, index) => {
              return (
                <tr
                  key={ticket._id}
                  className="dark:border-gray-700 bg-white dark:bg-gray-800 border-b"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {index + 1}
                    {ticket.answer === 1 ? (
                      <BsCheckAll style={{ color: 'green' }} />
                    ) : (
                      <BsCheck style={{ color: 'red' }} />
                    )}
                  </th>
                  <td className="px-6 py-4">{ticket.user}</td>
                  <td className="px-6 py-4">{ticket.title}</td>
                  <td className="px-6 py-4">{ticket.departmentSubID}</td>
                  <td className="px-6 py-4">
                    {ticket.priority === 1 && 'بالا'}
                    {ticket.priority === 2 && 'متوسط'}
                    {ticket.priority === 3 && 'ضعیف'}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      style={{
                        background: 'blue',
                        color: 'white',
                        borderRadius: '10px',
                        padding: '5px 10px',
                      }}
                      onClick={() => seeTicket(ticket.body)}
                    >
                      مشاهده
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      style={{
                        background: 'blue',
                        color: 'white',
                        borderRadius: '10px',
                        padding: '5px 10px',
                      }}
                      onClick={() => answerTicket(ticket._id)}
                    >
                      پاسخ
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Tickets
