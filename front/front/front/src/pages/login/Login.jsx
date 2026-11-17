import './login.css'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import ReCAPTCHA from 'react-google-recaptcha'
import { MdAttachEmail } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'
import Topbar from '../../components/topbar/Topbar'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import AuthContext from '../../context/Context'
import axios from 'axios'
import { useContext } from 'react'
import swal from 'sweetalert'
import { useState } from 'react'

const Login = () => {
  const authContext = useContext(AuthContext)
  const [isGoogleRecaptchaVerify, setIsGoogleRecaptchaVerify] = useState(false)

  const navigate = useNavigate()

  const form = useFormik({
    initialValues: {
      name: '',
      password: '',
      recaptcha: false,
    },
    onSubmit: (values, { setSubmitting }) => {
      console.log('Form Inputs Data =>', values)
      setTimeout(() => {
        setSubmitting(false)
      }, 3000)
    },
    validate: (values) => {
      const errors = {}

      if (values.name === '') {
        errors.name = 'وارد کردن نام اجباری می‌باشد'
      } else if (values.name.length < 4) {
        errors.name = 'طول نام حداقل باید ۴ کاراکتر باشد'
      }

      if (values.password === '') {
        errors.password = 'وارد کردن رمز عبور اجباری می‌باشد'
      } else if (values.password.length < 6) {
        errors.password = 'رمز عبور حداقل باید 6 کاراکتر باشد'
      }

      return errors
    },
  })

  const userLogin = (e) => {
    e.preventDefault()
    axios({
      url: 'http://localhost:4000/v1/auth/login',
      method: 'POST',
      data: {
        identifier: form.values.name,
        password: form.values.password,
      },
    })
      .then((data) => {
        console.log('logindata:', data)
        if (data.status === 200) {
          authContext.login(data.data.user, data.data.accessToken)
          swal({
            title: 'خوش امدید',
            icon: 'success',
            button: 'ورود به پنل',
          }).then(() => {
            navigate('/')
          })
        }
      })
      .catch((err) => {
        console.log(`err =>`, err)
        swal({
          title: 'همچین کاربری وجود ندارد',
          icon: 'error',
          button: 'تلاش دوباره',
        })
      })
  }

  const onchangeHandler = () => {
    setIsGoogleRecaptchaVerify(true)
  }

  return (
    <>
      <Topbar />
      <Navbar />

      <form onSubmit={form.handleSubmit}>
        <div className="login-form">
          <h1>ورود به حساب کاربری</h1>
          <div className="newUser">
            کاربر جدید هستید ؟{' '}
            <Link to="/register">
              {' '}
              <span>ثبت نام</span>
            </Link>
          </div>

          <div
            className="relative"
            style={{ width: '90%', margin: '15px auto' }}
          >
            <div className="left-0 absolute inset-y-0 flex items-center pl-3.5 pointer-events-none">
              <MdAttachEmail />
            </div>

            <input
              name="name"
              value={form.values.name}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              type="text"
              placeholder="نام کاربری "
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
              <RiLockPasswordFill />
            </div>
            <input
              name="password"
              value={form.values.password}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              type="text"
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

          <ReCAPTCHA
            style={{ margin: '20px 80px' }}
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            onChange={onchangeHandler}
            name="recaptcha"
          />

          <div className="flex justify-center align-content-center">
            <button
              type="submit"
              onClick={userLogin}
              disabled={
                form.isSubmitting || !form.isValid || !isGoogleRecaptchaVerify
              }
              className={
                !form.isValid || !isGoogleRecaptchaVerify
                  ? 'bg-[#8d98ff] text-white mb-10  focus:ring-4 mt-4   font-medium rounded-lg text-xlg  w-11/12  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  '
                  : form.isSubmitting
                  ? 'bg-[#8d65ff] text-white mb-10  focus:ring-4 mt-4   font-medium rounded-lg text-xlg  w-11/12  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  '
                  : 'text-white bg-[#7443ff] mb-10  focus:ring-4 mt-4   font-medium rounded-lg text-xlg  w-11/12  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              }
            >
              {form.isSubmitting ? 'در حال  ورود ...' : 'ورود'}
            </button>
          </div>
        </div>
      </form>

      <Footer />
    </>
  )
}

export default Login
