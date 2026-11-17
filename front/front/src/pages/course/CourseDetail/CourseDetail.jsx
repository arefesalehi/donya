import './coursedetail.css'

const CourseDetail = () => {
  return (
    <>
      <div className="container flex justify-start items-start mt-20">
        <div className="moshaver">
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
    </>
  )
}

export default CourseDetail
