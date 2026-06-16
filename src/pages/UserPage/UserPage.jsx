import { Outlet } from 'react-router-dom'
import './userpage.css'
import Topbar from '../../components/topbar/Topbar'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import Sidebar from '../UserPage/Sidebar/Sidebar'
const UserPage = () => {
  return (
    <>
      <Topbar />
      <Navbar />
      <div className="pishkhan">
        <div>
          <h1>حساب کاربری من</h1>
        </div>
        <div>پیشخوان</div>
      </div>

      <div className="mb-20 account">
        <Sidebar />
        <Outlet />
      </div>

      <Footer />
    </>
  )
}

export default UserPage
