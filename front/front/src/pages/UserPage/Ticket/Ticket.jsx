import { useFormik } from 'formik'
import './Ticket.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import { Link } from 'react-router-dom'
const Ticket = () => {
  const [department, setDepartment] = useState([])
  const [subDepartment, setSubDepartment] = useState([])

  useEffect(() => {
    axios({
      url: 'http://localhost:4000/v1/tickets/departments',
    }).then((data) => {
      console.log('department:', data.data)
      setDepartment(data.data)
    })
  }, [])

  const getSubDep = (dep) => {
    axios({
      url: `http://localhost:4000/v1/tickets/departments-subs/${dep}`,
    }).then((data) => {
      console.log('subdepartment:', data.data)
      setSubDepartment(data.data)
    })
  }

  const sendTicket = (e) => {
    e.preventDefault()
    axios({
      url: 'http://localhost:4000/v1/tickets',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('user')).token
        }`,
      },
      data: {
        departmentID: form.values.department,
        departmentSubID: form.values.subDepartment,
        title: form.values.title,
        body: form.values.content,
        priority: form.values.priority,
      },
    }).then((data) => {
      console.log('sendTicket data', data)
      if (data.status === 201) {
        swal({
          title: 'تیکت با موفقیت ایجاد شد',
          icon: 'success',
          buttons: 'تایید',
        })
      }
    })
  }

  const form = useFormik({
    initialValues: {
      department: '-1',
      subDepartment: '-1',
      title: '',
      priority: '-1',
      content: '',
      img: null,
    },
    onSubmit: (values, { setSubmitting }) => {
      console.log('Form Inputs Data =>', values)
      setTimeout(() => {
        setSubmitting(false)
      }, 2000)
    },
    validate: (values) => {
      const errors = {}

      if (values.department === '-1') {
        errors.department = 'لطفا یک مورد را انتخاب نمایید'
      }

      if (values.subDepartment === '-1') {
        errors.department = 'لطفا یک مورد را انتخاب نمایید'
      }

      if (values.title === '') {
        errors.title = 'وارد کردن رمز عبور اجباری می‌باشد'
      } else if (values.title.length < 6) {
        errors.title = 'رمز عبور حداقل باید 6 کاراکتر باشد'
      }

      if (values.priority === '-1') {
        errors.department = 'لطفا یک مورد را انتخاب نمایید'
      }

      if (values.content === '') {
        errors.content = 'لطفا محتوای تیکت  را وارد نمایید'
      } else if (values.content.length < 10) {
        errors.content = 'طول محتوای وارد شده کمتر از 10 می باشد.'
      }

      if (values.img === '') {
        errors.img = 'وارد کردن  عکس اجباری می‌باشد'
      }
      return errors
    },
  })

  return (
    <>
      <div className="send-ticket">
        <div className="row ticktick">
          <div className="col-md-12">
            <h1>ارسال تیکت جدید</h1>
          </div>
          <div className="btntick col-md-12">
            <Link to="/my-account/tickets">
              <button type="" className="btn-ticket">
                همه تیکت ها
              </button>
            </Link>
          </div>
        </div>

        <form onSubmit={form.handleSubmit}>
          <div className="gap-6 grid md:grid-cols-2 mb-6">
            <div className="my-ticket">
              <div>دپارتمان را انتخاب کنید:</div>

              <select
                className="select"
                name="department"
                onChange={form.handleChange}
                defaultValue="-1"
                onClick={(e) => getSubDep(e.target.value)}
              >
                <option>لطفا یک مورد را انتخاب نمایید</option>
                {department.map((dep) => {
                  return (
                    <option key={dep._id} value={dep._id}>
                      {dep.title}
                    </option>
                  )
                })}
              </select>
              {form.errors.department && form.touched.department && (
                <p style={{ color: 'red', fontSize: '14px' }}>
                  {form.errors.department}
                </p>
              )}
            </div>
            <div className="my-ticket col-md-6">
              <div>نوع تیکت را انتخاب کنید:</div>

              <select
                className="select"
                name="subDepartment"
                onChange={form.handleChange}
                defaultValue="-1"
              >
                <option>لطفا یک مورد را انتخاب نمایید</option>
                {subDepartment.map((sub) => {
                  return (
                    <option key={sub._id} value={sub._id}>
                      {sub.title}
                    </option>
                  )
                })}
              </select>

              {form.errors.subDepartment && form.touched.subDepartment && (
                <p style={{ color: 'red', fontSize: '14px' }}>
                  {form.errors.subDepartment}
                </p>
              )}
            </div>
            <div className="my-ticket col-md-6">
              <div>عنوان تیکت را انتخاب کنید:</div>
              <input
                className="input myinput"
                type="text"
                name="title"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                value={form.values.title}
                placeholder="عنوان را وارد نمایید"
              />
              {form.errors.title && form.touched.title && (
                <p style={{ color: 'red', fontSize: '14px' }}>
                  {form.errors.title}
                </p>
              )}
            </div>
            <div className="my-ticket col-md-6">
              <div>اولویت تیکت را انتخاب کنید:</div>

              <select
                className="select"
                name="priority"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                defaultValue="-1"
              >
                <option value="-1">لطفا یک مورد را انتخاب نمایید</option>
                <option value="3">کم</option>
                <option value="2">متوسط</option>
                <option value="1">بالا</option>
              </select>
              {form.errors.priority && form.touched.priority && (
                <p style={{ color: 'red', fontSize: '14px' }}>
                  {form.errors.priority}
                </p>
              )}
            </div>
          </div>

          <div>
            <div className="my-ticket">
              <div>محتوای تیکت را وارد نمایید :</div>
            </div>
            <textarea
              name="content"
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={form.values.content}
              style={{
                width: '100%',
                height: '300px',
                marginRight: '14px',
                borderRadius: '10px',
                margin: '0 auto',
              }}
              placeholder="متن خود را وارد نمایید"
            />
            {form.errors.content && form.touched.content && (
              <p style={{ color: 'red', fontSize: '14px' }}>
                {form.errors.content}
              </p>
            )}
          </div>
          <div>
            <div className="ticket-input-file">
              <div>
                <p>حداکثر اندازه :6 مگابایت</p>
                <p>فرمت های مجاز:jpg,png,rar,zip</p>
              </div>

              <input
                type="file"
                name="img"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                value={form.values.img}
              />
              {form.errors.img && form.touched.img && (
                <p style={{ color: 'red', fontSize: '14px' }}>
                  {form.errors.img}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#7334ff] send-tickets"
            onClick={sendTicket}
          >
            ارسال تیکت
          </button>
        </form>
      </div>
    </>
  )
}

export default Ticket
