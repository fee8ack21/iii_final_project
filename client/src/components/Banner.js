import React from 'react'

function Banner(props) {
  return (
    <>
      <div className="col-9" style={{ padding: '0px 15px' }}>
        <div className="container px-0">
          <h1 className="display-4 font-weight-bold">{props.pagename}</h1>
          <p className="lead font-weight-bold">這是 {props.pagename} 的說明</p>
        </div>
      </div>
    </>
  )
}

export default Banner
