import React, { useState, useEffect } from 'react'
import BarChart from './BarChart'
import LineChart from './LineChart'
import DoughnutChart from './DoughnutChart'

// 麵包屑要記得改
function OrderListDashboardContent() {
  const [orderlist, setOrderList] = useState([])
  const [modalState, setModalState] = useState(false)
  //報表用
  const [year, setYear] = useState(2020)
  const [time, setTime] = useState('MONTH')
  const [type, setType] = useState('REVENUE')
  const [orderData, setOrderData] = useState([])

  const [sort, setSort] = useState('brand')
  const [hotData, setHotData] = useState([])

  const [orderNo, setOrderNo] = useState('')
  const [orderId, setOrderId] = useState(1)
  const [orderdetail, setOrderDetail] = useState([])

  const getOrderList = (id) => {
    let url = new URL('http://localhost:3001/dashboard/report/orderlist')
    let params = {
      memberNo: id,
      valid: 1,
    }
    url.search = new URLSearchParams(params).toString()

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setOrderList(data)
        // console.log(data)
      })
      .catch((err) => console.log('錯誤:', err))
  }
  const getOrderDetail = () => {
    let url = new URL('http://localhost:3001/dashboard/report/orderdetail')

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setOrderDetail(data)
        // console.log(data)
      })
      .catch((err) => console.log('錯誤:', err))
  }

  useEffect(() => {
    const getOrderData = () => {
      let url = new URL(
        'http://localhost:3001/dashboard/report/orderlist/chart'
      )
      let params = {
        year: year,
        lastyear: year - 1,
      }
      url.search = new URLSearchParams(params).toString()

      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setOrderData(data)
          // console.log(data)
        })
        .catch((err) => console.log('錯誤:', err))
    }

    getOrderList()
    getOrderData()
    getOrderDetail()
  }, [year])

  useEffect(() => {
    const getHotData = () => {
      let url = new URL(
        'http://localhost:3001/dashboard/report/orderlist/doughnutandpie'
      )
      let params = {
        sort: sort,
      }
      url.search = new URLSearchParams(params).toString()

      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setHotData(data)
          // console.log(data)
        })
        .catch((err) => console.log('錯誤:', err))
    }

    getHotData()
  }, [sort])
  const [desc, setDesc] = useState(1)

  return (
    <>
      <div
        className="overflow-auto"
        style={{ height: '75vh', padding: '12px 16px' }}
      >
        {/* <h3>訂單記錄</h3> */}
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th
                className="text-center font-weight-bold"
                scope="col"
                onClick={() => {
                  setDesc(desc * -1)
                }}
              >
                #
              </th>
              <th className="text-center font-weight-bold" scope="col">
                訂單編號
              </th>
              <th className="text-center font-weight-bold" scope="col">
                購買日期
              </th>
              <th className="text-center font-weight-bold" scope="col">
                購買人
              </th>
              <th className="text-center font-weight-bold" scope="col">
                電話
              </th>
              <th className="text-center font-weight-bold" scope="col">
                金額
              </th>
              <th className="text-center font-weight-bold" scope="col">
                狀態
              </th>
              <th className="text-center font-weight-bold" scope="col">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="">
            {setOrderBy()}
            {orderlist.map((v, i) =>
              orderlist.length > 0 ? (
                <tr key={i}>
                  <th
                    className="text-center font-weight-bold"
                    style={{ lineHeight: '37.53px', fontSize: '14px' }}
                    scope="row"
                  >
                    {desc > 0 ? i + 1 : orderlist.length - i}
                  </th>
                  <td
                    className="text-center font-weight-bold"
                    style={{ lineHeight: '37.53px', fontSize: '14px' }}
                  >
                    {v.order_no}
                  </td>
                  <td
                    className="text-center font-weight-bold"
                    style={{ lineHeight: '37.53px', fontSize: '14px' }}
                  >
                    {v.date}
                  </td>
                  <td
                    className="text-center font-weight-bold"
                    style={{ lineHeight: '37.53px', fontSize: '14px' }}
                  >
                    {v.name}
                  </td>
                  <td
                    className="text-center font-weight-bold"
                    style={{ lineHeight: '37.53px', fontSize: '14px' }}
                  >
                    {v.phone}
                  </td>
                  <td
                    className="text-center font-weight-bold"
                    style={{ lineHeight: '37.53px', fontSize: '14px' }}
                  >
                    {v.price}
                  </td>
                  <td
                    className="text-center font-weight-bold"
                    style={{ lineHeight: '37.53px', fontSize: '14px' }}
                  >
                    {v.status}
                  </td>
                  <td
                    className="text-center font-weight-bold"
                    style={{ lineHeight: '37.53px', fontSize: '14px' }}
                  >
                    {/* <button className="btn btn-secondary mx-1">修改</button> */}
                    <button
                      className="btn btn-info mx-1"
                      onClick={() => {
                        setModalState(true)
                        setOrderNo(v.order_no)
                        setOrderId(v.id)
                      }}
                    >
                      查看詳細
                    </button>
                  </td>
                </tr>
              ) : (
                ''
              )
            )}
          </tbody>
        </table>

        {/* modal */}
        {modalState ? (
          <div
            id="order-dashboard-modal"
            className="modal d-flex justify-content-center align-content-center"
            style={{ top: '0px', bottom: '0px', left: '0px', right: '0px' }}
            onClick={(e) => {
              if (e.target.id === 'order-dashboard-modal') {
                setModalState(false)
              }
            }}
          >
            <div
              className="modal-dialog d-flex align-items-center"
              style={{ minWidth: '960px' }}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title font-weight-bold">
                    編號： <span>{orderNo}</span>
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => {
                      setModalState(false)
                    }}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  {orderdetail
                    .filter((item) => item.order_id === orderId.toString())
                    .map((v, i) => (
                      <ul key={i} className="list-unstyled">
                        <li>商品{i + 1}</li>
                        <li>
                          {v.brand} - {v.name}
                        </li>
                        <li>
                          顏色: {v.color} / 尺寸: {v.size} / 數量: {v.amount} /
                          價格: {v.price}
                        </li>
                      </ul>
                    ))}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary font-weight-bold"
                    onClick={() => {
                      setModalState(false)
                    }}
                  >
                    關閉
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>

      <div className="my-3">
        <form className="mx-5">
          <h1>訂單</h1>
          <div className="form-row">
            <div className="form-group col-md-2">
              <label htmlFor="year">Year</label>
              <select
                id="year"
                className="form-control"
                value={year}
                onChange={(e) => {
                  setYear(e.target.value)
                }}
              >
                <option value={2020}>2020</option>
                <option value={2019}>2019</option>
              </select>
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="time">Time</label>
              <select
                id="time"
                className="form-control"
                value={time}
                onChange={(e) => {
                  setTime(e.target.value)
                }}
              >
                <option value={'MONTH'}>月報表</option>
                <option value={'QUARTER'}>季報表</option>
              </select>
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="type">Type</label>
              <select
                id="type"
                className="form-control"
                value={type}
                onChange={(e) => {
                  setType(e.target.value)
                }}
              >
                <option value={'REVENUE'}>銷售金額</option>
                <option value={'ORDERCOUNT'}>訂單數量</option>
              </select>
            </div>
          </div>
        </form>
        <div className="d-flex flex-wrap">
          <BarChart year={year} time={time} type={type} orderData={orderData} />
          <LineChart
            year={year}
            time={time}
            type={type}
            orderData={orderData}
          />
        </div>
      </div>

      <div className="my-3">
        <form className="mx-5">
          <h1>熱門</h1>
          <div className="form-row">
            <div className="form-group col-md-2">
              <label htmlFor="sort">分類</label>
              <select
                id="sort"
                className="form-control"
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value)
                }}
              >
                <option value={'brand'}>品牌</option>
                <option value={'size'}>尺寸</option>
              </select>
            </div>
          </div>
        </form>
        <div className="d-flex flex-wrap">
          <DoughnutChart sort={sort} hotData={hotData} />
        </div>
      </div>
    </>
  )

  function setOrderBy() {
    orderlist.sort(function (a, b) {
      return a.id > b.id ? 1 * desc : -1 * desc
    })
  }
}

export default OrderListDashboardContent
