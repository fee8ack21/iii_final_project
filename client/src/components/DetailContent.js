import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'

// 目前會顯示很多prettier warnings，暫時無視
// Link 路由還沒寫的精準
function DetailContent(props) {
  let ProductBrand = props.match.params.brand
  let ProductId = props.match.params.id
  // 老師的fetch寫法
  // 步驟一：設一個空detailRes，setDetailRes為之後fetch response
  const [DetailRes, setDetailRes] = useState('')
  const [StockRes, setStockRes] = useState('')
  const [UserRes, setUserRes] = useState('')
  const [colorState, setColorState] = useState(0)
  const [sizeState, setSizeState] = useState(0)
  const [FavoriteState, setFavoriteState] = useState(true)
  // const [whetherLogin, setWhetherLogin] = useState(props.whetherLoginParent)
  // const [browseHistory, setBrowseHistory] = useState(true)

  // dom生成後，執行fetch函式，再影響setProductRes
  useEffect(() => {
    // async await  抓product INNER JOIN product_image
    async function getDetail() {
      // 要使用try-catch來作錯誤處理
      try {
        // 從伺服器得到資料
        const response = await fetch(
          'http://localhost:3001/detail/' + ProductBrand + '/' + ProductId,
          {
            method: 'get',
          }
        )
        if (response.ok) {
          // 剖析資料為JS的數值
          const data = await response.json()

          // 設定資料到DetailRes狀態
          setDetailRes(data)
          // console.log(data)
        }
      } catch (error) {
        // 發生錯誤的處理情況
        alert('無法得到伺服器資料，請稍後再重試')
        console.log(error)
      }
    }
    getDetail()
    // setBrowseHistory(true)

    //
    // async await 抓product INNER JOIN product_stock
    async function getStock() {
      // 要使用try-catch來作錯誤處理
      try {
        // 從伺服器得到資料
        const response = await fetch(
          'http://localhost:3001/detail/' + ProductBrand + '/' + ProductId,
          {
            method: 'post',
          }
        )
        if (response.ok) {
          // 剖析資料為JS的數值
          const data = await response.json()

          // 設定資料到DetailRes狀態
          setStockRes(data)
          // console.log(data)
        }
      } catch (error) {
        // 發生錯誤的處理情況
        alert('無法得到伺服器資料，請稍後再重試')
        console.log(error)
      }
    }
    getStock()
  }, [ProductBrand, ProductId])
  // console.log(DetailRes)
  // console.log(StockRes)
  // console.log(UserRes)

  useEffect(() => {
    if (!!localStorage.getItem('user')) {
      async function getUser() {
        // 要使用try-catch來作錯誤處理
        try {
          // 從伺服器得到資料
          let userId = JSON.parse(localStorage.getItem('user'))[0].id
          const response = await fetch(
            'http://localhost:3001/detail/favorite/' + userId + '/' + ProductId,
            {
              method: 'get',
            }
          )
          if (response.ok) {
            // 剖析資料為JS的數值
            const data = await response.json()

            // 設定資料到DetailRes狀態
            setUserRes(data)
            // console.log(data)
          }
        } catch (error) {
          // 發生錯誤的處理情況
          alert('無法得到伺服器資料，請稍後再重試')
          console.log(error)
        }
      }
      getUser()
    }
  }, [ProductBrand, ProductId, FavoriteState, props.whetherLoginParent])
  //
  //
  //
  //
  function BrowseHistoryFunc() {
    // 設定變數，並判斷是否已有localstorage資料來做賦值
    let browseArr = !!JSON.parse(localStorage.getItem('browseHistory'))
      ? JSON.parse(localStorage.getItem('browseHistory'))
      : [
          {
            id: ProductId,
            brand: DetailRes ? DetailRes[0].brand : '',
            name: DetailRes ? DetailRes[0].name : '',
            price: DetailRes ? DetailRes[0].price : '',
            image: DetailRes ? DetailRes[0].image : '',
          },
        ]

    // 在有localstorage的情況下，先判斷陣列長度，再判斷是否內容重複
    if (!!localStorage.getItem('browseHistory')) {
      if (browseArr.length > 5) {
        let whetherPush = true
        for (let i = 0; i < browseArr.length; i++) {
          if (browseArr[i].id === ProductId) {
            whetherPush = false
            break
          }
        }
        if (whetherPush) {
          browseArr.splice(0, 1)
          browseArr.push({
            id: ProductId,
            brand: DetailRes ? DetailRes[0].brand : '',
            name: DetailRes ? DetailRes[0].name : '',
            price: DetailRes ? DetailRes[0].price : '',
            image: DetailRes ? DetailRes[0].image : '',
          })
        }
      } else {
        let whetherPush = true
        for (let i = 0; i < browseArr.length; i++) {
          if (browseArr[i].id === ProductId) {
            whetherPush = false
            break
          }
        }
        if (whetherPush) {
          browseArr.push({
            id: ProductId,
            brand: DetailRes ? DetailRes[0].brand : '',
            name: DetailRes ? DetailRes[0].name : '',
            price: DetailRes ? DetailRes[0].price : '',
            image: DetailRes ? DetailRes[0].image : '',
          })
        }
      }
    }
    localStorage.setItem('browseHistory', JSON.stringify(browseArr))
  }

  if (DetailRes.length > 0) BrowseHistoryFunc()

  const [status, setStatus] = useState(0)
  const [commentTable, setCommentTable] = useState(false)

  const sizemodal = () => {
    return (
      <div
        id="size-modal"
        className="size-tryon-modal"
        onClick={(e) => {
          // console.log(e.target.id)
          if (e.target.id === 'size-modal') setStatus(0)
        }}
      >
        <div
          className="size-tryon-content  p-5 position-relative"
          style={{ zIndex: '9999' }}
        >
          <a
            href="#!"
            className="close-button position-absolute"
            onClick={(e) => {
              e.preventDefault()
              setStatus(0)
            }}
          >
            CLOSE
            <span>X</span>
          </a>
          <h3 className="text-center font-weight-bold mb-4">關於商品</h3>
          <div>
            <div className="table-choose d-flex mb-4 justify-content-center justify-content-sm-start">
              <a
                id="table-choose-size"
                href="#!"
                className="table-choose-size text-center d-block py-2 text-decoration-none active-table-choose"
                onClick={(e) => {
                  e.preventDefault()
                  document
                    .getElementById('table-choose-size')
                    .classList.add('active-table-choose')
                  document
                    .getElementById('table-choose-tryon')
                    .classList.remove('active-table-choose')
                  document
                    .getElementById('size-table')
                    .classList.add('active-table')
                  document
                    .getElementById('tryon-table')
                    .classList.remove('active-table')
                }}
              >
                尺寸表
              </a>
              <a
                id="table-choose-tryon"
                href="#!"
                className="table-choose-tryon text-center tryon-table-choose d-block py-2 text-decoration-none"
                onClick={(e) => {
                  e.preventDefault()
                  document
                    .getElementById('table-choose-tryon')
                    .classList.add('active-table-choose')
                  document
                    .getElementById('table-choose-size')
                    .classList.remove('active-table-choose')
                  document
                    .getElementById('tryon-table')
                    .classList.add('active-table')
                  document
                    .getElementById('size-table')
                    .classList.remove('active-table')
                }}
              >
                試穿表
              </a>
            </div>
            <div id="size-table" className="size-table active-table">
              <table className="table">
                <tr>
                  <th className="py-2 px-5 text-center">尺碼</th>
                  <th className="py-2 px-5 text-center">肩寬</th>
                  <th className="py-2 px-5 text-center">胸寬</th>
                  <th className="py-2 px-5 text-center">袖長</th>
                  <th className="py-2 px-5 text-center">衣長</th>
                </tr>
                <tr>
                  <td className="py-1 text-center">S</td>
                  <td className="py-1 text-center">38</td>
                  <td className="py-1 text-center">47.5</td>
                  <td className="py-1 text-center">59.5</td>
                  <td className="py-1 text-center">57</td>
                </tr>
                <tr>
                  <td className="py-1 text-center">M</td>
                  <td className="py-1 text-center">39.5</td>
                  <td className="py-1 text-center">50</td>
                  <td className="py-1 text-center">60.5</td>
                  <td className="py-1 text-center">59</td>
                </tr>
                <tr>
                  <td className="py-1 text-center">L</td>
                  <td className="py-1 text-center">41</td>
                  <td className="py-1 text-center">53</td>
                  <td className="py-1 text-center">61.5</td>
                  <td className="py-1 text-center">61</td>
                </tr>
                <tr>
                  <td className="py-1 text-center">XL</td>
                  <td className="py-1 text-center">42.5</td>
                  <td className="py-1 text-center">56</td>
                  <td className="py-1 text-center">62.5</td>
                  <td className="py-1 text-center">63</td>
                </tr>
                <tr>
                  <td className="py-1 text-center">XXL</td>
                  <td className="py-1 text-center">44</td>
                  <td className="py-1 text-center">59</td>
                  <td className="py-1 text-center">62.5</td>
                  <td className="py-1 text-center">64</td>
                </tr>
              </table>
              <p>※ 本尺寸表會因商品素材不同，可能與實際尺寸略有誤差。</p>
              <p>※ 尺寸皆以公分(cm)為單位。</p>
              <div className="d-flex justify-content-center">
                <img
                  className="w-75"
                  src="images/商品/尺寸衣服.png"
                  alt=""
                ></img>
              </div>
            </div>
            <div id="tryon-table" className="tryon-table">
              <table className="table">
                <tr>
                  <th className="py-2 px-5 text-center">試穿人員</th>
                  <th className="py-2 px-5 text-center">身高(cm)</th>
                  <th className="py-2 px-5 text-center">體重(kg)</th>
                  <th className="py-2 px-5 text-center">適合尺碼</th>
                </tr>
                <tr>
                  <td className="py-1 text-center">A</td>
                  <td className="py-1 text-center">148</td>
                  <td className="py-1 text-center">48</td>
                  <td className="py-1 text-center">S</td>
                </tr>
                <tr>
                  <td className="py-1 text-center">B</td>
                  <td className="py-1 text-center">148</td>
                  <td className="py-1 text-center">48</td>
                  <td className="py-1 text-center">S</td>
                </tr>
                <tr>
                  <td className="py-1 text-center">C</td>
                  <td className="py-1 text-center">148</td>
                  <td className="py-1 text-center">48</td>
                  <td className="py-1 text-center">S</td>
                </tr>
                <tr>
                  <td className="py-1 text-center">D</td>
                  <td className="py-1 text-center">148</td>
                  <td className="py-1 text-center">48</td>
                  <td className="py-1 text-center">S</td>
                </tr>
                <tr>
                  <td className="py-1 text-center">E</td>
                  <td className="py-1 text-center">148</td>
                  <td className="py-1 text-center">48</td>
                  <td className="py-1 text-center">S</td>
                </tr>
              </table>
              <p>※ 身高體重與尺寸無絕對關係，建議依個人穿著習慣及身形選購。</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  const reviewmodal = () => {
    return (
      <div
        id="review-modal"
        className="review-modal"
        onClick={(e) => {
          // console.log(e.target.id)
          if (e.target.id === 'review-modal') setStatus(0)
        }}
      >
        <div className="review-content py-5 px-3 px-md-5 position-relative">
          <a
            href="#!"
            className="close-button position-absolute"
            onClick={(e) => {
              e.preventDefault()
              setStatus(0)
            }}
          >
            CLOSE
            <span>X</span>
          </a>
          <h3 className="text-center font-weight-bold mb-4">評論</h3>
          <div>
            <div className="mb-3">
              <a
                href="#!"
                id="show-comment-table"
                className="d-block text-right mb-2"
                style={{ fontSize: '14px', color: '#353c1d' }}
                onClick={(e) => {
                  e.preventDefault()
                  setCommentTable(!commentTable)
                }}
              >
                {commentTable ? '取消留言' : '我要留言'}
              </a>
              {commentTable && (
                <form action="" className="position-relative">
                  <textarea
                    name=""
                    id=""
                    style={{ resize: 'none', height: '100px' }}
                    className="px-3 py-2 w-100"
                  ></textarea>
                  <div className=" d-flex w-100  justify-content-end mt-1">
                    <a
                      href="#!"
                      className="review-btn d-inline-block text-decoration-none py-1 px-3 mx-2 rounded"
                      style={{ fontSize: '14px' }}
                      onClick={(e) => {
                        e.preventDefault()
                      }}
                    >
                      清除
                    </a>
                    <a
                      href="#!"
                      className="review-btn d-inline-block text-decoration-none py-1 px-3 ml-2 rounded"
                      style={{ fontSize: '14px' }}
                      onClick={(e) => {
                        e.preventDefault()
                      }}
                    >
                      送出
                    </a>
                  </div>
                </form>
              )}
            </div>
            <div>
              <ul
                className="list-unstyled w-100"
                style={{ height: '300px', width: '864px', overflowY: 'scroll' }}
              >
                <li style={{ width: '98%' }}>
                  <div className="row py-3">
                    <div className="col-12">
                      <div
                        style={{
                          borderBottom: '1px solid #353c1d',
                        }}
                      >
                        <div>
                          <p
                            className="d-flex align-items-center"
                            style={{
                              fontSize: '14px',
                              fontWeight: '900',
                            }}
                          >
                            <img
                              src="/images/素材/會員等級icon/award.svg"
                              style={{ width: '30px' }}
                              className="mr-2"
                              alt={''}
                            ></img>
                            會員編號
                            <span>0020******</span>
                          </p>
                        </div>
                        <div>
                          <p className="font-weight-bold">
                            167/49
                            穿起來剛剛好，不會到非常寬鬆，顏色還不錯看穿起來剛剛好，
                            不會到非常寬鬆，顏色還不錯看!167/49
                            穿起來剛剛好，不會到非常寬 鬆，顏色還不錯看
                          </p>
                        </div>
                        <div className="mb-3 d-flex justify-content-between">
                          <div>
                            <img
                              src="/images/商品/商品組圖(尚未依品牌分類)/1/z-70864313-1.jpg"
                              alt={''}
                              width="50px"
                              style={{
                                height: '50px',
                                objectFit: 'cover',
                              }}
                              className="mr-3"
                            ></img>
                            <img
                              src="/images/商品/商品組圖(尚未依品牌分類)/1/z-70864313-1.jpg"
                              alt={''}
                              width="50px"
                              style={{
                                height: '50px',
                                objectFit: 'cover',
                              }}
                              className="mr-3"
                            ></img>
                          </div>
                          <div className="align-self-end">
                            <p
                              className="m-0 font-weight-bold"
                              style={{ fontSize: '12px' }}
                            >
                              2020/12/15 00:00:00
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li style={{ width: '98%' }}>
                  <div className="row py-3">
                    <div className="col-12">
                      <div
                        style={{
                          borderBottom: '1px solid #353c1d',
                        }}
                      >
                        <div>
                          <p
                            className="d-flex align-items-center"
                            style={{
                              fontSize: '14px',
                              fontWeight: '900',
                            }}
                          >
                            <img
                              src="/images/素材/會員等級icon/award.svg"
                              style={{ width: '30px' }}
                              className="mr-2"
                              alt={''}
                            ></img>
                            會員編號
                            <span>0020******</span>
                          </p>
                        </div>
                        <div>
                          <p className="font-weight-bold">
                            167/49
                            穿起來剛剛好，不會到非常寬鬆，顏色還不錯看穿起來剛剛好，
                            不會到非常寬鬆，顏色還不錯看!167/49
                            穿起來剛剛好，不會到非常寬 鬆，顏色還不錯看
                          </p>
                        </div>
                        <div className="mb-3 d-flex justify-content-between">
                          <div>
                            <img
                              src="/images/商品/商品組圖(尚未依品牌分類)/1/z-70864313-1.jpg"
                              alt={''}
                              width="50px"
                              style={{
                                height: '50px',
                                objectFit: 'cover',
                              }}
                              className="mr-3"
                            ></img>
                            <img
                              src="/images/商品/商品組圖(尚未依品牌分類)/1/z-70864313-1.jpg"
                              alt={''}
                              width="50px"
                              style={{
                                height: '50px',
                                objectFit: 'cover',
                              }}
                              className="mr-3"
                            ></img>
                          </div>
                          <div className="align-self-end">
                            <p
                              className="m-0 font-weight-bold"
                              style={{ fontSize: '12px' }}
                            >
                              2020/12/15 00:00:00
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li style={{ width: '98%' }}>
                  <div className="row py-3">
                    <div className="col-12">
                      <div
                        style={{
                          borderBottom: '1px solid #353c1d',
                        }}
                      >
                        <div>
                          <p
                            className="d-flex align-items-center"
                            style={{
                              fontSize: '14px',
                              fontWeight: '900',
                            }}
                          >
                            <img
                              src="/images/素材/會員等級icon/award.svg"
                              style={{ width: '30px' }}
                              className="mr-2"
                              alt={''}
                            ></img>
                            會員編號
                            <span>0020******</span>
                          </p>
                        </div>
                        <div>
                          <p className="font-weight-bold">
                            167/49
                            穿起來剛剛好，不會到非常寬鬆，顏色還不錯看穿起來剛剛好，
                            不會到非常寬鬆，顏色還不錯看!167/49
                            穿起來剛剛好，不會到非常寬 鬆，顏色還不錯看
                          </p>
                        </div>
                        <div className="mb-3 d-flex justify-content-between">
                          <div>
                            <img
                              src="/images/商品/商品組圖(尚未依品牌分類)/1/z-70864313-1.jpg"
                              alt={''}
                              width="50px"
                              style={{
                                height: '50px',
                                objectFit: 'cover',
                              }}
                              className="mr-3"
                            ></img>
                            <img
                              src="/images/商品/商品組圖(尚未依品牌分類)/1/z-70864313-1.jpg"
                              alt={''}
                              width="50px"
                              style={{
                                height: '50px',
                                objectFit: 'cover',
                              }}
                              className="mr-3"
                            ></img>
                          </div>
                          <div className="align-self-end">
                            <p
                              className="m-0 font-weight-bold"
                              style={{ fontSize: '12px' }}
                            >
                              2020/12/15 00:00:00
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li style={{ width: '98%' }}>
                  <div className="row py-3">
                    <div className="col-12">
                      <div
                        style={{
                          borderBottom: '1px solid #353c1d',
                        }}
                      >
                        <div>
                          <p
                            className="d-flex align-items-center"
                            style={{
                              fontSize: '14px',
                              fontWeight: '900',
                            }}
                          >
                            <img
                              src="/images/素材/會員等級icon/award.svg"
                              style={{ width: '30px' }}
                              className="mr-2"
                              alt={''}
                            ></img>
                            會員編號
                            <span>0020******</span>
                          </p>
                        </div>
                        <div>
                          <p className="font-weight-bold">
                            167/49
                            穿起來剛剛好，不會到非常寬鬆，顏色還不錯看穿起來剛剛好，
                            不會到非常寬鬆，顏色還不錯看!167/49
                            穿起來剛剛好，不會到非常寬 鬆，顏色還不錯看
                          </p>
                        </div>
                        <div className="mb-3 d-flex justify-content-between">
                          <div>
                            <img
                              src="/images/商品/商品組圖(尚未依品牌分類)/1/z-70864313-1.jpg"
                              alt={''}
                              width="50px"
                              style={{
                                height: '50px',
                                objectFit: 'cover',
                              }}
                              className="mr-3"
                            ></img>
                            <img
                              src="/images/商品/商品組圖(尚未依品牌分類)/1/z-70864313-1.jpg"
                              alt={''}
                              width="50px"
                              style={{
                                height: '50px',
                                objectFit: 'cover',
                              }}
                              className="mr-3"
                            ></img>
                          </div>
                          <div className="align-self-end">
                            <p
                              className="m-0 font-weight-bold"
                              style={{ fontSize: '12px' }}
                            >
                              2020/12/15 00:00:00
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
  const recommendmodal = () => {
    return (
      <div
        id="recommend-modal"
        className="recommend-modal d-flex justify-content-center align-items-center"
        onClick={(e) => {
          // console.log(e.target.id)
          if (e.target.id === 'recommend-modal') setStatus(0)
        }}
      >
        <div className="recommend-content p-5 position-relative">
          <a
            href="#!"
            className="close-button position-absolute"
            onClick={(e) => {
              e.preventDefault()
              setStatus(0)
            }}
          >
            CLOSE
            <span>X</span>
          </a>
          <h3 className="text-center font-weight-bold mb-4">產品詳情</h3>
          <div className="row mb-4">
            <div className="col-6">
              <div className="row">
                <div className="col-4 d-flex flex-column justify-content-between">
                  <div
                    className="mb-2 recommend-modal-sm-img-actived"
                    id="recommend-modal-sm-img1"
                    onClick={() => {
                      document
                        .getElementById('recommend-modal-sm-img1')
                        .classList.add('recommend-modal-sm-img-actived')
                      document
                        .getElementById('recommend-modal-sm-img2')
                        .classList.remove('recommend-modal-sm-img-actived')
                      document
                        .getElementById('recommend-modal-sm-img3')
                        .classList.remove('recommend-modal-sm-img-actived')
                      document
                        .getElementById('recommend-modal-sm-img4')
                        .classList.remove('recommend-modal-sm-img-actived')
                      document
                        .getElementById('recommend-modal-bg-img')
                        .setAttribute(
                          'src',
                          '/images/商品/商品組圖(尚未依品牌分類)/9/z-70864304-10.jpg'
                        )
                    }}
                  >
                    <img
                      className="img-fluid"
                      style={{
                        height: '150px',
                        objectFit: 'cover',
                        cursor: 'pointer',
                      }}
                      src="/images/商品/商品組圖(尚未依品牌分類)/9/z-70864304-10.jpg"
                      alt={''}
                    ></img>
                  </div>
                  <div
                    className="mb-2"
                    id="recommend-modal-sm-img2"
                    onClick={() => {
                      document
                        .getElementById('recommend-modal-sm-img2')
                        .classList.add('recommend-modal-sm-img-actived')
                      document
                        .getElementById('recommend-modal-sm-img1')
                        .classList.remove('recommend-modal-sm-img-actived')
                      document
                        .getElementById('recommend-modal-sm-img3')
                        .classList.remove('recommend-modal-sm-img-actived')
                      document
                        .getElementById('recommend-modal-sm-img4')
                        .classList.remove('recommend-modal-sm-img-actived')
                      document
                        .getElementById('recommend-modal-bg-img')
                        .setAttribute(
                          'src',
                          '/images/商品/商品組圖(尚未依品牌分類)/9/z-70864304-11.jpg'
                        )
                    }}
                  >
                    <img
                      className="img-fluid"
                      style={{
                        height: '150px',
                        objectFit: 'cover',
                        cursor: 'pointer',
                      }}
                      src="/images/商品/商品組圖(尚未依品牌分類)/9/z-70864304-11.jpg"
                      alt={''}
                    ></img>
                  </div>
                  <div
                    className="mb-2"
                    id="recommend-modal-sm-img3"
                    onClick={() => {
                      document
                        .getElementById('recommend-modal-sm-img3')
                        .classList.add('recommend-modal-sm-img-actived')
                      document
                        .getElementById('recommend-modal-sm-img1')
                        .classList.remove('recommend-modal-sm-img-actived')
                      document
                        .getElementById('recommend-modal-sm-img2')
                        .classList.remove('recommend-modal-sm-img-actived')
                      document
                        .getElementById('recommend-modal-sm-img4')
                        .classList.remove('recommend-modal-sm-img-actived')
                      document
                        .getElementById('recommend-modal-bg-img')
                        .setAttribute(
                          'src',
                          '/images/商品/商品組圖(尚未依品牌分類)/9/z-70864304-9.jpg'
                        )
                    }}
                  >
                    <img
                      id="recommend-modal-sm-img3"
                      className="img-fluid"
                      style={{
                        height: '150px',
                        objectFit: 'cover',
                        cursor: 'pointer',
                      }}
                      src="/images/商品/商品組圖(尚未依品牌分類)/9/z-70864304-9.jpg"
                      alt={''}
                    ></img>
                  </div>
                  <div
                    className=""
                    id="recommend-modal-sm-img4"
                    onClick={() => {
                      document
                        .getElementById('recommend-modal-sm-img4')
                        .classList.add('recommend-modal-sm-img-actived')
                      document
                        .getElementById('recommend-modal-sm-img1')
                        .classList.remove('recommend-modal-sm-img-actived')
                      document
                        .getElementById('recommend-modal-sm-img2')
                        .classList.remove('recommend-modal-sm-img-actived')
                      document
                        .getElementById('recommend-modal-sm-img3')
                        .classList.remove('recommend-modal-sm-img-actived')
                      document
                        .getElementById('recommend-modal-bg-img')
                        .setAttribute(
                          'src',
                          '/images/商品/商品組圖(尚未依品牌分類)/9/z-70864304_32-1.jpg'
                        )
                    }}
                  >
                    <img
                      className="img-fluid"
                      style={{
                        height: '150px',
                        objectFit: 'cover',
                        cursor: 'pointer',
                      }}
                      src="/images/商品/商品組圖(尚未依品牌分類)/9/z-70864304_32-1.jpg"
                      alt={''}
                    ></img>
                  </div>
                </div>
                <div className="col-8">
                  <div className="w-100 h-100">
                    <img
                      id="recommend-modal-bg-img"
                      className="h-100 w-100"
                      style={{ objectFit: 'cover' }}
                      src="/images/商品/商品組圖(尚未依品牌分類)/9/z-70864304-10.jpg"
                      alt={''}
                    ></img>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div>
                <h2 className="font-weight-bold">HONEST DELIVERY</h2>
                <h3>Better Fast Hoodie</h3>
                <h3 className="font-weight-bold" style={{ color: '#f37022' }}>
                  $999
                </h3>
                <p className="font-weight-bold mb-2">產地及材質</p>
                <p className="m-0" style={{ fontSize: '14px' }}>
                  產地：美國
                </p>
                <p className="m-0" style={{ fontSize: '14px' }}>
                  主布：棉60%、聚酯纖維40%
                </p>
                <p className="m-0" style={{ fontSize: '14px' }}>
                  羅紋：棉82%、聚酯纖維18%
                </p>
              </div>
              <hr style={{ backgroundColor: 'black' }}></hr>
              <div>
                <p className="mb-2 font-weight-bold">COLOR</p>
                <div className="color-choose mb-2">
                  <a
                    className="d-inline-block mr-3 color-choose-a color-choose-actived "
                    style={{
                      backgroundColor: 'red',
                      width: '25px',
                      height: '25px',
                      border: '1px solid rgba(0,0,0,0.3)',
                    }}
                    href="#!"
                    onClick={(e) => {
                      e.preventDefault()
                    }}
                  ></a>
                  <a
                    className="d-inline-block mr-3 color-choose-a "
                    style={{
                      backgroundColor: 'white',
                      width: '25px',
                      height: '25px',
                      border: '1px solid rgba(0,0,0,0.3)',
                    }}
                    href="#!"
                    onClick={(e) => {
                      e.preventDefault()
                    }}
                  ></a>
                  <a
                    className="d-inline-block mr-3 color-choose-a "
                    style={{
                      backgroundColor: 'black',
                      width: '25px',
                      height: '25px',
                      border: '1px solid rgba(0,0,0,0.3)',
                    }}
                    href="#!"
                    onClick={(e) => {
                      e.preventDefault()
                    }}
                  ></a>
                  <a
                    className="d-inline-block mr-3 color-choose-a "
                    style={{
                      backgroundColor: 'pink',
                      width: '25px',
                      height: '25px',
                      border: '1px solid rgba(0,0,0,0.3)',
                    }}
                    href="#!"
                    onClick={(e) => {
                      e.preventDefault()
                    }}
                  ></a>
                </div>
                <p className="mb-2 font-weight-bold">SIZE</p>
                <div className="size-choose mb-2">
                  <a
                    href="#!"
                    className="size-choose-a d-inline-block size-choose-actived text-center text-decoration-none mr-3"
                    onClick={(e) => {
                      e.preventDefault()
                    }}
                  >
                    S
                  </a>
                  <a
                    href="#!"
                    className="size-choose-a d-inline-block text-center text-decoration-none mr-3"
                    onClick={(e) => {
                      e.preventDefault()
                    }}
                  >
                    M
                  </a>
                  <a
                    href="#!"
                    className="size-choose-a d-inline-block text-center text-decoration-none mr-3"
                    onClick={(e) => {
                      e.preventDefault()
                    }}
                  >
                    L
                  </a>
                  <a
                    href="#!"
                    className="size-choose-a d-inline-block text-center text-decoration-none mr-3"
                    onClick={(e) => {
                      e.preventDefault()
                    }}
                  >
                    XL
                  </a>
                </div>
                <p className="mb-2 font-weight-bold">AMOUNT</p>
                <div className="amount-choose">
                  <div className=" mb-2 d-flex justify-content-start align-items-center">
                    <a
                      href="#!"
                      className="text-decoration-none d-inline-block font-weight-bold mr-3"
                      style={{ fontSize: '28px', color: '#353c1d' }}
                      onClick={(e) => {
                        e.preventDefault()
                      }}
                    >
                      +
                    </a>
                    <input
                      style={{
                        fontWeight: 'bold',
                        border: 'none',
                        color: 'red',
                        backgroundColor: 'white',
                        fontStyle: 'italic',
                      }}
                      min="1"
                      defaultValue="1"
                      className="text-center"
                      disabled
                      type="number"
                      class="text-center"
                    ></input>
                    <a
                      href="#!"
                      className="text-decoration-none d-inline-block font-weight-bold ml-3"
                      style={{ fontSize: '28px', color: '#353c1d' }}
                      onClick={(e) => {
                        e.preventDefault()
                      }}
                    >
                      -
                    </a>
                  </div>
                  <div className="mb-2">
                    <p
                      style={{
                        fontSize: '12px',
                        fontStyle: 'italic',
                        color: 'lightgray',
                        fontWeight: 'bold',
                      }}
                    >
                      剩餘{' '}
                      <span id="max-amount-display" style={{ color: 'red' }}>
                        3
                      </span>{' '}
                      個
                    </p>
                  </div>
                </div>
                <div className="add-to-cart-btn mb-4">
                  <a
                    href="#!"
                    class="d-inline-block py-2 px-5 text-decoration-none"
                    onClick={(e) => {
                      e.preventDefault()
                    }}
                  >
                    加入購物車
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            className="d-flex justify-content-center py-3"
            style={{ backgroundColor: 'rgba(53, 60, 29, 0.2)' }}
          >
            <Link
              to="/product"
              className="see-all-btn d-inline-block font-weight-bold text-decoration-none py-2 px-5"
            >
              查看全部商品
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <main className="product-detail-main">
        {/*  */}
        <div className="container">
          {/*  */}
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb px-0 d-none d-lg-flex py-4">
              <li className="breadcrumb-item">
                <Link to="/">首頁</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/product">商品</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                商品詳細
              </li>
            </ol>
          </nav>
          <section className="main-content-top">
            <div className="row justify-content-between mb-5">
              <div
                className="photo-display col-12 col-lg-5 mb-5 mb-lg-0"
                style={{ height: 'auto' }}
              >
                {/* NO.1 */}
                {/* NO.1 */}
                {/* NO.1 */}
                {DetailRes ? (
                  !!DetailRes[colorState].src1 ? (
                    <img
                      className=" my-2 img-fluid"
                      src={DetailRes[colorState].src1}
                      alt={''}
                    ></img>
                  ) : (
                    ''
                  )
                ) : (
                  ''
                )}
                {/* NO.2 */}
                {/* NO.2 */}
                {/* NO.2 */}
                {DetailRes ? (
                  !!DetailRes[colorState].src2 ? (
                    <img
                      className="img-fluid my-2"
                      src={DetailRes[colorState].src2}
                      alt={''}
                    ></img>
                  ) : (
                    ''
                  )
                ) : (
                  ''
                )}
                {/* NO.3 */}
                {/* NO.3 */}
                {/* NO.3 */}
                {DetailRes ? (
                  !!DetailRes[colorState].src3 ? (
                    <img
                      className="img-fluid my-2"
                      src={DetailRes[colorState].src3}
                      alt={''}
                    ></img>
                  ) : (
                    ''
                  )
                ) : (
                  ''
                )}
                {/* NO.4 */}
                {DetailRes ? (
                  !!DetailRes[colorState].src4 ? (
                    <img
                      className="img-fluid my-2"
                      src={DetailRes[colorState].src4}
                      alt={''}
                    ></img>
                  ) : (
                    ''
                  )
                ) : (
                  ''
                )}
              </div>
              <div
                className="detail-display col-12 col-lg-5 mb-5 mb-lg-0 align-self-start px-3 pb-3"
                style={{ height: 'auto', position: 'sticky', top: '16px' }}
              >
                <div>
                  <h2 className="font-weight-bold">
                    {DetailRes ? DetailRes[0].name : ''}
                  </h2>
                  <h3>{DetailRes ? DetailRes[0].brand : ''}</h3>
                  <h3 className="font-weight-bold" style={{ color: '#f37022' }}>
                    ${DetailRes ? DetailRes[0].price : ''}
                  </h3>
                  <p className="font-weight-bold mb-2">產地及材質</p>
                  <p className="m-0" style={{ fontSize: '14px' }}>
                    產地：美國
                  </p>
                  <p className="m-0" style={{ fontSize: '14px' }}>
                    主布：棉60%、聚酯纖維40%
                  </p>
                  <p className="m-0" style={{ fontSize: '14px' }}>
                    羅紋：棉82%、聚酯纖維18%
                  </p>
                </div>
                <hr style={{ backgroundColor: 'black' }}></hr>
                <div>
                  <p className="mb-2 font-weight-bold">COLOR</p>
                  <div className="color-choose mb-2">
                    {DetailRes
                      ? DetailRes.map((v, i) => {
                          return (
                            <a
                              className={
                                'd-inline-block mr-3 color-choose-a ' +
                                (colorState === i ? 'color-choose-actived' : '')
                              }
                              style={{
                                backgroundColor: v.color,
                                width: '25px',
                                height: '25px',
                                border: '1px solid rgba(0,0,0,0.3)',
                              }}
                              href="#!"
                              onClick={(e) => {
                                e.preventDefault()
                                setColorState(i)
                                setSizeState(0)
                                document.getElementById(
                                  'detail-amount-input'
                                ).value = 1
                              }}
                            ></a>
                          )
                        })
                      : 'wait'}
                  </div>
                  <p className="mb-2 font-weight-bold">SIZE</p>
                  <div className="size-choose mb-2">
                    {DetailRes
                      ? StockRes
                        ? StockRes.filter((item) => {
                            return item.color === DetailRes[colorState].color
                          }).map((v, i) => {
                            return (
                              <a
                                href="#!"
                                style={{ textTransform: 'uppercase' }}
                                className={
                                  'size-choose-a d-inline-block text-center text-decoration-none mr-3 ' +
                                  (sizeState === i ? 'size-choose-actived' : '')
                                }
                                onClick={(e) => {
                                  e.preventDefault()
                                  setSizeState(i)
                                  document.getElementById(
                                    'detail-amount-input'
                                  ).value = 1
                                }}
                              >
                                {v.size}
                              </a>
                            )
                          })
                        : ''
                      : ''}
                  </div>
                  <p className="mb-2 font-weight-bold">AMOUNT</p>
                  <div className="amount-choose ">
                    <div className="d-flex justify-content-start align-items-center mb-2">
                      <a
                        href="#!"
                        className="text-decoration-none d-inline-block font-weight-bold mr-3"
                        style={{ fontSize: '28px', color: '#353c1d' }}
                        onClick={(e) => {
                          e.preventDefault()
                          let val = Number(
                            document.getElementById('detail-amount-input').value
                          )
                          if (
                            val <
                            Number(
                              document.getElementById('max-amount-display')
                                .textContent
                            )
                          ) {
                            document.getElementById(
                              'detail-amount-input'
                            ).value = val + 1
                          }
                        }}
                      >
                        +
                      </a>
                      <input
                        id="detail-amount-input"
                        disabled
                        type="number"
                        min="1"
                        defaultValue="1"
                        className="text-center"
                        style={{
                          fontWeight: 'bold',
                          border: 'none',
                          color: 'red',
                          backgroundColor: 'white',
                          fontStyle: 'italic',
                        }}
                        onChange={() => {
                          if (
                            document.getElementById('detail-amount-input')
                              .value < 1
                          ) {
                            document.getElementById(
                              'detail-amount-input'
                            ).value = 1
                          }
                        }}
                      ></input>
                      <a
                        href="#!"
                        className="text-decoration-none d-inline-block font-weight-bold ml-3"
                        style={{ fontSize: '28px', color: '#353c1d' }}
                        onClick={(e) => {
                          e.preventDefault()
                          let val = Number(
                            document.getElementById('detail-amount-input').value
                          )
                          if (val > 1) {
                            document.getElementById(
                              'detail-amount-input'
                            ).value = val - 1
                          } else {
                            return
                          }
                        }}
                      >
                        -
                      </a>
                    </div>
                    <div className="mb-2">
                      <p
                        style={{
                          fontSize: '12px',
                          fontStyle: 'italic',
                          color: 'lightgray',
                          fontWeight: 'bold',
                        }}
                      >
                        剩餘{' '}
                        <span id="max-amount-display" style={{ color: 'red' }}>
                          {DetailRes
                            ? StockRes
                              ? StockRes.filter((e) => {
                                  return e.color === DetailRes[colorState].color
                                })[sizeState].stock
                              : ''
                            : ''}
                        </span>{' '}
                        個
                      </p>
                    </div>
                  </div>
                  <div className="add-to-cart-btn mb-4">
                    <a
                      href="#!"
                      className="d-inline-block py-2 px-5 text-decoration-none"
                      onClick={(e) => {
                        e.preventDefault()
                        let cartProductPrice = DetailRes
                          ? DetailRes[0].price
                          : ''
                        let cartProductColor = document.querySelector(
                          '.color-choose-actived'
                        ).style.backgroundColor
                        let cartProductSize = document.querySelector(
                          '.size-choose-actived'
                        ).textContent
                        let cartProductAmount = document.getElementById(
                          'detail-amount-input'
                        ).value
                        let cartProductData = [
                          {
                            id: ProductId,
                            name: DetailRes ? DetailRes[0].name : '',
                            brand: ProductBrand,
                            price: cartProductPrice,
                            color: cartProductColor,
                            size: cartProductSize,
                            amount: cartProductAmount,
                            image: DetailRes ? DetailRes[0].image : '',
                          },
                        ]
                        let cartOriginalData = !!JSON.parse(
                          localStorage.getItem('cartList')
                        )
                          ? JSON.parse(localStorage.getItem('cartList'))
                          : cartProductData
                        let cartNextData = !!JSON.parse(
                          localStorage.getItem('cartList')
                        )
                          ? cartOriginalData.concat({
                              id: ProductId,
                              name: DetailRes ? DetailRes[0].name : '',
                              brand: ProductBrand,
                              price: cartProductPrice,
                              color: cartProductColor,
                              size: cartProductSize,
                              amount: cartProductAmount,
                              image: DetailRes ? DetailRes[0].image : '',
                            })
                          : cartProductData
                        let cartList = JSON.stringify(cartNextData)
                        localStorage.setItem('cartList', cartList)
                        // 測試
                        props.setDetailToHeaderCart(
                          Number(props.detailToHeaderCart) + 1
                        )
                      }}
                    >
                      加入購物車
                    </a>
                  </div>
                  <div className="other-function d-flex">
                    <div className="position-relative">
                      <a
                        href="#!"
                        className="d-flex align-items-center px-1 mr-3 text-decoration-none position-relative"
                        onClick={(e) => {
                          e.preventDefault()
                          if (!!localStorage.getItem('user')) {
                            let userId = JSON.parse(
                              localStorage.getItem('user')
                            )[0].id
                            let whetherAddFavorite = true
                            let whetherHasFavorite = false
                            for (let i = 0; i < UserRes.length; i++) {
                              if (
                                UserRes[i].product_no == ProductId &&
                                UserRes[i].valid != 0
                              ) {
                                whetherAddFavorite = false
                              } else if (
                                UserRes[i].product_no == ProductId &&
                                UserRes[i].valid == 0
                              ) {
                                whetherAddFavorite = true
                                whetherHasFavorite = true
                              }
                            }
                            if (whetherAddFavorite) {
                              if (whetherHasFavorite) {
                                fetch(
                                  'http://localhost:3001/detail/favorite/' +
                                    userId +
                                    '/' +
                                    ProductId,
                                  {
                                    method: 'put',
                                  }
                                )
                                setFavoriteState(!FavoriteState)
                              } else {
                                fetch(
                                  'http://localhost:3001/detail/favorite/' +
                                    userId +
                                    '/' +
                                    ProductId,
                                  {
                                    method: 'post',
                                  }
                                )
                                setFavoriteState(!FavoriteState)
                              }

                              document.querySelector(
                                '.add-favorite-situation-box p'
                              ).textContent = '收藏成功！'
                              document.querySelector(
                                '.add-favorite-situation-box p'
                              ).style['color'] = 'green'
                              // setTimeout(function () { document.querySelector('.add-favorite-situation-box p').textContent = "" }, 1500);
                            } else {
                              document.querySelector(
                                '.add-favorite-situation-box p'
                              ).textContent = '已經加入囉！'
                              document.querySelector(
                                '.add-favorite-situation-box p'
                              ).style['color'] = 'red'
                              // setTimeout(function () { document.querySelector('.add-favorite-situation-box p').textContent = "" }, 1500);
                            }
                          } else {
                            props.setShowParent(true)
                          }
                        }}
                      >
                        <img
                          className="mr-2"
                          src="/images/素材/icon/star_orange.svg"
                          alt={''}
                          width="25px"
                        ></img>
                        <span>收藏</span>
                        <img
                          className="ml-2"
                          src="/images/素材/icon/Right arrow_G.svg"
                          alt={''}
                        ></img>
                      </a>
                    </div>
                    <div>
                      <a
                        href="#!"
                        className="d-flex align-items-center px-1 mx-3 text-decoration-none"
                        onClick={(e) => {
                          e.preventDefault()
                          setStatus(1)
                        }}
                      >
                        <img
                          className="mr-2"
                          src="/images/素材/icon/Feed_G.svg"
                          width="25px"
                          alt={''}
                        ></img>
                        <span>尺寸表</span>
                        <img
                          className="ml-2"
                          src="/images/素材/icon/Right arrow_G.svg"
                          alt={''}
                        ></img>
                      </a>
                      {/*  */}
                      {status === 1 ? sizemodal() : ''}
                    </div>
                    <div>
                      <a
                        href="#!"
                        className="d-flex align-items-center px-1 mx-3 text-decoration-none"
                        onClick={(e) => {
                          e.preventDefault()
                          setStatus(2)
                        }}
                      >
                        <img
                          className="mr-2"
                          src="/images/素材/icon/Comment_G.svg"
                          width="25px"
                          alt={''}
                        ></img>
                        <span>評論</span>
                        <img
                          className="ml-2"
                          src="/images/素材/icon/Right arrow_G.svg"
                          alt={''}
                        ></img>
                      </a>
                      {/*  */}
                      {status === 2 ? reviewmodal() : ''}
                    </div>
                  </div>
                  {/*  */}
                  {/*  */}
                  {/*  */}
                  {/*  */}
                  <div
                    id="add-favorite-situation-box"
                    className="add-favorite-situation-box mt-3"
                  >
                    <p style={{ fontSize: '14px', fontStyle: 'italic' }}></p>
                  </div>
                  {/*  */}
                  {/*  */}
                  {/*  */}
                  {/*  */}
                </div>
              </div>
            </div>
          </section>
          {/*  */}
        </div>
        {/*  */}
        <div
          className=" careful-thing-title d-flex justify-content-center"
          style={{ zIndex: '-1' }}
        >
          <h2
            className="d-inline-block py-3 m-0 text-center font-weight-bold"
            style={{ zIndex: '-1' }}
          >
            注意事項及洗滌方式
          </h2>
        </div>
        <div className="d-flex justify-content-center py-5">
          <div className="careful-thing-content d-inline-block">
            <p className="h4 font-weight-bold">
              ※ 因拍攝燈光效果可能造成色差，請以實品顏色為準。
            </p>
            <p className="h4 font-weight-bold">
              ※ 深淺色衣物請分開洗滌;請勿⻑時間浸泡、濕放，以防染色。
            </p>
            <p className="h4 font-weight-bold">
              ※ 衣物洗滌和保養方式請參考商品洗標。
            </p>
          </div>
        </div>
        <div
          className="horizon-line-sm position-relative mb-5 mx-auto"
          style={{ zIndex: '-1' }}
        ></div>
        <div className="container">
          <section className="main-content-middle-1">
            <div className="row">
              <div className="col-12 col-md-6" style={{ zIndex: '-1' }}>
                <img
                  className="img-fluid my-2"
                  src={DetailRes ? DetailRes[0].content_image1 : ''}
                  alt={''}
                ></img>
                <img
                  className="img-fluid my-2"
                  src={DetailRes ? DetailRes[0].content_image2 : ''}
                  alt={''}
                ></img>
              </div>
              <div className="col-12 col-md-6" style={{ zIndex: '-1' }}>
                <div className="my-2">
                  <p className="text-center font-weight-bold">
                    衣服會隨著時代而改變，
                  </p>
                  <p className="text-center font-weight-bold">
                    將現在的潮流氛圍化身為剪裁。
                  </p>
                  <p className="text-center font-weight-bold">
                    營造出清爽俐落印象的衣服⻑度。
                  </p>
                  <p className="text-center font-weight-bold">
                    容易與其他單品搭配的顏色。
                  </p>
                  <p className="text-center font-weight-bold">
                    為了美感和易於使用，
                  </p>
                  <p className="text-center font-weight-bold">
                    在不易乾燥的連帽內側加入聚酯材質。
                  </p>
                  <p className="text-center font-weight-bold">
                    採用雙針縫製以追求平整度與柔滑的膚觸感。
                  </p>
                  <p className="text-center font-weight-bold">
                    所有的改變均有其意義。
                  </p>
                </div>
                <img
                  className="img-fluid my-2"
                  src={DetailRes ? DetailRes[0].content_image3 : ''}
                  alt={''}
                ></img>
              </div>
            </div>
          </section>
        </div>
        <div
          className="horizon-line-sm position-relative my-4 mx-auto"
          style={{ zIndex: '-1' }}
        ></div>
        <div
          className="horizon-line-lg position-relative my-5 mx-auto text-center font-weight-bold h2"
          style={{ zIndex: '-1' }}
        >
          推薦搭配
        </div>
        <div className="container">
          <section className="main-content-middle2">
            <div className="row justify-content-between">
              <div className="col-12 col-lg-6 pr-lg-5 mb-3 mb-lg-0  d-flex align-items-center">
                <img
                  className="img-fluid"
                  src={DetailRes ? DetailRes[0].image : ''}
                  alt={''}
                ></img>
              </div>
              <div className="col-12 col-lg-6 pl-lg-5">
                {/*  */}
                {/*  */}
                {/*  */}
                {/*  */}
                {/*  */}
                {status === 3 ? recommendmodal() : ''}
                <div className="row justify-content-between">
                  <div className="col-6 col-lg-5 mb-3">
                    <a
                      href="#!"
                      className=" d-flex align-items-center justify-content-between"
                    >
                      <img
                        className="img-fluid"
                        src="/images/商品/商品組圖(尚未依品牌分類)/9/z-70864304_32-1.jpg"
                        alt={''}
                        onClick={(e) => {
                          e.preventDefault()
                          setStatus(3)
                        }}
                      ></img>
                    </a>
                  </div>
                  <div className="col-6 col-lg-5 mb-3 d-flex align-items-center">
                    <a
                      href="#!"
                      className=" d-flex align-items-center justify-content-between"
                    >
                      <img
                        className="img-fluid"
                        src="/images/product/UNDEFEATED/LIGHTWEIGHT_BASEBALL_JACKET/LIGHTWEIGHT_BASEBALL_JACKET_O01.jpg"
                        alt={''}
                        onClick={(e) => {
                          e.preventDefault()
                          setStatus(3)
                        }}
                      ></img>
                    </a>
                  </div>
                  <div className="col-6 col-lg-5 mb-3">
                    <a
                      href="#!"
                      className=" d-flex align-items-center justify-content-between"
                    >
                      <img
                        className="img-fluid"
                        src="/images/product/UNDEFEATED/BEACH_SHORT/BEACH_SHORT_P01.jpg"
                        alt={''}
                        onClick={(e) => {
                          e.preventDefault()
                          setStatus(3)
                        }}
                      ></img>
                    </a>
                  </div>
                  <div className="col-6 col-lg-5 mb-3">
                    <a
                      href="#!"
                      className=" d-flex align-items-center justify-content-between"
                    >
                      <img
                        className="img-fluid"
                        src="/images/商品/商品組圖(尚未依品牌分類)/6/z-70864377-1.jpg"
                        alt={''}
                        onClick={(e) => {
                          e.preventDefault()
                          setStatus(3)
                        }}
                      ></img>
                    </a>
                  </div>
                  <div className="col-6 col-lg-5 mb-3">
                    <a
                      href="#!"
                      className=" d-flex align-items-center justify-content-between"
                    >
                      <img
                        className="img-fluid"
                        src="/images/product/Dickies/Orcutt_Belt/6a236ce8aca2bc75cc6dac3b89f6d408_1024x1024.jpg"
                        alt={''}
                        onClick={(e) => {
                          e.preventDefault()
                          setStatus(3)
                        }}
                      ></img>
                    </a>
                  </div>
                  <div className="col-6 col-lg-5 mb-3">
                    <a
                      href="#!"
                      className=" d-flex align-items-center justify-content-between"
                    >
                      <img
                        className="img-fluid"
                        src="/images/商品/商品組圖(尚未依品牌分類)/4/z-70864367-1.jpg"
                        alt={''}
                        onClick={(e) => {
                          e.preventDefault()
                          setStatus(3)
                        }}
                      ></img>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        {/*  */}
        <div
          className="horizon-line-sm position-relative my-5 mx-auto text-center h2"
          style={{ zIndex: '-1' }}
        >
          <span
            className="font-weight-bold position-relative"
            style={{ top: '-16px' }}
          >
            瀏覽紀錄
          </span>
        </div>
        <div className="container">
          <section className="main-content-bottom">
            <div
              className="browse-history mt-5 d-flex "
              style={{ marginBottom: '100px', minHeight: '286px' }}
            >
              {/* NO.1 */}
              {/* NO.1 */}
              {/* NO.1 */}
              {/* NO.1 */}
              {/* NO.1 */}

              {DetailRes
                ? JSON.parse(localStorage.getItem('browseHistory')).length >
                    1 && (
                    // 判斷localStorage長度
                    <a
                      // 組路由
                      href={
                        '/detail/' +
                        (DetailRes
                          ? JSON.parse(localStorage.getItem('browseHistory'))[
                              JSON.parse(localStorage.getItem('browseHistory'))
                                .length - 2
                            ].brand
                          : '') +
                        '/' +
                        (DetailRes
                          ? JSON.parse(localStorage.getItem('browseHistory'))[
                              JSON.parse(localStorage.getItem('browseHistory'))
                                .length - 2
                            ].id
                          : '')
                      }
                      className="d-inline-block p-3 mr-2"
                      style={{ width: '20%' }}
                    >
                      <img
                        // 抓圖片路徑
                        src={
                          DetailRes
                            ? JSON.parse(localStorage.getItem('browseHistory'))[
                                JSON.parse(
                                  localStorage.getItem('browseHistory')
                                ).length - 2
                              ].image
                            : ''
                        }
                        className="mb-3"
                        style={{
                          width: '100%',
                          height: '146px',
                          objectFit: 'contain',
                        }}
                        alt={''}
                      ></img>
                      <p
                        className="font-weight-bold mb-2"
                        style={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {/* 抓品名 */}
                        {DetailRes
                          ? JSON.parse(localStorage.getItem('browseHistory'))[
                              JSON.parse(localStorage.getItem('browseHistory'))
                                .length - 2
                            ].name
                          : ''}
                      </p>
                      <p
                        className=" mb-2"
                        style={{ letterSpacing: '0.1rem', fontSize: '14px' }}
                      >
                        {/* 抓品牌 */}
                        {DetailRes
                          ? JSON.parse(localStorage.getItem('browseHistory'))[
                              JSON.parse(localStorage.getItem('browseHistory'))
                                .length - 2
                            ].brand
                          : ''}
                      </p>
                      <p
                        className=" mb-2"
                        style={{ letterSpacing: '0.1rem', fontSize: '14px' }}
                      >
                        {/* 抓價錢 */}
                        NT${' '}
                        {DetailRes
                          ? JSON.parse(localStorage.getItem('browseHistory'))[
                              JSON.parse(localStorage.getItem('browseHistory'))
                                .length - 2
                            ].price
                          : ''}{' '}
                      </p>
                    </a>
                  )
                : ''}

              {/* NO.2 */}
              {/* NO.2 */}
              {/* NO.2 */}
              {/* NO.2 */}
              {/* NO.2 */}
              {DetailRes
                ? JSON.parse(localStorage.getItem('browseHistory')).length >
                    2 && (
                    // 判斷localStorage長度
                    <a
                      // 組路由
                      href={
                        '/detail/' +
                        (DetailRes
                          ? JSON.parse(localStorage.getItem('browseHistory'))[
                              JSON.parse(localStorage.getItem('browseHistory'))
                                .length - 3
                            ].brand
                          : '') +
                        '/' +
                        (DetailRes
                          ? JSON.parse(localStorage.getItem('browseHistory'))[
                              JSON.parse(localStorage.getItem('browseHistory'))
                                .length - 3
                            ].id
                          : '')
                      }
                      className="d-inline-block p-3 mr-2"
                      style={{ width: '20%' }}
                    >
                      <img
                        // 抓圖片路徑
                        src={
                          DetailRes
                            ? JSON.parse(localStorage.getItem('browseHistory'))[
                                JSON.parse(
                                  localStorage.getItem('browseHistory')
                                ).length - 3
                              ].image
                            : ''
                        }
                        className="mb-3"
                        style={{
                          width: '100%',
                          height: '146px',
                          objectFit: 'contain',
                        }}
                        alt={''}
                      ></img>
                      <p
                        className="font-weight-bold mb-2"
                        style={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {/* 抓品名 */}
                        {DetailRes
                          ? JSON.parse(localStorage.getItem('browseHistory'))[
                              JSON.parse(localStorage.getItem('browseHistory'))
                                .length - 3
                            ].name
                          : ''}
                      </p>
                      <p
                        className=" mb-2"
                        style={{ letterSpacing: '0.1rem', fontSize: '14px' }}
                      >
                        {/* 抓品牌 */}
                        {DetailRes
                          ? JSON.parse(localStorage.getItem('browseHistory'))[
                              JSON.parse(localStorage.getItem('browseHistory'))
                                .length - 3
                            ].brand
                          : ''}
                      </p>
                      <p
                        className=" mb-2"
                        style={{ letterSpacing: '0.1rem', fontSize: '14px' }}
                      >
                        {/* 抓價錢 */}
                        NT${' '}
                        {DetailRes
                          ? JSON.parse(localStorage.getItem('browseHistory'))[
                              JSON.parse(localStorage.getItem('browseHistory'))
                                .length - 3
                            ].price
                          : ''}{' '}
                      </p>
                    </a>
                  )
                : ''}

              {/* NO.3 */}
              {/* NO.3 */}
              {/* NO.3 */}
              {/* NO.3 */}
              {/* NO.3 */}

              {DetailRes
                ? JSON.parse(localStorage.getItem('browseHistory')).length >
                    3 && (
                    // 判斷localStorage長度
                    <a
                      // 組路由
                      href={
                        '/detail/' +
                        (DetailRes
                          ? JSON.parse(localStorage.getItem('browseHistory'))[
                              JSON.parse(localStorage.getItem('browseHistory'))
                                .length - 4
                            ].brand
                          : '') +
                        '/' +
                        (DetailRes
                          ? JSON.parse(localStorage.getItem('browseHistory'))[
                              JSON.parse(localStorage.getItem('browseHistory'))
                                .length - 4
                            ].id
                          : '')
                      }
                      className="d-inline-block p-3 mr-2"
                      style={{ width: '20%' }}
                    >
                      <img
                        // 抓圖片路徑
                        src={
                          DetailRes
                            ? JSON.parse(localStorage.getItem('browseHistory'))[
                                JSON.parse(
                                  localStorage.getItem('browseHistory')
                                ).length - 4
                              ].image
                            : ''
                        }
                        className="mb-3"
                        style={{
                          width: '100%',
                          height: '146px',
                          objectFit: 'contain',
                        }}
                        alt={''}
                      ></img>
                      <p
                        className="font-weight-bold mb-2"
                        style={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {/* 抓品名 */}
                        {DetailRes
                          ? JSON.parse(localStorage.getItem('browseHistory'))[
                              JSON.parse(localStorage.getItem('browseHistory'))
                                .length - 4
                            ].name
                          : ''}
                      </p>
                      <p
                        className=" mb-2"
                        style={{ letterSpacing: '0.1rem', fontSize: '14px' }}
                      >
                        {/* 抓品牌 */}
                        {DetailRes
                          ? JSON.parse(localStorage.getItem('browseHistory'))[
                              JSON.parse(localStorage.getItem('browseHistory'))
                                .length - 4
                            ].brand
                          : ''}
                      </p>
                      <p
                        className=" mb-2"
                        style={{ letterSpacing: '0.1rem', fontSize: '14px' }}
                      >
                        {/* 抓價錢 */}
                        NT${' '}
                        {DetailRes
                          ? JSON.parse(localStorage.getItem('browseHistory'))[
                              JSON.parse(localStorage.getItem('browseHistory'))
                                .length - 4
                            ].price
                          : ''}{' '}
                      </p>
                    </a>
                  )
                : ''}

              {/* NO.4 */}
              {/* NO.4 */}
              {/* NO.4 */}
              {/* NO.4 */}
              {/* NO.4 */}

              {DetailRes
                ? JSON.parse(localStorage.getItem('browseHistory')).length >
                    4 && (
                    // 判斷localStorage長度
                    <a
                      // 組路由
                      href={
                        '/detail/' +
                        (DetailRes
                          ? JSON.parse(localStorage.getItem('browseHistory'))[
                              JSON.parse(localStorage.getItem('browseHistory'))
                                .length - 5
                            ].brand
                          : '') +
                        '/' +
                        (DetailRes
                          ? JSON.parse(localStorage.getItem('browseHistory'))[
                              JSON.parse(localStorage.getItem('browseHistory'))
                                .length - 5
                            ].id
                          : '')
                      }
                      className="d-inline-block p-3 mr-2"
                      style={{ width: '20%' }}
                    >
                      <img
                        // 抓圖片路徑
                        src={
                          DetailRes
                            ? JSON.parse(localStorage.getItem('browseHistory'))[
                                JSON.parse(
                                  localStorage.getItem('browseHistory')
                                ).length - 5
                              ].image
                            : ''
                        }
                        className="mb-3"
                        style={{
                          width: '100%',
                          height: '146px',
                          objectFit: 'contain',
                        }}
                        alt={''}
                      ></img>
                      <p
                        className="font-weight-bold mb-2"
                        style={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {/* 抓品名 */}
                        {DetailRes
                          ? JSON.parse(localStorage.getItem('browseHistory'))[
                              JSON.parse(localStorage.getItem('browseHistory'))
                                .length - 5
                            ].name
                          : ''}
                      </p>
                      <p
                        className=" mb-2"
                        style={{ letterSpacing: '0.1rem', fontSize: '14px' }}
                      >
                        {/* 抓品牌 */}
                        {DetailRes
                          ? JSON.parse(localStorage.getItem('browseHistory'))[
                              JSON.parse(localStorage.getItem('browseHistory'))
                                .length - 5
                            ].brand
                          : ''}
                      </p>
                      <p
                        className=" mb-2"
                        style={{ letterSpacing: '0.1rem', fontSize: '14px' }}
                      >
                        {/* 抓價錢 */}
                        NT${' '}
                        {DetailRes
                          ? JSON.parse(localStorage.getItem('browseHistory'))[
                              JSON.parse(localStorage.getItem('browseHistory'))
                                .length - 5
                            ].price
                          : ''}{' '}
                      </p>
                    </a>
                  )
                : ''}

              {/* NO.5 */}
              {/* NO.5 */}
              {/* NO.5 */}
              {/* NO.5 */}
              {/* NO.5 */}

              {DetailRes
                ? JSON.parse(localStorage.getItem('browseHistory')).length >
                    5 && (
                    // 判斷localStorage長度
                    <a
                      // 組路由
                      href={
                        '/detail/' +
                        (DetailRes
                          ? JSON.parse(localStorage.getItem('browseHistory'))[
                              JSON.parse(localStorage.getItem('browseHistory'))
                                .length - 6
                            ].brand
                          : '') +
                        '/' +
                        (DetailRes
                          ? JSON.parse(localStorage.getItem('browseHistory'))[
                              JSON.parse(localStorage.getItem('browseHistory'))
                                .length - 6
                            ].id
                          : '')
                      }
                      className="d-inline-block p-3 mr-2"
                      style={{ width: '20%' }}
                    >
                      <img
                        // 抓圖片路徑
                        src={
                          DetailRes
                            ? JSON.parse(localStorage.getItem('browseHistory'))[
                                JSON.parse(
                                  localStorage.getItem('browseHistory')
                                ).length - 6
                              ].image
                            : ''
                        }
                        className="mb-3"
                        style={{
                          width: '100%',
                          height: '146px',
                          objectFit: 'contain',
                        }}
                        alt={''}
                      ></img>
                      <p
                        className="font-weight-bold mb-2"
                        style={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {/* 抓品名 */}
                        {DetailRes
                          ? JSON.parse(localStorage.getItem('browseHistory'))[
                              JSON.parse(localStorage.getItem('browseHistory'))
                                .length - 6
                            ].name
                          : ''}
                      </p>
                      <p
                        className=" mb-2"
                        style={{ letterSpacing: '0.1rem', fontSize: '14px' }}
                      >
                        {/* 抓品牌 */}
                        {DetailRes
                          ? JSON.parse(localStorage.getItem('browseHistory'))[
                              JSON.parse(localStorage.getItem('browseHistory'))
                                .length - 6
                            ].brand
                          : ''}
                      </p>
                      <p
                        className=" mb-2"
                        style={{ letterSpacing: '0.1rem', fontSize: '14px' }}
                      >
                        {/* 抓價錢 */}
                        NT${' '}
                        {DetailRes
                          ? JSON.parse(localStorage.getItem('browseHistory'))[
                              JSON.parse(localStorage.getItem('browseHistory'))
                                .length - 6
                            ].price
                          : ''}{' '}
                      </p>
                    </a>
                  )
                : ''}
            </div>
          </section>
        </div>
      </main>
    </>
  )
}

export default withRouter(DetailContent)
