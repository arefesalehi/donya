import { useContext } from 'react'
import DetailBox from '../DetailBox/DetailBox'
import './detailbar.css'
import AuthContext from '../../../context/Context'
const Detailbar = () => {
  const authContext = useContext(AuthContext)
  console.log(authContext)
  return (
    <>
      <div className="welcome-account">
        <h1>
          سلام
          <span className="account-name">
            {' '}
            {authContext?.userInfo?.data?.name}{' '}
          </span>
          خوش امدید
        </h1>
        <p>
          از طریق پیشخوان حساب کاربریتان، می توانید سفارش های اخیرتان رامشاهده،
          ادرس های حمل و نقل و صورت حسابتان را مدیریت و جزئیات حساب کاربری و
          کلمه عبور خود را ویرایش کنید.
        </p>
      </div>

      <div className="flex justify-between container">
        <div className="gap-4 grid grid-cols-3">
          <DetailBox title="سفارش" href={'orders'} />

          <DetailBox title=" دوره های خریداری شده" href={'buyed'} />

          <DetailBox title="کیف پول" href={'money'} />

          <DetailBox title="جزئیات حساب کاربری" href={'edit-account'} />

          <DetailBox title="تیکت پشتیبانی" href={'send-ticket'} />
        </div>
      </div>
    </>
  )
}

export default Detailbar
