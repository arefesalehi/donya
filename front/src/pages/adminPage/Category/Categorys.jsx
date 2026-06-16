import './category.css'
import AdminTitle from '../../../components/AdminTitle/AdminTitle'
import { useFormik } from 'formik'
import axios from 'axios'
import swal from 'sweetalert'
import { useEffect, useState } from 'react'
const Category = () => {
  const [categorys, setCategorys] = useState([])
  useEffect(() => {
    getAllCategory()
  }, [])

  const getAllCategory = () => {
    axios({
      url: 'http://localhost:4000/v1/category',
    }).then((data) => {
      console.log('category:', data.data)
      setCategorys(data.data)
    })
  }

  const form = useFormik({
    initialValues: {
      title: '',
      href: '',
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
        errors.title = 'طول نام حداقل باید 4 کاراکتر باشد'
      }

      if (values.href === '') {
        errors.href = 'وارد کردن لینک اجباری می‌باشد'
      } else if (values.href.length < 3) {
        errors.href = 'طول نام حداقل باید 3 کاراکتر باشد'
      }

      return errors
    },
  })

  const removeCategory = (categoryID) => {
    swal({
      title: 'ایا از حذف اطمینان دارید؟',
      icon: 'warning',
      buttons: ['خیر', 'بله'],
    }).then((data) => {
      if (data) {
        const localStorageData = JSON.parse(localStorage.getItem('user'))
        axios({
          url: `http://localhost:4000/v1/category/${categoryID}`,
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        }).then((data) => {
          console.log(data)
          if (data.status === 200) {
            swal({
              title: 'دسته بندی با موفقیت حذف شد',
              icon: 'success',
              buttons: 'تایید',
            }).then(() => getAllCategory())
          }
        })
      }
    })
  }

  const addNewCategory = () => {
    const localStorageData = JSON.parse(localStorage.getItem('user'))

    axios({
      url: 'http://localhost:4000/v1/category',
      method: 'POST',
      headers: {
        Authorization: `bearer ${localStorageData.token}`,
      },
      data: {
        title: form.values.title,
        name: form.values.href,
      },
    }).then((data) => {
      console.log(data)
      if (data.status === 201) {
        swal({
          title: 'دسته بندی جدید با موفقیت ثبت شد',
          icon: 'success',
          buttons: 'تایید',
        }).then(() => getAllCategory())
      }
    })
  }

  const editCategory = (categoryID) => {
    swal({
      title: 'عنوان جدید را وارد نمایید',
      content: 'input',
      buttons: 'ثبت عنوان جدید',
    }).then((data) => {
      if (data.trim().length) {
        axios({
          url: `http://localhost:4000/v1/category/${categoryID}`,
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem('user')).token
            }`,
          },
          data: {
            title: data,
            name: data,
          },
        }).then((result) => {
          console.log('res', result)
          swal({
            titel: 'عنوان جدید با موفقیت ثبت گردید',
            icon: 'success',
            buttons: 'تایید',
          }).then(() => getAllCategory())
        })
      }
    })
  }

  return (
    <>
      <div className="admin-titles">
        <h1> افزودن دسته بندی جدید</h1>
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
              type="text"
              id="first_name"
              className="block border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 border focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 text-xlg dark:placeholder-gray-400 dark:text-white"
              placeholder="عنوان خود را وارد نمایید..."
              required
              style={{ height: '35px', fontSize: '12px' }}
              name="title"
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={form.values.title}
            />
            {form.errors.title && form.touched.title && (
              <p style={{ color: 'red', fontSize: '14px' }}>
                {form.errors.title}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-extrabold text-gray-900 text-xlg dark:text-white">
              اسم کوتاه{' '}
            </label>
            <input
              type="text"
              id="first_name"
              className="block border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 border focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 text-xlg dark:placeholder-gray-400 dark:text-white"
              placeholder="اسم کوتاه  را وارد نمایید..."
              required
              style={{ height: '35px', fontSize: '12px' }}
              name="href"
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={form.values.href}
            />
            {form.errors.href && form.touched.href && (
              <p style={{ color: 'red', fontSize: '14px' }}>
                {form.errors.href}
              </p>
            )}
          </div>
        </div>

        <button
          disabled={!form.isValid}
          onClick={addNewCategory}
          type="submit"
          className={
            !form.isValid
              ? 'text-white bg-[#8d98ff] font-medium rounded-lg text-xlg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              : 'text-white bg-[#7443ff] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xlg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          }
        >
          افزودن{' '}
        </button>
      </form>

      <div className="admin-titles">
        <AdminTitle title=" دسته بندی" />
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
                ویرایش
              </th>

              <th scope="col" className="px-6 py-3">
                حذف
              </th>
            </tr>
          </thead>
          <tbody className="text-right">
            {categorys.map((category, index) => {
              return (
                <tr
                  key={category._id}
                  className="dark:border-gray-700 bg-white dark:bg-gray-800 border-b"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">{category.title}</td>
                  <td className="px-6 py-4">
                    <button
                      style={{
                        background: 'blue',
                        color: 'white',
                        borderRadius: '10px',
                        padding: '5px 10px',
                      }}
                      onClick={() => editCategory(category._id)}
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
                      onClick={() => removeCategory(category._id)}
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

export default Category
