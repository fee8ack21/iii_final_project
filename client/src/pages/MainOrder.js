import React from 'react'
import Order from '../components/Order'

function MainOrder() {
  return (
    <>
      <div className="main col-9">
        <div className="title ml-3 mb-2 font-weight-bold">訂單紀錄</div>
        <div className="mx-2 order-wrap ">
          <div className="mx-auto border border-0" style={{ width: '95%' }}>
            <Order />
          </div>
        </div>
      </div>
    </>
  )
}

export default MainOrder
