import './offs.css'
import AdminTitle from '../../../components/AdminTitle/AdminTitle'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import axios from 'axios'
import swal from 'sweetalert'
const Offs = () => {
  const [offs, setOffs] = useState([])
  const [courses, setCourses] = useState([])

  useEffect(() => {
    getAllOff()
    getAllCourse()
  }, [])

  const getAllCourse = () => {
    axios({
      url: 'http://localhost:4000/v1/courses',
    }).then((data) => {
      console.log('all Course:', data.data)
      setCourses(data.data)
    })
  }

  const getAllOff = () => {
    axios({
      url: 'http://localhost:4000/v1/offs',
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('user')).token
        }`,
      },
    }).then((data) => {
      console.log('offs:', data.data)
      setOffs(data.data)
    })
  }

  const form = useFormik({
    initialValues: {
      code: '',
      percent: '',
      maxUse: '',
      mainMenu: '-1',
    },
    onSubmit: (values, { setSubmitting }) => {
      console.log('Form Inputs Data =>', values)
      setTimeout(() => {
        setSubmitting(false)
      }, 2000)
    },
    validate: (values) => {
      const errors = {}

      if (values.code === '') {
        errors.code = 'وارد کردن کد تخفیف اجباری می‌باشد'
      } else if (values.code.length < 3) {
        errors.code = 'طول نام حداقل باید 3 کاراکتر باشد'
      }

      if (values.percent === '') {
        errors.percent = 'وارد کردن درصد تخفیف اجباری می‌باشد'
      }

      if (values.maxUse === '') {
        errors.maxUse = 'وارد کردن  حداکثر استفاده اجباری می‌باشد'
      }

      if (values.mainMenu === '-1') {
        errors.mainMenu = 'لطفا یک مورد را انتخاب نمایید'
      }

      return errors
    },
  })

  const removeOff = (offID) => {
    const localStorageData = JSON.parse(localStorage.getItem('user'))

    swal({
      title: 'ایا از حذف اطمینان دارید؟',
      icon: 'warning',
      buttons: ['خیر', 'بله'],
    }).then((data) => {
      console.log(data)
      if (data) {
        axios({
          url: `http://localhost:4000/v1/offs/${offID}`,
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        }).then((data) => {
          console.log(data)
          if (data.status === 200) {
            swal({
              title: 'کد تخفیف با موفقیت حذف شد',
              icon: 'success',
              buttons: 'تایید',
            }).then(() => getAllOff())
          }
        })
      }
    })
  }

  const createOff = () => {
    axios({
      url: 'http://localhost:4000/v1/offs',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('user')).token
        }`,
      },
      data: {
        code: form.values.code,
        percent: form.values.percent,
        course: form.values.mainMenu,
        max: form.values.maxUse,
      },
    }).then((data) => {
      console.log(data.data)
      if (data.status === 201) {
        swal({
          title: 'کد تخفیف با موفقیت ایجاد شد',
          icon: 'success',
          buttons: 'تایید',
        }).then(() => getAllOff())
      }
    })
  }

  return (
    <>
      <div className="admin-titles">
        <h1>افزودن کد تخفیف</h1>
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
              کد تخفیف{' '}
            </label>
            <input
              name="code"
              onBlur={form.handleBlur}
              onChange={form.handleChange}
              value={form.values.code}
              type="text"
              id="first_name"
              className="block border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 border focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 text-xlg dark:placeholder-gray-400 dark:text-white"
              placeholder="کد تخفیف  را وارد نمایید..."
              required
              style={{ height: '35px', fontSize: '12px' }}
            />
            {form.errors.code && form.touched.code && (
              <p style={{ color: 'red', fontSize: '14px' }}>
                {form.errors.code}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-2 font-extrabold text-gray-900 text-xlg dark:text-white">
              درصد تخفیف{' '}
            </label>
            <input
              type="text"
              id="last_name"
              className="block border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 border focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 text-xlg dark:placeholder-gray-400 dark:text-white"
              placeholder="درصد تخفیف  را وارد نمایید..."
              required
              style={{ height: '35px', fontSize: '12px' }}
              name="percent"
              onBlur={form.handleBlur}
              onChange={form.handleChange}
              value={form.values.percent}
            />
            {form.errors.percent && form.touched.percent && (
              <p style={{ color: 'red', fontSize: '14px' }}>
                {form.errors.percent}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-extrabold text-gray-900 text-xlg dark:text-white">
              حداکثر استفاده{' '}
            </label>
            <input
              type="text"
              id="last_name"
              className="block border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 border focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 text-xlg dark:placeholder-gray-400 dark:text-white"
              placeholder="حداکثر استفاده  را وارد نمایید..."
              required
              style={{ height: '35px', fontSize: '12px' }}
              name="maxUse"
              onBlur={form.handleBlur}
              onChange={form.handleChange}
              value={form.values.maxUse}
            />
            {form.errors.maxUse && form.touched.maxUse && (
              <p style={{ color: 'red', fontSize: '14px' }}>
                {form.errors.maxUse}
              </p>
            )}
          </div>

          <div className="gap-6 grid md:grid-cols-2">
            <div className="mb-10">
              <label className="block mb-2 font-extrabold text-gray-900 text-xlg dark:text-white">
                منوهای اصلی
              </label>
              <select
                name="mainMenu"
                onBlur={form.handleBlur}
                onChange={form.handleChange}
                defaultValue="-1"
                style={{ height: '35px', fontSize: '12px' }}
                id="countries"
                className="block border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 border focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 text-xlg dark:placeholder-gray-400 dark:text-white"
              >
                <option value="-1" selected>
                  منوی اصلی را انتخاب نمایید
                </option>
                {courses.map((course) => {
                  return (
                    <option key={course._id} value={course._id}>
                      {course.name}
                    </option>
                  )
                })}
              </select>
              {form.errors.mainMenu && form.touched.mainMenu && (
                <p style={{ color: 'red', fontSize: '14px' }}>
                  {form.errors.mainMenu}
                </p>
              )}
            </div>
          </div>
        </div>

        <button
          disabled={!form.isValid}
          onClick={createOff}
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
        <AdminTitle title=" تخفیفات" />
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
                کد
              </th>
              <th scope="col" className="px-6 py-3">
                درصد
              </th>
              <th scope="col" className="px-6 py-3">
                حداکثر استفاده
              </th>
              <th scope="col" className="px-6 py-3">
                دفعات استفاده
              </th>
              <th scope="col" className="px-6 py-3">
                سازنده
              </th>

              <th scope="col" className="px-6 py-3">
                حذف
              </th>
            </tr>
          </thead>
          <tbody className="text-right">
            {offs.map((off, index) => {
              return (
                <tr
                  key={off._id}
                  className="dark:border-gray-700 bg-white dark:bg-gray-800 border-b"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">{off.code}</td>
                  <td className="px-6 py-4">{off.percent}</td>
                  <td className="px-6 py-4">{off.max}</td>

                  <td className="px-6 py-4">{off.uses}</td>
                  <td className="px-6 py-4">{off.creator}</td>

                  <td className="px-6 py-4">
                    <button
                      style={{
                        background: '#c91c35',
                        color: 'white',
                        borderRadius: '10px',
                        padding: '5px 10px',
                      }}
                      onClick={() => removeOff(off._id)}
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

export default Offs
