/* eslint-disable no-unused-vars */
import './Courses.css'
import AdminTitle from '../../../components/AdminTitle/AdminTitle'
import { useEffect, useState } from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import { useFormik } from 'formik'

const Courses = () => {
  const [allCourse, setAllCourse] = useState([])
  const [categories, setCategories] = useState([])
  const [selectMenu, setSelectMenu] = useState('-1')

  const form = useFormik({
    initialValues: {
      title: '',
      desc: '',
      href: '',
      price: '',
      category: '-1',
      cover: null,
      status: '',
    },

    onSubmit: (values, { setSubmitting }) => {
      console.log(form.values)
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

      if (values.desc === '') {
        errors.desc = 'وارد کردن  توضیحات دوره اجباری می‌باشد'
      } else if (values.desc.length < 8) {
        errors.desc = ' توضیحات دوره حداقل باید 8 کاراکتر باشد'
      }

      if (values.href === '') {
        errors.href = 'وارد کردن  لینک اجباری می‌باشد'
      } else if (values.href.length < 3) {
        errors.href = 'لینک  حداقل باید 3 کاراکتر باشد'
      }

      if (values.price === '') {
        errors.price = 'وارد کردن  قیمت دوره اجباری می‌باشد'
      }

      if (values.category === '-1') {
        errors.category = 'لطفا یک مورد را انتخاب نمایید'
      }

      if (!values.status) {
        errors.status = 'لطفا وضعیت دوره  را انتخاب کنید.'
      }

      if (!values.cover) {
        errors.cover = 'لطفا عکس را آپلود کنید'
      }

      return errors
    },
  })

  useEffect(() => {
    getAllCourse()
    getAllCategory()
  }, [])

  const getAllCategory = () => {
    axios({
      url: 'http://localhost:4000/v1/category',
    }).then((data) => {
      console.log('allcategory:', data.data)
      setCategories(data.data)
    })
  }

  const getAllCourse = () => {
    axios({
      url: 'http://localhost:4000/v1/courses',
    }).then((data) => {
      console.log('allcourse:', data.data)
      setAllCourse(data.data)
    })
  }

  const removeCourse = (courseID) => {
    swal({
      title: 'ایا از حذف اطمینان دارید؟',
      icon: 'warning',
      buttons: ['خیر', 'بله'],
    }).then((data) => {
      if (data) {
        const localStorageData = JSON.parse(localStorage.getItem('user'))
        axios({
          url: `http://localhost:4000/v1/courses/${courseID}`,
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        }).then((data) => {
          console.log(data)
          if (data.status === 200) {
            swal({
              title: 'حذف با موفقیت انجام شد',
              icon: 'success',
              buttons: 'تایید',
            }).then(() => getAllCourse())
          }
        })
      }
    })
  }

  const addNewCourse = (e) => {
    e.preventDefault()
    axios({
      url: 'http://localhost:4000/v1/courses',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('user')).token
        }`,
      },
      data: {
        name: form.values.title,
        description: form.values.desc,
        cover: form.values.cover,
        shortName: form.values.href,
        price: form.values.price,
        status: form.values.status,
        categoryID: form.values.category,
      },
    }).then((data) => {
      console.log('session data=>', data)
      if (data.status === 201) {
        swal({
          title: 'دوره جدید با موفقیت اضافه شد',
          icon: 'success',
          buttons: 'تایید',
        }).then(() => getAllCourse())
      }
    })
  }

  return (
    <>
      <div className="admin-titles">
        <h1>افزودن دوره جدید</h1>
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
              توضیحات دوره
            </label>
            <input
              name="desc"
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={form.values.desc}
              type="text"
              id="last_name"
              className="block border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 border focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 text-xlg dark:placeholder-gray-400 dark:text-white"
              placeholder="توضیحات محصول را وارد نمایید..."
              required
              style={{ height: '35px', fontSize: '12px' }}
            />
            {form.errors.desc && form.touched.desc && (
              <p style={{ color: 'red', fontSize: '14px' }}>
                {form.errors.desc}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-extrabold text-gray-900 text-xlg dark:text-white">
              url دوره
            </label>
            <input
              name="href"
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={form.values.href}
              type="text"
              id="last_name"
              className="block border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 border focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 text-xlg dark:placeholder-gray-400 dark:text-white"
              placeholder="لینک دوره را وارد نمایید..."
              required
              style={{ height: '35px', fontSize: '12px' }}
            />
            {form.errors.href && form.touched.href && (
              <p style={{ color: 'red', fontSize: '14px' }}>
                {form.errors.href}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-extrabold text-gray-900 text-xlg dark:text-white">
              قیمت دوره
            </label>
            <input
              name="price"
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={form.values.price}
              type="text"
              id="last_name"
              className="block border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 border focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 text-xlg dark:placeholder-gray-400 dark:text-white"
              placeholder="قیمت دوره را وارد نمایید..."
              required
              style={{ height: '35px', fontSize: '12px' }}
            />
            {form.errors.price && form.touched.price && (
              <p style={{ color: 'red', fontSize: '14px' }}>
                {form.errors.price}
              </p>
            )}
          </div>
          {/* <div>
            <label className="block mb-2 font-extrabold text-gray-900 text-xlg dark:text-white">
              نحوه پشتیبانی دوره
            </label>
            <input
              name="support"
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={form.values.support}
              type="text"
              id="last_name"
              className="block border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 border focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 text-xlg dark:placeholder-gray-400 dark:text-white"
              placeholder="نحوه پشتیبانی را وارد نمایید..."
              required
              style={{ height: '35px', fontSize: '12px' }}
            />
            {form.errors.support && form.touched.support && (
              <p style={{ color: 'red', fontSize: '14px' }}>
                {form.errors.support}
              </p>
            )}
          </div> */}
          <div className="mb-10">
            <label className="block mb-2 font-extrabold text-gray-900 text-xlg dark:text-white">
              دسته بندی دوره
            </label>
            <select
              name="category"
              onChange={form.handleChange}
              onClick={(e) => setSelectMenu(e.target.value)}
              defaultValue="-1"
              style={{ height: '35px', fontSize: '12px' }}
              className="block border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 border focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 text-xlg dark:placeholder-gray-400 dark:text-white"
            >
              <option selected value="-1">
                منوی اصلی را انتخاب نمایید
              </option>
              {categories.map((category) => {
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
                  id="cover"
                  name="cover"
                  // onChange={(event) => {
                  //   form.setFieldValue('cover', event.currentTarget.files[0])
                  // }}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.cover}
                  type="file"
                  className="hidden"
                />
                {form.errors.cover && form.touched.cover && (
                  <p style={{ color: 'red', fontSize: '14px' }}>
                    {form.errors.cover}
                  </p>
                )}
              </label>
            </div>
          </div>

          <div>
            <label
              htmlFor="status"
              className="block mb-2 font-extrabold text-gray-900 text-xlg dark:text-white"
            >
              وضعیت دوره
            </label>

            <div className="flex items-center mb-4">
              <input
                type="radio"
                name="status"
                value="start"
                checked={form.values.status === 'start '}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                id="default-radio-1"
                className="border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:ring-blue-500 dark:focus:ring-blue-600 focus:ring-2 dark:ring-offset-gray-800 w-4 h-4 text-blue-600"
              />

              <label className="ml-2 pr-4 font-medium text-gray-900 text-xlg dark:text-gray-300">
                در حال برگزاری{' '}
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                name="status"
                checked={form.values.status === 'presell '}
                onChange={form.handleChange}
                id="default-radio-2"
                onBlur={form.handleBlur}
                value=" presell"
                className="border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:ring-blue-500 dark:focus:ring-blue-600 focus:ring-2 dark:ring-offset-gray-800 w-4 h-4 text-blue-600"
              />

              <label className="ml-2 pr-4 font-medium text-gray-900 text-xlg dark:text-gray-300">
                {' '}
                پیش فروش
              </label>
            </div>
            {form.errors.status && form.touched.status && (
              <p style={{ color: 'red', fontSize: '14px' }}>
                {form.errors.status}
              </p>
            )}
          </div>
        </div>

        <button
          disabled={!form.isValid}
          onClick={addNewCourse}
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
        <AdminTitle title="دوره ها" />
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
                عنوان
              </th>
              <th scope="col" className="px-6 py-3">
                مبلغ
              </th>
              <th scope="col" className="px-6 py-3">
                وضعیت
              </th>
              <th scope="col" className="px-6 py-3">
                لینک
              </th>
              <th scope="col" className="px-6 py-3">
                مدرس
              </th>
              <th scope="col" className="px-6 py-3">
                دسته بندی
              </th>

              <th scope="col" className="px-6 py-3">
                ویرایش
              </th>
              <th scope="col" className="px-6 py-3">
                حذف
              </th>
            </tr>
          </thead>
          <tbody className="text-right">
            {allCourse.map((course, index) => {
              return (
                <tr
                  key={course._id}
                  className="dark:border-gray-700 bg-white dark:bg-gray-800 border-b"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">{course.name}</td>
                  <td className="px-6 py-4">{course.price}</td>
                  <td className="px-6 py-4">
                    {course.isComplete === 0
                      ? 'به اتمام رسیده  '
                      : '  درحال برگزاری'}
                  </td>
                  <td className="px-6 py-4">{course.shortName}</td>
                  <td className="px-6 py-4">{course.creator}</td>
                  <td className="px-6 py-4">{course.categoryID.title}</td>

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
                      onClick={() => removeCourse(course._id)}
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

export default Courses
