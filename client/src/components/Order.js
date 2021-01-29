import React, { useState, useEffect } from 'react'
import { Tabs, Tab, Accordion, Card, useAccordionToggle } from 'react-bootstrap'
// import { ArrowDown, ArrowUp } from './icons'
import { ArrowDown } from './icons'
import { useLocation, useHistory } from 'react-router-dom'

function CustomToggle({ children, eventKey }) {
  const [up, setUp] = useState(true)
  const open = () => setUp(!up)
  const decoratedOnClick = useAccordionToggle(eventKey, () => {
    open()
  })
  return (
    <button
      type="button"
      onClick={decoratedOnClick}
      className="border-0 py-2 font-weight-bold"
      style={{ fontSize: '16px' }}
    >
      {/* {up ? <ArrowDown className="mx-2" /> : <ArrowUp className="mx-2" />} */}
      <ArrowDown
        className={`arrow-svg mx-3 ' + ${up ? 'arrow-actived' : ''}`}
      />
      {children}
    </button>
  )
}

const Order = () => {
  const loc = useLocation()
  const history = useHistory()
  const id = !!loc.state ? loc.state.id : history.push('/clothing')

  const [OrderDataProcessing, setOrderDataProcessing] = useState([])
  const [OrderDataSolved, setOrderDataSolved] = useState([])
  const [OrderDataRefundlist, setOrderDataRefundlist] = useState([])
  const [datail, setDetail] = useState([])

  useEffect(() => {
    const url = 'http://localhost:3001/member/order/'
    const type = ['processing', 'solved', 'refundlist']

    const getOrderData = (url, type) => {
      return fetch(
        url +
          new URLSearchParams({
            memberNo: id,
          })
      )
        .then((res) => res.json())
        .then((data) => {
          if (type === 'processing') setOrderDataProcessing(data)
          if (type === 'solved') setOrderDataSolved(data)
          if (type === 'refundlist') setOrderDataRefundlist(data)
        })
        .catch((err) => console.log('錯誤:', err))
    }

    const getOrderDetail = () => {
      return fetch(
        'http://localhost:3001/member/orderdetail?' +
          new URLSearchParams({
            memberNo: id,
          })
      )
        .then((res) => res.json())
        .then((data) => {
          // console.log(data)
          setDetail(data)
        })
        .catch((err) => console.log('錯誤:', err))
    }

    type.forEach((type) => {
      const newUrl = url + type + '?'
      getOrderData(newUrl, type)
    })
    getOrderDetail()
  }, [id])

  return (
    <>
      <Tabs
        className="m-2"
        defaultActiveKey="processing"
        transition={false}
        id=""
      >
        <Tab
          className="orders overflow-auto font-weight-bold"
          eventKey="processing"
          title="處理中"
        >
          {OrderDataProcessing.length > 0 ? '' : '查無訂單資料'}
          {OrderDataProcessing.map((val, key) => {
            return (
              <div className="orderlist m-3" key={key} id={key}>
                <ul className="m-2 flex-row list-unstyled justify-content-around">
                  <li className="font-weight-bold">
                    訂單編號:　
                    <span style={{ fontStyle: 'italic' }}>{val.order_no}</span>
                  </li>
                  <li className="font-weight-bold">
                    購買日期:　
                    <span style={{ fontStyle: 'italic' }}>{val.date}</span>
                  </li>
                  <li className="font-weight-bold">
                    付款金額:　
                    <span style={{ fontStyle: 'italic' }}>{val.price}</span>
                  </li>
                </ul>
                <div className="m-0">
                  <Accordion defaultActiveKey="">
                    <Card>
                      <CustomToggle eventKey="0">檢視完整訂單</CustomToggle>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body className="font-weight-bold">
                          {datail.map((v, i) =>
                            v.order_no === val.order_no ? (
                              <div key={i}>
                                <ul>
                                  <li>商品名稱: {v.name}</li>
                                  <li>數量: {v.amount}</li>
                                  <li>尺寸: {v.size}</li>
                                  <li>品牌: {v.brand}</li>
                                  <li>顏色: {v.color}</li>
                                  <li>價格: {v.price}</li>
                                </ul>
                              </div>
                            ) : (
                              ''
                            )
                          )}
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                </div>
              </div>
            )
          })}
        </Tab>

        <Tab
          className="orders overflow-auto font-weight-bold"
          eventKey="solved"
          title="已完成"
        >
          {OrderDataSolved.length > 0 ? '' : '查無訂單資料'}
          {OrderDataSolved.map((val, key) => {
            return (
              <div className="orderlist m-3" key={key} id={key}>
                <ul className="m-2 flex-row list-unstyled justify-content-around">
                  <li className="font-weight-bold">
                    訂單編號:　
                    <span style={{ fontStyle: 'italic' }}>{val.order_no}</span>
                  </li>
                  <li className="font-weight-bold">
                    購買日期:　
                    <span style={{ fontStyle: 'italic' }}>{val.date}</span>
                  </li>
                  <li className="font-weight-bold">
                    付款金額:　
                    <span style={{ fontStyle: 'italic' }}>{val.price}</span>
                  </li>
                </ul>
                <div className="m-0">
                  <Accordion defaultActiveKey="">
                    <Card>
                      <CustomToggle eventKey="0">檢視完整訂單</CustomToggle>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body className="font-weight-bold">
                          {datail.map((v, i) =>
                            v.order_no === val.order_no ? (
                              <div key={i}>
                                <ul>
                                  <li>商品名稱: {v.name}</li>
                                  <li>數量: {v.amount}</li>
                                  <li>尺寸: {v.size}</li>
                                  <li>品牌: {v.brand}</li>
                                  <li>顏色: {v.color}</li>
                                  <li>價格: {v.price}</li>
                                </ul>
                              </div>
                            ) : (
                              ''
                            )
                          )}
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                </div>
              </div>
            )
          })}
        </Tab>

        <Tab
          className="orders overflow-auto font-weight-bold"
          eventKey="orderlist"
          title="退款紀錄"
        >
          {OrderDataRefundlist.length > 0 ? '' : '查無訂單資料'}
          {OrderDataRefundlist.map((val, key) => {
            return (
              <div className="orderlist m-3" key={key} id={key}>
                <ul className="m-2 flex-row list-unstyled  justify-content-around">
                  <li className="font-weight-bold">
                    訂單編號:　
                    <span style={{ fontStyle: 'italic' }}>{val.order_no}</span>
                  </li>
                  <li className="font-weight-bold">
                    購買日期:　
                    <span style={{ fontStyle: 'italic' }}>{val.date}</span>
                  </li>
                  <li className="font-weight-bold">
                    付款金額:　
                    <span style={{ fontStyle: 'italic' }}>{val.price}</span>
                  </li>
                </ul>
                <div className="m-0">
                  <Accordion defaultActiveKey="">
                    <Card>
                      <CustomToggle eventKey="0">檢視完整訂單</CustomToggle>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body className="font-weight-bold">
                          {datail.map((v, i) =>
                            v.order_no === val.order_no ? (
                              <div key={i}>
                                <ul>
                                  <li>商品名稱: {v.name}</li>
                                  <li>數量: {v.amount}</li>
                                  <li>尺寸: {v.size}</li>
                                  <li>品牌: {v.brand}</li>
                                  <li>顏色: {v.color}</li>
                                  <li>價格: {v.price}</li>
                                </ul>
                              </div>
                            ) : (
                              ''
                            )
                          )}
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                </div>
              </div>
            )
          })}
        </Tab>
      </Tabs>
    </>
  )
}

export default Order
