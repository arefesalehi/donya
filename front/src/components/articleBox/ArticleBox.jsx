/* eslint-disable react/prop-types */
import './ArticleBox.css'
import { Link } from 'react-router-dom'
import { IoIosArrowRoundBack } from 'react-icons/io'

const ArticleBox = (props) => {
  return (
    <div className="article">
      <div className="bg-white dark:bg-gray-800 shadow border border-gray-200 dark:border-gray-700 rounded-lg w-400">
        <Link to={import.meta.env.VITE_API_URL +`/courses/covers/${props.cover}`}>
          <div>
            <Link to={`/article-info/${props.shortName}`}>
              <img
                className="p-10 rounded rounded-t-lg"
                src={import.meta.env.VITE_API_URL +`/courses/covers/${props.cover}`}
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
            <h5 className="mb-2 font-bold text-gray-900 dark:text-white text-2xl tracking-tight">
              {props.title}
            </h5>
          </Link>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {props.description}
          </p>
          <Link
            to={`article-info/${props.shortName}`}
            style={{ background: '#7443ff' }}
            className="inline-flex items-center bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 mb-2 px-3 py-2 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-white text-xl text-center"
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
