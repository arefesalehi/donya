/* eslint-disable react-hooks/rules-of-hooks */
import './register.css'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import {
  MdAttachEmail,
  MdOutlineDriveFileRenameOutline,
  MdPhoneEnabled,
} from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'
import { BsFillPersonFill } from 'react-icons/bs'
import Topbar from '../../components/topbar/Topbar'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { useContext } from 'react'
import AuthContext from '../../context/Context'
import axios from 'axios'
import swal from 'sweetalert'

const register = () => {
  const authContext = useContext(AuthContext)
  console.log('authContext:', authContext)

  const navigate = useNavigate()

  const userRegister = (e) => {
    e.preventDefault()

    axios({
      url: 'http://localhost:4000/v1/auth/register',
      method: 'POST',
      data: {
        name: form.values.name,
        username: form.values.username,
        phone: form.values.phone,
        email: form.values.email,
        password: form.values.password,
        confirmPassword: form.values.repeatPassword,
      },
    })
      .then((data) => {
        console.log('registerData=>', data)

        console.log('data:', data.data)
        console.log('dataaaa:', data.data.accessToken)
        authContext.login(data.data.user, data.data.accessToken)
      })
      .then(() => {
        swal({
          title: 'ثبت نام با موفقیت انجام شد',
          icon: 'success',
          buttons: 'تایید',
        }).then(() => {
          navigate('/')
        })
      })

      .catch((err) => {
        console.log('err:', err)
        if (err.response.status === 403) {
          swal({
            title: 'این شماره تلفن مسدود می باشد',
            icon: 'error',
            buttons: 'تایید',
          })
        } else if (err.response.status === 400) {
          swal({
            title: 'لطفا فرم های خالی را پر نمایید',
            icon: 'error',
            button: 'تلاش دوباره',
          })
        } else {
          swal({
            title: 'این کاربر قبلا ثبت نام کرده است',
            icon: 'error',
            button: 'تلاش دوباره',
          })
        }
      })
  }

  const form = useFormik({
    initialValues: {
      name: '',
      username: '',
      password: '',
      repeatPassword: '',
      phone: '',
      email: '',
    },

    onSubmit: (values, { setSubmitting }) => {
      console.log('Form Inputs Data =>', values)
      setTimeout(() => {
        setSubmitting(false)
      }, 5000)
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
      } else if (values.username.length < 3) {
        errors.username = 'طول نام حداقل باید 3 کاراکتر باشد'
      }

      if (values.password === '') {
        errors.password = 'وارد کردن رمز عبور اجباری می‌باشد'
      } else if (values.password.length < 8) {
        errors.password = 'رمز عبور حداقل باید 8 کاراکتر باشد'
      }

      if (values.repeatPassword === '') {
        errors.repeatPassword = 'وارد کردن رمز عبور اجباری می‌باشد'
      } else if (values.repeatPassword !== values.password) {
        errors.repeatPassword = 'رمز عبور اشتباه وارد شده است'
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

  return (
    <>
      <Topbar />
      <Navbar />

      <form onSubmit={form.handleSubmit}>
        <div className="login-form">
          <h1>ورود به حساب کاربری</h1>
          <div className="newUser">
            کاربر قدیمی هستید ؟{' '}
            <Link to="/login">
              <span> وارد شوید</span>
            </Link>
          </div>

          <div
            className="relative"
            style={{ width: '90%', margin: '15px auto' }}
          >
            <div className="left-0 absolute inset-y-0 flex items-center pl-3.5 pointer-events-none">
              <BsFillPersonFill />
            </div>

            <input
              type="text"
              name="name"
              value={form.values.name}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              placeholder="نام و نام خانوادگی"
              id="large-input"
              className="block border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-4 border focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 sm:text-md dark:placeholder-gray-400 dark:text-white"
            />
            {form.errors.name && form.touched.name && (
              <p style={{ color: 'red', textAlign: 'center' }}>
                {form.errors.name}
              </p>
            )}
          </div>

          <div
            className="relative"
            style={{ width: '90%', margin: '15px auto' }}
          >
            <div className="left-0 absolute inset-y-0 flex items-center pl-3.5 pointer-events-none">
              <MdOutlineDriveFileRenameOutline />
            </div>

            <input
              type="text"
              name="username"
              value={form.values.username}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              placeholder="نام کاربری"
              id="large-input"
              className="block border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-4 border focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 sm:text-md dark:placeholder-gray-400 dark:text-white"
            />
            {form.errors.username && form.touched.username && (
              <p style={{ color: 'red', textAlign: 'center' }}>
                {form.errors.username}
              </p>
            )}
          </div>

          <div
            className="relative"
            style={{ width: '90%', margin: '15px auto' }}
          >
            <div className="left-0 absolute inset-y-0 flex items-center pl-3.5 pointer-events-none">
              <MdAttachEmail />
            </div>

            <input
              type="text"
              name="email"
              value={form.values.email}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              placeholder="    ادرس ایمیل"
              id="large-input"
              className="block border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-4 border focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 sm:text-md dark:placeholder-gray-400 dark:text-white"
            />
            {form.errors.email && form.touched.email && (
              <p style={{ color: 'red', textAlign: 'center' }}>
                {form.errors.email}
              </p>
            )}
          </div>

          <div
            className="relative"
            style={{ width: '90%', margin: '15px auto' }}
          >
            <div className="left-0 absolute inset-y-0 flex items-center pl-3.5 pointer-events-none">
              <MdPhoneEnabled />
            </div>

            <input
              type="text"
              name="phone"
              value={form.values.phone}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              placeholder="تلفن همراه"
              id="large-input"
              className="block border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-4 border focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 sm:text-md dark:placeholder-gray-400 dark:text-white"
            />
            {form.errors.phone && form.touched.phone && (
              <p style={{ color: 'red', textAlign: 'center' }}>
                {form.errors.phone}
              </p>
            )}
          </div>

          <div
            className="relative"
            style={{ width: '90%', margin: '15px auto' }}
          >
            <div className="left-0 absolute inset-y-0 flex items-center pl-3.5 pointer-events-none">
              <RiLockPasswordFill />
            </div>
            <input
              name="password"
              type="text"
              value={form.values.password}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              placeholder="رمز عبور"
              id="large-input"
              className="block border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-4 border focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 sm:text-md dark:placeholder-gray-400 dark:text-white"
            />
            {form.errors.password && form.touched.password && (
              <p style={{ color: 'red', textAlign: 'center' }}>
                {form.errors.password}
              </p>
            )}
          </div>

          <div
            className="relative"
            style={{ width: '90%', margin: '15px auto' }}
          >
            <div className="left-0 absolute inset-y-0 flex items-center pl-3.5 pointer-events-none">
              <RiLockPasswordFill />
            </div>
            <input
              type="text"
              name="repeatPassword"
              value={form.values.repeatPassword}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              placeholder="تکرار رمز  عبور"
              id="large-input"
              className="block border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-4 border focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 sm:text-md dark:placeholder-gray-400 dark:text-white"
            />
            {form.errors.repeatPassword && form.touched.repeatPassword && (
              <p style={{ color: 'red', textAlign: 'center' }}>
                {form.errors.repeatPassword}
              </p>
            )}
          </div>

          <div className="flex justify-center align-items-center">
            <button
              type="submit"
              disabled={!form.isValid}
              onClick={userRegister}
              className={
                !form.isValid
                  ? 'bg-[#8d98ff] text-white mb-10  focus:ring-4 mt-4   font-medium rounded-lg text-xlg  w-11/12  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  '
                  : 'text-white bg-[#7443ff] mb-10  focus:ring-4 mt-4   font-medium rounded-lg text-xlg  w-11/12  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              }
            >
              عضویت
            </button>
          </div>
        </div>
      </form>

      <Footer />
    </>
  )
}

export default register
