import { useContext } from 'react'
import './Sidebar.css'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../../../context/Context'
import swal from 'sweetalert'

const Sidebar = () => {
  const authContext = useContext(AuthContext)
  console.log('authcontext user panel:', authContext)

  const navigate = useNavigate()

  const logout = (e) => {
    e.preventDefault()
    swal({
      title: 'ایا از خروج اطمینان دارید ؟',
      icon: 'warning',
      buttons: ['خیر', 'بله'],
    }).then((data) => {
      console.log('logout data:', data)
      if (data) {
        swal({
          title: 'شما با موفقیت  خارج شدید',
          icon: 'success',
          buttons: 'تایید',
        }).then(() => {
          authContext.logout()
          navigate('/')
          // location.reload()
        })
      }
    })
  }
  return (
    <>
      <div className="mt-20 sidebar">
        <ul>
          <li className="text-3xl">
            <Link to=""> {authContext?.userInfo?.data?.name}</Link>
          </li>
          <li>
            <Link to=""> پیشخوان </Link>
          </li>
          <li>
            <Link to="orders"> سفارش ها </Link>
          </li>
          <li>
            <Link to="money"> کیف پول من </Link>
          </li>
          <li>
            <Link to="edit-account"> جزئیات حساب کاربری </Link>
          </li>
          <li>
            <Link to="buyed"> دوره های خریداری شده </Link>
          </li>
          <li>
            <Link to="tickets"> تیکت های پشتیبانی </Link>
          </li>
          <li>
            <a href="" onClick={logout}>
              {' '}
              خروج از سیستم
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Sidebar
