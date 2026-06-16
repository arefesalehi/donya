import './mainPage.css'
import InformationBox from '../../../components/informationBox/InformationBox'
import { BiMoney } from 'react-icons/bi'
import AdminTitle from '../../../components/AdminTitle/AdminTitle'
import { useEffect, useState } from 'react'
import axios from 'axios'
const MainPage = () => {

  const [lastUsers, setLastUsers] = useState([])
  const [infos, setInfos] = useState([])
  const [admin, setAdmin] = useState([])

  



  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem('user'))
    axios({
      url: 'http://localhost:4000/v1/infos/p-admin',
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    }).then((data) => {
      console.log('lastUsers:', data.data)
      setLastUsers(data.data.lastUsers)
      setInfos(data.data.infos)
      setAdmin(data.data)
    })
  }, [])

  return (
    <>
      <div className="admin-titles">
        <h1>آقا/ خانم {admin.adminName} خوش آمدید </h1>
      </div>

      <div className="flex justify-between container">
        <div
          className="gap-10 grid grid-cols-3"
          style={{ width: '90%', marginRight: '45px' }}
        >
          {infos.map((info) => {
            return (
              <InformationBox
                key={info._id}
                icon={<BiMoney />}
                title={info.title}
                count={info.count}
              />
            )
          })}
        </div>
      </div>

      <div className="admin-titles">
        <AdminTitle title=" افراد اخیرا ثبت نام شده" />
      </div>

      <div
        className="relative shadow-md mt-10 mr-20 sm:rounded-lg overflow-x-auto"
        style={{ width: '90%', borderRadius: '20px' }}
      >
        <table className="w-full text-gray-500 text-left text-xlg dark:text-gray-400">
          <thead className="text-right bg-purple-100 dark:bg-gray-700 text-gray-700 text-xlg dark:text-gray-400 uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                شناسه
              </th>
              <th scope="col" className="px-6 py-3">
                نام و نام خانوادگی
              </th>
              <th scope="col" className="px-6 py-3">
                ایمیل
              </th>
            </tr>
          </thead>
          <tbody className="text-right">
            {lastUsers.map((lastUser, index) => {
              return (
                <tr
                  key={lastUser._id}
                  className="dark:border-gray-700 bg-white dark:bg-gray-800 border-b"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">{lastUser.name}</td>
                  <td className="px-6 py-4">{lastUser.email}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default MainPage
