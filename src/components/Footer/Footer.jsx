import { useFormik } from 'formik'
import './footer.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'

const Footer = () => {
  const form = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: (values, { setSubmitting }) => {
      console.log('Form Inputs Data =>', values)
      setTimeout(() => {
        setSubmitting(false)
      }, 2000)
    },
    validate: (values) => {
      const errors = {}

      if (values.email === '') {
        errors.email = 'وارد کردن ایمیل اجباری می‌باشد'
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = 'ایمیل وارد شده معتبر نیست'
      }

      return errors
    },
  })

  const createNewsLetter = (e) => {
    e.preventDefault()
    axios({
      url: 'http://localhost:4000/v1/newsletters',
      method: 'POST',
      data: {
        email: form.values.email,
      },
    }).then((data) => {
      console.log('newsletter:', data)
      if (data.status === 201) {
        swal({
          title: 'ایمیل با موفقیت ثبت شد',
          icon: 'success',
          buttons: 'تایید ',
        })
      }
    })
  }

  return (
    <>
      <div className="container">
        <div className="footer grid grid-cols-4 gap-4 myfooter mt-[10px]">
          <div className="coulmn1">
            <h1>درباره ما </h1>
            <p>
              هدف دنیا ارائه بهترین دوره های آموزش برنامه نویسی به دانشجویان
              برای ورود به بازار کار است و برای رسیدن به این هدف یک سری
              استانداردها تعیین شده و به صورت سختگیرانه روی دوره ها اعمال میشود.
              این استاندار ها شامل تدریس سلیس و روان برای انتقال مفاهیم در کنار
              کامل و جامع بودن دوره ها است به صورتی که با دیدن یک دوره به سطح
              مناسب و حرفه ای برسید.
            </p>
          </div>

          <div className="coulmn2">
            <h1> منوهای کاربردی</h1>
            <ul>
              <li>
                <a href="">لیست علاقه مندی ها</a>
              </li>
              <li>
                <Link to="/">صفحه اصلی</Link>
              </li>
              <li>
                <Link to="/courses">دوره ها </Link>
              </li>
              <li>
                <a href=""> اشتراک در خبرنامه</a>
              </li>
              <li>
                <Link to="/contact">ارتباط با ما</Link>
              </li>
            </ul>
          </div>

          <div className="coulmn3">
            <h1> دسترسی سریع</h1>
            <ul>
              <li>
                <Link to="/course-info/html">آموزش html</Link>
              </li>
              <li>
                <Link to="/course-info/css">آموزش css </Link>
              </li>
              <li>
                <Link to="/course-info/js"> آموزش js </Link>
              </li>
              <li>
                <Link to="/course-info/bootstrap"> آموزش bootstrap </Link>
              </li>
              <li>
                <Link to="/course-info/reactjs"> آموزش react js</Link>
              </li>
            </ul>
          </div>
          <div className="coulmn4">
            <h1>مجوز های ما</h1>
            <div className="footer-img">
              <img src="/images/samandehi.png" alt="" />
              <img src="/images/enamad.png" alt="" />
            </div>
            جهت اطلاع از آخرین اخبار و تخفیف های سایت مشترک شوید!
            <form onSubmit={form.handleSubmit}>
              <div className="input-join">
                <input
                  type="text"
                  name="email"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.email}
                  placeholder="ایمیل خود را وارد نمایید..."
                />
                {form.errors.email && form.touched.email && (
                  <p style={{ color: 'red', fontSize: '12px' }}>
                    {form.errors.email}
                  </p>
                )}
                <button type="submit" onClick={createNewsLetter}>
                  عضو شوید
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="footer-name">
        کلیه حقوق برای آکادمی آموزش برنامه نویسی دنیا محفوظ است.
      </div>
    </>
  )
}

export default Footer
