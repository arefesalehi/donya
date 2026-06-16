import './adminSidebar.css'
import { useContext, useState } from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import { AiFillHome, AiOutlineMenuUnfold, AiFillMessage } from 'react-icons/ai'
import { MdMenuBook, MdDiscount, MdOutlineCategory } from 'react-icons/md'
import { SiCoursera } from 'react-icons/si'
import { FaUsers, FaComments, FaCampground } from 'react-icons/fa'
import { BsFillTicketPerforatedFill } from 'react-icons/bs'
import { BiSolidExit } from 'react-icons/bi'
import { MdArticle } from 'react-icons/md'
import AdminTopbar from '../AdminTopbar/AdminTopbar'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import AuthContext from '../../../context/Context'

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const authConext = useContext(AuthContext)

  const adminLogout = () => {
    swal({
      title: 'ایا از خروج اطمینان دارید ؟',
      icon: 'warning',
      buttons: ['خیر', 'بله'],
    }).then((data) => {
      if (data) {
        authConext.logout()
        navigate('/')
      }
    })
  }

  return (
    <>
      <div style={{ display: 'flex', height: '100%' }}>
        <Sidebar
          width="20%"
          style={{ height: ' auto' }}
          collapsed={collapsed}
          transitionDuration={1000}
          className="admin-sidebar"
          backgroundColor=" rgb(139, 92, 246,1)"
        >
          <div className="tobpar-admin-sidebar">
            <img src="/images/logomob-1.png" alt="" />
            <button onClick={() => setCollapsed(!collapsed)}>
              <AiOutlineMenuUnfold
                style={{ color: 'white', width: '30px', height: '30px' }}
              />
            </button>
          </div>
          <Menu
            menuItemStyles={{
              button: ({ level, active, disabled }) => {
                if (level === 0)
                  return {
                    color: disabled ? '#f5d9ff' : '#ffffff',
                    backgroundColor: active ? '#e8e9fa' : undefined,
                  }
              },
            }}
          >
            <Link to="">
              <MenuItem
                active
                className="menuItem"
                icon={<AiFillHome style={{ color: 'black' }} />}
                style={{ color: 'black' }}
              >
                صفحه اصلی
              </MenuItem>
            </Link>

            <Link to="menus">
              <MenuItem
                icon={<MdMenuBook style={{ color: 'black' }} />}
                style={{ color: 'black' }}
              >
                منو ها
              </MenuItem>
            </Link>

            <SubMenu
              label="دوره"
              icon={<SiCoursera style={{ color: 'black' }} />}
              style={{ color: 'black' }}
            >
              <Link to="courses">
                <MenuItem style={{ color: 'black' }}> دوره ها</MenuItem>
              </Link>

              <Link to="sessions">
                <MenuItem style={{ color: 'black' }}> جلسات دوره</MenuItem>
              </Link>
            </SubMenu>

            <Link to="articles">
              <MenuItem
                icon={<MdArticle style={{ color: 'black' }} />}
                style={{ color: 'black' }}
              >
                مقالات
              </MenuItem>
            </Link>

            <Link to="users">
              <MenuItem
                icon={<FaUsers style={{ color: 'black' }} />}
                style={{ color: 'black' }}
              >
                کاربران
              </MenuItem>
            </Link>

            <Link to="comments">
              <MenuItem
                icon={<FaComments style={{ color: 'black' }} />}
                style={{ color: 'black' }}
              >
                کامنت ها
              </MenuItem>
            </Link>

            <Link to="tickets">
              <MenuItem
                style={{ color: 'black' }}
                icon={<BsFillTicketPerforatedFill style={{ color: 'black' }} />}
              >
                تیکت ها
              </MenuItem>
            </Link>

            <Link to="offs">
              <MenuItem
                style={{ color: 'black' }}
                icon={<MdDiscount style={{ color: 'black' }} />}
              >
                کدهای تخفیف
              </MenuItem>
            </Link>

            <Link to="discount">
              <MenuItem
                style={{ color: 'black' }}
                icon={<FaCampground style={{ color: 'black' }} />}
              >
                کمپین تخفیف
              </MenuItem>
            </Link>

            <Link to="category">
              <MenuItem
                style={{ color: 'black' }}
                icon={<MdOutlineCategory style={{ color: 'black' }} />}
              >
                دسته بندی{' '}
              </MenuItem>
            </Link>

            <Link to="messages">
              <MenuItem
                style={{ color: 'black' }}
                icon={<AiFillMessage style={{ color: 'black' }} />}
              >
                پیام ها
              </MenuItem>
            </Link>

            <Link>
              <MenuItem
                onClick={adminLogout}
                style={{ color: 'black' }}
                icon={<BiSolidExit style={{ color: 'black' }} />}
              >
                خروج
              </MenuItem>
            </Link>
          </Menu>
        </Sidebar>

        <main
          style={{
            padding: ' 10px 20px ',
            width: '100vw',
            background: 'white',
          }}
        >
          <AdminTopbar />
          <div className="mb-40">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  )
}

export default AdminSidebar
