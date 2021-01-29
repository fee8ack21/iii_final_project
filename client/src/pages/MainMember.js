import React, { useState, useEffect } from 'react'
import { Row } from 'react-bootstrap'
import { Lv1, LV1, Lv2, LV2 } from '../components/icons'
import { useLocation, useHistory } from 'react-router-dom'

function MainMember() {
  const loc = useLocation()
  const history = useHistory()
  const id = !!loc.state ? loc.state.id : history.push('/clothing')

  const [count, setCount] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const getOrderData = () => {
      return fetch(
        'http://localhost:3001/member/member?' +
          new URLSearchParams({
            memberNo: id,
          })
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setCount(data[0].count)
          setTotal(data[0].total)
          console.log(data[0])
        })
        .catch((err) => console.log('錯誤:', err))
    }
    getOrderData()
  }, [id])

  return (
    <>
      <div className="main col-9">
        <div className="title ml-3 mb-2 font-weight-bold">會員專區</div>
        <Row
          className="member1 mx-2 mb-2 d-flex justify-content-center align-items-start"
          style={{
            border: '1px solid #d3d3d3',
            padding: '15px 0px',
          }}
        >
          <div className="memberlist col-4">
            <ul className="m-0 list-unstyled d-flex flex-column align-items-center">
              <li className="listtitle font-weight-bold">會員等級</li>
              <li className="listtitle1 font-weight-bold">
                {total > 10000 ? '黃金會員' : '一般會員'}
              </li>
              <li className="m-1">{total > 10000 ? <Lv2 /> : <Lv1 />}</li>
            </ul>
          </div>
          <div className="memberlist col-4 text-center">
            <div className="listtitle font-weight-bold">消費次數</div>
            <div className="listnum mt-3">{count}</div>
          </div>
          <div className="memberlist col-4 text-center">
            <div className="listtitle font-weight-bold">累積消費金額</div>
            <div className="listnum mt-3">{total}</div>
          </div>
        </Row>
        <div className="title ml-3 my-2 font-weight-bold">會員升級規範</div>
        <div
          className="mx-2"
          style={{
            border: '1px solid #d3d3d3',
            padding: '15px 0px 16px 0px',
          }}
        >
          <Row className="m-3">
            <div className={`circle active`}>
              <LV1 className="circle-icon1" />
            </div>
            <ul className="memberlv m-3 flex-fill list-unstyled d-flex flex-column active">
              <li className="mx-4 my-1 font-weight-bold">一般會員</li>
              <li
                className="mx-4 my-1 font-weight-bold"
                style={{ fontSize: '14px' }}
              >
                已達成
              </li>
              <p className="solid-bottom my-1"></p>
            </ul>
          </Row>
          <Row className="m-3 mt-5">
            <div className={`circle ${total > 10000 ? 'active' : ''}`}>
              <LV2 className="circle-icon2" />
            </div>
            <ul
              className={`memberlv m-3 flex-fill list-unstyled d-flex flex-column ${
                total > 10000 ? 'active' : ''
              }`}
            >
              <li className="mx-4 my-1 font-weight-bold">黃金會員</li>
              <li
                className="mx-4 my-1 font-weight-bold"
                style={{ fontSize: '14px' }}
              >
                {total > 10000 ? '已達成' : '未達成'}
              </li>
              <li
                className="mx-4 my-1 font-weight-bold"
                style={{ fontSize: '14px' }}
              >
                享有特定商品優先購買權
              </li>
              <li
                className="mx-4 my-1 font-weight-bold"
                style={{ fontSize: '14px' }}
              >
                每次消費運費折免
              </li>
              <p className="solid-bottom my-1"></p>
              <li
                className="mx-4 my-1 font-weight-bold"
                style={{ fontSize: '14px' }}
              >
                達成條件：累積實際消費達 NT$ 10,000
              </li>
            </ul>
          </Row>
        </div>
      </div>
    </>
  )
}

export default MainMember
