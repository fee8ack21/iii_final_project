import React, { useState } from 'react'
import ProductContent from '../components/ProductContent'
import Topbtn from '../components/Topbtn'
import Footer from '../components/Footer'
import HeaderProduct from '../components/HeaderProduct'

// 尚未導入header
function Product() {
  const [childCategoryState, setChildCategoryState] = useState(0)
  const [detailToHeaderCart, setDetailToHeaderCart] = useState(
    !!localStorage.getItem('cartList')
      ? JSON.parse(localStorage.getItem('cartList')).length
      : 0
  )
  const [showParent, setShowParent] = useState(false)

  return (
    <>
      <HeaderProduct
        showParent={showParent}
        setShowParent={setShowParent}
        detailToHeaderCart={detailToHeaderCart}
        setDetailToHeaderCart={setDetailToHeaderCart}
        setChildCategoryState={setChildCategoryState}
      ></HeaderProduct>
      <ProductContent childCategoryState={childCategoryState}></ProductContent>
      <Topbtn />
      <Footer />
    </>
  )
}

export default Product
