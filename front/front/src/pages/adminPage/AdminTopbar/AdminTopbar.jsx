/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from 'react'
import './AdminTopbar.css'
import { BsFillBellFill } from 'react-icons/bs'
import { MdKeyboardArrowDown } from 'react-icons/md'
import axios from 'axios'

const AdminTopbar = () => {
  const [infos, setInfos] = useState([])
  const [showNotif, setShowNotif] = useState('hidden')
  const [notif, setNotif] = useState([])
  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem('user'))
    axios({
      url: 'http://localhost:4000/v1/infos/p-admin',
      headers: { Authorization: `Bearer ${localStorageData.token}` },
    }).then((data) => {
      console.log('infos:', data.data)
      setInfos(data.data)
    })
  }, [])

  const showNotification = () => {
    console.log('show')
    setShowNotif('show')
  }

  const hiddenNotif = () => {
    setShowNotif('hidden')
  }

  const seeNotification = useCallback((notifID) => {
    axios({
      url: `http://localhost:4000/v1/notifications/see/${notifID}`,
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('user')).token
        }`,
      },
    }).then((data) => {
      console.log(data.data)
    })
  }, [])

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem('user'))
    axios({
      url: 'http://localhost:4000/v1/auth/me',
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    }).then((data) => {
      console.log('notif:', data.data)
      setNotif(data.data.notifications)
    })
  }, [])

  return (
    <>
      <div className="topbar-panel">
        <div className="topbar-panel-right">
          <input type="text" placeholder="جست و جو ..." />
          <BsFillBellFill onMouseEnter={showNotification} />
          <div
            className={showNotif === 'hidden' ? 'notif' : 'notif1'}
            onMouseLeave={hiddenNotif}
          >
            {notif.length === 0 ? (
              <p className="no-msg">هیچ پیغامی موجود نیست</p>
            ) : (
              notif.map((not) => {
                return (
                  <div key={not._id}>
                    <span> {not.msg}</span>
                    <span>
                      <a
                        href="javascript:void(0)"
                        onClick={() => seeNotification(not._id)}
                      >
                        دیدن
                      </a>
                    </span>
                  </div>
                )
              })
            )}
          </div>
        </div>

        <div className="topbar-panel-left">
          <div>
            <MdKeyboardArrowDown />
            {infos.adminName}
          </div>

          <div>
            <img src="/images/yolme.jpg" alt="pic" />
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminTopbar
