import { useFormik } from 'formik'
import './discount.css'
import axios from 'axios'
import swal from 'sweetalert'

const Discount = () => {
  const form = useFormik({
    initialValues: {
      code: '',
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
      } else if (values.code.length < 2) {
        errors.code = 'طول نام حداقل باید 2 کاراکتر باشد'
      }

      return errors
    },
  })

  const createDiscount = () => {
    const localStorageData = JSON.parse(localStorage.getItem('user'))

    axios({
      url: 'http://localhost:4000/v1/offs/all',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
      data: {
        discount: form.values.code,
      },
    }).then((data) => {
      console.log('discount:', data.data)
      swal({
        title: 'تخفیف همگانی اعمال شد',
        icon: 'success',
        buttons: 'تایید',
      })
    })
  }

  return (
    <>
      <div className="admin-titles">
        <h1> برگزاری کمپین جدید</h1>
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
              type="text"
              id="first_name"
              className="block border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 border focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 text-xlg dark:placeholder-gray-400 dark:text-white"
              placeholder="کد تخفیف  را وارد نمایید..."
              required
              style={{ height: '35px', fontSize: '12px' }}
              name="code"
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={form.values.code}
            />
            {form.errors.code && form.touched.code && (
              <p style={{ color: 'red', fontSize: '14px' }}>
                {form.errors.code}
              </p>
            )}
          </div>
        </div>

        <button
          disabled={!form.isValid}
          onClick={createDiscount}
          type="submit"
          className={
            !form.isValid
              ? 'text-white bg-[#8d98ff] font-medium rounded-lg text-xlg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              : 'text-white bg-[#7443ff] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xlg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          }
        >
          ایجاد کمپین
        </button>
      </form>
    </>
  )
}

export default Discount
