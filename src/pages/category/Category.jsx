/* eslint-disable react-hooks/exhaustive-deps */
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/navbar/Navbar'
import Topbar from '../../components/topbar/Topbar'
import Pagination from '../../components/pagination/Pagination'
import './category.css'
import CourseBox from '../../components/courseBox/CourseBox'
import { RiMicrosoftLine } from 'react-icons/ri'
import { AiOutlineAlignLeft, AiOutlineSearch } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

const Category = () => {
  const [courses, setCourses] = useState([])

  const [categoryCourse, setCategoryCourse] = useState([])
  const [status, setStatus] = useState('default')
  const [statusTitle, setStatusTitle] = useState('مرتب سازی پیش فرض')

  const [shownCourse, setShownCourse] = useState([])
  const { categoryName } = useParams()
  const [howToDisplay, setHowToDisplay] = useState('row')
  const [searchs, setSearches] = useState([])

  useEffect(() => {
    axios({
      url: `http://localhost:4000/v1/courses/category/${categoryName}`,
    }).then((data) => {
      console.log('category course:', data.data)
      console.log('all course:', data.data)
      setCategoryCourse(data.data)
      setCourses(data.data)
    })
  }, [categoryName])

  const searchHandler = (e) => {
    setSearches(e.target.value)
    const searchFilter = courses.filter((course) => {
      return course.name.includes(e.target.value)
    })

    setCategoryCourse(searchFilter)
  }

  useEffect(() => {
    switch (status) {
      case 'free': {
        const freeCourse = courses.filter((course) => course.price === 0)
        setCategoryCourse(freeCourse)
        break
      }
      case 'money': {
        const moneyCourse = courses.filter((course) => course.price !== 0)
        setCategoryCourse(moneyCourse)
        break
      }

      case 'last': {
        setCategoryCourse(courses)
        break
      }

      case 'first': {
        const firstCourse = courses.slice().reverse()
        setCategoryCourse(firstCourse)
        break
      }

      default: {
        setCategoryCourse(courses)
      }
    }
  }, [status])

  const statusChangeHandler = (e) => {
    setStatusTitle(e.target.textContent)
  }

  return (
    <>
      <Topbar />
      <Navbar />

      <div className="container">
        <div className="category-header">
          <div className="category-header-right">
            <div
              className={`win ${howToDisplay === 'row' ? 'active  ' : ''}`}
              onClick={() => setHowToDisplay('row')}
            >
              <RiMicrosoftLine />
            </div>
            <div
              className={`win2 ${howToDisplay === 'column' ? 'active' : ''}`}
              onClick={() => setHowToDisplay('column')}
            >
              <AiOutlineAlignLeft />
            </div>

            <div className="courses-top-bar">
              <div className="courses-top-bar__right">
                <div className="courses-top-bar__selection">
                  <span className="courses-top-bar__selection-title">
                    {statusTitle}
                    <i className="courses-top-bar__selection-icon fa-angle-down fas"></i>
                  </span>
                  <ul className="courses-top-bar__selection-list">
                    <li
                      className="courses-top-bar__selection-item"
                      onClick={(e) => {
                        setStatus('مرتب سازی پیش فرض')
                        statusChangeHandler(e)
                      }}
                    >
                      مرتب سازی پیش فرض
                    </li>
                    <li
                      className="courses-top-bar__selection-item"
                      onClick={(e) => {
                        setStatus('free')
                        statusChangeHandler(e)
                      }}
                    >
                      مرتب سازی دوره های رایگان
                    </li>
                    <li
                      className="courses-top-bar__selection-item"
                      onClick={(e) => {
                        setStatus('money')
                        statusChangeHandler(e)
                      }}
                    >
                      مرتب سازی دوره های پولی
                    </li>
                    <li
                      className="courses-top-bar__selection-item"
                      onClick={(e) => {
                        setStatus('last')
                        statusChangeHandler(e)
                      }}
                    >
                      مرتب سازی بر اساس آخرین
                    </li>
                    <li
                      className="courses-top-bar__selection-item"
                      onClick={(e) => {
                        setStatus('first')
                        statusChangeHandler(e)
                      }}
                    >
                      مرتب سازی بر اساس اولین
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="category-header-left">
            <div className="allinput">
              <input
                type="text"
                placeholder=" جست و جوی دوره ...  "
                value={searchs}
                onChange={searchHandler}
              />
              <AiOutlineSearch className="search" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 container">
        {shownCourse.length === 0 && (
          <div
            className="relative bg-red-100 px-4 py-3 border border-red-400 rounded text-red-700"
            role="alert"
            style={{ width: '90%', margin: '0 auto' }}
          >
            <span className="block sm:inline">
              هیچ دوره ای برای این دسته بندی ثبت نشده است
            </span>
            <span className="top-0 right-0 bottom-0 absolute px-4 py-3"></span>
          </div>
        )}
      </div>

      {/* <div className="gap-8 grid grid-cols-3" style={{ width: '90%' }}>
            {howToDisplay === 'row' ? (
              shownCourse.map((category) => {
                return <CourseBox key={category._id} {...category} />
              })
            ) : (
              <>
                <a
                  href="#"
                  className="flex md:flex-row flex-col items-center border-gray-200 dark:border-gray-700 bg-white hover:bg-gray-100 dark:hover:bg-gray-700 dark:bg-gray-800 shadow border rounded-lg md:max-w-xl"
                >
                  <img
                    className="rounded-t-lg md:rounded-none md:rounded-l-lg w-full md:w-48 h-96 md:h-auto object-cover"
                    src="/images/advance6.png"
                    alt=""
                  />
                  <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 font-bold text-2xl text-gray-900 dark:text-white tracking-tight">
                      Noteworthy technology acquisitions 2021
                    </h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      Here are the biggest enterprise technology acquisitions of
                      2021 so far, in reverse chronological order.
                    </p>
                  </div>
                </a>
              </>
            )}
          </div> */}

      {howToDisplay === 'row' ? (
        <div
          className="gap-8 grid grid-cols-3"
          style={{ width: '72%', margin: '0 auto' }}
        >
          {shownCourse.map((category) => {
            return <CourseBox key={category._id} {...category} />
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 container">
          {shownCourse.map((category) => {
            return (
              <Link
                key={category._id}
                to={`/course-info/${category.shortName}`}
                style={{ width: '90%', margin: '0 auto 10px auto' }}
                className="flex md:flex-row flex-col items-center border-gray-200 dark:border-gray-700 bg-white hover:bg-gray-100 dark:hover:bg-gray-700 dark:bg-gray-800 shadow border rounded-lg"
              >
                <img
                  className="pt-2 pb-2 rounded-t-lg md:rounded-none md:rounded-l-lg md:w-48 h-96 md:h-auto object-cover"
                  src={`http://localhost:4000/courses/covers/${category.cover}`}
                  alt=""
                  style={{ width: '30%', height: '90%' }}
                />
                <div
                  style={{ width: '71%' }}
                  className="flex flex-col justify-between align-items-center p-4 leading-normal"
                >
                  <h5 className="mb-2 font-bold text-2xl text-gray-900 dark:text-white tracking-tight">
                    <p className="mt-5 font-bold text-3xl text-purple-800">
                      {' '}
                      {category.name}
                    </p>
                    <br />
                    <p className="font-thin text-2xl">
                      {' '}
                      <span className="font-bold">مدرس :</span>{' '}
                      {category.creator}
                    </p>
                  </h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    <p className="mt-10"> {category.description}</p>
                  </p>
                  <div className="detail-box-column">
                    <div>
                      <span className="font-bold">تعداد ثبت نامی :</span>{' '}
                      {category.registers}
                    </div>
                    <div className="ml-10 font-bold text-purple-800">
                      {category.price === 0
                        ? 'رایگان'
                        : category.price.toLocaleString()}
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}

      <div className="pagination">
        <Pagination
          items={categoryCourse}
          itemsCount={3}
          setShownCourse={setShownCourse}
          pathName={`/category-info/${categoryName}`}
        />
      </div>

      <Footer />
    </>
  )
}

export default Category
