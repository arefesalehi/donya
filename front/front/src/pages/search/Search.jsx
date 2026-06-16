/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import Footer from '../../components/Footer/Footer'
import HeadingTitle from '../../components/headingTitle/HeadingTitle'
import Navbar from '../../components/navbar/Navbar'
import Topbar from '../../components/topbar/Topbar'
import './search.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import CourseBox from '../../components/courseBox/CourseBox'
import ArticleBox from '../../components/articleBox/ArticleBox'
const Search = () => {
  const { value } = useParams()
  const [allResultCourse, setAllResultCourse] = useState([])
  const [allResultArticle, setAllResultArticle] = useState([])

  useEffect(() => {
    axios({
      url: `http://localhost:4000/v1/search/${value}`,
    }).then((data) => {
      console.log(data.data)
      setAllResultArticle(data.data.allResultArticles)
      setAllResultCourse(data.data.allResultCourses)
    })
  }, [])

  return (
    <>
      <Topbar />
      <Navbar />

      <HeadingTitle title="نتیجه جست و جوی دوره ها" />

      {allResultCourse.length === 0 ? (
        <div
          className="relative bg-red-100 px-4 py-3 border border-red-400 rounded text-red-700"
          role="alert"
          style={{ width: '72%', margin: '0 auto' }}
        >
          <span className="block sm:inline">
            نتیجه ای برای جست جوی دوره مورد نظر شما یافت نشد.
          </span>
          <span className="top-0 right-0 bottom-0 absolute px-4 py-3"></span>
        </div>
      ) : (
        <div
          className="flex justify-center container"
          style={{ width: '72.4%', marginBottom: '70px' }}
        >
          <div className="gap-8 grid grid-cols-3">
            {allResultCourse.map((course) => {
              return <CourseBox key={course._id} {...course} />
            })}
          </div>
        </div>
      )}

      <HeadingTitle title="نتیجه جست و جوی مقاله ها" />
      {allResultArticle.length === 0 ? (
        <div
          className="relative bg-red-100 px-4 py-3 border border-red-400 rounded text-red-700"
          role="alert"
          style={{ width: '72%', margin: '0 auto' }}
        >
          <span className="block sm:inline">
            نتیجه ای برای جست جوی مقاله مورد نظر شما یافت نشد.
          </span>
          <span className="top-0 right-0 bottom-0 absolute px-4 py-3"></span>
        </div>
      ) : (
        <div
          className="flex justify-center container"
          style={{ width: '72.4%', marginBottom: '70px' }}
        >
          <div className="gap-8 grid grid-cols-3">
            {allResultArticle.map((article) => {
              return <ArticleBox key={article._id} {...article} />
            })}
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}

export default Search
