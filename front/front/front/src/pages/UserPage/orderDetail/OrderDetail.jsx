/* eslint-disable react/prop-types */
import { useContext } from 'react'

import './OrderDetail.css'
import AuthContext from '../../../context/Context'

const OrderDetail = () => {
  const authContext = useContext(AuthContext)
  console.log(authContext)

  return (
    <>
      <div className="container">
        <div style={{ width: '80%' }}>
          <div>
            <p className="about-order">
              سفارش <span>فلان</span> در تاریخ <span>{}</span> ثبت شده است و در
              حال حاضر در وضعیت <span>تکمیل شده</span> می باشد.
            </p>
          </div>
          <div>
            <h1 className="order-detail">مشخصات سفارش</h1>
          </div>

          <div>
            <table className="table" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th className="th-right" style={{ textAlign: 'right' }}>
                    محصول
                  </th>
                  <th className="th-left" style={{ textAlign: 'left' }}>
                    مجموع
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="th-right">دوره فلان</td>

                  <td className="th-left" style={{ textAlign: 'left' }}>
                    0 تومان
                  </td>
                </tr>

                <tr>
                  <td className="th-right weight"> جمع کل سبد خرید </td>

                  <td className="th-left" style={{ textAlign: 'left' }}>
                    0 تومان
                  </td>
                </tr>
                <tr>
                  <td className="th-right weight"> قیمت نهایی</td>

                  <td className="th-left" style={{ textAlign: 'left' }}>
                    0 تومان
                  </td>
                </tr>
              </tbody>
            </table>

            <div>
              <button className="bttn-2 table-btn">سفارش دوباره</button>
            </div>

            <div>
              <h1 className="order-detail">آدرس صورتحساب</h1>
              <p className="order-detail-p">
                {' '}
                {authContext?.userInfo?.data?.name}{' '}
              </p>
              <p className="order-detail-p">
                {authContext?.userInfo?.data?.phone}
              </p>
              <p className="order-detail-p">
                {authContext?.userInfo?.data?.username}@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderDetail
