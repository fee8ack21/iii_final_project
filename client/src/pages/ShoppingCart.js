import React, { useState, useEffect } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import HeaderOther from '../components/HeaderOther'
import Footer from '../components/Footer'
import ReactHtmlParser from 'react-html-parser'
// import FakeRes from '../data/FakeRes'

function ShoppingCart(props) {
  const [detailToHeaderCart, setDetailToHeaderCart] = useState(
    !!localStorage.getItem('cartList')
      ? JSON.parse(localStorage.getItem('cartList')).length
      : 0
  )
  console.log(JSON.parse(localStorage.getItem('cartList')))
  let FakeRes = JSON.parse(localStorage.getItem('cartList'))
  const [showParent, setShowParent] = useState(false)
  const [whetherLoginParent, setWhetherLoginParent] = useState(
    !!localStorage.getItem('user')
  )

  const [status, setStatus] = useState(1)
  const [total, setTotal] = useState(0)
  const [shippingstatus, setshipping] = useState(1)
  const [buyerinfo, setbuyer] = useState([])
  var totalprice = 0
  const [vip, setVip] = useState(true)
  // FakeRes.map((v, i) => (totalprice += Number(v.price) * Number(v.amount)))

  //--------------------------------------------------------------------

  useEffect(() => {
    FakeRes = JSON.parse(localStorage.getItem('cartList'))
  }, [JSON.parse(localStorage.getItem('cartList'))])

  useEffect(() => {
    // console.log('buyerinfo[0]' + JSON.stringify(buyerinfo[0]))
    // console.log(FakeRes)
    const SignUp = (data) => {
      console.log(data)
      const orderData = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      }
      fetch('http://localhost:3001/shoppingcart', orderData)
        .then((res) => res.json())
        .catch((err) => console.log('錯誤:', err))
    }
    if (buyerinfo.length > 0) SignUp(buyerinfo[0])
  }, [buyerinfo])
  // -----------------------------------------------------------------

  const OrderSummary = () => {
    // totalprice = Number(document.getElementById('totalprice').innerHTML)
    return (
      <div className="col-3 order-summary border px-0">
        <h4
          className="p-3 font-weight-bold h5 mb-3"
          style={{ backgroundColor: '#353c1d', color: 'white' }}
        >
          訂單摘要
        </h4>
        <div className="d-flex align-items-center justify-content-center mb-3">
          <p className="font-weight-bold mb-0">商品總計 NT$</p>
          <span id="totalprice" className="font-weight-bold">
            {status === 1 ? totalprice : total}
          </span>
        </div>
        <div className="d-flex align-items-center justify-content-center mb-3">
          <p className="font-weight-bold mb-0">運費總計 NT$ </p>
          <span className="font-weight-bold">
            {status === 1 ? 0 : vip ? 0 : shippingstatus === 2 ? 60 : 150}
          </span>
        </div>
        <a
          href="#!"
          className="font-weight-bold"
          onClick={() => {
            setTotal(total - 50)
          }}
        >
          使用優惠券
        </a>
        <hr style={{ width: '85%', margin: '16px auto' }} />
        <div className="d-flex align-items-center justify-content-center mb-3">
          <p className="font-weight-bold mb-0">結帳總金額 NT$ </p>
          <span id="totalprice2" className="font-weight-bold">
            {status === 2
              ? total + (vip ? 0 : shippingstatus === 2 ? 60 : 150)
              : ''}
          </span>
        </div>
        <button
          id="before-page"
          type="button"
          className={'btn btn-secondary mx-2 ' + (status === 1 ? 'd-none' : '')}
          onClick={() => {
            setStatus(status - 1)
          }}
        >
          上一步
        </button>
        <button
          type="button"
          className="btn btn-danger mx-2"
          onClick={() => {
            console.log(totalprice)
            setStatus(status + 1)
            if (status === 1) setTotal(totalprice)
            if (status === 2) {
              let today = new Date()
              let ordernum = '' //訂單編號
              let name = function () {
                if (shippingstatus === 1)
                  return document.getElementById('recipient-name').value
                else return document.getElementById('recipient-name2').value
              }
              let addresseeaddress = function () {
                if (shippingstatus === 1)
                  return document.getElementById('recipient-address').value
                else return '超商取貨無收件地址:)'
              } //收件人地址
              let email = function () {
                if (shippingstatus === 2)
                  return document.getElementById('recipient-email').value
              } //email
              let addresseecellphone = function () {
                if (shippingstatus === 1)
                  return document.getElementById('recipient-cellphone').value
                else
                  return document.getElementById('recipient-cellphone2').value
              } //收件人電話
              let orderdate =
                today.getFullYear().toString() +
                '0' +
                (today.getMonth() + 1).toString() +
                today.getDate().toString() //訂單日期
              let paymentmethod = shippingstatus //付款方式(包含運送方式) 宅配(VISA)=1 超取=2
              let pickup_store = '' //取貨門市名稱
              let coupon = '' //優惠券代碼
              let invoiceArr = document.getElementsByName('invoice') //隨商品附上發票 0=捐贈 1=隨附
              let price = total + (vip ? 0 : shippingstatus === 2 ? 60 : 150)
              let invoiceValue
              for (let i = 0; i < invoiceArr.length; i++) {
                if (invoiceArr[i].checked) {
                  invoiceValue = invoiceArr[i].value
                  break
                }
              }
              setbuyer([
                {
                  orderno: orderdate + '0001',
                  member_no: '1', //會員編號 從登入狀態抓
                  name: name(), //取件人
                  addresseeaddress: addresseeaddress(), //宅配地址
                  addresseecellphone: addresseecellphone(), //電話
                  pickup_store: pickup_store, //超取店家
                  invoice: invoiceValue, //發票
                  date:
                    (today.getMonth() + 1).toString().length === 1
                      ? today.getFullYear().toString() +
                        '-' +
                        +'0' +
                        (today.getMonth() + 1).toString() +
                        '-' +
                        today.getDate().toString()
                      : today.getFullYear().toString() +
                        '-' +
                        (today.getMonth() + 1).toString() +
                        '-' +
                        today.getDate().toString(), //訂單日期
                  paymentmethod: paymentmethod, //付款方式
                  coupon: 'BKRE1', //優惠券
                  price: price, //總價格
                  data: FakeRes,
                },
              ])
            }
          }}
        >
          下一步
        </button>
      </div>
    )
  }
  const brand = () => {
    return FakeRes.map((v, i) => {
      let subtotal = 0
      return (
        <div key={i} className=" brand border mx-0 mb-2">
          <div className="px-3 py-2">
            <label htmlFor="brand-name " className="font-weight-bold mb-0 ml-3">
              品牌：{v.brand} / 顏色：{v.color} / 尺寸：{v.size}
            </label>
          </div>
          <div className="product row py-2 mx-0">
            <div className="col-3  d-flex justify-content-center align-items-center">
              <div className="img-box">
                <img
                  style={{
                    width: '100px',
                    height: '92px',
                    objectFit: 'contain',
                    objectPosition: 'center',
                  }}
                  src={v.image}
                  alt={''}
                ></img>
              </div>
            </div>
            <div
              className="col-3   d-flex justify-content-center align-items-center font-weight-bold"
              style={{ fontSize: '14px' }}
            >
              {v.name}
            </div>
            <div className="col-3  d-flex justify-content-center align-items-center">
              <select
                id="product_amount"
                style={{ width: '50px' }}
                onChange={(e) => {
                  let amount = e.target.value
                  console.log(amount)
                  subtotal = Number(v.price) * amount
                  console.log(subtotal) //單項商品小計
                  document.getElementById(
                    `subtotal${v.id}`
                  ).innerHTML = subtotal
                  totalprice += subtotal
                  document.getElementById('totalprice').innerHTML = totalprice
                  document.getElementById('totalprice2').innerHTML = totalprice
                }}
              >
                {(function () {
                  let str = ''
                  for (let d = 0; d <= Number(v.amount); d++) {
                    str += `<option value=${d}>${d}</option>`
                  }
                  return <>{ReactHtmlParser(str)}</>
                })()}
                {/* <span>數量：{v.amount}</span> */}
              </select>
            </div>
            <div className="col-3 d-flex justify-content-center align-items-center font-weight-bold">
              NT${' '}
              <span id={`subtotal${v.id}`}>
                {/* {v.price * v.amount} */}
                {subtotal}
              </span>
            </div>
          </div>
        </div>
      )
    })
  }

  const checkout = () => {
    return (
      <>
        <div className="container" style={{ margin: '69px auto 100px auto' }}>
          <div className="mb-5">
            <div className="row">
              <div className="d-flex col-4 set-line-height">
                <div className="rounded-circle text-center nowpage">
                  <span className="font-weight-bold">1</span>
                </div>
                <span className="font-weight-bold ml-3">確認訂單</span>
              </div>

              <div className="d-flex col-4 set-line-height">
                <div className="rounded-circle text-center otherpage">
                  <span className="font-weight-bold">2</span>
                </div>
                <span className="font-weight-bold ml-3">地址與付款方式</span>
              </div>
              <div className="d-flex col-4 set-line-height">
                <div className="rounded-circle text-center otherpage">
                  <span className="font-weight-bold">3</span>
                </div>
                <span className="font-weight-bold ml-3">完成訂單</span>
              </div>
            </div>
          </div>

          <div className="row mx-0">
            <div className="col-9 order-product pl-0">
              <div className="select-all border mb-3 py-2">
                <div className="px-3">
                  {/* <input type="checkbox" /> */}
                  <label className="title-fontsize mb-0 ml-3">您的購物車</label>
                </div>
              </div>
              {/*  */}
              {/*  */}
              {/*  */}
              {/*  */}
              {/*  */}
              {/*  */}
              {brand()}
            </div>
            {OrderSummary()}
          </div>
        </div>
      </>
    )
  }
  const PaymentMethod = () => {
    // document.getElementById('VISA').on('click', function () {
    //   setshipping(0)
    // })
    // document.getElementById('Home-delivery').on('click', function () {
    //   setshipping(1)
    // })
    return (
      <>
        <div className="container" style={{ margin: '69px auto 100px auto' }}>
          <div className="mb-5">
            <div className="row">
              <div className="d-flex col-4 set-line-height">
                <div className="rounded-circle text-center otherpage">
                  <span className="font-weight-bold">1</span>
                </div>
                <span className="font-weight-bold ml-3">確認訂單</span>
              </div>

              <div className="d-flex col-4 set-line-height">
                <div className="rounded-circle text-center nowpage">
                  <span className="font-weight-bold">2</span>
                </div>
                <span className="font-weight-bold ml-3">地址與付款方式</span>
              </div>
              <div className="d-flex col-4 set-line-height">
                <div className="rounded-circle text-center otherpage">
                  <span className="font-weight-bold">3</span>
                </div>
                <span className="font-weight-bold ml-3">完成訂單</span>
              </div>
            </div>
          </div>

          <div className="row mx-0">
            <div className="col-9 order-info pl-0">
              <div className=" border">
                <div className="d-flex align-items-center border-dark  px-3 py-3">
                  <div className="title-template"></div>
                  <label className="title-fontsize mb-0 ml-3">
                    選擇付款方式
                  </label>
                </div>

                <div className="payment-tab-wrap">
                  <Tabs
                    className="row container py-0 px-5 m-0"
                    defaultActiveKey="VISA"
                    onSelect={(k) => {
                      // console.log(k)
                      k === 'VISA' ? setshipping(1) : setshipping(2)
                    }}
                  >
                    <Tab
                      title="VISA(宅配)"
                      eventKey="VISA"
                      className="tab-visa"
                    >
                      <div className="choosing">
                        <div className="container px-0">
                          <div className="d-flex align-items-center px-3 py-3">
                            <div className="title-template"></div>
                            <label className="title-fontsize mb-0 ml-3">
                              填寫信用卡資訊
                            </label>
                          </div>
                          <div className="py-2 px-5">
                            <div className="d-flex credit-card-info justify-content-between">
                              <input
                                id="credit-card-num1"
                                className="credit-card-info-num px-2"
                                type="text"
                                maxLength="4"
                                placeholder="xxxx"
                              />
                              <input
                                id="credit-card-num2"
                                className="credit-card-info-num px-2"
                                type="text"
                                maxLength="4"
                                placeholder="xxxx"
                              />
                              <input
                                id="credit-card-num3"
                                className="credit-card-info-num px-2"
                                type="text"
                                maxLength="4"
                                placeholder="xxxx"
                              />
                              <input
                                id="credit-card-num4"
                                className="credit-card-info-num px-2"
                                type="text"
                                maxLength="4"
                                placeholder="xxxx"
                              />
                            </div>
                            <div className="d-flex credit-card-info justify-content-between">
                              <input
                                id="credit-card-date"
                                className="credit-card-info-date px-2 py-2"
                                type="text"
                                placeholder="MM/YY"
                              />
                              <input
                                id="credit-card-savecode"
                                className="credit-card-info-savecode px-2 py-2"
                                type="text"
                                placeholder="安全碼"
                              />
                              <input
                                id="credit-card-owner"
                                className="credit-card-info-owner px-2 py-2"
                                type="text"
                                placeholder="卡片持有人"
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ width: '90%', margin: '0px auto' }} />
                        <div className="container px-0">
                          <div className="d-flex align-items-center px-3 py-3">
                            <div className="title-template"></div>
                            <label className="title-fontsize mb-0 ml-3">
                              收件人資訊
                            </label>
                          </div>
                          <div className="py-2 px-5">
                            <div className="d-flex customer-info justify-content-between">
                              <input
                                id="recipient-name"
                                style={{ margin: '8px 16px', width: '30%' }}
                                className=" px-2 py-2"
                                type="text"
                                placeholder="收件人姓名"
                              />
                              <input
                                id="recipient-cellphone"
                                style={{ margin: '8px 16px', width: '30%' }}
                                className="px-2 py-2"
                                type="text"
                                placeholder="收件人電話"
                              />
                              <input
                                id="recipient-address"
                                style={{ margin: '8px 16px', width: '30%' }}
                                className="px-2 py-2"
                                type="text"
                                placeholder="收件人地址"
                              />
                            </div>
                          </div>
                        </div>
                        <hr style={{ width: '90%', margin: '0px auto' }} />
                        <div className="container px-0">
                          <div className="d-flex align-items-center px-3 py-3">
                            <div className="title-template"></div>
                            <label className="title-fontsize mb-0 ml-3">
                              發票資訊
                            </label>
                          </div>
                          <div className="invoice-info d-flex align-items-center px-5 pt-2 pb-5">
                            <div className="mx-3">
                              <input type="radio" name="invoice" value="0" />
                              <span className="ml-3 font-weight-bold">
                                捐贈
                              </span>
                            </div>
                            <div className="mx-3">
                              <input type="radio" name="invoice" value="1" />
                              <span className="ml-3 font-weight-bold">
                                二聯式電子發票
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tab>
                    <Tab
                      className="choosing"
                      title="超商取付 OOO門市"
                      eventKey="Home-delivery"
                    >
                      <div className="choosing">
                        <div className="container px-0">
                          <div className="d-flex align-items-center px-3 py-3">
                            <div className="title-template"></div>
                            <label className="title-fontsize mb-0 ml-3">
                              選擇城市/地區
                            </label>
                          </div>
                          <div className="py-2 px-5">
                            <select
                              required
                              className="choose-city-dropdown font-weight-bold my-2 mx-3 py-2 px-2"
                              defaultValue="0"
                            >
                              <option value="0" disabled="disabled" hidden>
                                請選擇城市
                              </option>
                              <option value="1">桃園市</option>
                              <option value="2">台中市</option>
                              <option value="3">高雄市</option>
                            </select>
                            <select
                              required
                              className="choose-city-dropdown font-weight-bold my-2 mx-3 py-2 px-2"
                              defaultValue="0"
                            >
                              <option value="0" disabled="disabled" hidden>
                                請選擇區域
                              </option>
                              <option value="1">中壢區</option>
                              <option value="2">????區</option>
                              <option value="3">鳳山區</option>
                            </select>
                            <select
                              required
                              className="choose-city-dropdown font-weight-bold my-2 mx-3 py-2 px-2"
                              defaultValue="0"
                            >
                              <option value="0" disabled="disabled" hidden>
                                請選擇門市
                              </option>
                              <option value="1">學央門市</option>
                            </select>
                          </div>
                        </div>

                        <hr style={{ width: '90%', margin: '0px auto' }} />

                        <div className="container px-0">
                          <div className="d-flex align-items-center px-3 py-3">
                            <div className="title-template"></div>
                            <label className="title-fontsize mb-0 ml-3">
                              取貨人資訊
                            </label>
                          </div>
                          <div className="py-2 px-5">
                            <input
                              type="text"
                              id="recipient-name2"
                              placeholder="取件人姓名"
                              className="store-info-textbox font-weight-bold mx-3 my-2  p-2"
                              style={{ width: '180px' }}
                            />
                            <input
                              type="text"
                              id="recipient-cellphone2"
                              placeholder="行動電話"
                              className="store-info-textbox font-weight-bold mx-3  my-2 p-2"
                              style={{ width: '180px' }}
                            />
                            <input
                              type="text"
                              id="recipient-email"
                              placeholder="電子郵件地址"
                              className="store-info-textbox font-weight-bold mx-3  my-2 p-2"
                              style={{ width: '180px' }}
                            />
                          </div>
                        </div>
                        <hr style={{ width: '90%', margin: '0px auto' }} />
                        <div className="container px-0">
                          <div className="d-flex align-items-center px-3 py-3">
                            <div className="title-template"></div>
                            <label className="title-fontsize mb-0 ml-3">
                              發票資訊
                            </label>
                          </div>
                          <div className="invoice-info d-flex align-items-center px-5 pt-2 pb-5">
                            <div className="mx-3">
                              <input
                                type="radio"
                                name="invoice"
                                value="0"
                                id="donate-2"
                              />
                              <label
                                htmlFor="donate-2"
                                className="ml-3 font-weight-bold"
                              >
                                捐贈
                              </label>
                            </div>
                            <div className="mx-3">
                              <input type="radio" name="invoice" value="1" />
                              <span className="ml-3 font-weight-bold">
                                二聯式電子發票
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </div>
            {OrderSummary()}
          </div>
        </div>
      </>
    )
  }
  const CompleteOrder = () => {
    return (
      <>
        <div className="container " style={{ margin: '69px auto 100px auto' }}>
          <div className="mb-5">
            <div className="row">
              <div className="d-flex col-4 set-line-height">
                <div className="rounded-circle text-center otherpage">
                  <span className="font-weight-bold">1</span>
                </div>
                <span className="font-weight-bold ml-3">確認訂單</span>
              </div>

              <div className="d-flex col-4 set-line-height">
                <div className="rounded-circle text-center otherpage">
                  <span className="font-weight-bold">2</span>
                </div>
                <span className="font-weight-bold ml-3">地址與付款方式</span>
              </div>
              <div className="d-flex col-4 set-line-height">
                <div className="rounded-circle text-center nowpage">
                  <span className="font-weight-bold">3</span>
                </div>
                <span className="font-weight-bold ml-3">完成訂單</span>
              </div>
            </div>
          </div>
          <div className=" brand border mx-0">
            <div
              className="d-flex set-line-height"
              style={{ lineHeight: 'normal' }}
            >
              <div className="d-flex align-items-center border-dark  px-3 py-3">
                <div className="title-template"></div>
                <label className="title-fontsize mb-0 ml-3">訂單完成</label>
              </div>{' '}
            </div>
            <div className=" py-2 px-5">
              <div className="d-flex align-items-center px-3 py-2">
                <p className="font-color-gray mb-0 font-weight-bold">
                  感謝購酷飛鳥服飾，期待您再次蒞臨！
                </p>
                <div className="tick d-flex justify-content-center align-items-center ml-3">
                  <img
                    src="../images/素材/icon/check_small.svg"
                    width="24px"
                    alt={''}
                  />
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center border-dark  px-3 py-3">
              <div className="title-template"></div>
              <label className="title-fontsize mb-0 ml-3 font-weight-bold">
                訂單明細
              </label>
            </div>
            <div className=" py-2 px-5">
              <div className="border-left border-dark py-2 px-3">
                <p className="order-info-smalltitle font-weight-bold">
                  訂單狀態
                </p>
                <p
                  className="font-color-gray font-weight-bold"
                  style={{ fontSize: '14px' }}
                >
                  訂單日期：
                  {buyerinfo.length > 0 ? '' + buyerinfo[0].date : ''}
                </p>
                <p
                  className="font-color-gray font-weight-bold"
                  style={{ fontSize: '14px' }}
                >
                  訂單號碼：
                  {buyerinfo.length > 0 ? '' + buyerinfo[0].orderno : ''}
                </p>
                <p
                  className="font-color-gray font-weight-bold"
                  style={{ fontSize: '14px' }}
                >
                  狀態：未處理
                </p>
              </div>
            </div>
            <div className="py-2 px-5">
              <div className="border-left border-dark py-2 px-3">
                <p className="order-info-smalltitle font-weight-bold">
                  收件人資訊
                </p>
                <p
                  className="font-color-gray font-weight-bold"
                  style={{ fontSize: '14px' }}
                >
                  收件人姓名：{buyerinfo[0].name}
                </p>
                <p
                  className="font-color-gray font-weight-bold"
                  style={{ fontSize: '14px' }}
                >
                  收件人電話：
                  {buyerinfo.length > 0
                    ? '' + buyerinfo[0].addresseecellphone
                    : ''}
                </p>
                <p
                  className="font-color-gray font-weight-bold"
                  style={{ fontSize: '14px' }}
                >
                  收件人地址：{' '}
                  {buyerinfo.length > 0
                    ? '' + buyerinfo[0].addresseeaddress
                    : ''}
                </p>
              </div>
            </div>
            <div className="py-2 px-5">
              <div className="border-left border-dark py-2 px-3">
                <p className="order-info-smalltitle font-weight-bold">
                  運送方式
                </p>
                <p
                  className="font-color-gray font-weight-bold"
                  style={{ fontSize: '14px' }}
                >
                  {shippingstatus === 1
                    ? '送貨到府'
                    : shippingstatus === 2
                    ? '指定超商取貨'
                    : ''}
                </p>
                <p
                  className="font-color-gray font-weight-bold"
                  style={{ fontSize: '14px' }}
                >
                  付款方式：超商取貨付款
                </p>
                {/* <p
                  className="font-color-gray font-weight-bold"
                  style={{ fontSize: '14px' }}
                >
                  
                </p> */}
                <p
                  className="font-color-gray font-weight-bold"
                  style={{ fontSize: '14px' }}
                >
                  門市名稱： {buyerinfo[0].pickup_store}
                </p>
                {/* <p
                  id="store_name"
                  className="font-color-gray font-weight-bold"
                  style={{ fontSize: '14px' }}
                >
                  
                </p> */}
              </div>
            </div>
            <div className="d-flex align-items-center border-dark  px-3 py-3">
              <div className="title-template"></div>
              <label className="title-fontsize mb-0 ml-3">訂單明細</label>
            </div>
            <div className="py-2 px-5">
              <div className=" py-2 px-3">
                {/* <div className="mb-2">
                  <p className="mb-0 font-weight-bold"></p>
                </div> */}
                {/* <div className="row ">
                  <div className="col-3 d-flex justify-content-center align-items-center">
                    <div className="img-box">
                      <img
                        className="img-fluid"
                        src="../images/商品/商品組圖(尚未依品牌分類)/1/z-70864313_30-1.jpg"
                        alt={''}
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <p
                      className="font-weight-bold"
                      style={{ fontSize: '14px' }}
                    >
                      GOFE兩雙一組/右手超人襪
                    </p>
                    <p
                      className="font-weight-bold"
                      style={{ fontSize: '14px' }}
                    >
                      價格：NT$ <span>3,000</span>
                    </p>
                    <p
                      className="font-weight-bold"
                      style={{ fontSize: '14px' }}
                    >
                      數量： <span>1</span>
                    </p>
                    <p
                      className="font-weight-bold"
                      style={{ fontSize: '14px' }}
                    >
                      預計到貨日期： <span>2020/12/15</span>
                    </p>
                  </div>
                  <div className="col-3">
                    <p
                      className="font-weight-bold"
                      style={{ fontSize: '14px' }}
                    >
                      小計：NT$ <span>3,000</span>
                    </p>
                  </div>
                </div> */}
                <div className="border-dark border-bottom my-3"></div>
                <div className="mb-2">
                  <div className="d-flex justify-content-between">
                    <p className="font-weight-bold">小計：</p>
                    <p className="font-weight-bold">NT$ {total}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="font-weight-bold">運費：</p>
                    <p className="font-weight-bold">
                      NT$ {vip ? 0 : shippingstatus === 2 ? 60 : 150}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="font-weight-bold">優惠券(未使用)：</p>
                    <p className="font-weight-bold">(BKRE1)-NT$ 50</p>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <p className="font-weight-bold">合計金額：</p>
                    <p
                      className="final-price font-weight-bold"
                      style={{ fontSize: '20px' }}
                    >
                      NT$ {total + (vip ? 0 : shippingstatus === 2 ? 60 : 150)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
  return (
    <>
      <HeaderOther
        setWhetherLoginParent={setWhetherLoginParent}
        showParent={showParent}
        setShowParent={setShowParent}
        detailToHeaderCart={detailToHeaderCart}
        setDetailToHeaderCart={setDetailToHeaderCart}
      />
      {status === 1
        ? checkout()
        : status === 2
        ? PaymentMethod()
        : status === 3
        ? CompleteOrder()
        : ''}

      <Footer />
    </>
  )
}

export default ShoppingCart
