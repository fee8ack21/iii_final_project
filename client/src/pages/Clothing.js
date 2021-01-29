import React, { useEffect, useState } from 'react'
import HeaderOther from '../components/HeaderOther'
import Topbtn from '../components/Topbtn'
import Footer from '../components/Footer'
import Magnifier from 'react-magnifier'
import { Link } from 'react-router-dom'
import { Accordion, Card } from 'react-bootstrap'

// clothing
function Clothing() {
  const [detailToHeaderCart, setDetailToHeaderCart] = useState(
    !!localStorage.getItem('cartList')
      ? JSON.parse(localStorage.getItem('cartList')).length
      : 0
  )

  const [showParent, setShowParent] = useState(false)
  const [whetherLoginParent, setWhetherLoginParent] = useState(
    !!localStorage.getItem('user')
  )

  const [status, setStatus] = useState(0)
  // const [accordionActived, setAccordionActived] = useState(false)

  const [clothingImages, setClothingImages] = useState([])
  const [clothingData, setClothingData] = useState([])

  const [choose, setChoose] = useState(0)

  useEffect(() => {
    // async await
    async function getClothing() {
      // 要使用try-catch來作錯誤處理
      try {
        // 從伺服器得到資料
        const response = await fetch('http://localhost:3001/clothing', {
          method: 'get',
        })
        if (response.ok) {
          // 剖析資料為JS的數值
          const data = await response.json()

          // 設定資料到ProductRes狀態
          setClothingImages(data)
          console.log(data)
        }
      } catch (error) {
        // 發生錯誤的處理情況
        alert('無法得到伺服器資料，請稍後再重試')
        console.log(error)
      }
    }
    getClothing()
  }, [])

  function getClothingData(id) {
    // 從伺服器得到資料
    let url = new URL('http://localhost:3001/clothing/' + id)
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setClothingData(data)
      })
      .catch((err) => console.log(err))
  }

  const modal = () => {
    return (
      <div
        id="what"
        className="clothing-modal d-flex justify-content-center align-items-center"
        onClick={(e) => {
          // console.log(e.target.id)
          if (e.target.id === 'what') {
            setStatus(0)
          }
        }}
      >
        <div className="clothing-content p-5 position-relative">
          <a
            href="/#"
            className="close-button position-absolute "
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
              <Magnifier
                className="btn"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                src={clothingImages[choose].src}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                alt={' '}
              />
            </div>
            <div className="col-6">
              <Accordion>
                {clothingData.map((val, key) => {
                  return (
                    <Card className="pb-3" key={key}>
                      {/* 帽子標籤 ↓ */}
                      <Accordion.Toggle
                        // href="#!"
                        className="clothing-accordion-a d-flex mb-3 justify-content-between align-items-center font-weight-bold text-decoration-none h5"
                        style={{ color: '#353c1d', fontSize: '20px' }}
                        as={Card.Header}
                        eventKey={val.id}
                        // onClick={(e) => {
                        //   e.preventDefault()
                        //   // document.getElementById('top')
                        //   // setAccordionActived(!accordionActived)
                        // }}
                      >
                        {val.category === '1'
                          ? '上衣'
                          : val.category === '2'
                          ? '帽子'
                          : val.category === '3'
                          ? '外套'
                          : val.category === '4'
                          ? '褲子'
                          : val.category === '5'
                          ? '鞋款'
                          : val.category === '6'
                          ? '配件'
                          : ''}
                        {/* 帽子右邊的箭頭 ↓ */}
                        <img
                          src="images/素材/icon/arrow_G.svg"
                          style={{
                            width: '20px',
                            transform: 'rotate(-90deg)',
                            position: 'relative',
                            top: '-3.5px',
                          }}
                          alt={' '}
                        />
                      </Accordion.Toggle>
                      <Accordion.Collapse
                        eventKey={val.id}
                        id={`sort${val.id}`}
                        // className={
                        //   'clothing-accordion-ul list-unstyled mb-0 ' +
                        //   (accordionActived ? 'accordion-actived' : '')
                        // }
                      >
                        <Card.Body className="px-5">
                          <Link
                            to={`/detail/${val.brand}/${val.id}`}
                            style={{
                              fontSize: '12px',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              display: 'block',
                            }}
                          >
                            {`${val.name}`}
                          </Link>
                          <p style={{ fontSize: '12px' }}>
                            NT${`${val.price}`}
                          </p>
                          {/* <div className="row dropdownbtn">
                            <DropdownButton
                              id="dropdown-basic-button-down "
                              drop={'down'}
                              className="mx-2 my-2"
                              as={ButtonGroup}
                              style={{ fontSize: '12px' }}
                              title="顏色"
                            >
                              <Dropdown.Item href="#/action-1">
                                黑
                              </Dropdown.Item>
                              <Dropdown.Item href="#/action-2">
                                白
                              </Dropdown.Item>
                              <Dropdown.Item href="#/action-3">
                                紅
                              </Dropdown.Item>
                              <Dropdown.Item href="#/action-4">
                                藍
                              </Dropdown.Item>
                            </DropdownButton>

                            <DropdownButton
                              id="dropdown-basic-button-down "
                              drop={'down'}
                              className="mx-2 my-2"
                              as={ButtonGroup}
                              style={{ fontSize: '12px' }}
                              title="尺寸"
                            >
                              <Dropdown.Item href="#/action-1">
                                XL
                              </Dropdown.Item>
                              <Dropdown.Item href="#/action-2">L</Dropdown.Item>
                              <Dropdown.Item href="#/action-3">M</Dropdown.Item>
                              <Dropdown.Item href="#/action-4">S</Dropdown.Item>
                            </DropdownButton>

                            <DropdownButton
                              id="dropdown-basic-button-down "
                              drop={'down'}
                              className="mx-2 my-2"
                              as={ButtonGroup}
                              style={{ fontSize: '12px' }}
                              title="數量"
                            >
                              <Dropdown.Item href="#/action-4">4</Dropdown.Item>
                              <Dropdown.Item href="#/action-3">3</Dropdown.Item>
                              <Dropdown.Item href="#/action-2">2</Dropdown.Item>
                              <Dropdown.Item href="#/action-1">1</Dropdown.Item>
                            </DropdownButton>
                          </div>

                          <div className="d-flex justify-content-end mb-3">
                            <a
                              className="d-block text-right my-2"
                              style={{ fontSize: '12px' }}
                              href="/#"
                            >
                              加入購物車
                            </a>
                          </div> */}
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  )
                })}
              </Accordion>
            </div>
          </div>
          <div
            className="d-flex justify-content-center py-3 "
            style={{ backgroundColor: 'rgba(53, 60, 29, 0.2)' }}
          >
            <Link
              to="/product"
              className="d-inline-block font-weight-bold text-decoration-none py-2 px-5 allProductbtn"
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
      <HeaderOther
        setWhetherLoginParent={setWhetherLoginParent}
        showParent={showParent}
        setShowParent={setShowParent}
        detailToHeaderCart={detailToHeaderCart}
        setDetailToHeaderCart={setDetailToHeaderCart}
      />
      <main style={{ marginTop: '24px' }}>
        <div>
          <div className="row headerwrapper">
            <div
              className="col-10 h_box h_box1"
              style={{ paddingRight: '0px', paddingLeft: '0px' }}
            >
              <div
                className="text-center h_box1_title1"
                style={{ width: '25%' }}
              >
                <span>Do what</span>
              </div>
              <div
                className="text-center h_box1_title2"
                style={{ width: '40%' }}
              >
                <span>you want to do</span>
              </div>
            </div>
            <div
              className="col-2 h_box2"
              style={{ paddingRight: '0px', paddingLeft: '0px' }}
            >
              <div className="h_box h_box2-1" style={{ width: '100%' }}></div>
              <div className="h_box h_box2-2 " style={{ width: '100%' }}>
                <h5 className="text-center title_text ">
                  {' '}
                  The best clothes of the year are here
                </h5>
              </div>
            </div>
          </div>
        </div>
        <br />
        {/*  modal */}
        {status === 1 ? modal() : ''}
        <div
          className="horizon-line-sm position-relative my-5 mx-auto text-center h6"
          style={{ letterSpacing: '10px' }}
        >
          <span
            className="font-weight-bold position-relative"
            style={{ top: '-9.5px' }}
          >
            2020 春/夏
          </span>
        </div>
        <div>
          <div className="row wrapper px-5 mx-0">
            <div
              className="col-6 box1 mx-0"
              style={{
                backgroundImage: `url('${
                  clothingImages.length > 0 ? clothingImages[4].src : ''
                }')`,
              }}
              onClick={() => {
                setChoose(4)
                setStatus(1)
                // 抓商品清單
                console.log('5')
                getClothingData('5')
              }}
            ></div>
            <div className="col-3 box2 pl-0">
              <div
                className="box2-1 box mx-0"
                style={{
                  width: '100%',
                  backgroundImage: `url('${
                    clothingImages.length > 0 ? clothingImages[1].src : ''
                  }')`,
                }}
                onClick={() => {
                  setChoose(1)
                  setStatus(1)
                  console.log('2')
                  getClothingData('2')
                }}
              ></div>
              <div
                className="box2-2 box mx-0"
                style={{
                  width: '100%',
                  backgroundImage: `url('${
                    clothingImages.length > 0 ? clothingImages[3].src : ''
                  }')`,
                }}
                onClick={() => {
                  setChoose(3)
                  setStatus(1)
                  console.log('3')
                  getClothingData('3')
                }}
              ></div>
            </div>
            <div className="col-3 box3 pl-0">
              <div
                className="box3-1 box ml-0"
                style={{
                  width: '100%',
                  backgroundImage: `url('${
                    clothingImages.length > 0 ? clothingImages[0].src : ''
                  }')`,
                }}
                onClick={() => {
                  setChoose(0)
                  setStatus(1)
                  console.log('1')
                  getClothingData('1')
                }}
              ></div>
              <div
                className="box3-2 box ml-0"
                style={{
                  width: '100%',
                  backgroundImage: `url('${
                    clothingImages.length > 0 ? clothingImages[2].src : ''
                  }')`,
                }}
                onClick={() => {
                  setChoose(2)
                  setStatus(1)
                  console.log('3')
                  getClothingData('3')
                }}
              ></div>
            </div>
          </div>
        </div>
        <br />
        <div
          className="horizon-line-sm position-relative my-5 mx-auto text-center h6"
          style={{ letterSpacing: '10px' }}
        >
          <span
            className="font-weight-bold position-relative"
            style={{ top: '-9.5px' }}
          >
            2020 秋/冬
          </span>
        </div>
        <div>
          <div className="row wrapper2 px-5 mx-0 ">
            <div
              className="col-6 dwbox1  mx-0 pl-0"
              style={{
                width: '100%',
                backgroundImage: `url('${
                  clothingImages.length > 0 ? clothingImages[5].src : ''
                }')`,
              }}
              onClick={() => {
                setChoose(5)
                setStatus(1)
                console.log('6')
                getClothingData('6')
              }}
            ></div>
            <div className="row col-6 mx-0 pr-0">
              <div className="col-6 dwbox2 px-0">
                <div
                  className="dwbox2-1 box mx-0"
                  style={{
                    width: '100%',
                    backgroundImage: `url('${
                      clothingImages.length > 0 ? clothingImages[6].src : ''
                    }')`,
                  }}
                  onClick={() => {
                    setChoose(6)
                    setStatus(1)
                    console.log('7')
                    getClothingData('7')
                  }}
                ></div>
                <div
                  className="dwbox2-2 box mx-0 mb-0"
                  style={{
                    width: '100%',
                    backgroundImage: `url('${
                      clothingImages.length > 0 ? clothingImages[8].src : ''
                    }')`,
                  }}
                  onClick={() => {
                    setChoose(8)
                    setStatus(1)
                    console.log('9')
                    getClothingData('9')
                  }}
                ></div>
              </div>
              <div className="col-6 dwbox3 pr-0">
                <div
                  className="dwbox3-1 box mx-0 "
                  style={{
                    width: '100%',
                    backgroundImage: `url('${
                      clothingImages.length > 0 ? clothingImages[7].src : ''
                    }')`,
                  }}
                  onClick={() => {
                    setChoose(7)
                    setStatus(1)
                    console.log('8')
                    getClothingData('8')
                  }}
                ></div>
                <div
                  className="dwbox3-2 box mx-0 mb-0"
                  style={{
                    width: '100%',
                    backgroundImage: `url('${
                      clothingImages.length > 0 ? clothingImages[9].src : ''
                    }')`,
                  }}
                  onClick={() => {
                    setChoose(9)
                    setStatus(1)
                    console.log('10')
                    getClothingData('10')
                  }}
                ></div>
              </div>
              <div className="col-12 px-0">
                <div
                  className="dwbox4 box mx-0"
                  style={{
                    width: '100%',
                    margin: '10px auto',
                    backgroundImage: `url('${
                      clothingImages.length > 0 ? clothingImages[10].src : ''
                    }')`,
                  }}
                  onClick={() => {
                    setChoose(10)
                    setStatus(1)
                    console.log('11')
                    getClothingData('11')
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Topbtn />
      <Footer></Footer>
      <script
        src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
        crossOrigin
      ></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react-dom.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react.min.js"></script>
    </>
  )
}

export default Clothing
