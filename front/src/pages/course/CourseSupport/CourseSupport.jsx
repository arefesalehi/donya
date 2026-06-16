import './CourseSupport.css'

import { FaTelegramPlane } from 'react-icons/fa'
import { BsInstagram } from 'react-icons/bs'
import { MdOutlineMail, MdLocationCity } from 'react-icons/md'
import { LiaPhoneVolumeSolid } from 'react-icons/lia'
import './CourseSupport.css'

import { useEffect, useState } from 'react'
import axios from 'axios'
const CourseSupport = () => {
  const [infos, setInfos] = useState([])

  useEffect(() => {
    axios({
      url: 'http://localhost:4000/v1/infos/index',
    }).then((data) => setInfos(data.data))
  }, [])

  return (
    <>
      <div className="container">
        <div className="allinfo">
          <div>
            <div className="about-support">
              <h1> شرایط پشتیبانی دوره</h1>
              <p>
                وقتی تازه شروع به یادگیری برنامه نویسی کردم. یکی از مشکلاتی که
                در فرآیند یادگیری داشتم، کمبود آموزش های خوب با پشتیبانی قابل
                قبول بود که باعث شد اون موقع تصمیم بگیرم اگر روزی توانایی مالی و
                فنی قابل قبولی داشتم یک وب سایت برای حل این مشکل راه اندازی کنم!
                و خب امروز آکادمی آموزش برنامه نویسی دنیا به عنوان یک آکادمی
                خصوصی فعالیت میکنه و این به این معنی هست که هر مدرسی اجازه تدریس
                در اون رو نداره و باید از فیلترینگ های خاص آکادمی دنیا رد شه!
                این به این معنی هست که ما برامون فن بیان و نحوه تعامل مدرس با
                دانشجو بسیار مهمه! ما در آکادمی دنیا تضمین پشتیبانی خوب و با
                کیفیت رو به شما میدیم . چرا که مدرسین وب سایت دنیا حتی برای
                پشتیبانی دوره های رایگان شون هم مثل آموزش جاوا اسکریپت هزینه
                دریافت میکنند و متعهد هستند که هوای کاربر های عزیز رو داشته
                باشند.
              </p>
              <span>
                <BsInstagram style={{ color: 'black' }} /> پشتیبانی در
                اینستاگرام{' '}
              </span>
              <span>
                <FaTelegramPlane style={{ color: 'black' }} /> پشتیبانی در
                تلگرام{' '}
              </span>
            </div>
            <div className="tel">
              <div className="support-icon">
                <LiaPhoneVolumeSolid style={{ color: 'black' }} />
              </div>
              <div>
                <h1>شماره تلفن:</h1>
                <p>{infos.phone}</p>
              </div>
            </div>
            <div className="email">
              <div className="support-icon">
                <MdOutlineMail style={{ color: 'black' }} />
              </div>
              <div>
                <h1>ایمیل :</h1>
                <p>{infos.email}</p>
              </div>
            </div>
            <div className="address">
              <div className="support-icon">
                <MdLocationCity style={{ color: 'black' }} />
              </div>
              <div>
                <h1> آدرس ما برای پشتیبانی:</h1>
                <p>تهران</p>
              </div>
            </div>

            <div className="moshavereh">
              <div className="moshavereh-right">
                <img src="/images/advance6.png" alt="moshavereh" />
              </div>
              <div className="moshavereh-left">
                <h1>درخواست مشاوره رایگان</h1>
                <p>
                  برای دریافت مشاوره رایگان توسط بهترین مدرس های ایرانی کافی است
                  بر روی دکمه زیر کلیک و فرم درخواست مشاوره را پر کنید . بعد از
                  ارسال مشخصات مشاورین ما با شما تماس خواهند گرفتم
                </p>
                <button>فرم درخواست مشاوره</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CourseSupport
