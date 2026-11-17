/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useParams } from 'react-router-dom'
import './pagination.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IoIosArrowRoundForward } from 'react-icons/io'
import { IoIosArrowRoundBack } from 'react-icons/io'

const Pagination = ({ items, itemsCount, setShownCourse, pathName }) => {
  const [pagesCount, setPagesCount] = useState(null)
  const { page } = useParams()

  useEffect(() => {
    let endIndex = itemsCount * page
    let startIndex = endIndex - itemsCount
    let paginatedItems = items.slice(startIndex, endIndex)
    setShownCourse(paginatedItems)

    let pagesNumber = Math.ceil(items.length / itemsCount)
    setPagesCount(pagesNumber)
  }, [page, items])

  const clickprev = () => {
    console.log('prev')
  }

  return (
    <>
      <nav aria-label="Page navigation example">
        <ul className="list-style-none flex ">
          <li className="ml-5 p-2 flex align-items-center justify-content-center bg-purple-600 rounded text-white">
            <a className="pointer-events-none relative block rounded bg-transparent px-3 py-1.5 text-2xlg text-neutral-500 transition-all duration-300 dark:text-neutral-400">
              <IoIosArrowRoundForward />
            </a>
          </li>

          {Array(pagesCount)
            .fill(0)
            .map((pag, index) => {
              return index + 1 === Number(page) ? (
                <li
                  key={pag.id}
                  className="ml-5 p-2 flex align-items-center justify-content-center bg-[#c79ce9] rounded text-white"
                >
                  <Link
                    className="relative block rounded bg-transparent px-3 py-1.5 text-xlg text-neutral-600 transition-all   "
                    to={`${pathName}/${index + 1}`}
                  >
                    {index + 1}
                  </Link>
                </li>
              ) : (
                <li
                  key={pag.index}
                  className="ml-5 p-2 flex align-items-center justify-content-center  bg-[#c79ce9] rounded"
                >
                  <Link
                    className="relative block rounded bg-transparent px-3 py-1.5 text-xlg text-neutral-600 transition-all "
                    to={`${pathName}/${index + 1}`}
                  >
                    {index + 1}
                  </Link>
                </li>
              )
            })}

          <li className="ml-5 p-2 flex align-items-center justify-content-center bg-purple-600 rounded text-white">
            <a
              className="pointer-events-none relative block rounded bg-transparent px-3 py-1.5 text-2xlg text-neutral-500 transition-all duration-300 dark:text-neutral-400"
              onClick={clickprev}
            >
              <IoIosArrowRoundBack />
            </a>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Pagination
