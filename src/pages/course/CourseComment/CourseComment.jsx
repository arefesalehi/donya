/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import './coursecomment.css'
import { FaRegComment } from 'react-icons/fa'
import { FcCheckmark } from 'react-icons/fc'
import { RxAvatar } from 'react-icons/rx'
import LeftSide from '../../../components/leftSideOfCourse/leftSide'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import swal from 'sweetalert'
import AuthContext from '../../../context/Context'

const CourseComment = () => {
  const authContext = useContext(AuthContext)

  const [courseDetail, setCourseDetail] = useState()
  const [comments, setComments] = useState([])
  const [score, setScore] = useState('')
  const [textareaBody, setTextareaBody] = useState('')
  const { courseName } = useParams()

  useEffect(() => {
    getAllComment()
    axios({
      url: `http://localhost:4000/v1/courses/${courseName}`,
    }).then((data) => {
      setCourseDetail(data.data)
    })
  }, [])

  const getAllComment = () => {
    axios({
      url: `http://localhost:4000/v1/courses/${courseName}`,
    }).then((data) => {
      console.log('asdfsaf', data)
      setComments(data.data.comments)
    })
  }

  const sendComment = (e) => {
    e.preventDefault()
    axios({
      url: 'http://localhost:4000/v1/comments',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('user')).token
        }`,
      },
      data: {
        body: textareaBody,
        courseShortName: courseName,
        score: score,
      },
    }).then((data) => {
      console.log(data)
      if (data.status === 201) {
        swal({
          title: 'کامنت شمابا موفقیت ثبت شد',
          icon: 'success',
          buttons: 'تایید',
        }).then(() => {
          getAllComment()
        })
      }
    })
  }

  return (
    <div className="container">
      <div className="allinfo">
        <div className="w-[100%]">
          <div className="comment-box">
            <div className="comments-icon">
              <div className="comment-svg">
                <FaRegComment />
              </div>
              <span>نظرات</span>
            </div>

            <div className="comments">
              {comments.length === 0 ? (
                <div
                  className="relative bg-red-100 px-4 py-3 border border-red-400 rounded text-red-700"
                  role="alert"
                >
                  <span className="block sm:inline">
                    هیچ کامنتی برای این دوره ثبت نشده است
                  </span>
                  <span className="top-0 right-0 bottom-0 absolute px-4 py-3"></span>
                </div>
              ) : (
                comments.map((comment) => {
                  return (
                    <>
                      {comment.answerContent === null ? (
                        <>
                          <div key={comment._id} className="comments-part1">
                            <div>
                              <RxAvatar
                                style={{ width: '30px', height: '30px' }}
                              />
                              <span> {comment.creator.name} </span>
                              <span className="comments-sell">مدیر</span>
                              <span>
                                {comment.creator.createdAt.slice(0, 10)}
                              </span>
                            </div>
                            <div className="comment-response">پاسخ</div>
                          </div>

                          <div className="comments-part2">{comment.body}</div>
                        </>
                      ) : (
                        <>
                          <div key={comment._id} className="comments-part1">
                            <div>
                              <RxAvatar
                                style={{ width: '30px', height: '30px' }}
                              />
                              <span> {comment.creator.name} </span>
                              <span className="comments-sell">مدیر</span>
                              <span>
                                {comment.creator.createdAt.slice(0, 10)}
                              </span>
                            </div>
                            <div className="comment-response">پاسخ</div>
                          </div>

                          <div className="comments-part2">
                            {comment.body}
                            <div
                              className="comment-replay"
                              style={{ padding: '50px' }}
                            >
                              <div>
                                <RxAvatar
                                  style={{ width: '30px', height: '30px' }}
                                />{' '}
                                <span>
                                  {comment?.answerContent?.creator?.name}{' '}
                                </span>
                                <span className="comments-sell"> مدیر</span>
                                <span>
                                  {comment?.answerContent?.createdAt?.slice(
                                    0,
                                    10,
                                  )}{' '}
                                </span>
                                <div style={{ marginTop: '20px' }}>
                                  {comment?.answerContent?.body}
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  )
                })
              )}
            </div>
          </div>

          {authContext.isLoggedIn === false ? (
            <p className="mr-20 text-3xl">
              لطفا جهت درج کامنت در سایت{' '}
              <Link to="/login" className="text-[#7443ff]">
                لاگین
              </Link>{' '}
              شوید .{' '}
            </p>
          ) : (
            <>
              <div className="comments-rules">
                <h1>قوانین ثبت دیدگاه</h1>
                <h6>
                  <FcCheckmark />
                  اگر نیاز به پشتبانی دوره دارید از قسمت پرسش سوال قسمت نمایش
                  انلاین استفاده نمایید و سوالات مربوط به رفع اشکال تایید
                  نخواهند شد.
                </h6>
                <h4>
                  <FcCheckmark />
                  دیدگاه های نامربوط به دوره تایید نخواهند شد
                </h4>
                <h4>
                  <FcCheckmark />
                  سوالات مربوط به رفع اشکال در این بخش تایید نخواهد شد
                </h4>
                <h4>
                  <FcCheckmark />
                  از درج دیدگاه های تکراری پرهیز نمایید
                </h4>
              </div>

              <div className="comment-score">
                <h1>امتیاز شما</h1>

                <select
                  name="choice"
                  className="comment-choice"
                  onChange={(e) => setScore(e.target.value)}
                >
                  <option value="-1" defaultValue={'ab'}>
                    امتیاز خودر ا انتخاب نمایید
                  </option>
                  <option value="5">عالی </option>
                  <option value="4">خیلی خوب</option>
                  <option value="3">خوب </option>
                  <option value="2">ضعیف </option>
                  <option value="1">خیلی ضعیف </option>
                </select>

                <h1>دیدگاه شما*</h1>
                <textarea
                  placeholder="لطفا نظر خود را ثبت نمایید"
                  className="comment-textarea"
                  onChange={(e) => setTextareaBody(e.target.value)}
                >
                  {textareaBody}
                </textarea>

                <button
                  type="submit"
                  className="comments-btn"
                  onClick={sendComment}
                >
                  ارسال
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default CourseComment
