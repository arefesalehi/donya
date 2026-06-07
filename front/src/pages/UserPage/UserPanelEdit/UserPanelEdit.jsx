import { useFormik } from 'formik'
import './UserPanelEdit.css'
import { useContext } from 'react'
import axios from 'axios'
import AuthContext from '../../../context/Context'
import swal from 'sweetalert'
const UserPanelEdit = () => {
  const authContext = useContext(AuthContext)
  console.log(authContext.userInfo.data)

  const form = useFormik({
    initialValues: {
      name: authContext?.userInfo?.data?.name,
      phone: authContext?.userInfo?.data?.phone,
      username: authContext?.userInfo?.data?.username,
      email: authContext?.userInfo?.data?.email,
      password: '',
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

  const editUserPanel = (e) => {
    e.preventDefault()
    axios({
      url: 'http://localhost:4000/v1/users',
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('user')).token
        }`,
      },
      data: {
        name: form.values.name,
        username: form.values.username,
        email: form.values.email,
        password: form.values.password,
        phone: form.values.phone,
      },
    }).then((data) => {
      console.log('editUser:', data)
      swal({
        title: 'تغییرات با موفقیت ذخیره شد',
        icon: 'success',
        buttons: 'تایید',
      })
    })
  }

  return (
    <>
      <form onSubmit={form.handleSubmit} style={{ width: '60%' }}>
        <div
          className="gap-6 grid md:grid-cols-2 mb-6 myrow"
          style={{ width: '100%' }}
        >
          <div>
            <div className="label"> نام و نام خانوادگی*</div>
            <input
              name="name"
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={form.values.name}
              className="myinput"
              type="text"
              placeholder="لطفا نام و نام خانوادگی خود را وارد نمایید"
            />
            {form.errors.name && form.touched.name && (
              <p style={{ color: 'red', fontSize: '14px' }}>
                {form.errors.name}
              </p>
            )}
          </div>

          <div>
            <div className="label">تلفن همراه*</div>
            <input
              name="phone"
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={form.values.phone}
              className="myinput"
              type="text"
              placeholder="لطفا تلفن همراه خود را وارد نمایید"
            />
            {form.errors.phone && form.touched.phone && (
              <p style={{ color: 'red', fontSize: '14px' }}>
                {form.errors.phone}
              </p>
            )}
          </div>

          <div>
            <div className="label"> نام کاربری (نمایشی)*</div>
            <input
              name="username"
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={form.values.username}
              className="myinput"
              type="text"
              placeholder="لطفا نام نمایشی خود را وارد نمایید"
            />
            {form.errors.username && form.touched.username && (
              <p style={{ color: 'red', fontSize: '14px' }}>
                {form.errors.username}
              </p>
            )}
            <p className="text">
              نام شما به این صورت در حساب کاربری و نظرات دیده خواهد شد.
            </p>
          </div>

          <div>
            <div className="label"> ایمیل*</div>
            <input
              name="email"
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={form.values.email}
              className="myinput"
              type="email"
              placeholder="لطفا ایمیل  خود را وارد نمایید"
            />
            {form.errors.email && form.touched.email && (
              <p style={{ color: 'red', fontSize: '14px' }}>
                {form.errors.email}
              </p>
            )}
          </div>

          <div className="password">
            <div className="pass"> تغییر گذر واژه</div>

            <div>
              <span> گذر واژه جدید</span>
              <input
                name="password"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                value={form.values.password}
                type="text"
                className="myinput pass-input"
                placeholder=" گذر واژه جدید"
              />
              {form.errors.password && form.touched.password && (
                <p style={{ color: 'red', fontSize: '14px' }}>
                  {form.errors.password}
                </p>
              )}
            </div>

            <button
              onClick={editUserPanel}
              disabled={!form.isValid}
              className={
                !form.isValid
                  ? 'text-white mt-4 bg-[#8d98ff] font-medium rounded-lg text-xlg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                  : 'text-white bg-[#7443ff] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xlg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              }
            >
              ذخیره تغییرات
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default UserPanelEdit
