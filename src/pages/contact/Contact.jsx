import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/navbar/Navbar'
import { MdAttachEmail, MdPhoneEnabled } from 'react-icons/md'
import { BsFillPersonFill } from 'react-icons/bs'
import './contact.css'
import Topbar from '../../components/topbar/Topbar'
import { useFormik } from 'formik'
import axios from 'axios'
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom'
const Contact = () => {
  const navigate = useNavigate()

  const form = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      textarea: '',
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

      if (values.textarea === '') {
        errors.textarea = 'وارد کردن متن پیام اجباری می‌باشد'
      } else if (values.textarea.length < 10) {
        errors.textarea = 'طول نام حداقل باید 10 کاراکتر باشد'
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

  const contactHandler = (e) => {
    e.preventDefault()
    axios({
      url: 'http://localhost:4000/v1/contact',
      method: 'POST',
      data: {
        name: form.values.name,
        email: form.values.email,
        phone: form.values.phone,
        body: form.values.textarea,
      },
    })
      .then((data) => {
        console.log(data.data)
      })
      .then(() => {
        swal({
          title: 'پیغام شما با موفقیت ثبت شد',
          icon: 'success',
          button: 'ورود به صفحه اصلی',
        }).then(() => {
          navigate('/')
        })
      })
  }

  return (
    <>
      <Topbar />
      <Navbar />

      <form onSubmit={form.handleSubmit}>
        <div className="contact-form">
          <div className="contact-form-right">
            <img
              src="images/picography-business-man-laptop-wireframes-small-2-768x512.jpg"
              alt=""
            />
          </div>
          <div className="contact-form-left">
            <div className="contact-info">
              <h1>ارتباط با ما</h1>
              <form className="fform">
                <div className="relative z-0 mb-6 group">
                  <input
                    style={{ fontSize: '14px' }}
                    type="text"
                    name="name"
                    value={form.values.name}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    id="floating_email"
                    className="block border-0 border-gray-300 dark:border-gray-600 bg-transparent px-0 py-2.5 border-b-2 dark:focus:border-blue-500 focus:border-blue-600 focus:ring-0 w-full text-gray-900 text-sm dark:text-white appearance-none focus:outline-none peer"
                    placeholder=" "
                    required
                  />
                  {form.errors.name && form.touched.name && (
                    <p style={{ color: 'red', textAlign: 'center' }}>
                      {form.errors.name}
                    </p>
                  )}

                  <label
                    style={{ marginTop: '-17px' }}
                    className="top-3 peer-focus:left-0 -z-10 absolute peer-focus:font-medium text-gray-500 text-xlg peer-focus:text-blue-600 peer-focus:dark:text-blue-500 dark:text-gray-400 transform origin-[0] -translate-y-6 peer-focus:-translate-y-6 peer-placeholder-shown:translate-y-0 duration-300 scale-75 peer-placeholder-shown:scale-100 peer-focus:scale-75"
                  >
                    <BsFillPersonFill /> نام و نام خانوادگی
                  </label>
                </div>

                <div className="relative z-0 mb-6 group">
                  <input
                    style={{ fontSize: '14px' }}
                    type="email"
                    name="email"
                    value={form.values.email}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    id="floating_email"
                    className="block border-0 border-gray-300 dark:border-gray-600 bg-transparent px-0 py-2.5 border-b-2 dark:focus:border-blue-500 focus:border-blue-600 focus:ring-0 w-full text-gray-900 text-sm dark:text-white appearance-none focus:outline-none peer"
                    placeholder=" "
                    required
                  />
                  {form.errors.email && form.touched.email && (
                    <p style={{ color: 'red', textAlign: 'center' }}>
                      {form.errors.email}
                    </p>
                  )}

                  <label
                    style={{ marginTop: '-14px' }}
                    className="top-3 peer-focus:left-0 -z-10 absolute peer-focus:font-medium text-gray-500 text-xlg peer-focus:text-blue-600 peer-focus:dark:text-blue-500 dark:text-gray-400 transform origin-[0] -translate-y-6 peer-focus:-translate-y-6 peer-placeholder-shown:translate-y-0 duration-300 scale-75 peer-placeholder-shown:scale-100 peer-focus:scale-75"
                  >
                    <MdAttachEmail /> ایمیل
                  </label>
                </div>

                <div className="relative z-0 mb-6 group">
                  <input
                    style={{ fontSize: '14px' }}
                    type="text"
                    name="phone"
                    value={form.values.phone}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    id="floating_email"
                    className="block border-0 border-gray-300 dark:border-gray-600 bg-transparent px-0 py-2.5 border-b-2 dark:focus:border-blue-500 focus:border-blue-600 focus:ring-0 w-full text-gray-900 text-sm dark:text-white appearance-none focus:outline-none peer"
                    placeholder=" "
                    required
                  />
                  {form.errors.phone && form.touched.phone && (
                    <p style={{ color: 'red', textAlign: 'center' }}>
                      {form.errors.phone}
                    </p>
                  )}

                  <label
                    style={{ marginTop: '-14px' }}
                    className="top-3 peer-focus:left-0 -z-10 absolute peer-focus:font-medium text-gray-500 text-xlg peer-focus:text-blue-600 peer-focus:dark:text-blue-500 dark:text-gray-400 transform origin-[0] -translate-y-6 peer-focus:-translate-y-6 peer-placeholder-shown:translate-y-0 duration-300 scale-75 peer-placeholder-shown:scale-100 peer-focus:scale-75"
                  >
                    <MdPhoneEnabled /> تلفن همراه
                  </label>
                </div>

                <label
                  style={{ marginTop: '-17px' }}
                  className="block mb-2 font-medium text-gray-900 text-xlg dark:text-white"
                >
                  پیام شما{' '}
                </label>
                <textarea
                  id="message"
                  rows="4"
                  name="textarea"
                  value={form.values.textarea}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  className="block border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 border focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 text-sm dark:placeholder-gray-400 dark:text-white"
                  placeholder=" لطفا پیام خود را وارد نمایید..."
                  style={{ height: '136px' }}
                ></textarea>
                {form.errors.textarea && form.touched.textarea && (
                  <p style={{ color: 'red', textAlign: 'center' }}>
                    {form.errors.textarea}
                  </p>
                )}

                <button
                  style={{ background: '#7443ff', marginBottom: '20px' }}
                  type="submit"
                  onClick={contactHandler}
                  className="bg-blue-700 hover:bg-blue-800 dark:hover:bg-blue-700 dark:bg-blue-600 mt-4 px-5 py-2.5 rounded-lg focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 w-402 w-full font-medium text-center text-white focus:outline-none text-xlg"
                >
                  ارسال
                </button>
              </form>
            </div>
          </div>
        </div>
      </form>

      <Footer />
    </>
  )
}

export default Contact
