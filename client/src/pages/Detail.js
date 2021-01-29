import React, { useState } from 'react'
import { Route } from 'react-router-dom'
import DetailContent from '../components/DetailContent'
import Topbtn from '../components/Topbtn'
import Footer from '../components/Footer'
import HeaderOther from '../components/HeaderOther'

// 尚未導入header
function Detail() {
  // 測試
  const [detailToHeaderCart, setDetailToHeaderCart] = useState(
    !!localStorage.getItem('cartList')
      ? JSON.parse(localStorage.getItem('cartList')).length
      : 0
  )
  const [whetherLoginParent, setWhetherLoginParent] = useState(
    !!localStorage.getItem('user')
  )
  const [showParent, setShowParent] = useState(false)
  return (
    <>
      <HeaderOther
        setWhetherLoginParent={setWhetherLoginParent}
        showParent={showParent}
        setShowParent={setShowParent}
        detailToHeaderCart={detailToHeaderCart}
        setDetailToHeaderCart={setDetailToHeaderCart}
      ></HeaderOther>
      <Route path="/detail/:brand?/:id?">
        <DetailContent
          whetherLoginParent={whetherLoginParent}
          setWhetherLoginParent={setWhetherLoginParent}
          setShowParent={setShowParent}
          detailToHeaderCart={detailToHeaderCart}
          setDetailToHeaderCart={setDetailToHeaderCart}
        ></DetailContent>
      </Route>
      <Topbtn />
      <Footer />
    </>
  )
}

export default Detail
