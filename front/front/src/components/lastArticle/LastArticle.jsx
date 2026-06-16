import { useEffect, useState } from 'react'
import ArticleBox from '../articleBox/ArticleBox'
import HeadingTitle from '../headingTitle/HeadingTitle'
import './lastArticle.css'
import axios from 'axios'
const LastArticle = () => {
  const [lastArticle, setLastArticle] = useState([])
  useEffect(() => {
    axios({
      url: 'http://localhost:4000/v1/articles',
    }).then((data) => {
      console.log('lastArticle:', data.data)
      setLastArticle(data.data)
    })
  }, [])

  return (
    <>
      <HeadingTitle
        title="جدیدترین مقاله ها"
        buttonTitle="مقاله های بیشتر"
        link="articles/1"
      />

      <div
        className="flex justify-center container"
        style={{ width: '72.4%', marginBottom: '70px' }}
      >
        <div className="gap-8 grid grid-cols-3">
          {lastArticle.slice(0, 3).map((article) => {
            return <ArticleBox key={article._id} {...article} />
          })}
        </div>
      </div>
    </>
  )
}

export default LastArticle
