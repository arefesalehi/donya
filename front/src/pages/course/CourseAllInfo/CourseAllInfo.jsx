/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import './courseAllnfo.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { AiFillLock, AiFillUnlock } from 'react-icons/ai'
import { BsFillPlayBtnFill } from 'react-icons/bs'

const CourseAllInfo = () => {
  const [getSingleCourseData, setGetSingleCourseData] = useState([])
  const [courseDetail, setCourseDetail] = useState([])
  const [sessions, setSessions] = useState([])
  const { courseName } = useParams()

  useEffect(() => {
    axios({
      url: `http://localhost:4000/v1/courses/${courseName}`,
    }).then((data) => {
      console.log('getSingleCourse:', data.data)
      setGetSingleCourseData(data.data)
      setSessions(data.data.sessions)
      setCourseDetail(data.data)
    })
  }, [])

  return (
    <>
      <div className="mb-40">
        <div className="title">{getSingleCourseData.name}</div>
        <img src="/images/info/1.gif" alt="" />
        <p className="title-p">
          کتابخانه های بسیار زیادی برای زبان جاوا اسکریپت وجود دارد و سالانه
          چندین کتابخانه جدید نیز به این لیست اضافه می شود که در بازار کار به
          شدت از آن ها استفاده می شود و اگر بدون بلد بودن این کتابخانه ها وارد
          بازار کار شوید، خیلی اذیت خواهید شد و حتی ممکن است ناامید شوید! در این
          دوره نحوه کار با 20 مورد از پر استفاده ترین کتابخانه های جاوا اسکریپت
          به صورت پروژه محور به شما عزیزان آموزش داده می شود تا هیچ مشکلی برای
          ورود به بازار کار نداشته باشید
        </p>

        <div className="title">
          هدف از این دوره چیست؟ (تنها راه ورود به بازار کار و کسب درآمد)
        </div>
        <img src="/images/info/2.jpg" alt="" />
        <p className="title-p">
          وقتی برای اولین بار وارد یکی از شرکت های برنامه نویسی شدم، از کتابخانه
          هایی به اسم Lodash و Formik استفاده می شد، در حالی که من اولین بارم
          بود اسم Formik را می شنیدم و تا اون موقع از این کتابخانه ها استفاده
          نکرده بودم. همینجا بود که متوجه شدم کتابخانه های جاوا اسکریپت یکی از
          مهم ترین مباحثی هستند که هر برنامه نویس وب برای ورود به بازار کار و
          کسب درآمد بهتر، راحت و بیشتر باید با آن ها کار کرده باشد همان طور که
          از اسم این دوره مشخص است، هدف از این دوره آموزش 20 مورد از کاربردی
          ترین و پر استفاده ترین کتابخانه های جاوا اسکریپت است تا شما بتوانید
          بعد از این دوره با قدرت و آمادگی بیشتر ادامه مسیر برنامه نویسی وب را
          ادامه دهید، ری اکت یا نود یا … را راحت تر یاد بگیرید و در نهایت وارد
          بازار کار شده و کسب درآمد کنید. شا به عنوان یک برنامه نویس وب، حداقل
          اگر با کتابخانه خاصی کار نکرده باشید، باید بلد باشید که چطور باید یک
          کتابخانه جدید را یاد بگیرید. فرض کنید یک یک کتابخانه جدید ساخته شد.
          آیا شما باید منتظر دوره آموزشی باشید؟! قطعا نه. در این دوره سعی کردیم
          علاوه بر آموزش مستقیم هر کتابخانه، نحوه یادگیری یک کتابخانه جدید را
          نیز به شما عزیزان آموزش دهیم تا بعد از گذراندن دوره، دیگر وابسته هیچ
          دوره یا شخص خاصی نباشید و اگر کتابخانه جدیدی به دنیای جاوا اسکریپت و
          وب اضافه شد، به راحتی بتوانید آن را یاد بگیرید.
        </p>

        {sessions.length !== 0 && (
          <div className="myaccardion">
            <div
              id="accordion-collapse"
              data-accordion="collapse"
              style={{ margin: '15px 0' }}
            >
              <h2 id="accordion-collapse-heading-1">
                <button
                  type="button"
                  style={{ color: 'black' }}
                  className="flex justify-between items-center border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 p-5 border border-b-0 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 w-full font-medium text-gray-500 text-left dark:text-gray-400"
                  data-accordion-target="#accordion-collapse-body-1"
                  aria-expanded="true"
                  aria-controls="accordion-collapse-body-1"
                >
                  <span>جلسات دوره</span>
                  <svg
                    data-accordion-icon
                    className="w-3 h-3 rotate-180 shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                    style={{ color: 'black' }}
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5 5 1 1 5"
                    />
                  </svg>
                </button>
              </h2>
              <div
                id="accordion-collapse-body-1"
                className="hidden"
                aria-labelledby="accordion-collapse-heading-1"
              >
                <div className="border-gray-200 dark:border-gray-700 dark:bg-gray-900 p-5 border border-b-0">
                  {sessions.map((session, index) => {
                    return session.free === 1 ||
                      getSingleCourseData.isUserRegisteredToThisCourse ===
                        true ? (
                      <>
                        <div className="accardeon" key={session._id}>
                          <div className="right-accardeon">
                            <span className="accardion-details-num">
                              {index + 1}
                            </span>
                            <Link
                              to="/"
                              className="mb-2 text-gray-500 dark:text-gray-400"
                            >
                              <BsFillPlayBtnFill /> {session?.title}
                            </Link>
                          </div>
                          <div className="left-accardeon">
                            {session?.time}
                            <AiFillUnlock />
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="accardeon" key={session._id}>
                        <div className="right-accardeon">
                          <span className="accardion-details-num">
                            {index + 1}
                          </span>
                          <p className="mb-2 text-gray-500 dark:text-gray-400">
                            <BsFillPlayBtnFill /> {session?.title}
                          </p>
                        </div>
                        <div className="left-accardeon">
                          {session?.time}
                          <AiFillLock />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="teacher">
          <div className="teacher-right">
            <div className="teacher-right-text">
              <div>
                <p>این مدرس حرفه ای است</p>
              </div>

              <button>درباره مدرس دوره بیشتر بدانید</button>
            </div>
          </div>
          <div className="teacher-left">
            <div className="img-border">
              <img src={courseDetail?.creator?.profile} alt="" />
            </div>
            <div className="teacher-info">
              <span> {courseDetail?.creator?.name}</span>
              <span className="work">برنامه نویسی</span>
            </div>
            <div className="teacher-intro">
              <p>
                اول از همه برنامه نویسی اندروید رو شروع کردم و نزدیک به 2 سال با
                زبان جاوا اندروید کار میکردم .بعد تصمیم گرفتم در زمینه وب فعالیت
                داشته باشم.و..
              </p>
            </div>
          </div>
        </div>

        <div className="moshavereh">
          <div className="moshavereh-right">
            <img src="/images/advance6.png" alt="moshavereh" />
          </div>
          <div className="moshavereh-left">
            <h1>درخواست مشاوره رایگان</h1>
            <p>
              برای دریافت مشاوره رایگان توسط بهترین مدرس های ایرانی کافی است بر
              روی دکمه زیر کلیک و فرم درخواست مشاوره را پر کنید . بعد از ارسال
              مشخصات مشاورین ما با شما تماس خواهند گرفتم
            </p>
            <button>فرم درخواست مشاوره</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CourseAllInfo
