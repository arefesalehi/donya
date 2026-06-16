/* eslint-disable react/prop-types */
import './ArticleBox.css'
import { Link } from 'react-router-dom'
import { IoIosArrowRoundBack } from 'react-icons/io'

const ArticleBox = (props) => {
  return (
    <div className="article ">
      <div className=" w-400 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <Link to={`http://localhost:4000/courses/covers/${props.cover}`}>
          <div>
            <Link to={`/article-info/${props.shortName}`}>
              <img
                className="rounded-t-lg  p-10 rounded  "
                src={`http://localhost:4000/courses/covers/${props.cover}`}
                alt=""
                style={{ width: '-webkit-fill-available', height: '360px' }}
              />
            </Link>
          </div>
        </Link>
        <div
          className="p-5"
          style={{ width: '-webkit-fill-available', height: '137px' }}
        >
          <Link to={`/article-info/${props.shortName}`}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {props.title}
            </h5>
          </Link>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {props.description}
          </p>
          <Link
            to={`article-info/${props.shortName}`}
            style={{ background: '#7443ff' }}
            className="   text-xl inline-flex mb-2 items-center px-3 py-2  font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            بیشتر بخوانید
            <IoIosArrowRoundBack />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ArticleBox
