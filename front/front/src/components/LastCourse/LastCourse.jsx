import './lastcourse.css'
import HeadingTitle from '../../components/headingTitle/HeadingTitle'
import CourseBox from '../../components/courseBox/CourseBox'
import { useEffect, useState } from 'react'
import axios from 'axios'
const LastCourse = () => {
  const [lastCourses, setlastCourse] = useState([])
  useEffect(() => {
    axios({
      url: 'http://localhost:4000/v1/courses',
    }).then((data) => {
      console.log('lastcourse:', data.data)
      setlastCourse(data.data)
    })
  }, [])
  return (
    <>
      <HeadingTitle
        title="جدیدترین دوره های آموزشی"
        buttonTitle="دوره های بیشتر"
        link="courses/1"
      />

      <div className="flex justify-center container">
        <div className="gap-8 grid grid-cols-3" style={{ width: '93%' }}>
          {lastCourses.slice(0, 6).map((lastCourse) => {
            return <CourseBox key={lastCourse._id} {...lastCourse} />
          })}
        </div>
      </div>
    </>
  )
}

export default LastCourse
