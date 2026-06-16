/* eslint-disable no-unused-vars */
import './articles.css'
import { useFormik } from 'formik'
import AdminTitle from '../../../components/AdminTitle/AdminTitle'
import { useEffect, useState } from 'react'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import axios from 'axios'
import swal from 'sweetalert'
import { Link } from 'react-router-dom'
import Editor from '../../../components/form/Editor'

const Articles = () => {
  const [articleBody, setArticleBody] = useState('')
  const [categorys, setCategorys] = useState([])

  const [articles, setArticles] = useState([])

  useEffect(() => {
    getAllArticle()
    axios({
      url: 'http://localhost:4000/v1/category',
    }).then((data) => {
      console.log('category:', data.data)
      setCategorys(data.data)
    })
  }, [])

  const getAllArticle = () => {
    axios({
      url: 'http://localhost:4000/v1/articles',
    }).then((data) => {
      console.log('allarticle:', data.data)
      setArticles(data.data)
    })
  }

  const form = useFormik({
    initialValues: {
      title: '',
      shortName: '',
      categoryID: '',
      cover: null,
      description: '',
      body: '',
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

      if (values.shortName === '') {
        errors.shortName = 'وارد کردن  لینک دوره اجباری می‌باشد'
      } else if (values.shortName.length < 3) {
        errors.shortName = ' لینک دوره حداقل باید 3 کاراکتر باشد'
      }

      if (values.categoryID === '') {
        errors.categoryID = 'وارد کردن دسته بندی اجباری می‌باشد'
      } else if (values.categoryID === -1) {
        errors.categoryID = 'دسته نبدی را انتخاب نمایید'
      }

      if (!values.cover) {
        errors.cover = 'هیچ عکسی اپلود نشده است'
      } else if (!['image/jpeg', 'image/png'].includes(values.cover.type)) {
        errors.cover = 'فقط فایل‌های JPEG و PNG مجاز هستند'
      }

      if (values.description === '') {
        errors.description = 'هیچ موردی انتخاب نشده است'
      } else if (values.shortName.length < 3) {
        errors.description = ' لینک دوره حداقل باید 3 کاراکتر باشد'
      }

      if (values.body === '') {
        errors.body = 'هیچ موردی انتخاب نشده است'
      } else if (values.body.length < 3) {
        errors.body = ' لینک دوره حداقل باید 3 کاراکتر باشد'
      }

      return errors
    },
  })

  const removeArticle = (articleID) => {
    swal({
      title: 'ایا از حذف اطمینان دارید ؟',
      icon: 'warning',
      buttons: ['خیر', 'بله'],
    }).then((data) => {
      if (data) {
        axios({
          url: `http://localhost:4000/v1/articles/${articleID}`,
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem('user')).token
            }`,
          },
        }).then((data) => {
          console.log(data)
          if (data.status === 200) {
            swal({
              title: 'مقاله با موفقیت حذف شد',
              icon: 'success',
              buttons: 'تایید',
            }).then(() => getAllArticle())
          }
        })
      }
    })
  }

  const postNewArticle = (e) => {
    e.preventDefault()
    const newArticle = {
      cover: form.values.cover,
      title: form.values.title,
      description: form.values.description,
      body: form.values.body,
      shortName: form.values.shortName,
      categoryID: form.values.categoryID,
    }

    console.log('newarticle=>', newArticle)

    fetch('http://localhost:4000/v1/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('user')).token
        }`,
      },
      body: JSON.stringify(newArticle),
    })
      .then((res) => {
        console.log('ress=>', res)
        return res.json()
      })
      .then((data) => {
        console.log('Response data:', data)
      })
      .catch((error) => {
        console.error('Fetch error:', error.message)
      })
  }

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
              name="shortName"
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={form.values.shortName}
              id="last_name"
              className="block border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 border focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 text-xlg dark:placeholder-gray-400 dark:text-white"
              placeholder=" لینک را وارد نمایید..."
              required
              style={{ height: '35px', fontSize: '12px' }}
            />
            {form.errors.shortName && form.touched.shortName && (
              <p style={{ color: 'red', fontSize: '14px' }}>
                {form.errors.shortName}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block mb-2 font-extrabold text-gray-900 text-xlg dark:text-white">
            چکیده
          </label>
          <textarea
            name="body"
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            value={form.values.body}
            id="message"
            rows="4"
            className="block border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 mb-4 p-2.5 border focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full h-96 text-gray-900 text-xlg dark:placeholder-gray-400 dark:text-white"
            placeholder="متن خود را وارد نمایید..."
          ></textarea>
          {form.errors.body && form.touched.body && (
            <p style={{ color: 'red', fontSize: '14px' }}>{form.errors.body}</p>
          )}

          <div>
            <label className="block mb-2 font-extrabold text-gray-900 text-xlg dark:text-white">
              محتوای مقاله
            </label>

            <Editor
              value={form.values.description}
              setValue={(value) => form.setFieldValue('description', value)}
            />

            {form.errors.description && form.touched.description && (
              <p style={{ color: 'red', fontSize: '14px' }}>
                {form.errors.description}
              </p>
            )}
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
                  name="cover"
                  // onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  // value={form.values.cover }
                  id="cover"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.currentTarget.files[0]
                    form.setFieldValue('cover', file)
                  }}
                />
                {form.errors.cover && form.touched.cover && (
                  <p style={{ color: 'red', fontSize: '14px' }}>
                    {form.errors.cover}
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
                name="categoryID"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                value={form.values.categoryID}
                style={{ height: '35px', fontSize: '12px' }}
                id="countries"
                className="block border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 border focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 text-xlg dark:placeholder-gray-400 dark:text-white"
              >
                <option defaultValue="-1">
                  لطفا دسته بندی مورد نظر را انتخاب نمایید
                </option>
                {categorys.map((category) => {
                  return (
                    <option key={category._id} value={category._id}>
                      {category.title}
                    </option>
                  )
                })}
              </select>
              {form.errors.categoryID && form.touched.categoryID && (
                <p style={{ color: 'red', fontSize: '14px' }}>
                  {form.errors.categoryID}
                </p>
              )}
            </div>
          </div>
        </div>
      </form>

      <div style={{ width: '90%', color: 'white' }}>
        <button
          disabled={!form.isValid}
          type="submit"
          className={
            !form.isValid
              ? 'text-white bg-[#8d98ff] font-medium rounded-lg text-xlg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              : 'text-white bg-[#7443ff] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xlg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          }
          onClick={postNewArticle}
        >
          انتشار
        </button>
        <button className="bg-blue-600 mr-2 p-2 rounded-lg">پیش نویس</button>
      </div>

      <div className="admin-titles">
        <AdminTitle title=" مقاله ها" />
      </div>

      <div
        className="relative shadow-md mt-10 mr-20 sm:rounded-lg overflow-x-auto"
        style={{ width: '90%', borderRadius: '20px' }}
      >
        <table className="w-full text-gray-500 text-left text-xlg dark:text-gray-400">
          <thead className="text-right bg-gray-50 dark:bg-gray-700 text-gray-700 text-xlg dark:text-gray-400 uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                شناسه
              </th>
              <th scope="col" className="px-6 py-3">
                عنوان
              </th>
              <th scope="col" className="px-6 py-3">
                لینک
              </th>
              <th scope="col" className="px-6 py-3">
                نویسنده
              </th>
              <th scope="col" className="px-6 py-3">
                وضعیت{' '}
              </th>
              <th scope="col" className="px-6 py-3">
                مشاهده
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
            {articles.map((article, index) => {
              return (
                <tr
                  key={article._id}
                  className="dark:border-gray-700 bg-white dark:bg-gray-800 border-b"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">{article.title}</td>
                  <td className="px-6 py-4">{article.shortName}</td>
                  <td className="px-6 py-4">{article.creator.name}</td>
                  <td className="px-6 py-4">
                    {article.publish === 1 ? 'منتشر شده' : 'پیش نویس'}
                  </td>
                  <td>
                    {article.publish === 1 ? (
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <BsFillCheckCircleFill />
                      </div>
                    ) : (
                      <td className="px-6 py-4">
                        <Link to={`draft/${article.shortName}`}>
                          <button
                            style={{
                              background: 'blue',
                              color: 'white',
                              borderRadius: '10px',
                              padding: '5px 10px',
                            }}
                          >
                            ادامه نوشتن
                          </button>
                        </Link>
                      </td>
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
                      onClick={() => removeArticle(article._id)}
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

export default Articles
