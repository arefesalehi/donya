import './Comments.css'
import AdminTitle from '../../../components/AdminTitle/AdminTitle'
import { useEffect, useState } from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import { BsCheck, BsCheckAll } from 'react-icons/bs'

const Comments = () => {
  const [allComments, setAllComments] = useState([])

  useEffect(() => {
    getAllComment()
  }, [])

  const getAllComment = () => {
    axios({
      url: 'http://localhost:4000/v1/comments',
    }).then((data) => {
      console.log('allcomments:', data.data)
      setAllComments(data.data)
    })
  }

  const removeComment = (commentID) => {
    swal({
      title: 'ایا از حذف اطمینان دارید؟',
      icon: 'warning',
      buttons: ['خیر', 'بله'],
    }).then((data) => {
      if (data) {
        const localStorageData = JSON.parse(localStorage.getItem('user'))

        axios({
          url: `http://localhost:4000/v1/comments/${commentID}`,
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        }).then((data) => {
          console.log(data)
          if (data.status === 200) {
            swal({
              title: 'کامنت با موفقیت حذف شد',
              icon: 'success',
              buttons: 'تایید',
            }).then(() => getAllComment())
          }
        })
      }
    })
  }

  const banComment = (banID) => {
    swal({
      title: 'ایا از مسدودسازی اطمینان دارید؟',
      icon: 'warning',
      buttons: ['خیر', 'بله'],
    }).then((data) => {
      if (data) {
        const localStorageData = JSON.parse(localStorage.getItem('user'))

        axios({
          url: `http://localhost:4000/v1/users/ban/${banID}`,
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        }).then((data) => {
          console.log(data)
          if (data.status === 200) {
            swal({
              title: 'مسدودسازی با موفقیت انجام شد',
              icon: 'success',
              buttons: 'تایید',
            }).then(() => getAllComment())
          }
        })
      }
    })
  }

  const answerComment = (answerID) => {
    const localStorageData = JSON.parse(localStorage.getItem('user'))

    swal({
      title: 'پاسخ خود را وارد نمایید',
      content: 'input',
      buttons: 'ارسال پاسخ',
    }).then((data) => {
      if (data.length) {
        axios({
          url: `http://localhost:4000/v1/comments/answer/${answerID}`,
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
          data: {
            body: data,
          },
        }).then((data) => {
          if (data.status === 200) {
            swal({
              title: 'پاسخ شما با موفقیت ثبت شد',
              icon: 'success',
              buttons: 'تایید',
            }).then(() => getAllComment())
          }
        })
      }
    })
  }

  const seeComment = (body) => {
    swal({
      title: body,
      buttons: 'تایید',
    })
  }

  const acceptComment = (acceptID) => {
    swal({
      title: 'ایا از تایید کامنت اطمینان دارید؟',
      icon: 'warning',
      buttons: ['خیر', 'بله'],
    }).then((data) => {
      console.log(data)
      if (data) {
        const localStorageData = JSON.parse(localStorage.getItem('user'))

        axios({
          url: `http://localhost:4000/v1/comments/accept/${acceptID}`,
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        }).then((data) => {
          console.log(data)
          if (data.status === 200) {
            swal({
              title: 'کامنت با موفقیت تایید شد',
              icon: 'success',
              buttons: 'تایید',
            }).then(() => getAllComment())
          }
        })
      }
    })
  }

  const rejectComment = (rejectID) => {
    swal({
      title: 'ایا از رد کامنت اطمینان دارید؟',
      icon: 'warning',
      buttons: ['خیر', 'بله'],
    }).then((data) => {
      console.log(data)
      if (data) {
        const localStorageData = JSON.parse(localStorage.getItem('user'))

        axios({
          url: `http://localhost:4000/v1/comments/reject/${rejectID}`,
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        }).then((data) => {
          console.log(data)
          if (data.status === 200) {
            swal({
              title: 'کامنت با موفقیت رد شد',
              icon: 'success',
              buttons: 'تایید',
            }).then(() => getAllComment())
          }
        })
      }
    })
  }

  return (
    <>
      <div className="admin-titles">
        <AdminTitle title="کامنت ها" />
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
                دوره
              </th>
              <th scope="col" className="px-6 py-3">
                امتیاز
              </th>
              <th scope="col" className="px-6 py-3">
                پاسخ
              </th>

              <th scope="col" className="px-6 py-3">
                مشاهده
              </th>
              <th scope="col" className="px-6 py-3">
                تایید
              </th>
              <th scope="col" className="px-6 py-3">
                ویرایش
              </th>
              <th scope="col" className="px-6 py-3">
                حذف
              </th>
              <th scope="col" className="px-6 py-3">
                بن
              </th>
            </tr>
          </thead>
          <tbody className="text-right">
            {allComments.map((allcomment, index) => {
              return (
                <tr
                  key={allcomment._id}
                  className="dark:border-gray-700 bg-white dark:bg-gray-800 border-b"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {index + 1}{' '}
                    {allcomment.answer === 1 ? (
                      <BsCheckAll style={{ color: 'green' }} />
                    ) : (
                      <BsCheck style={{ color: 'red' }} />
                    )}
                  </th>
                  <td className="px-6 py-4">{allcomment.creator.name} </td>
                  <td className="px-6 py-4">{allcomment.course}</td>
                  <td className="px-6 py-4">{allcomment.score}</td>
                  <td className="px-6 py-4">
                    <button
                      style={{
                        background: 'blue',
                        color: 'white',
                        borderRadius: '10px',
                        padding: '5px 10px',
                      }}
                      onClick={() => answerComment(allcomment._id)}
                    >
                      پاسخ
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
                      onClick={() => seeComment(allcomment.body)}
                    >
                      مشاهده
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    {allcomment.answer === 1 ? (
                      <button
                        style={{
                          background: '#c91c35',
                          color: 'white',
                          borderRadius: '10px',
                          padding: '5px 10px',
                        }}
                        onClick={() => rejectComment(allcomment._id)}
                      >
                        رد
                      </button>
                    ) : (
                      <button
                        style={{
                          background: '#21cb5d',
                          color: 'white',
                          borderRadius: '10px',
                          padding: '5px 10px',
                        }}
                        onClick={() => acceptComment(allcomment._id)}
                      >
                        تایید
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      style={{
                        background: 'blue',
                        color: 'white',
                        borderRadius: '10px',
                        padding: '5px 10px',
                      }}
                    >
                      ویرایش
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
                      onClick={() => removeComment(allcomment._id)}
                    >
                      حذف
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
                      onClick={() => banComment(allcomment.creator._id)}
                    >
                      بن
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

export default Comments
