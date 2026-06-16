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
      url: 'http://localhost:4000/v1/courses/popular',
    }).then((data) => {
      console.log('popular course :', data.data)
      setPopularCourse(data.data)
    })
  }, [])

  return (
    <>
      <HeadingTitle title="محبوب ترین دوره ها" />

      <div className="container  ">
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          loop={true}
          className="mySwiper  container  flex justify-center  "
          style={{ width: '93%', marginBottom: '30px', height: '400px' }}
        >
          <div className="grid grid-cols-3 gap-4">
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
