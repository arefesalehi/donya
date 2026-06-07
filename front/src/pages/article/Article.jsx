/* eslint-disable react-hooks/exhaustive-deps */
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/navbar/Navbar'
import Topbar from '../../components/topbar/Topbar'
import {
  AiFillFolder,
  AiOutlineEye,
  AiOutlineStar,
  AiTwotoneStar,
} from 'react-icons/ai'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { BsFillPersonFill } from 'react-icons/bs'
import { SiTwitter } from 'react-icons/si'
import { BsTelegram } from 'react-icons/bs'
import { CgFacebook } from 'react-icons/cg'
import './article.css'
import BreadCrumb from '../../components/BreadCrumb/BreadCrumb'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Article = () => {
  const [getSingleArticle, setGetSingleArticle] = useState([])
  const [allCourses, setAllCourses] = useState([])
  const { articleName } = useParams()

  useEffect(() => {
    axios({
      url: `http://localhost:4000/v1/articles/${articleName}`,
    }).then((data) => {
      console.log('getSingleArticle:', data.data)
      setGetSingleArticle(data.data)
    })
  }, [])

  useEffect(() => {
    axios({
      url: 'http://localhost:4000/v1/courses',
    }).then((data) => {
      console.log('all Course:', data.data)
      setAllCourses(data.data)
    })
  }, [])

  return (
    <>
      <Topbar />
      <Navbar />
      <BreadCrumb
        links={[
          { id: 1, title: 'خانه', to: '/' },
          { id: 2, title: 'مقاله ها', to: '/articles/1' },
          { id: 3, title: `${getSingleArticle.title}`, to: '' },
        ]}
      />

      <div className="container">
        <div className="allinfo">
          <div className="right">
            <div className="blog-content">
              <div className="blog-header">
                <h1> {getSingleArticle.title} </h1>
              </div>
              <hr />
              <div className="blog-tag">
                <span>
                  <AiFillFolder />
                  {getSingleArticle?.categoryID?.title}{' '}
                </span>
                <span>
                  <BsFillPersonFill />
                  ارسال شده توسط {getSingleArticle?.creator?.name}
                </span>

                <span>
                  <BsFillPersonFill /> انتشار در تاریخ{' '}
                  {getSingleArticle.updatedAt?.slice(0, 10)}
                </span>

                <span>
                  <AiOutlineEye /> بازدید2.14k
                </span>
              </div>

              <img
                src={`http://localhost:4000/courses/covers/${getSingleArticle.cover}`}
                alt=""
                className="blog-img"
              />

              <div className="blog-score">
                <span>
                  <AiTwotoneStar style={{ color: 'orange' }} />
                  <AiTwotoneStar style={{ color: 'orange' }} />
                  <AiTwotoneStar style={{ color: 'orange' }} />
                  <AiTwotoneStar style={{ color: 'orange' }} />
                  <AiOutlineStar style={{ color: 'orange' }} />
                </span>
                <span>4.2/5 - (5 امتیاز)</span>
              </div>
              <div style={{ margin: '30px' }}>{getSingleArticle?.body}</div>

              <div className="blog-text"></div>

              <div className="blog-future">
                <h1>انچه در این مقاله خواهید خواند</h1>
                <ul>
                  <li>معرفی بهترین سایت ‌های آموزش جاوا اسکریپت:</li>
                  <li>یک راه آسان‌تر، دوره‌ های جاوا اسکریپت آکادمی سبزلرن!</li>
                  <li>ثبت نام در دوره‌ های جاوا اسکریپت سبزلرن:</li>
                </ul>
              </div>

              <div className="blog-img2">
                <img src="/images/blog/2.jpg" alt="" />
              </div>

              <div className="blog-best-site">
                <h1>معرفی بهترین سایت ‌های آموزش جاوا اسکریپت:</h1>
                <p>
                  توجه داشته باشید که تمام وب سایت‌هایی که به عنوان بهترین سایت
                  آموزش جاوا اسکریپت در ادامه معرفی می‌کنیم، بین‌المللی هستند و
                  منابع موجود در آن‌ها به زبان انگلیسی است. در نتیجه شما باید یا
                  تسلط متوسط و حداقلی به زبان انگلیسی داشته باشید و یا اینکه با
                  استفاده از گوگل ترنسلیت منابع موجود را ترجمه کرده و از آن‌ها
                  استفاده کنید. به همین دلیل در انتهای محتوا به شما خواهیم گفت
                  که راه آسان دیگری برای یادگیری زبان جاوا اسکریپت وجود دارد که
                  شما بتوانید به واسطه آن به صورت رایگان و به زبان فارسی این
                  زبان را یاد بگیرید.
                </p>
                <img src="/images/blog/4.png" alt="" />
                <h1>معرفی بهترین سایت ‌های آموزش جاوا اسکریپت:</h1>
                <p>
                  توجه داشته باشید که تمام وب سایت‌هایی که به عنوان بهترین سایت
                  آموزش جاوا اسکریپت در ادامه معرفی می‌کنیم، بین‌المللی هستند و
                  منابع موجود در آن‌ها به زبان انگلیسی است. در نتیجه شما باید یا
                  تسلط متوسط و حداقلی به زبان انگلیسی داشته باشید و یا اینکه با
                  استفاده از گوگل ترنسلیت منابع موجود را ترجمه کرده و از آن‌ها
                  استفاده کنید. به همین دلیل در انتهای محتوا به شما خواهیم گفت
                  که راه آسان دیگری برای یادگیری زبان جاوا اسکریپت وجود دارد که
                  شما بتوانید به واسطه آن به صورت رایگان و به زبان فارسی این
                  زبان را یاد بگیرید.
                </p>
                <h1>معرفی بهترین سایت ‌های آموزش جاوا اسکریپت:</h1>
                <p>
                  توجه داشته باشید که تمام وب سایت‌هایی که به عنوان بهترین سایت
                  آموزش جاوا اسکریپت در ادامه معرفی می‌کنیم، بین‌المللی هستند و
                  منابع موجود در آن‌ها به زبان انگلیسی است. در نتیجه شما باید یا
                  تسلط متوسط و حداقلی به زبان انگلیسی داشته باشید و یا اینکه با
                  استفاده از گوگل ترنسلیت منابع موجود را ترجمه کرده و از آن‌ها
                  استفاده کنید. به همین دلیل در انتهای محتوا به شما خواهیم گفت
                  که راه آسان دیگری برای یادگیری زبان جاوا اسکریپت وجود دارد که
                  شما بتوانید به واسطه آن به صورت رایگان و به زبان فارسی این
                  زبان را یاد بگیرید.
                </p>
                <img src="/images/blog/3.jpg" alt="" />
                <div className="social-media">
                  <p>
                    اشتراک گذاری:
                    <BsTelegram />
                    <CgFacebook />
                    <SiTwitter />
                  </p>
                </div>
              </div>
            </div>

            <div className="likeslide"></div>
          </div>
          <div className="left">
            <div className="popularCourse">
              <h1>پرامتیازترین دوره ها</h1>
              {allCourses.reverse().map((allcourse) => {
                return (
                  allcourse.courseAverageScore === 5 && (
                    <div key={allcourse._id}>
                      <img
                        src={`http://localhost:4000/courses/covers/${allcourse.cover}`}
                        alt="pic"
                      />
                      <h3>{allcourse.name}</h3>
                    </div>
                  )
                )
              })}
            </div>

            <div className="popularCourse1">
              <h1>دسترسی سریع</h1>
              <div className="quickAccess">
                <MdOutlineKeyboardArrowLeft className="icons" />
                <Link to="/">
                  <h3>صفحه اصلی</h3>
                </Link>
              </div>
              <div className="quickAccess">
                <MdOutlineKeyboardArrowLeft className="icons" />

                <h3>فرانت اند</h3>
              </div>
              <div className="quickAccess">
                <MdOutlineKeyboardArrowLeft className="icons" />

                <h3>امنیت</h3>
              </div>
              <div className="quickAccess">
                <MdOutlineKeyboardArrowLeft className="icons" />
                <h3>پایتون</h3>
              </div>

              <div className="quickAccess">
                <MdOutlineKeyboardArrowLeft className="icons" />
                <h3>مهارت های نرم</h3>
              </div>
            </div>

            <div className="popularCourse1">
              <h1>مقاله های جدید</h1>
              <div className="quickAccess">
                <h3>
                  {' '}
                  نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون
                </h3>
              </div>
              <div className="quickAccess">
                <h3>
                  {' '}
                  نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون
                </h3>
              </div>
              <div className="quickAccess">
                <h3>نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون</h3>
              </div>
              <div className="quickAccess">
                <h3>نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون</h3>
              </div>

              <div className="quickAccess">
                <h3>
                  نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون{' '}
                </h3>
              </div>
              <div className="quickAccess">
                <h3>
                  نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون{' '}
                </h3>
              </div>
            </div>

            <div className="popularCourse1">
              <h1>دسته بندی مقالات</h1>
              <div className="quickAccess">
                <MdOutlineKeyboardArrowLeft className="icons" />
                <h3>صفحه اصلی</h3>
              </div>
              <div className="quickAccess">
                <MdOutlineKeyboardArrowLeft className="icons" />

                <h3>فرانت اند</h3>
              </div>
              <div className="quickAccess">
                <MdOutlineKeyboardArrowLeft className="icons" />

                <h3>امنیت</h3>
              </div>
              <div className="quickAccess">
                <MdOutlineKeyboardArrowLeft className="icons" />
                <h3>پایتون</h3>
              </div>

              <div className="quickAccess">
                <MdOutlineKeyboardArrowLeft className="icons" />
                <h3>مهارت های نرم</h3>
              </div>
            </div>

            <div className="popularCourse1">
              <h1> دوره های جدید</h1>
              <div className="quickAccess">
                <MdOutlineKeyboardArrowLeft className="icons" />
                <h3>صفحه اصلی</h3>
              </div>
              <div className="quickAccess">
                <MdOutlineKeyboardArrowLeft className="icons" />

                <h3>فرانت اند</h3>
              </div>
              <div className="quickAccess">
                <MdOutlineKeyboardArrowLeft className="icons" />

                <h3>امنیت</h3>
              </div>
              <div className="quickAccess">
                <MdOutlineKeyboardArrowLeft className="icons" />
                <h3>پایتون</h3>
              </div>

              <div className="quickAccess">
                <MdOutlineKeyboardArrowLeft className="icons" />
                <h3>مهارت های نرم</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Article
