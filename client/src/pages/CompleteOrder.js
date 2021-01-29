import React, { useState } from 'react'
import Footer from '../components/Footer'
import HeaderOther from '../components/HeaderOther'

function CompleteOrder() {
  const [detailToHeaderCart, setDetailToHeaderCart] = useState(
    !!localStorage.getItem('cartList')
      ? JSON.parse(localStorage.getItem('cartList')).length
      : 0
  )
  const [showParent, setShowParent] = useState(false)
  const [whetherLoginParent, setWhetherLoginParent] = useState(!!localStorage.getItem('user'))

  return (
    <>
      <HeaderOther
        setWhetherLoginParent={setWhetherLoginParent}
        showParent={showParent}
        setShowParent={setShowParent}
        detailToHeaderCart={detailToHeaderCart}
        setDetailToHeaderCart={setDetailToHeaderCart}
      />
      <div class="container mt-5">
        <div>
          <div class="row">
            <div class="d-flex col-4 set-line-height">
              <div class="rounded-circle text-center otherpage">
                <span>1</span>
              </div>
              <span>確認訂單</span>
            </div>

            <div class="d-flex col-4 set-line-height">
              <div class="rounded-circle text-center otherpage">
                <span>2</span>
              </div>
              <span>地址與付款方式</span>
            </div>
            <div class="d-flex col-4 set-line-height">
              <div class="rounded-circle text-center nowpage">
                <span>3</span>
              </div>
              <span>完成訂單</span>
            </div>
          </div>
        </div>
        <div class=" brand border m-2">
          <div class="d-flex set-line-height">
            <div class="tick">
              <img src="./img/check_small.svg" alt={''} />
            </div>
            <span class="title-fontsize">訂單完成</span>
          </div>
          <p class="font-color-gray">
            感謝購酷飛鳥服飾，預定憑證及使用詳情將寄至您的電子信箱
          </p>
          <div class="select-all d-flex border-dark border-bottom m-2">
            <div class="title-template"></div>
            <label class="title-fontsize">訂單明細</label>
          </div>
          <div class="border-left border-dark p-3 m-2">
            <span class="order-info-smalltitle">訂單狀態</span>
            <br />
            <span class="font-color-gray">訂單日期:</span>
            <br />
            <span class="font-color-gray">訂單號碼:</span>
            <br />
            <span class="font-color-gray">狀態:</span>
            <br />
          </div>
          <div class="border-left border-dark p-3 m-2">
            <span class="order-info-smalltitle">收件人資訊</span>
            <br />
            <span class="font-color-gray">收件人姓名:</span>
            <br />
            <span class="font-color-gray">收寄人電話:</span>
            <br />
            <span class="font-color-gray">電子郵件:</span>
            <br />
          </div>
          <div class="border-left border-dark p-3 m-2">
            <span class="order-info-smalltitle">運送方式</span>
            <br />
            <span class="font-color-gray">超商取貨付款:</span>
            <br />
            <span class="font-color-gray">付款方式:</span>
            <span class="font-color-gray">超商取貨付款</span>
            <br />
            <span class="font-color-gray">門市名稱:</span>
            <span id="store_name" class="font-color-gray">
              XX門市
            </span>
            <br />
          </div>
          <div class="select-all d-flex border-dark border-bottom m-2">
            <div class="title-template"></div>
            <label class="title-fontsize">商品明細</label>
          </div>
          <div class="m-3">
            <span>Adidas</span>
          </div>
          <div class="row ml-1">
            <div class="col-3">
              <div class="img-box">
                <img src="./img/product1.jpg" alt={''} />
              </div>
            </div>
            <div class="col-6">
              <span>GOFE兩雙一組/右手超人襪</span>
              <br />
              <span>價格：NT$</span> 3,000 <br />
              <span>數量：</span> 1 <br />
              <span>預計到貨日期：</span> 2020/12/15 <br />
            </div>
            <div class="col-3">
              <span>小計：NT$ </span>3,000
            </div>
          </div>
          <div class="select-all d-flex border-dark border-bottom m-2"></div>
          <div class="m-2">
            <div class="d-flex justify-content-between">
              <span>總計：</span>
              <span>NT$ 3,000</span>
            </div>
            <div class="d-flex justify-content-between">
              <span>運費：</span>
              <span>NT$ 60</span>
            </div>
            <div class="d-flex justify-content-between">
              <span>優惠券(未使用)：</span>
              <span>-NT$ 0</span>
            </div>
            <div class="d-flex justify-content-between">
              <span>結帳金額：</span>
              <span class="final-price">NT$ 3,060</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default CompleteOrder
