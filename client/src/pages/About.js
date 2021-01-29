import React, { useState } from 'react'
import AboutContent from '../components/AboutContent'
import Topbtn from '../components/Topbtn'
import Footer from '../components/Footer'
import HeaderAbout from '../components/HeaderAbout'
// 尚未導入header
function About() {
  const [detailToHeaderCart, setDetailToHeaderCart] = useState(
    !!localStorage.getItem('cartList')
      ? JSON.parse(localStorage.getItem('cartList')).length
      : 0
  )
  const [showParent, setShowParent] = useState(false)

  return (
    <>
      <HeaderAbout
        showParent={showParent}
        setShowParent={setShowParent}
        detailToHeaderCart={detailToHeaderCart}
        setDetailToHeaderCart={setDetailToHeaderCart}
      ></HeaderAbout>
      <AboutContent />
      <Topbtn />
      <Footer />
    </>
  )
}

export default About
