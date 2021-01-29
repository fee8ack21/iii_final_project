import React, { useState } from 'react'
import HomeContent from '../components/HomeContent'
import Topbtn from '../components/Topbtn'
import Footer from '../components/Footer'
import HeaderHome from '../components/HeaderHome'

function Home() {
  const [detailToHeaderCart, setDetailToHeaderCart] = useState(
    !!localStorage.getItem('cartList')
      ? JSON.parse(localStorage.getItem('cartList')).length
      : 0
  )
  const [showParent, setShowParent] = useState(false)

  return (
    <>
      <HeaderHome
        showParent={showParent}
        setShowParent={setShowParent}
        detailToHeaderCart={detailToHeaderCart}
        setDetailToHeaderCart={setDetailToHeaderCart}
      ></HeaderHome>
      <HomeContent></HomeContent>
      <Topbtn />
      <Footer />
    </>
  )
}

export default Home
