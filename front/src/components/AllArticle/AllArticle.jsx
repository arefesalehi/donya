import Footer from '../../components/Footer/Footer'
import ArticleBox from '../../components/articleBox/ArticleBox'
import Navbar from '../../components/navbar/Navbar'
import Topbar from '../../components/topbar/Topbar'
import Pagination from '../../components/pagination/Pagination'
import BreadCrumb from '../BreadCrumb/BreadCrumb'
import { useEffect, useState } from 'react'
import axios from 'axios'

const AllArticle = () => {
  const [allArticles, setAllArticles] = useState([])
  const [shownCourse, setShownCourse] = useState([])
  useEffect(() => {
    axios({
      url: 'http://localhost:4000/v1/articles',
    }).then((data) => {
      console.log('all Course:', data.data)
      setAllArticles(data.data)
    })
  }, [])
  return (
    <>
      <Topbar />
      <Navbar />

      <BreadCrumb
        links={[
          { id: 1, title: 'خانه', to: '/' },
          { id: 2, title: `تمامی مقاله ها`, to: '' },
        ]}
      />

      <div className="container flex justify-center mt-16 ">
        <div className="grid grid-cols-3 gap-8 ">
          {shownCourse.map((allArticle) => {
            return <ArticleBox key={allArticle._id} {...allArticle} />
          })}
        </div>
      </div>

      <div className="pagination">
        <Pagination
          items={allArticles}
          itemsCount={3}
          setShownCourse={setShownCourse}
          pathName={'/articles'}
        />
      </div>

      <Footer />
    </>
  )
}

export default AllArticle
