import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'

function MainCoupon() {
  const loc = useLocation()
  console.log(loc)
  const history = useHistory()
  const id = !!loc.state ? loc.state.id : history.push('/clothing')

  const [couponData, setCouponData] = useState([])

  const getCouponData = (id) => {
    let url = new URL('http://localhost:3001/member/coupon')
    let params = {
      id: id,
    }
    url.search = new URLSearchParams(params).toString()

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCouponData(data)
      })
      .catch((err) => console.log('錯誤:', err))
  }

  useEffect(() => {
    getCouponData(id)
  }, [id])

  return (
    <>
      <div className="main col-9">
        <div className="title ml-3 mb-2 font-weight-bold">優惠券</div>
        <div className="mx-2 coupon-wrap">
          <div className="row mx-5 text-center d-flex align-items-center">
            <div className="titleIcon"></div>
            <div className="titleContent">優惠券</div>
          </div>
          <div className="linkTop"></div>
          <div className="mx-auto border border-0" style={{ width: '95%' }}>
            {couponData.map((v, k) => {
              return (
                <div key={k}>
                  <img src={v.image} alt={''} className="w-50"></img>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default MainCoupon
