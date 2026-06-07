import './draft.css'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import axios from 'axios'
const Draft = () => {
  const form = useFormik({
    initialValues: {
      title: '',
      time: '',
      category: '',
      image: '',
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
        errors.title = 'وارد کردن عنوان اجباری می‌باشد'
      } else if (values.title.length < 4) {
        errors.title = 'طول عنوان حداقل باید ۴ کاراکتر باشد'
      }

      if (values.time === '') {
        errors.time = 'وارد کردن  توضیحات دوره اجباری می‌باشد'
      } else if (values.time.length < 8) {
        errors.time = ' توضیحات دوره حداقل باید 8 کاراکتر باشد'
      }

      if (values.category === '') {
        errors.category = 'وارد کردن دسته بندی اجباری می‌باشد'
      } else if (values.category === -1) {
        errors.category = 'دسته نبدی را انتخاب نمایید'
      }

      if (values.image === '') {
        errors.image = 'هیچ عکسی اپلود نشده است'
      } else if (values.image === -1) {
        errors.image = 'دسته نبدی را انتخاب نمایید'
      }

      // if (values.radio === '') {
      //   errors.radio = 'هیچ موردی انتخاب نشده است'
      // } else if (values.radio !== 'start' && values.radio !== 'presell') {
      //   errors.image = 'دسته نبدی را انتخاب نمایید'
      // }

      return errors
    },
  })

  const [categorys, setCategorys] = useState([])
  useEffect(() => {
    axios({
      url: 'http://localhost:4000/v1/category',
    }).then((data) => {
      console.log('category:', data.data)
      setCategorys(data.data)
    })
  }, [])
  return (
    <>
      <div className="admin-titles">
        <h1>افزودن مقاله جدید</h1>
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
              عنوان
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
              لینک
            </label>
            <input
              type="text"
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
        </div>

        <div>
          <label className="block mb-2 font-extrabold text-gray-900 text-xlg dark:text-white">
            چکیده
          </label>
          <textarea
            id="message"
            rows="4"
            className="block border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 mb-4 p-2.5 border focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full h-96 text-gray-900 text-xlg dark:placeholder-gray-400 dark:text-white"
            placeholder="متن خود را وارد نمایید..."
          ></textarea>

          <div>
            <label className="block mb-2 font-extrabold text-gray-900 text-xlg dark:text-white">
              محتوای مقاله
            </label>
            {/* <Editor value={articleBody} setValue={setArticleBody} /> */}
          </div>
        </div>

        <div className="gap-6 grid md:grid-cols-2">
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
                  name="image"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.image}
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                />
                {form.errors.image && form.touched.image && (
                  <p style={{ color: 'red', fontSize: '14px' }}>
                    {form.errors.image}
                  </p>
                )}
              </label>
            </div>
          </div>

          <div className="gap-6 grid md:grid-cols-2">
            <div className="mb-10">
              <label className="block mb-2 font-extrabold text-gray-900 text-xlg dark:text-white">
                منوهای اصلی
              </label>
              <select
                name="category"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                value={form.values.category}
                style={{ height: '35px', fontSize: '12px' }}
                id="countries"
                className="block border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 border focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 text-xlg dark:placeholder-gray-400 dark:text-white"
              >
                <option selected value="-1">
                  منوی اصلی را انتخاب نمایید
                </option>

                {categorys.map((category) => {
                  return (
                    <option key={category._id} value={category._id}>
                      {category.title}
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
        </div>
      </form>

      <div style={{ width: '90%', color: 'white' }}>
        <button className="bg-blue-600 mt-8 mr-20 p-2 rounded-lg">
          انتشار
        </button>
        <button className="bg-blue-600 mr-2 p-2 rounded-lg">پیش نویس</button>
      </div>
    </>
  )
}

export default Draft
