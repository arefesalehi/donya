/* eslint-disable react/prop-types */

import './coursebox.css'
import { Link } from 'react-router-dom'
import { RiStarSFill } from 'react-icons/ri'
import { AiOutlineStar } from 'react-icons/ai'
import { useState } from 'react'
import Loading from '../loading/Loading'
import swal from 'sweetalert'
import axios from 'axios'
const CourseBox = (props) => {
  const [isLoading, setIsLoading] = useState(false)

  const setLoaded = () => {
    setIsLoading(true)
  }

  const registerinCourse = (course) => {
    if (course.price === 0) {
      swal({
        title: 'ایا از ثبت نام در دوره اطمینان دارید؟',
        icon: 'warning',
        buttons: ['خیر', 'بله'],
      }).then((data) => {
        console.log(data)
        if (data) {
          axios({
            url: `http://localhost:4000/v1/courses/${course._id}/register`,
            method: 'POST',
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem('user')).token
              }`,
            },
            data: {
              price: course.price,
            },
          }).then((data) => {
            console.log('ok?', data)
            if (data.status === 201) {
              swal({
                title: 'شما با موفقیت در دوره ثبت نام شدید',
                icon: 'success',
                buttons: 'تایید',
              })
            }
          })
        }
      })
    }
  }


  return (
    <div className="h-[100%] course">
      <div
        style={{ height: '100%' }}
        className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow border rounded-lg w-400"
      >
        <Link to={`/course-info/${props.shortName}`} className="h-[300px]">
          <img
            className="p-8 rounded-t-lg"
            src={`http://localhost:4000/courses/covers/${props.cover}`}
            alt="product image"
            style={{ width: '-webkit-fill-available', borderRadius: '30px' }}
            onLoad={setLoaded}
          />
          {!isLoading && <Loading />}
        </Link>
        <div className="px-10 pb-5">
          <Link to={`/course-info/${props.shortName}`}>
            <h5 className="font-semibold text-gray-900 text-xlg dark:text-white tracking-tight">
              {props.name}
            </h5>
          </Link>
          <div className="flex justify-between items-center mt-6 mb-5 text-xl">
            <span> {props.creator}</span>

            <span>
              <span>
                {Array(props.courseAverageScore)
                  .fill(0)
                  .map((item, index) => {
                    return (
                      <AiOutlineStar
                        className="text-orange-500"
                        key={index.toString()}
                        style={{
                          width: '15px',
                          height: '15px',
                        }}
                      />
                    )
                  })}

                {Array(5 - props.courseAverageScore)
                  .fill(0)
                  .map((item, index) => {
                    return (
                      <RiStarSFill
                        className="text-orange-500"
                        key={index.toString()}
                        style={{
                          width: '18px',
                          height: '18px',
                        }}
                      />
                    )
                  })}
              </span>
            </span>
          </div>
          <div className="flex justify-between items-center mt-[30px]">
            <div className="flex justify-center items-center bg-[#c79af1] p-2 rounded-[5px] text-white text-xl">
              {props.price !== 0 && props.discount}%{' '}
              {props.price === 0 && '100'}{' '}
            </div>

            <div>
              <span
                className={`text-2xl p-2 font-bold text-gray-500 dark:text-white ${
                  props.price === 0 ? '' : 'line-through'
                } `}
              >
                {props.price === 0 ? 'رایگان' : props.price.toLocaleString()}
              </span>
              <span className="font-bold text-2xl text-gray-900 dark:text-white">
                {props.price !== 0 && props.discount !== 0
                  ? props.price * (props.discount / 100).toLocaleString()
                  : ''}
              </span>
            </div>
          </div>

          <div className="flex justify-between mt-[30px]">
            <Link
              href="javascript.void(0)"
              to={`/course-info/${props.shortName}`}
              style={{ background: '#7443ff' }}
              className="hover:bg-blue-800 dark:hover:bg-blue-700 dark:bg-blue-600 px-5 py-2.5 rounded-lg focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-center text-white text-xl focus:outline-none"
            >
              اطلاعات بیشتر
            </Link>
            <Link
              onClick={()=>registerinCourse(props._id)}
              to="#"
              style={{ background: '#7443ff' }}
              className="hover:bg-indigo-800 dark:hover:bg-blue-700 dark:bg-[#8d66ff] px-5 py-2.5 rounded-lg focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-center text-white text-xl focus:outline-none"
            >
              ثبت نام
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseBox
