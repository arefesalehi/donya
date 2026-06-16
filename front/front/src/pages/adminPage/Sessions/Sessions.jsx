import './sessions.css'
import AdminTitle from '../../../components/AdminTitle/AdminTitle'
import { useEffect, useState } from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import { useFormik } from 'formik'
const Sessions = () => {
  const [sessions, setSessions] = useState([])
  const [allCourse, setAllCourse] = useState([])
  const [category, setCategory] = useState('-1')

  useEffect(() => {
    getAllSession()
    axios({
      url: 'http://localhost:4000/v1/courses',
    }).then((data) => {
      console.log('all Course:', data.data)
      setAllCourse(data.data)
    })
  }, [])

  const getAllSession = () => {
    axios({
      url: 'http://localhost:4000/v1/courses/sessions',
    }).then((data) => {
      console.log('sessions:', data.data)
      setSessions(data.data)
    })
  }

  const removeSession = (sessionID) => {
    swal({
      title: 'ایا از حذف اطمینان دارید ؟',
      icon: 'warning',
      buttons: ['خیر', 'بله'],
    }).then((data) => {
      if (data) {
        axios({
          url: `http://localhost:4000/v1/courses/sessions/${sessionID}`,
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem('user')).token
            }`,
          },
        }).then((data) => {
          if (data.status === 200) {
            swal({
              title: 'جلسه با موفقیت حذف شد',
              icon: 'success',
              buttons: 'تایید',
            }).then(() => getAllSession())
          }
        })
      }
    })
  }

  const addNewSession = (e) => {
    e.preventDefault()
    axios({
      url: `http://localhost:4000/v1/courses/${category}/sessions`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('user')).token
        }`,
      },
      data: {
        video: form.values.video,
        title: form.values.title,
        time: form.values.time,
        free: form.values.radio,
      },
    }).then((data) => {
      if (data.status === 201) {
        swal({
          title: 'دوره جدید با موفقیت اضافه شد',
          icon: 'success',
          buttons: 'تایید',
        }).then(() => getAllSession())
      }
    })
  }

  const form = useFormik({
    initialValues: {
      title: '',
      time: '',
      category: '-1',
      video: '',
      radio: '',
    },
    onSubmit: (values, { setSubmitting }) => {
      console.log('Form Inputs Data =>', values)
      setTimeout(() => {
        setSubmitting(false)
      }, 2000)
    },
    validate: (values) => {
      const errors = {}

      if (values.title === '') {
        errors.title = 'وارد کردن نام دوره اجباری می‌باشد'
      } else if (values.title.length < 4) {
        errors.title = 'طول عنوان حداقل باید ۴ کاراکتر باشد'
      }

      if (values.time === '') {
        errors.time = 'وارد کردن زمان دوره اجباری می‌باشد'
      }

      if (values.category === '-1') {
        errors.category = 'لطفا یک مورد را انتخاب نمایید'

        if (values.video === '') {
          errors.video = 'هیچ عکسی اپلود نشده است'
        } else if (values.video === -1) {
          errors.video = 'دسته نبدی را انتخاب نمایید'
        }

        // if (values.radio === '') {
        //   errors.radio = 'هیچ موردی انتخاب نشده است'
        // } else if (values.radio !== 'start' && values.radio !== 'presell') {
        //   errors.image = 'دسته نبدی را انتخاب نمایید'
        // }

        return errors
      }
    },
  })

  return (
    <>
      <div className="admin-titles">
        <h1>افزودن جلسه جدید</h1>
      </div>

      <form
        onSubmit={form.handleSubmit}
        style={{
          width: '90%',
          borderRadius: '20px',
          marginRight: '50px',
          marginTop: '20px',
        }}
      >
        <div className="gap-6 grid md:grid-cols-2 mb-6">
          <div>
            <label className="block mb-2 font-extrabold text-gray-900 text-xlg dark:text-white">
              نام دوره
            </label>
            <input
              name="title"
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={form.values.title}
              type="text"
              id="first_name"
              className="block border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 border focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 text-xlg dark:placeholder-gray-400 dark:text-white"
              placeholder="نام دوره را وارد نمایید..."
              required
              style={{ height: '35px', fontSize: '12px' }}
            />
            {form.errors.title && form.touched.title && (
              <p style={{ color: 'red', fontSize: '14px' }}>
                {form.errors.title}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-2 font-extrabold text-gray-900 text-xlg dark:text-white">
              مدت زمان جلسه
            </label>
            <input
              type="Number"
              name="time"
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={form.values.time}
              id="last_name"
              className="block border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 border focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 text-xlg dark:placeholder-gray-400 dark:text-white"
              placeholder=" مدت زمان جلسه را وارد نمایید..."
              required
              style={{ height: '35px', fontSize: '12px' }}
            />
            {form.errors.time && form.touched.time && (
              <p style={{ color: 'red', fontSize: '14px' }}>
                {form.errors.time}
              </p>
            )}
          </div>

          <div className="gap-6 grid md:grid-cols-2">
            <div className="mb-10">
              <label className="block mb-2 font-extrabold text-gray-900 text-xlg dark:text-white">
                منوهای اصلی
              </label>
              <select
                name="category"
                onChange={form.handleChange}
                onClick={(e) => setCategory(e.target.value)}
                defaultValue="-1"
                style={{ height: '35px', fontSize: '12px' }}
                id="countries"
                className="block border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 border focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 text-xlg dark:placeholder-gray-400 dark:text-white"
              >
                <option selected value="-1">
                  منوی اصلی را انتخاب نمایید
                </option>
                {allCourse.map((course) => {
                  return (
                    <option key={course._id} value={course._id}>
                      {course.name}
                    </option>
                  )
                })}
              </select>
              {form.errors.category && form.touched.category && (
                <p style={{ color: 'red', fontSize: '14px' }}>
                  {form.errors.category}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="radio"
              className="block mb-2 font-extrabold text-gray-900 text-xlg dark:text-white"
            >
              وضعیت دوره
            </label>

            <div className="flex items-center mb-4">
              <input
                name="radio"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                value="1"
                checked={form.values.radio === '1 '}
                type="radio"
                className="border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:ring-blue-500 dark:focus:ring-blue-600 focus:ring-2 dark:ring-offset-gray-800 w-4 h-4 text-blue-600"
              />
              {/* {form.errors.radio && form.touched.radio && (
              <p style={{ color: 'red' ,fontSize:'14px'}}>
                {form.errors.radio}
              </p>
            )} */}

              <label className="ml-2 pr-4 font-medium text-gray-900 text-xlg dark:text-gray-300">
                رایگان{' '}
              </label>
            </div>
            <div className="flex items-center">
              <input
                checked={form.values.radio === '0 '}
                type="radio"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                value="0"
                name="radio"
                className="border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:ring-blue-500 dark:focus:ring-blue-600 focus:ring-2 dark:ring-offset-gray-800 w-4 h-4 text-blue-600"
              />
              <label className="ml-2 pr-4 font-medium text-gray-900 text-xlg dark:text-gray-300">
                {' '}
                غیر رایگان
              </label>
            </div>
          </div>

          <div>
            <label className="block mb-2 font-extrabold text-gray-900 text-xlg dark:text-white">
              عکس دوره
            </label>
            <div className="flex justify-center items-center w-full">
              <label className="flex flex-col justify-center items-center border-2 border-gray-300 dark:hover:border-gray-500 dark:border-gray-600 bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700 border-dashed rounded-lg w-full h-40 cursor-pointer">
                <div className="flex flex-col justify-center items-center pt-5 pb-6">
                  <svg
                    className="mb-4 w-8 h-8 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-gray-500 text-xlg dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-gray-500 text-xs dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  name="video"
                  // onChange={form.handleChange}
                  onChange={(event) => {
                    form.setFieldValue('cover', event.currentTarget.files[0])
                  }}
                  onBlur={form.handleBlur}
                  value={form.values.video}
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                />
                {form.errors.video && form.touched.video && (
                  <p style={{ color: 'red', fontSize: '14px' }}>
                    {form.errors.video}
                  </p>
                )}
              </label>
            </div>
          </div>
        </div>

        <button
          disabled={!form.isValid}
          onClick={addNewSession}
          type="submit"
          className={
            !form.isValid
              ? 'text-white bg-[#8d98ff] font-medium rounded-lg text-xlg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              : 'text-white bg-[#7443ff] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xlg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          }
        >
          افزودن
        </button>
      </form>

      <div className="admin-titles">
        <AdminTitle title=" جلسات" />
      </div>

      <div
        className="relative shadow-md mt-10 mr-20 sm:rounded-lg overflow-x-auto"
        style={{ width: '90%', borderRadius: '20px' }}
      >
        <table className="w-full text-gray-500 text-left text-xlg dark:text-gray-400">
          <thead className="text-right bg-gray-50 dark:bg-gray-700 text-gray-700 text-xlg dark:text-gray-400 uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                شناسه
              </th>
              <th scope="col" className="px-6 py-3">
                عنوان
              </th>
              <th scope="col" className="px-6 py-3">
                تایم
              </th>
              <th scope="col" className="px-6 py-3">
                دوره
              </th>
              <th scope="col" className="px-6 py-3">
                نوع دوره
              </th>

              <th scope="col" className="px-6 py-3">
                حذف
              </th>
            </tr>
          </thead>
          <tbody className="text-right">
            {sessions.map((session, index) => {
              return (
                <tr
                  key={session._id}
                  className="dark:border-gray-700 bg-white dark:bg-gray-800 border-b"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">{session.title}</td>
                  <td className="px-6 py-4">{session.time}</td>
                  <td className="px-6 py-4">{session.course.name}</td>
                  <td className="px-6 py-4">
                    {session.free === 0 ? 'رایگان' : 'پولی'}
                  </td>

                  <td className="px-6 py-4">
                    <button
                      style={{
                        background: '#c91c35',
                        color: 'white',
                        borderRadius: '10px',
                        padding: '5px 10px',
                      }}
                      onClick={() => removeSession(session._id)}
                    >
                      حذف
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

export default Sessions
