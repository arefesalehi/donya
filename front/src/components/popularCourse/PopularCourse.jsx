import HeadingTitle from '../headingTitle/HeadingTitle'
import './popularCourse.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css/pagination'
import 'swiper/css'
import 'swiper/css/pagination'
import CourseBox from '../courseBox/CourseBox'
import { useEffect, useState } from 'react'
import axios from 'axios'
const PopularCourse = () => {
  const [popularCourse, setPopularCourse] = useState([])

  useEffect(() => {
    axios({
      url: import.meta.env.VITE_API_URL +'/v1/courses/popular',
    }).then((data) => {
      console.log('popular course :', data.data)
      setPopularCourse(data.data)
    })
  }, [])

  return (
    <>
      <HeadingTitle title="محبوب ترین دوره ها" />

      <div className="container">
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          loop={true}
          className="flex justify-center mySwiper container"
          style={{ width: '93%', marginBottom: '30px', height: '400px' }}
        >
          <div className="gap-4 grid grid-cols-3">
            {popularCourse.map((popular) => {
              return (
                <SwiperSlide key={popular._id}>
                  <CourseBox {...popular} />
                </SwiperSlide>
              )
            })}
          </div>
        </Swiper>
      </div>
    </>
  )
}

export default PopularCourse
