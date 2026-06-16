import './users.css'
import AdminTitle from '../../../components/AdminTitle/AdminTitle'
import { useEffect, useState } from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import { useFormik } from 'formik'
const Users = () => {
  const [allUsers, setAllUsers] = useState([])
  const form = useFormik({
    initialValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
    },
    onSubmit: (values, { setSubmitting }) => {
      console.log('Form Inputs Data =>', values)
      setTimeout(() => {
        setSubmitting(false)
      }, 2000)
    },
    validate: (values) => {
      const errors = {}

      if (values.name === '') {
        errors.name = 'وارد کردن نام اجباری می‌باشد'
      } else if (values.name.length < 4) {
        errors.name = 'طول نام حداقل باید ۴ کاراکتر باشد'
      }

      if (values.username === '') {
        errors.username = 'وارد کردن نام کاربری اجباری می‌باشد'
      } else if (values.username.length < 4) {
        errors.username = 'طول نام حداقل باید ۴ کاراکتر باشد'
      }

      if (values.password === '') {
        errors.password = 'وارد کردن رمز عبور اجباری می‌باشد'
      } else if (values.password.length < 8) {
        errors.password = 'رمز عبور حداقل باید 8 کاراکتر باشد'
      }

      if (values.confirmPassword === '') {
        errors.confirmPassword = 'وارد کردن رمز عبور اجباری می‌باشد'
      } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'رمز عبور اشتباه وارد شده است'
      }

      if (values.email === '') {
        errors.email = 'وارد کردن ایمیل اجباری می‌باشد'
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = 'ایمیل وارد شده معتبر نیست'
      }

      if (values.phone === '') {
        errors.phone = 'وارد کردن تلفن اجباری می‌باشد'
      } else if (
        !/^(098|0098|98|\+98|0)?9(0[0-5]|[1 3]\d|2[0-3]|9[0-9]|41)\d{7}$/g.test(
          values.phone,
        )
      ) {
        errors.phone = 'تلفن وارد شده معتبر نیست'
      }

      return errors
    },
  })

  useEffect(() => {
    getAllUser()
  }, [])

  const getAllUser = () => {
    const localStorageData = JSON.parse(localStorage.getItem('user'))

    axios({
      url: 'http://localhost:4000/v1/users',
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    }).then((data) => {
      console.log('allusers:', data.data)
      setAllUsers(data.data)
    })
  }

  const removeUser = (userID) => {
    const localStorageData = JSON.parse(localStorage.getItem('user'))
    swal({
      title: 'ایا از حذف اطمینان دارید؟',
      icon: 'warning',
      buttons: ['خیر', 'بله'],
    }).then((data) => {
      if (data) {
        axios({
          url: `http://localhost:4000/v1/users/${userID}`,
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        }).then((res) => {
          console.log('res:', res)
          if (res.status === 200) {
            swal({
              title: 'حذف با موفقیت انجام شد',
              icon: 'success',
              buttons: 'تایید',
            }).then(() => getAllUser())
          }
        })
      }
    })
  }

  const banUser = (banID) => {
    const localStorageData = JSON.parse(localStorage.getItem('user'))
    swal({
      title: 'ایا از مسدود سازی اطمینان دارید؟',
      icon: 'warning',
      buttons: ['خیر', 'بله'],
    }).then((data) => {
      if (data) {
        axios({
          url: `http://localhost:4000/v1/users/ban/${banID}`,
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        }).then((res) => {
          console.log('res:', res)
          if (res.status === 200) {
            swal({
              title: 'مسدود سازی با موفقیت انجام شد',
              icon: 'success',
              buttons: 'تایید',
            }).then(() => getAllUser())
          }
        })
      }
    })
  }

  const addNewUser = async (e) => {
    e.preventDefault()
    await axios({
      url: 'http://localhost:4000/v1/auth/register',
      method: 'POST',
      data: {
        name: form.values.name,
        username: form.values.username,
        phone: form.values.phone,
        email: form.values.email,
        password: form.values.password,
        confirmPassword: form.values.confirmPassword,
      },
    })
      .then((data) => {
        console.log('addnewUser:', data)
        if (data.status === 201) {
          swal({
            title: 'کاربر جدید با موفقیت اضافه شد',
            icon: 'success',
            buttons: 'تایید',
          }).then(() => getAllUser())
        }
      })
      .catch((err) => {
        console.log(err)
        swal({
          title: 'امکان افزودن این کاربر وجود ندارد',
          icon: 'error',
          button: 'تلاش دوباره',
        })
      })
  }

  const chageUserRole = (roleID) => {
    swal({
      title: 'لطفا نقش جدید را وارد نمایید',
      content: 'input',
      buttons: 'تغییر',
    }).then((data) => {
      if (data.length) {
        const localStorageData = JSON.parse(localStorage.getItem('user'))
        axios({
          url: 'http://localhost:4000/v1/users/role',
          method: 'PUT',
          data: {
            role: data,
            id: roleID,
          },
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        }).then((data) => {
          if (data.status === 200) {
            swal({
              title: 'تغییر نقش با موفقیت انجام شد',
              icon: 'sucesss',
              buttons: 'تایید',
            }).then(() => getAllUser())
          }
        })
      }
    })
  }

  return (
    <>
      <div className="admin-titles">
        <h1>افزودن کاربر جدید</h1>
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
              نام و نام خانوادگی
            </label>
            <input
              name="name"
              value={form.values.name}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              type="text"
              id="first_name"
              className="block border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 border focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 text-xlg dark:placeholder-gray-400 dark:text-white"
              placeholder="نام و نام خانوادگی خود را وارد نمایید..."
              required
              style={{ height: '35px', fontSize: '12px' }}
            />
            {form.errors.name && form.touched.name && (
              <p style={{ color: 'red', fontSize: '14px' }}>
                {form.errors.name}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-2 font-extrabold text-gray-900 text-xlg dark:text-white">
              نام کاربری
            </label>
            <input
              type="text"
              name="username"
              value={form.values.username}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              id="last_name"
              className="block border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 border focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 text-xlg dark:placeholder-gray-400 dark:text-white"
              placeholder="نام کاربری را وارد نمایید..."
              required
              style={{ height: '35px', fontSize: '12px' }}
            />
            {form.errors.username && form.touched.username && (
              <p style={{ color: 'red', fontSize: '14px' }}>
                {form.errors.username}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-extrabold text-gray-900 text-xlg dark:text-white">
              ایمیل
            </label>
            <input
              type="text"
              name="email"
              value={form.values.email}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              id="last_name"
              className="block border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 border focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 text-xlg dark:placeholder-gray-400 dark:text-white"
              placeholder=" ایمیل را وارد نمایید..."
              required
              style={{ height: '35px', fontSize: '12px' }}
            />
            {form.errors.email && form.touched.email && (
              <p style={{ color: 'red', fontSize: '14px' }}>
                {form.errors.email}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-extrabold text-gray-900 text-xlg dark:text-white">
              رمز عبور
            </label>
            <input
              type="password"
              name="password"
              value={form.values.password}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              id="last_name"
              className="block border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 border focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 text-xlg dark:placeholder-gray-400 dark:text-white"
              placeholder="رمز عبور را وارد نمایید..."
              required
              style={{ height: '35px', fontSize: '12px' }}
            />
            {form.errors.password && form.touched.password && (
              <p style={{ color: 'red', fontSize: '14px' }}>
                {form.errors.password}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-2 font-extrabold text-gray-900 text-xlg dark:text-white">
              تکرار رمز عبور{' '}
            </label>
            <input
              name="confirmPassword"
              value={form.values.confirmPassword}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              type="password"
              id="last_name"
              className="block border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 border focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 text-xlg dark:placeholder-gray-400 dark:text-white"
              placeholder="رمز عبور را مجددا وارد نمایید..."
              required
              style={{ height: '35px', fontSize: '12px' }}
            />

            {form.errors.confirmPassword && form.touched.confirmPassword && (
              <p style={{ color: 'red', fontSize: '14px' }}>
                {form.errors.confirmPassword}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-2 font-extrabold text-gray-900 text-xlg dark:text-white">
              شماره تلفن{' '}
            </label>
            <input
              name="phone"
              value={form.values.phone}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              type="text"
              id="last_name"
              className="block border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 border focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 text-xlg dark:placeholder-gray-400 dark:text-white"
              placeholder="شماره تلفن  را وارد نمایید..."
              required
              style={{ height: '35px', fontSize: '12px' }}
            />
            {form.errors.phone && form.touched.phone && (
              <p style={{ color: 'red', fontSize: '14px' }}>
                {form.errors.phone}
              </p>
            )}
          </div>
        </div>

        <button
          disabled={!form.isValid}
          onClick={addNewUser}
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
        <AdminTitle title=" کاربران" />
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
                نقش
              </th>
              <th scope="col" className="px-6 py-3">
                ویرایش
              </th>
              <th scope="col" className="px-6 py-3">
                تغییر سطح
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
            {allUsers.map((alluser, index) => {
              return (
                <tr
                  key={alluser._id}
                  className="dark:border-gray-700 bg-white dark:bg-gray-800 border-b"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">{alluser.name}</td>
                  <td className="px-6 py-4">{alluser.email}</td>
                  <td className="px-6 py-4">{alluser.role}</td>
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
                        background: 'blue',
                        color: 'white',
                        borderRadius: '10px',
                        padding: '5px 10px',
                      }}
                      onClick={() => chageUserRole(alluser._id)}
                    >
                      تغییر سطح
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
                      onClick={() => removeUser(alluser._id)}
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
                      onClick={() => banUser(alluser._id)}
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

export default Users
