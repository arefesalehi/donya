import './messages.css'
import AdminTitle from '../../../components/AdminTitle/AdminTitle'
import { useEffect, useState } from 'react'
import axios from 'axios'
import swal from 'sweetalert'

const Messages = () => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    getAllMessage()
  }, [])

  const getAllMessage = () => {
    axios({
      url: 'http://localhost:4000/v1/contact',
    }).then((data) => {
      console.log('messages:', data.data)
      setMessages(data.data)
    })
  }

  const seeMessage = (messageBody) => {
    swal({
      title: messageBody,
      buttons: 'تایید',
    })
  }

  const removeMessage = (messageID) => {
    swal({
      title: 'ایا از حذف اطمینان دارید؟',
      icon: 'warning',
      buttons: ['خیر', 'بله'],
    }).then((data) => {
      if (data) {
        const localStorageData = JSON.parse(localStorage.getItem('user'))
        axios({
          url: `http://localhost:4000/v1/contact/${messageID}`,
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        }).then((data) => {
          console.log(data)
          if (data.status === 200) {
            swal({
              title: 'دسته بندی با موفقیت حذف شد',
              icon: 'success',
              buttons: 'تایید',
            }).then(() => getAllMessage())
          }
        })
      }
    })
  }

  const answerMessage = (messageEmail) => {
    swal({
      title: 'لطفا پاسخ خود را ثبت نمایید',
      content: 'input',
      buttons: 'ثبت پاسخ',
    }).then((data) => {
      console.log(data)
      if (data.length) {
        const localStorageData = JSON.parse(localStorage.getItem('user'))
        axios({
          url: 'http://localhost:4000/v1/contact/answer',
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
          data: {
            email: messageEmail,
            answer: data,
          },
        }).then((data) => {
          console.log(data)
          if (data.status === 200) {
            swal({
              title: 'پاسخ با موفقیت ثبت شد',
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
        <AdminTitle title="پیام ها" />
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
                نام و نام خانوادگی
              </th>
              <th scope="col" className="px-6 py-3">
                ایمیل
              </th>
              <th scope="col" className="px-6 py-3">
                شماره همراه
              </th>

              <th scope="col" className="px-6 py-3">
                مشاهده
              </th>
              <th scope="col" className="px-6 py-3">
                حذف
              </th>
              <th scope="col" className="px-6 py-3">
                پاسخ
              </th>
            </tr>
          </thead>
          <tbody className="text-right">
            {messages.map((msg, index) => {
              return (
                <tr
                  key={msg._id}
                  className="dark:border-gray-700 bg-white dark:bg-gray-800 border-b"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">{msg.name}</td>
                  <td className="px-6 py-4">{msg.email}</td>
                  <td className="px-6 py-4">{msg.phone}</td>
                  <td className="px-6 py-4">
                    <button
                      style={{
                        background: '#21cb5d',
                        color: 'white',
                        borderRadius: '10px',
                        padding: '5px 10px',
                      }}
                      onClick={() => seeMessage(msg.body)}
                    >
                      مشاهده
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      style={{
                        background: '#c91c35',
                        color: 'white',
                        borderRadius: '10px',
                        padding: '5px 10px',
                      }}
                      onClick={() => removeMessage(msg._id)}
                    >
                      حذف
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
                      onClick={() => answerMessage(msg.email)}
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

export default Messages
