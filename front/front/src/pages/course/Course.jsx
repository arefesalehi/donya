/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import BreadCrumb from '../../components/BreadCrumb/BreadCrumb'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/navbar/Navbar'
import Topbar from '../../components/topbar/Topbar'
import { BsCheck } from 'react-icons/bs'

import { TfiMenuAlt } from 'react-icons/tfi'
import { AiOutlineDownload } from 'react-icons/ai'
import { BsLinkedin, BsWhatsapp, BsTwitter, BsShare } from 'react-icons/bs'
import {
  FaTelegramPlane,
  FaNewspaper,
  FaHeadset,
  FaComments,
} from 'react-icons/fa'
import './course.css'
import { Link, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import CourseDetail from '../course/CourseDetail/CourseDetail'
import CourseSupport from '../course/CourseSupport/CourseSupport'
import CourseComment from '../course/CourseComment/CourseComment'
import CourseAllInfo from './CourseAllInfo/CourseAllInfo'

import { useState, useEffect } from 'react'
import { FaUserGraduate } from 'react-icons/fa'
import axios from 'axios'
import swal from 'sweetalert'
import LeftSide from '../../components/leftSideOfCourse/leftSide'

const Course = () => {
  const [getSingleCourseData, setGetSingleCourseData] = useState([])
  const [courseDetail, setCourseDetail] = useState({})

  const { courseName, categoryName } = useParams()
  const navigate= useNavigate()
  useEffect(() => {
    axios({
      url: `http://localhost:4000/v1/courses/${courseName}`,
    }).then((data) => {
      console.log('getSingleCourse:', data.data)
      setGetSingleCourseData(data.data)
      setCourseDetail(data.data)
    })
  }, [courseName])

  const registerInCourse = (course) => {
    console.log(course);
    
    if (course.isUserRegisteredToThisCourse === false) {
      swal({
        title: 'ایا از ثبت نام در دوره اطمینان دارید؟',
        icon: 'warning',
        buttons: ['خیر', 'بله'],
      }).then((data) => {
        console.log(data)
        if (data) {
          axios({
            url: `http://localhost:4000/v1/courses/${course._id}/register`,
            method: 'POST',
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem('user')).token
              }`,
            },
            data: {
              price: course.price,
            },
          }).then((data) => {
            console.log('ok?', data)
            if (data.status === 201) {
              swal({
                title: 'شما با موفقیت در دوره ثبت نام شدید',
                icon: 'success',
                buttons: 'تایید',
              }).then(()=>{
                setGetSingleCourseData(getSingleCourseData.isUserRegisteredToThisCourse === true)
            
              })
            }
          })
        }
      })
    }
  }

  return (
    <>
      <Topbar />
      <Navbar />
      <BreadCrumb
        links={[
          { id: 1, title: 'خانه', to: '/' },
          {
            id: 2,
            title: `آموزش ${courseDetail?.categoryID?.title}`,
            to: `/category-info/${courseDetail?.categoryID?.name}/1`,
          },
          { id: 3, title: ` ${courseDetail.name}`, to: '' },
        ]}
      />

      <div className="container">
        <div className="course-titles">
          <div
            style={{
              display: 'flex',
              justifyContent: 'start',
              paddingRight: '90px',
              fontSize: '20px',
              marginBottom: '10px',
              marginRight: '-20px',
              marginTop: '20px',
            }}
          >
            <h1> {courseDetail.name}</h1>
            <span
              style={{
                paddingRight: '20px ',
                fontSize: '15px',
                background: '#e8e9fa',
              }}
            >
              {courseDetail?.categoryID?.title}
            </span>
          </div>

          <div className="flex justify-between items-center course-details">
            <div className="course-details-right">
              <div className="course-buy-box">
                <div className="student-count">
                  <div className="student-count-right">
                    <div className="tedad">
                      {courseDetail.courseStudentsCount}
                    </div>
                    <div>دانشجو</div>
                  </div>
                  <div className="student-count-left">
                    <div
                      className={
                        courseDetail.price !== 0 ? 'discount' : 'discount1'
                      }
                    >
                      {courseDetail.price === 0
                        ? 'رایگان '
                        : courseDetail.price}{' '}
                    </div>
                    <div>
                      {courseDetail.price !== 0 && courseDetail.discount !== 0
                        ? courseDetail.price * (courseDetail.discount / 100)
                        : ''}{' '}
                    </div>
                    {(
                      <div
                        className={
                          courseDetail.price !== 0 ? 'discount' : 'discount1'
                        }
                      >
                        {courseDetail.price === 0
                          ? 'رایگان '
                          : courseDetail.price}{' '}
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
                    <div className="discount-box-title">
                      <BsCheck />
                      <span>ویدیو ها لایسنس دارند</span>
                    </div>

                    <div className="discount-box-title">
                      <BsCheck />
                      <span>پشتیبانی ۲۴ ساعته</span>
                    </div>

                    <div className="discount-box-title">
                      <BsCheck />
                      <span>دسترسی همیشگی به دوره ها</span>
                    </div>

                    <div className="discount-box-title">
                      {' '}
                      <BsCheck />
                      <span>تضمین کسب درآمد از دوره</span>
                    </div>
                  </div>
                </div>
                {getSingleCourseData.isUserRegisteredToThisCourse === true ? (
                  <>
                    {' '}
                    <button
                      type="button"
                      style={{
                        background: '#efe9ff',
                        color: '#7443ff',
                        padding: '12px 11px',
                        fontSize: '16px',
                      }}
                      className="inline-flex justify-center items-center hover:bg-blue-800 dark:hover:bg-blue-700 dark:bg-blue-600 rounded-lg focus:ring-4 font-medium text-white focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 text-center text-lg"
                    >
                      <FaUserGraduate />
                      {'    '}شما دانشجوی دوره هستید
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => registerInCourse(courseDetail)}
                      type="button"
                      style={{ background: '#8d65ffcc', width: '85%' }}
                      className="inline-flex justify-center items-center hover:bg-blue-800 dark:hover:bg-blue-700 dark:bg-blue-600 mr-2 px-5 py-2.5 rounded-lg focus:ring-4 font-medium text-white focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 text-center text-xlg"
                    >
                      <svg
                        className="mr-2 w-3.5 h-3.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 18 21"
                        style={{
                          width: '20px',
                          height: '20px',
                          color: '#4438ca',
                        }}
                      >
                        <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                      </svg>

                      <p className="mr-3">افزودن به سبد خرید</p>
                    </button>

                    <button
                      type="button"
                      style={{
                        background: '#ffedda',
                        color: '#f68636',
                        padding: '12px 11px',
                      }}
                      className="inline-flex justify-center items-center bg-blue-700 hover:bg-blue-800 dark:hover:bg-blue-700 dark:bg-blue-600 mr-2 px-5 py-2.5 rounded-lg focus:ring-4 text-white focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-center text-xlg"
                    >
                      <AiOutlineDownload
                        style={{
                          width: '25px',
                          height: '25px',
                          color: '#f68636',
                        }}
                      />
                      <p className="mr-3">دانلود فایل های دوره</p>
                    </button>
                  </>
                )}

                <div className="w-[83%] modares-name">
                  <div className="modares-right text-2xl">
                    <img
                      src={courseDetail?.creator?.profile}
                      alt=""
                      style={{
                        borderRadius: '50%',
                        width: '50px',
                        height: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    />
                    <p> {courseDetail?.creator?.name}</p>
                  </div>
                  <div
                    className="modares-left text-2xl"
                    style={{ marginLeft: '10px' }}
                  >
                    برنامه نویس
                  </div>
                </div>

                <div className="text-2xl course-detail">
                  <div>
                    <p>{courseDetail?.comments?.length}</p>
                    <p>دیدگاه</p>
                  </div>
                  <div>
                    <p style={{ color: '#7443ff' }}>
                      {courseDetail?.sessions?.length}{' '}
                    </p>
                    <p> تعداد جلسات</p>
                  </div>
                  <span>
                    <p>پیشرفته</p>
                  </span>
                </div>
              </div>
            </div>

            <div className="course-details-left">
              <video
                src=""
                poster="/images/courses/js_project.png"
                className="course-info_video"
                controls
              ></video>

              <div className="socialmedia-icon">
                <div className="social-right">
                  <BsShare /> اشتراک گذاری
                </div>
                <div className="social-left">
                  <div className="socialmedia">
                    <FaTelegramPlane /> <BsTwitter /> <BsWhatsapp />{' '}
                    <BsLinkedin />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <------------------------------------------- */}

      <div className="flex justify-between mt-[120px] container course-menu">
        <div className="right">
          <ul>
            <li>
              <Link
                to="information"
                style={{ fontWeight: '600', fontSize: '18px' }}
              >
                <TfiMenuAlt style={{ color: 'black' }} /> اطلاعات دوره{' '}
              </Link>
            </li>
            <li>
              <Link
                to="courseDetail"
                style={{ fontWeight: '600', fontSize: '18px' }}
              >
                {' '}
                <FaNewspaper style={{ color: 'black' }} /> توضیحات بیشتر
              </Link>
            </li>
            <li>
              <Link
                to="Support"
                style={{ fontWeight: '600', fontSize: '18px' }}
              >
                <FaHeadset style={{ color: 'black' }} /> پشتیبانی دوره
              </Link>
            </li>
            <li>
              <Link
                to="comments"
                style={{ fontWeight: '600', fontSize: '18px' }}
              >
                <FaComments style={{ color: 'black' }} /> دیدگاه دانشجوها
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex justify-start items-start container">
        <div className="right">
          <Routes>
            <Route path="information" element={<CourseAllInfo />} />
            <Route path="courseDetail" element={<CourseDetail />} />
            <Route path="support" element={<CourseSupport />} />
            <Route path="comments" element={<CourseComment />} />
          </Routes>
        </div>
        <div className="left mb-20">
          <Routes>
            <Route path="information" element={<LeftSide />} />
            <Route path="courseDetail" element={<LeftSide />} />
            <Route path="support" element={<LeftSide />} />
            <Route path="comments" element={<LeftSide />} />
          </Routes>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Course
