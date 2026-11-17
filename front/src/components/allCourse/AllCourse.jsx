import Topbar from '../topbar/Topbar'
import Navbar from '../navbar/Navbar'
import './allcourse.css'
import Footer from '../Footer/Footer'
import BreadCrumb from '../BreadCrumb/BreadCrumb'
import CourseBox from '../courseBox/CourseBox'
import Pagination from '../../components/pagination/Pagination'
import { useEffect, useState } from 'react'
import axios from 'axios'
const AllCourse = () => {
  const [allCourses, setAllCourses] = useState([])
  const [shownCourse, setShownCourse] = useState([])

  useEffect(() => {
    axios({
      url: import.meta.env.VITE_API_URL +'/v1/courses',
    }).then((data) => {
      console.log('all Course:', data.data)
      setAllCourses(data.data)
    })
  }, [])

  return (
    <>
      <Topbar />
      <Navbar />

      <BreadCrumb
        links={[
          { id: 1, title: 'خانه', to: '/' },
          { id: 2, title: `تمامی دوره ها`, to: '' },
        ]}
      />

      <div className="flex justify-center mt-16 container">
        <div className="gap-8 grid grid-cols-3" style={{ width: '90%' }}>
          {shownCourse.map((allCourse) => {
            return <CourseBox key={allCourse._id} {...allCourse} />
          })}
        </div>
      </div>

      <div className="pagination">
        <Pagination
          items={allCourses}
          itemsCount={3}
          setShownCourse={setShownCourse}
          pathName={'/courses'}
        />
      </div>

      <Footer />
    </>
  )
}

export default AllCourse
