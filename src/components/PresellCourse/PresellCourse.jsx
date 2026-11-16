import HeadingTitle from '../headingTitle/HeadingTitle'
import './presellcourse.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css/pagination'
import 'swiper/css'
import 'swiper/css/pagination'
import CourseBox from '../courseBox/CourseBox'
import { useEffect, useState } from 'react'
import axios from 'axios'
const PresellCourse = () => {
  const [presellCourse, setPresellCourse] = useState([])

  useEffect(() => {
    axios({
      url: 'http://localhost:4000/v1/courses/presell',
    }).then((data) => {
      console.log('presell course:', data.data)
      setPresellCourse(data.data)
    })
  }, [])

  return (
    <>
      <HeadingTitle title="   دوره های پیش فروش" />

      <div className="container">
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          loop={true}
          className="flex justify-center container mySwiper"
          style={{ width: '93%', marginBottom: '30px', height: '400px' }}
        >
          <div className="gap-4 grid grid-cols-3">
            {presellCourse.map((presell) => {
              return (
                <SwiperSlide key={presell._id}>
                  <CourseBox {...presell} />
                </SwiperSlide>
              )
            })}
          </div>
        </Swiper>
      </div>
    </>
  )
}

export default PresellCourse
