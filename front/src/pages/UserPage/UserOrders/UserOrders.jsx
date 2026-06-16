/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import './UserOrders.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
const UserOrders = () => {
  const [orders, setOrders] = useState([])
  const [orderDetails, setOrderDetails] = useState([])

  useEffect(() => {
    axios({
      url: 'http://localhost:4000/v1/orders',
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('user')).token
        }`,
      },
    }).then((data) => {
      console.log('all orders:', data.data)
      setOrders(data.data)
    })
  }, [])

  const singleOrder = (orderID) => {
    axios({
      url: `http://localhost:4000/v1/orders/${orderID}`,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('user')).token
        }`,
      },
    }).then((data) => {
      console.log('singlerorder', data.data)
      setOrderDetails(data.data)
    })
  }

  return (
    <>
      <div
        className="mt-20"
        style={{
          width: '90%',
          borderRight: '3px solid #7443ff',
          marginRight: '65px',
          padding: '10px 50px',
          height: '320px',
        }}
      >
        <table
          className="text-gray-500 text-left text-xlg dark:text-gray-400 table"
          style={{ width: '82%' }}
        >
          <thead className="text-right bg-gray-50 dark:bg-gray-700 text-gray-700 text-xlg dark:text-gray-400 uppercase">
            <tr>
              <th>شناسه</th>
              <th>تاریخ</th>
              <th>وضعیت</th>
              <th>دوره</th>
              <th>مبلغ</th>
              <th>عملیات ها</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => {
              return (
                <tr key={order._id} style={{ height: '20px' }}>
                  <td>{index + 1}</td>
                  <td>{order.updatedAt.slice(0, 10)}</td>
                  <td>
                    {' '}
                    {order?.courseisComplete === 0
                      ? 'در حال برگزاری'
                      : ' به اتمام رسیده'}
                  </td>
                  <td>
                    {order?.course === null
                      ? 'موجود نیست'
                      : order?.course?.name}
                  </td>
                  <td>{order.price === 0 ? 'رایگان' : order.price}</td>
                  <td>
                    <button className="bttn" type="">
                      <Link
                        style={{ color: 'white' }}
                        onClick={() => singleOrder(order._id)}
                        to="orderDetail"
                      >
                        نمایش
                      </Link>
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <div>
          <button className="bttn table-btn">بعدی</button>
        </div>
      </div>
    </>
  )
}

export default UserOrders
