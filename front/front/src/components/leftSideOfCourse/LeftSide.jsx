/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import './leftSide.css'
import { AiOutlineDownload } from 'react-icons/ai'
import { MdOutlineFavoriteBorder } from 'react-icons/md'
import { AiOutlineLink } from 'react-icons/ai'
import { FaVideo, FaRegCalendarCheck, FaUserGraduate } from 'react-icons/fa'
import { BsFillClipboard2DataFill, BsCheck, BsBag } from 'react-icons/bs'
import { MdUpdate, MdSupportAgent } from 'react-icons/md'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import swal from 'sweetalert'
const LeftSide = () => {
  const [getSingleCourse, setGetSingleCourse] = useState([])
  const [courseDetail, setCourseDetail] = useState({})
  const [relatedCourse, setRelatedCourse] = useState([])
  const { courseName } = useParams()
  console.log('courseName:', courseName)

  useEffect(() => {
    axios({
      url: `http://localhost:4000/v1/courses/${courseName}`,
    }).then((data) => {
      console.log('getSingleCourseleftside:', data.data)
      setGetSingleCourse(data.data)
      setCourseDetail(data.data)
    })
  }, [])

  useEffect(() => {
    axios({
      url: `http://localhost:4000/v1/courses/related/${courseName}`,
    }).then((data) => {
      console.log('relatedCourse:', data.data)
      console.log('courseDetail:', data.data)
      setRelatedCourse(data.data)
    })
  }, [])

  const registerInCourse = () => {
    if (getSingleCourse.price === 0) {
      swal({
        title: 'ایا از ثبت نام در دوره اطمینان دارید؟',
        icon: 'warning',
        buttons: ['خیر', 'بله'],
      }).then((data) => {
        console.log(data)
        if (data) {
          axios({
            url: `http://localhost:4000/v1/courses/${getSingleCourse._id}/register`,
            method: 'POST',
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem('user')).token
              }`,
            },
            data: {
              price: getSingleCourse.price,
            },
          }).then((data) => {
            console.log('ok?', data)
            if (data.status === 201) {
              swal({
                title: 'شما با موفقیت در دوره ثبت نام شدید',
                icon: 'success',
                buttons: 'تایید',
              }).then(() => {
                getSingleCourse.courseStudentsCount + 1
              })
            }
          })
        }
      })
    }
  }

  return (
    <>
      <div className="course-buy-box">
        <div className="student-counts">
          <div className="student-count-right">
            <div className="tedad">{courseDetail.courseStudentsCount}</div>
            <div className="text-3xl">دانشجو</div>
          </div>
          <div className="student-count-left">
            <div
              className={courseDetail.price !== 0 ? 'discount' : 'discount1'}
            >
              {courseDetail.price === 0 ? 'رایگان ' : courseDetail.price}{' '}
            </div>
            <div>
              {courseDetail.price !== 0 && courseDetail.discount !== 0
                ? courseDetail.price * (courseDetail.discount / 100)
                : ''}{' '}
            </div>

            {(
              <div
                className={courseDetail.price !== 0 ? 'discount' : 'discount1'}
              >
                {courseDetail.price === 0 ? 'رایگان ' : courseDetail.price}{' '}
              </div>
            ) && <div style={{ margin: '-15px' }}></div>}
          </div>
        </div>

        <div className="discount-box">
          <h1
            style={{
              textAlign: 'center',
              padding: '10px',
              fontWeight: '800',
            }}
          >
            قوانین خرید دوره
          </h1>
          <div style={{ paddingRight: '20px' }}>
            <BsCheck />
            <span>ویدیو ها لایسنس دارند</span>
            <br />
            <BsCheck />
            <span>پشتیبانی ۲۴ ساعته</span>
            <br />
            <BsCheck />
            <span>دسترسی همیشگی به دوره ها</span>
            <br />
            <BsCheck />
            <span>تضمین کسب درآمد از دوره</span>
          </div>
        </div>

        <div className="score">
          <span>امتیاز دوره</span>
          <span>
            {' '}
            <svg
              className="mr-1 w-4 h-4 text-yellow-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              className="mr-1 w-4 h-4 text-yellow-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              className="mr-1 w-4 h-4 text-yellow-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              className="mr-1 w-4 h-4 text-yellow-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              className="w-4 h-4 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          </span>
        </div>

        <div className="star">
          {getSingleCourse.isUserRegisteredToThisCourse === true ? (
            <>
              <button
                style={{
                  fontSize: '15px',
                  width: '85%',
                  height: '40px',
                  paddingLeft: 0,
                }}
                type="button"
                className="inline-flex items-center bg-[#a385ff] hover:bg-[#9272f3] dark:hover:bg-blue-700 dark:bg-blue-600 rounded-lg focus:ring-4 font-medium text-white focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 text-lg"
              >
                <FaUserGraduate className="mr-10" />
                <p className="mr-3">شما دانشجوی دوره هستید </p>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={registerInCourse}
                type="button"
                style={{
                  background: '#8d65ffcc',
                  color: 'white',
                  padding: '12px 11px',
                }}
                className="inline-flex items-center bg-blue-700 hover:bg-blue-800 dark:hover:bg-blue-700 dark:bg-blue-600 mr-2 px-5 py-2.5 rounded-lg focus:ring-4 font-medium text-white focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 text-center text-xlg"
              >
                <svg
                  className="mr-2 w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 21"
                  style={{ width: '20px', height: '20px', color: '#7443ff' }}
                >
                  <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                </svg>
                <p className="mr-3"> افزودن به سبد خرید</p>
              </button>
            </>
          )}

          <span className="love-icon">
            <MdOutlineFavoriteBorder style={{ color: 'black' }} />
          </span>
        </div>
      </div>

      <div className="course-detail-key">
        <h1>برخی از ویژگی های کلیدی دوره</h1>

        <div className="course-pic">
          <img src="/images/4.png" alt="" />
          <img src="/images/5.png" alt="" />
          <img src="/images/3.png" alt="" />
          <img src="/images/2.png" alt="" />
        </div>

        <div className="keys">
          <div className="keys-box">
            <span className="keys-icon">
              <BsBag style={{ color: 'black' }} />
            </span>

            <span>سطح دوره : پیشرفته</span>
          </div>

          <div className="keys-box">
            <span className="keys-icon">
              <FaVideo style={{ color: 'black' }} />
            </span>
            <span>نوع دوره : آفلاین</span>
          </div>

          <div className="keys-box">
            <span className="keys-icon">
              <BsFillClipboard2DataFill style={{ color: 'black' }} />
            </span>
            <span>
              وضعیت دوره :{' '}
              {courseDetail.isComplete === 0
                ? 'در حال برگزاری'
                : 'به اتمام رسیده'}
            </span>
          </div>

          <div className="keys-box">
            <span className="keys-icon">
              <FaRegCalendarCheck style={{ color: 'black' }} />{' '}
            </span>
            <span>تاریخ برگزاری : {courseDetail.createdAt?.slice(0, 10)}</span>
          </div>

          <div className="keys-box">
            <span className="keys-icon">
              <BsBag style={{ color: 'black' }} />{' '}
            </span>
            <span>پیش نیاز دوره : html/css</span>
          </div>

          <div className="keys-box">
            <span className="keys-icon">
              <MdUpdate style={{ color: 'black' }} />{' '}
            </span>
            <span>
              آخرین به روز رسانی : {courseDetail.updatedAt?.slice(0, 10)}
            </span>
          </div>

          <div className="keys-box">
            <span className="keys-icon">
              <MdSupportAgent style={{ color: 'black' }} />{' '}
            </span>
            <span>روش پشتیبانی : {courseDetail.support}</span>
          </div>
        </div>
      </div>

      <div className="short-link">
        <div className="link-detail">
          <AiOutlineLink /> لینک کوتاه
        </div>
        <div className="link-input">
          <input type="text" placeholder="https://donya.ir/?p=117472" />
        </div>
      </div>

      <div className="aboutTitle">
        <h1>سرفصل های دوره</h1>
        <h3>
          برای مشاهده و یا دانلود دوره روی کلمه{' '}
          <Link to="/" style={{ color: '#7443ff' }}>
            لینک{' '}
          </Link>{' '}
          کلیک کنید
        </h3>
      </div>

      <div className="aboutCourse">
        <h1>دوره های مرتبط</h1>
        {relatedCourse.map((related) => {
          return (
            <div key={related._id}>
              <img
                src={`http://localhost:4000/courses/covers/${related.cover}`}
                alt=""
              />
              <h3> {related.name}</h3>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default LeftSide
