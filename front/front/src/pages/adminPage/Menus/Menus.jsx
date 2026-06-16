/* eslint-disable no-unused-vars */
import './Menus.css'
import AdminTitle from '../../../components/AdminTitle/AdminTitle'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BsCheckCircleFill } from 'react-icons/bs'
import swal from 'sweetalert'
const Menus = () => {
  const [allMenus, setAllMenues] = useState([])
  const [mainMenus, setMainMenus] = useState('-1')

  useEffect(() => {
    getAllMenu()
  }, [])

  const getAllMenu = () => {
    axios({
      url: 'http://localhost:4000/v1/menus/all',
    }).then((data) => {
      console.log('allmenues:', data.data)
      setAllMenues(data.data)
    })
  }

  const deleteMenu = (menuID) => {
    swal({
      title: 'ایا از حذف اطمینان دارید؟',
      icon: 'warning',
      buttons: ['خیر', 'بله'],
    }).then((data) => {
      if (data) {
        const localStorageData = JSON.parse(localStorage.getItem('user'))
        axios({
          url: `http://localhost:4000/v1/menus/${menuID}`,
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
            }).then(() => getAllMenu())
          }
        })
      }
    })
  }

  const addNewMenu = (e) => {
    e.preventDefault()
    const localStorageData = JSON.parse(localStorage.getItem('user'))
    axios({
      url: 'http://localhost:4000/v1/menus/',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
      data: {
        title: form.values.title,
        href: form.values.href,
        parent: mainMenus === '-1' ? undefined : mainMenus,
      },
    }).then((data) => {
      console.log('sfsdfs:', data)
      if (data.status === 201) {
        swal({
          title: 'منوی جدید با موفقیت ثبت شد',
          icon: 'success',
          buttons: 'تایید',
        }).then(() => getAllMenu())
      }
    })
  }

  const form = useFormik({
    initialValues: {
      title: '',
      href: '',
      category: '-1',
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
        errors.title = 'وارد کردن عنوان منو اجباری می‌باشد'
      } else if (values.title.length < 3) {
        errors.title = 'طول عنوان حداقل باید 3 کاراکتر باشد'
      }

      if (values.href === '') {
        errors.href = 'وارد کردن لینک منو اجباری می‌باشد'
      } else if (values.href.length < 3) {
        errors.href = 'طول لینک منو حداقل باید 3 کاراکتر باشد'
      }

      if (values.category === '') {
        errors.category = 'انتخاب دسته بندی الزامیست'
      } else if (values.category === '-1') {
        errors.category = 'انتخاب دسته بندی به صورت پیش فرض است'
      }

      return errors
    },
  })

  return (
    <>
      <div className="admin-titles">
        <h1>افزودن منوی جدید</h1>
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
              عنوان منو
            </label>
            <input
              type="text"
              id="first_name"
              className="block border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 border focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 text-xlg dark:placeholder-gray-400 dark:text-white"
              placeholder="عنوان خود را وارد نمایید..."
              required
              style={{ height: '35px', fontSize: '12px' }}
              name="title"
              value={form.values.title}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
            {form.errors.title && form.touched.title && (
              <p style={{ color: 'red', fontSize: '14px' }}>
                {form.errors.title}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-2 font-extrabold text-gray-900 text-xlg dark:text-white">
              لینک منو
            </label>
            <input
              type="text"
              id="last_name"
              className="block border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 border focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 text-xlg dark:placeholder-gray-400 dark:text-white"
              placeholder="لینک منو را وارد نمایید..."
              required
              name="href"
              style={{ height: '35px', fontSize: '12px' }}
              value={form.values.href}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
            {form.errors.href && form.touched.href && (
              <p style={{ color: 'red', fontSize: '14px' }}>
                {form.errors.href}
              </p>
            )}
          </div>
        </div>

        <div className="gap-6 grid md:grid-cols-4">
          <div className="mb-10">
            <label className="block mb-2 font-extrabold text-gray-900 text-xlg dark:text-white">
              منوهای اصلی
            </label>
            <select
              style={{ height: '35px', fontSize: '12px' }}
              id="countries"
              name="category"
              defaultValue="-1"
              onChange={(e) => setMainMenus(e.target.value)}
              className="block border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 border focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 text-xlg dark:placeholder-gray-400 dark:text-white"
            >
              <option selected value="-1">
                منوی اصلی را انتخاب نمایید
              </option>
              {allMenus.map((allMenu) => {
                return (
                  !allMenu.parent && (
                    <option key={allMenu._id} value={allMenu._id}>
                      {allMenu.title}
                    </option>
                  )
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

        <button
          onClick={addNewMenu}
          style={{ background: '#7443ff' }}
          type="submit"
          disabled={form.isSubmitting}
          className={
            form.isSubmitting
              ? 'text-white bg-blue-700 mb-10 focus:ring-4 mt-4    font-medium rounded-lg text-xlg  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 '
              : 'text-white bg-[#7443ff] mb-10  focus:ring-4 mt-4  font-medium rounded-lg text-xlg   px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          }
        >
          {form.isSubmitting ? 'در حال افزودن ...' : 'افزودن'}
        </button>
      </form>

      <div className="admin-titles">
        <AdminTitle title="منو ها" />
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
                مقصد
              </th>
              <th scope="col" className="px-6 py-3">
                فرزند
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
            {allMenus.map((allMenu, index) => {
              return (
                <>
                  <tr
                    key={allMenu._id}
                    className="dark:border-gray-700 bg-white dark:bg-gray-800 border-b"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                    >
                      {index + 1}
                    </th>
                    <td className="px-6 py-4">{allMenu.title}</td>
                    <td className="px-6 py-4">{allMenu.href}</td>
                    <td className="px-6 py-4">
                      {allMenu.parent ? (
                        allMenu.parent.title
                      ) : (
                        <BsCheckCircleFill />
                      )}
                    </td>

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
                        onClick={() => deleteMenu(allMenu._id)}
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                </>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Menus
