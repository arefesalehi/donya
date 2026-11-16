/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState, memo } from 'react'
import './topbar.css'
import { FaPhoneAlt } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default memo(function Topbar() {
  const [topbarList, setTopbarList] = useState([])
  const [infos, setInfos] = useState([])

  useEffect(() => {
    try {
      axios
        .get('http://localhost:4000/v1/menus/topbar')

        .then((data) => {
          console.log(data.data)
          setTopbarList(data.data)
        })
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    axios({
      url: 'http://localhost:4000/v1/infos/index',
    }).then((data) => {
      console.log('infos:', data.data)
      setInfos(data.data)
    })
  }, [])

  const getRandomItemsFromArray = (arr, randomCount) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, randomCount)
  }
  return (
    <>
      <div className="topbar">
        <div className="container">
          <div className="topbar-right">
            {getRandomItemsFromArray(topbarList, 5).map((top) => {
              return (
                <ul key={top._id}>
                  <li>
                    <Link to={`course-info/${top.href}`}>{top.title}</Link>
                  </li>
                </ul>
              )
            })}
          </div>
          <div className="topbar-left">
            <div>
              {infos.email} <MdEmail />
            </div>
            <div>
              {infos.phone} <FaPhoneAlt />
            </div>
          </div>
        </div>
      </div>
    </>
  )
})
