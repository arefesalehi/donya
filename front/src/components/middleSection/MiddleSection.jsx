/* eslint-disable no-unused-vars */
import './middlesection.css'
import Typewriter from 'typewriter-effect'
import { BiSearchAlt2 } from 'react-icons/bi'
import 'swiper/css'
import 'swiper/css/pagination'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const MiddleSection = () => {
  const [allCourse, setAllCourse] = useState([])
  const [search, setSearch] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axios({
      url: 'http://localhost:4000/v1/courses',
    }).then((res) => {
      console.log('allcourse:', res.data)
      setAllCourse(res.data)
    })
  }, [])

  const gotoSearchHome = () => {
    navigate(`/search/${search}`)
  }

  return (
    <>
      <div className="m-auto w-[84%]">
        <div className="middle-section">
          <div className="middle-section-right">
            <Typewriter
              className="typewriterss"
              onInit={(typewriter) => {
                typewriter
                  .typeString('یک رویای آموزشی با دنیا')
                  .pauseFor(2000)
                  .deleteAll()
                  .start()
              }}
              options={{
                strings: [
                  'یک رویای آموزشی با دنیا',
                  'آکادمی تخصصی برنامه نویسی ',
                ],
                autoStart: true,
                loop: true,
              }}
            />

            <div className="input-search">
              <input
                className="inputss"
                type="text"
                placeholder="جست و جو کنید ..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button onClick={gotoSearchHome}>
                <BiSearchAlt2 className="input-icon" />
              </button>
            </div>

            {/* <Swiper
              slidesPerView={2}
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              loop={true}
              className="mySwiper"
            >
              {allCourse.map((course) => {
                return (
                  <>
                    <div className="allcourse-swiper">
                      <span>{course.price}</span>
                      <span>اسم دوره</span>
                    </div>
                  </>
                )
              })}
            </Swiper> */}
          </div>
          <div className="middle-section-left">
            <img src="images/boto.webp" alt="" />
          </div>
        </div>
      </div>
    </>
  )
}

export default MiddleSection
