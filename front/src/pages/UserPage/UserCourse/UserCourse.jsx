import { useEffect, useState } from 'react'
import './userCourse.css'
import axios from 'axios'

const UserCourse = () => {
  const [allCourseBuyed, setAllCourseBuyed] = useState([])
  const [shownCourse, setShownCourse] = useState([]) // eestefade mojadad az balayi
  const [showCourseState, setShowCourseState] = useState('all')

  useEffect(() => {
    axios({
      url: 'http://localhost:4000/v1/users/courses',
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('user')).token
        }`,
      },
    }).then((data) => {
      console.log('allcoursebuyed:', data.data)
      // console.log('allcoursebuyed1:',data.data.price);
      setAllCourseBuyed(data.data)
      setShownCourse(data.data)
    })
  }, [])

  const filteredCourse = (state) => {
    switch (state) {
      case 'all': {
        setShownCourse(allCourseBuyed)
        break
      }

      case 'free': {
        const freeCourse = allCourseBuyed.filter(
          (course) => course?.course?.price === 0,
        )
        setShownCourse(freeCourse)
        break
      }

      case 'money': {
        const moneyCourse = allCourseBuyed.filter(
          (course) => course?.course?.price !== 0,
        )
        setShownCourse(moneyCourse)
        break
      }

      default: {
        setShownCourse(allCourseBuyed)
      }
    }
  }

  return (
    <>
      <div className="userCourse">
        <h1>دوره های ثبت نام شده</h1>
        <div className="category-course">
          <ul>
            <li>
              <a
                href="."
                className={`${showCourseState === 'all' ? 'menu-color' : null}`}
                onClick={(e) => {
                  e.preventDefault()
                  setShowCourseState('all')
                  filteredCourse('all')
                }}
              >
                همه دوره ها
              </a>
            </li>
            <li>
              <a
                href="."
                className={`${
                  showCourseState === 'free' ? 'menu-color' : null
                }`}
                onClick={(e) => {
                  setShowCourseState('free')
                  e.preventDefault()
                  filteredCourse('free')
                }}
              >
                دوره های رایگان
              </a>
            </li>
            <li>
              <a
                href="."
                className={`${
                  showCourseState === 'money' ? 'menu-color' : null
                }`}
                onClick={(e) => {
                  setShowCourseState('money')
                  e.preventDefault()
                  filteredCourse('money')
                }}
              >
                دوره های پولی
              </a>
            </li>
          </ul>
        </div>

        {shownCourse.map((allcourse) => {
          return (
            <>
              {allcourse.course !== null ? (
                <div className="coursebox">
                  <div className="course-box-right">
                    <img
                      src={`http://localhost:4000/courses/covers/${allcourse?.course?.cover}`}
                      alt=""
                    />
                  </div>

                  <div className="course-box-left">
                    <h1> {allcourse?.course?.name} </h1>
                    <div>
                      <span className="course-box-title">وضعیت :</span>
                      <span> درحال برگزاری</span>
                      <span className="course-box-title"> مبلغ : </span>
                      <span>
                        {' '}
                        {allcourse?.course?.price == 0
                          ? 'رایگان'
                          : allcourse?.course?.price}{' '}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                ''
              )}
            </>
          )
        })}
      </div>
    </>
  )
}

export default UserCourse
