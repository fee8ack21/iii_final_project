import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// FakeRes 測試
import FakeRes from '../data/FakeRes'

// 目前會顯示很多prettier warnings，暫時無視
// Link 路由還沒寫的精準
function ProductContent(props) {
  // 老師的fetch寫法
  // 步驟一：設一個空productRes，setProductRes為之後fetch response
  const [ProductRes, setProductRes] = useState([])
  const [ProductSearch, setProductSearch] = useState('')

  // async await
  async function getProducts() {
    // 要使用try-catch來作錯誤處理
    try {
      // 從伺服器得到資料
      const response = await fetch('http://localhost:3001/product', {
        method: 'get',
      })
      if (response.ok) {
        // 剖析資料為JS的數值
        const data = await response.json()

        // 設定資料到ProductRes狀態
        setProductRes(data)
      }
    } catch (error) {
      // 發生錯誤的處理情況
      alert('無法得到伺服器資料，請稍後再重試')
      console.log(error)
    }
  }

  // dom生成後，執行fetch函式，再影響setProductRes
  useEffect(() => {
    getProducts()
  }, [])

  //
  //
  //
  const [categoryState, setCategoryState] = useState(props.childCategoryState)
  const [brandState, setBrandState] = useState('所有品牌')
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [listOrder, setListOrder] = useState(1)
  const [imgSideState, setImgSideState] = useState('')
  let categoryConvertName
  if (categoryState === 0) {
    categoryConvertName = '所有類別'
  } else if (categoryState === 1) {
    categoryConvertName = '上衣'
  } else if (categoryState === 2) {
    categoryConvertName = '帽子'
  } else if (categoryState === 3) {
    categoryConvertName = '外套'
  } else if (categoryState === 4) {
    categoryConvertName = '下著'
  } else if (categoryState === 5) {
    categoryConvertName = '鞋子'
  } else if (categoryState === 6) {
    categoryConvertName = '配件'
  }

  useEffect(() => {
    setCategoryState(props.childCategoryState)
  }, [props.childCategoryState])

  let pages = Math.ceil(
    ProductRes.filter((item) => {
      return item.name.slice(0, document.getElementById('product-search-input').value.length).toLowerCase() === ProductSearch || item.brand.slice(0, document.getElementById('product-search-input').value.length).toLowerCase() === ProductSearch
    }).filter((item) => {
      if (categoryState !== 0) {
        return Number(item.category) === categoryState
      } else if (categoryState === 0) {
        return item
      }
    }).filter((item) => {
      if (brandState !== '所有品牌') {
        return item.brand === brandState
      } else if (brandState === '所有品牌') {
        return item
      }
    }).length / itemsPerPage
  )

  return (
    <>
      <section className="hot-sale container">
        <div>
          <h2 className="text-center my-5">熱賣商品</h2>
          <div className="list-unstyled row my-5">
            {ProductRes.sort(function (a, b) {
              return a.id > b.id ? 1 : -1
            }).map((v, i) => {
              if (i < 4) {
                return (
                  <>
                    <Link
                      to={'/detail/' + v.brand + '/' + v.id}
                      className="col-6 col-md-3 mb-3 mb-lg-0  d-block"
                    >
                      <div className="m-3">
                        <img
                          className="mb-3"
                          src={v.image}
                          style={{
                            height: '280px',
                            width: '100%',
                            objectFit: 'cover',
                          }}
                          alt={''}
                        ></img>
                        <p className="m-0 text-center d-none d-sm-block">
                          {v.name}
                        </p>
                        <p className="m-0 text-center">{v.brand}</p>
                        <p className="m-0 text-center font-weight-bold">
                          NT$ {v.price}
                        </p>
                      </div>
                    </Link>
                  </>
                )
              }
            })}
          </div>
        </div>
      </section>
      <div className="horizon-line-sm position-relative my-4 mx-auto"></div>
      <div
        id="product-horizon-lg"
        className="horizon-line-lg position-relative mt-5 my-lg-5 mx-auto"
      ></div>
      <main className="product-home-main">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb px-0 d-none d-lg-flex">
              <li className="breadcrumb-item">
                <Link to="/">首頁</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                商品
              </li>
            </ol>
          </nav>
          <section className="main-content">
            <div className="row">
              <div className="d-none d-lg-block col-lg-3 position-sticky">
                <ul className="accordion-ul list-unstyled">
                  <li className="h5">
                    <div className="d-flex justify-content-between py-2 font-weight-bold">
                      <input id="product-search-input" type="search" className="py-2 px-2 w-100 font-weight-bold" style={{ outlineOffset: '0px', letterSpacing: '0.2rem', fontSize: '14px', lineHeight: '16px',border:'1px solid black' }}
                        onChange={() => {
                          let val = document.getElementById('product-search-input').value.replace(/(^\s*)|(\s*$)/g,"").toLowerCase()
                          console.log(val)
                          console.log(document.getElementById('product-search-input').value.replace(/(^\s*)|(\s*$)/g,"").length)
                          setProductSearch(val)
                        }}>
                      </input>
                    </div>
                  </li>
                  <li className="h5">
                    <div
                      className="d-flex justify-content-between py-2 font-weight-bold"
                      onClick={() => {
                        document
                          .querySelector('.event-accordion')
                          .classList.toggle('accordion-active')
                        if (
                          document.querySelector('.event-span').textContent ===
                          '+'
                        ) {
                          document.querySelector('.event-span').textContent =
                            '-'
                        } else {
                          document.querySelector('.event-span').textContent =
                            '+'
                        }
                      }}
                    >
                      <span>熱銷活動</span>
                      <span className="event-span">-</span>
                    </div>
                    <ul className="event-accordion list-unstyled accordion-active">
                      <li>
                        <a
                          href="#!"
                          className="d-inline-block px-3 py-2 font-weight-bold"
                          onClick={(e) => {
                            e.preventDefault()
                          }}
                          style={{
                            pointerEvents: 'none',
                            textDecoration: 'line-through',
                            color: 'gray',
                          }}
                        >
                          優惠倒數-超值折扣
                        </a>
                      </li>
                      <li>
                        <a
                          href="#!"
                          className="d-inline-block px-3 py-2 font-weight-bold"
                          onClick={(e) => {
                            e.preventDefault()
                          }}
                          style={{
                            pointerEvents: 'none',
                            textDecoration: 'line-through',
                            color: 'gray',
                          }}
                        >
                          STUDIO 7 買千送百
                        </a>
                      </li>
                      <li>
                        <a
                          href="#!"
                          className="d-inline-block px-3 py-2 font-weight-bold"
                          onClick={(e) => {
                            e.preventDefault()
                          }}
                          style={{
                            pointerEvents: 'none',
                            textDecoration: 'line-through',
                            color: 'gray',
                          }}
                        >
                          CANDY 後背包第二件8折
                        </a>
                      </li>
                      <li>
                        <a
                          href="#!"
                          className="d-inline-block px-3 py-2 font-weight-bold"
                          onClick={(e) => {
                            e.preventDefault()
                          }}
                          style={{
                            pointerEvents: 'none',
                            textDecoration: 'line-through',
                            color: 'gray',
                          }}
                        >
                          換季特賣
                        </a>
                      </li>
                      <li>
                        <a
                          href="#!"
                          className="d-inline-block px-3 py-2 font-weight-bold"
                          onClick={(e) => {
                            e.preventDefault()
                          }}
                          style={{
                            pointerEvents: 'none',
                            textDecoration: 'line-through',
                            color: 'gray',
                          }}
                        >
                          免運活動
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="h5">
                    <div
                      className="d-flex justify-content-between py-2 font-weight-bold"
                      onClick={() => {
                        document
                          .querySelector('.category-accordion')
                          .classList.toggle('accordion-active')
                        if (
                          document.querySelector('.category-span')
                            .textContent === '+'
                        ) {
                          document.querySelector('.category-span').textContent =
                            '-'
                        } else {
                          document.querySelector('.category-span').textContent =
                            '+'
                        }
                      }}
                    >
                      <span>類別</span>
                      <span className="category-span">-</span>
                    </div>
                    <ul className="category-accordion list-unstyled accordion-active">
                      <li>
                        <a
                          href="#!"
                          className="d-inline-block px-3 py-2 font-weight-bold"
                          onClick={(e) => {
                            e.preventDefault()
                            setCategoryState(0)
                            setCurrentPage(1)
                          }}
                        >
                          所有類別
                        </a>
                      </li>
                      <li>
                        <a
                          href="#!"
                          className="d-inline-block px-3 py-2 font-weight-bold"
                          onClick={(e) => {
                            e.preventDefault()
                            setCategoryState(1)
                            setCurrentPage(1)
                          }}
                        >
                          上衣
                        </a>
                      </li>
                      <li>
                        <a
                          href="#!"
                          className="d-inline-block px-3 py-2 font-weight-bold"
                          onClick={(e) => {
                            e.preventDefault()
                            setCategoryState(2)
                            setCurrentPage(1)
                          }}
                        >
                          帽子
                        </a>
                      </li>
                      <li>
                        <a
                          href="#!"
                          className="d-inline-block px-3 py-2 font-weight-bold"
                          onClick={(e) => {
                            e.preventDefault()
                            setCategoryState(3)
                            setCurrentPage(1)
                          }}
                        >
                          外套
                        </a>
                      </li>
                      <li>
                        <a
                          href="#!"
                          className="d-inline-block px-3 py-2 font-weight-bold"
                          onClick={(e) => {
                            e.preventDefault()
                            setCategoryState(4)
                            setCurrentPage(1)
                          }}
                        >
                          下著
                        </a>
                      </li>
                      <li>
                        <a
                          href="#!"
                          className="d-inline-block px-3 py-2 font-weight-bold"
                          onClick={(e) => {
                            e.preventDefault()
                            setCategoryState(5)
                            setCurrentPage(1)
                          }}
                        >
                          鞋子
                        </a>
                      </li>
                      <li>
                        <a
                          href="#!"
                          className="d-inline-block px-3 py-2 font-weight-bold"
                          onClick={(e) => {
                            e.preventDefault()
                            setCategoryState(6)
                            setCurrentPage(1)
                          }}
                        >
                          配件
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="h5">
                    <div
                      className="d-flex justify-content-between py-2 font-weight-bold"
                      onClick={() => {
                        document
                          .querySelector('.brand-accordion')
                          .classList.toggle('accordion-active')
                        if (
                          document.querySelector('.brand-span').textContent ===
                          '+'
                        ) {
                          document.querySelector('.brand-span').textContent =
                            '-'
                        } else {
                          document.querySelector('.brand-span').textContent =
                            '+'
                        }
                      }}
                    >
                      <span>品牌</span>
                      <span className="brand-span">-</span>
                    </div>
                    <ul className="brand-accordion list-unstyled accordion-active">
                      <li>
                        <a
                          href="#!"
                          className="d-inline-block px-3 py-2 font-weight-bold"
                          onClick={(e) => {
                            e.preventDefault()
                            setBrandState('所有品牌')
                            setCurrentPage(1)
                          }}
                        >
                          所有品牌
                        </a>
                      </li>
                      <li>
                        <a
                          href="#!"
                          className="d-inline-block px-3 py-2 font-weight-bold"
                          onClick={(e) => {
                            e.preventDefault()
                            setBrandState('UNDEFEATED')
                            setCurrentPage(1)
                          }}
                        >
                          UNDEFEATED
                        </a>
                      </li>
                      <li>
                        <a
                          href="#!"
                          className="d-inline-block px-3 py-2 font-weight-bold"
                          onClick={(e) => {
                            e.preventDefault()
                            setBrandState('STUDIO SEVEN')
                            setCurrentPage(1)
                          }}
                        >
                          STUDIO SEVEN
                        </a>
                      </li>
                      <li>
                        <a
                          href="#!"
                          className="d-inline-block px-3 py-2 font-weight-bold"
                          onClick={(e) => {
                            e.preventDefault()
                            setBrandState('PALACE')
                            setCurrentPage(1)
                          }}
                        >
                          PALACE
                        </a>
                      </li>
                      <li>
                        <a
                          href="#!"
                          className="d-inline-block px-3 py-2 font-weight-bold"
                          onClick={(e) => {
                            e.preventDefault()
                            setBrandState('OnlyNY')
                            setCurrentPage(1)
                          }}
                        >
                          OnlyNY
                        </a>
                      </li>
                      <li>
                        <a
                          href="#!"
                          className="d-inline-block px-3 py-2 font-weight-bold"
                          onClick={(e) => {
                            e.preventDefault()
                            setBrandState('GOLF')
                            setCurrentPage(1)
                          }}
                        >
                          GOLF
                        </a>
                      </li>
                      <li>
                        <a
                          href="#!"
                          className="d-inline-block px-3 py-2 font-weight-bold"
                          onClick={(e) => {
                            e.preventDefault()
                            setBrandState('Dickies')
                            setCurrentPage(1)
                          }}
                        >
                          Dickies
                        </a>
                      </li>
                      <li>
                        <a
                          href="#!"
                          className="d-inline-block px-3 py-2 font-weight-bold"
                          onClick={(e) => {
                            e.preventDefault()
                            setBrandState('Champion')
                            setCurrentPage(1)
                          }}
                        >
                          Champion
                        </a>
                      </li>
                      <li>
                        <a
                          href="#!"
                          className="d-inline-block px-3 py-2 font-weight-bold"
                          onClick={(e) => {
                            e.preventDefault()
                            setBrandState('BAPE')
                            setCurrentPage(1)
                          }}
                        >
                          BAPE
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="col-12 col-lg-9 py-5 py-lg-0">
                <div className="dropdown d-flex pt-2 pb-3">
                  <div className="position-relative">
                    <a
                      id="product-sort-link"
                      href="#!"
                      className="d-inline-block position-relative px-2 mx-3 text-decoration-none"
                      onMouseEnter={() => {
                        document.getElementById('product-sort-wrap').style[
                          'display'
                        ] = 'block'
                      }}
                      onMouseLeave={(e) => {
                        if (e.target.id !== 'product-sort-wrap') {
                          document.getElementById('product-sort-wrap').style[
                            'display'
                          ] = 'none'
                        }
                      }}
                      onClick={(e) => {
                        e.preventDefault()
                      }}
                    >
                      排序
                      <img
                        className="mx-3"
                        src="images/素材/icon/arrow_G.svg"
                        alt={''}
                      ></img>
                    </a>
                    <div
                      id="product-sort-wrap"
                      className="product-sort-wrap position-absolute"
                      onMouseEnter={() => {
                        document.getElementById('product-sort-wrap').style[
                          'display'
                        ] = 'block'
                      }}
                      onMouseLeave={(e) => {
                        if (e.target.id !== 'product-sort-link') {
                          document.getElementById('product-sort-wrap').style[
                            'display'
                          ] = 'none'
                        }
                      }}
                    >
                      <div className="product-sort-ul-wrap position-relative py-2 rounded">
                        <ul className="product-sort-ul  list-unstyled mb-0">
                          <li>
                            <a
                              href="#!"
                              className="d-inline-block py-2 px-3"
                              onClick={(e) => {
                                e.preventDefault()
                                setListOrder(1)
                                setCurrentPage(1)
                              }}
                            >
                              從時間最新
                            </a>
                          </li>
                          <li>
                            <a
                              href="#!"
                              className="d-inline-block py-2 px-3"
                              onClick={(e) => {
                                e.preventDefault()
                                setListOrder(2)
                                setCurrentPage(1)
                              }}
                            >
                              從時間最舊
                            </a>
                          </li>
                          <li>
                            <a
                              href="#!"
                              className="d-inline-block py-2 px-3"
                              onClick={(e) => {
                                e.preventDefault()
                                setListOrder(3)
                                setCurrentPage(1)
                              }}
                            >
                              從價格最低
                            </a>
                          </li>
                          <li>
                            <a
                              href="#!"
                              className="d-inline-block py-2 px-3"
                              onClick={(e) => {
                                e.preventDefault()
                                setListOrder(4)
                                setCurrentPage(1)
                              }}
                            >
                              從價格最高
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="position-relative">
                    <a
                      id="items-per-page-link"
                      href="#!"
                      className="d-inline-block px-2 mx-3 text-decoration-none"
                      onMouseEnter={() => {
                        document.getElementById('items-per-page-wrap').style[
                          'display'
                        ] = 'block'
                      }}
                      onMouseLeave={(e) => {
                        if (e.target.id !== 'items-per-page-wrap') {
                          document.getElementById('items-per-page-wrap').style[
                            'display'
                          ] = 'none'
                        }
                      }}
                      onClick={(e) => {
                        e.preventDefault()
                      }}
                    >
                      顯示筆數
                      <img
                        className="mx-3"
                        src="images/素材/icon/arrow_G.svg"
                        alt={''}
                      ></img>
                    </a>
                    <div
                      id="items-per-page-wrap"
                      className="items-per-page-wrap position-absolute"
                      onMouseEnter={() => {
                        document.getElementById('items-per-page-wrap').style[
                          'display'
                        ] = 'block'
                      }}
                      onMouseLeave={(e) => {
                        if (e.target.id !== 'items-per-page-link') {
                          document.getElementById('items-per-page-wrap').style[
                            'display'
                          ] = 'none'
                        }
                      }}
                    >
                      <div className="items-per-page-ul-wrap position-relative py-2 rounded">
                        <ul className="items-per-page-ul  list-unstyled mb-0">
                          <li>
                            <a
                              href="#!"
                              className="d-inline-block py-2 px-3"
                              onClick={(e) => {
                                e.preventDefault()

                                setItemsPerPage(10)
                                setCurrentPage(1)
                              }}
                            >
                              10筆
                            </a>
                          </li>
                          <li>
                            <a
                              href="#!"
                              className="d-inline-block py-2 px-3"
                              onClick={(e) => {
                                e.preventDefault()
                                setItemsPerPage(20)
                                setCurrentPage(1)
                              }}
                            >
                              20筆
                            </a>
                          </li>
                          <li>
                            <a
                              href="#!"
                              className="d-inline-block py-2 px-3"
                              onClick={(e) => {
                                e.preventDefault()
                                setItemsPerPage(30)
                                setCurrentPage(1)
                              }}
                            >
                              30筆
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="category-brand-display d-flex align-items-center ml-auto">
                    <p
                      className="mr-3 mb-0"
                      style={{ fontSize: '12px', fontWeight: 'bold' }}
                    >
                      目前類別：{' '}
                      <span style={{ color: '#f37022' }}>
                        {categoryConvertName}
                      </span>
                    </p>
                    <p
                      className="mr-3 mb-0"
                      style={{ fontSize: '12px', fontWeight: 'bold' }}
                    >
                      目前品牌：{' '}
                      <span style={{ color: '#f37022' }}>{brandState}</span>
                    </p>
                  </div>
                </div>
                <div
                  className="product-list row"
                  style={{ minHeight: '921px' }}
                >
                  {/*  */}
                  {/*  */}
                  {/*  */}
                  {/*  */}
                  {/*  */}

                  {/* 依時間最新排列 */}
                  {listOrder === 1 &&
                    ProductRes.sort(function (a, b) {
                      return a.id < b.id ? 1 : -1
                    })
                      .filter((item) => {
                        if (categoryState !== 0) {
                          return Number(item.category) === categoryState
                        } else if (categoryState === 0) {
                          return item
                        }
                      })
                      .filter((item) => {
                        if (brandState !== '所有品牌') {
                          return item.brand === brandState
                        } else if (brandState === '所有品牌') {
                          return item
                        }
                      }).filter((item) => {
                        return item.name.slice(0, document.getElementById('product-search-input').value.replace(/(^\s*)|(\s*$)/g,"").length).toLowerCase() === ProductSearch || item.brand.slice(0, document.getElementById('product-search-input').value.replace(/(^\s*)|(\s*$)/g,"").length).toLowerCase() === ProductSearch
                      })
                      .map((v, i) => {
                        if (
                          i >= itemsPerPage * (currentPage - 1) &&
                          i <= itemsPerPage * currentPage - 1
                        ) {
                          return (
                            <>
                              <Link
                                to={'/detail/' + v.brand + '/' + v.id}
                                className="col-6 col-md-3"
                                onMouseEnter={() => {
                                  setImgSideState(v.name)
                                }}
                                onMouseLeave={() => {
                                  setImgSideState('')
                                }}
                              >
                                <div className="m-3">
                                  <img
                                    id={'product-' + v.id}
                                    className="mb-3"
                                    src={
                                      imgSideState === v.name
                                        ? v.image2
                                        : v.image
                                    }
                                    width="100%"
                                    style={{
                                      height: '140px',
                                      objectFit: 'contain',
                                    }}
                                    alt={''}
                                  ></img>
                                  <p className="m-0 text-center d-none d-sm-block">
                                    {v.name}
                                  </p>
                                  <p className="m-0 text-center">{v.brand}</p>
                                  <p className="m-0 text-center font-weight-bold">
                                    NT$ {v.price}
                                  </p>
                                </div>
                              </Link>
                            </>
                          )
                        }
                      })}
                  {/* 依時間最舊排列 */}
                  {listOrder === 2 &&
                    ProductRes.sort(function (a, b) {
                      return a.id > b.id ? 1 : -1
                    })
                      .filter((item) => {
                        if (categoryState !== 0) {
                          return Number(item.category) === categoryState
                        } else if (categoryState === 0) {
                          return item
                        }
                      })
                      .filter((item) => {
                        if (brandState !== '所有品牌') {
                          return item.brand === brandState
                        } else if (brandState === '所有品牌') {
                          return item
                        }
                      }).filter((item) => {
                        return item.name.slice(0, document.getElementById('product-search-input').value.replace(/(^\s*)|(\s*$)/g,"").length).toLowerCase() === ProductSearch || item.brand.slice(0, document.getElementById('product-search-input').value.replace(/(^\s*)|(\s*$)/g,"").length).toLowerCase() === ProductSearch
                      })
                      .map((v, i) => {
                        if (
                          i >= itemsPerPage * (currentPage - 1) &&
                          i <= itemsPerPage * currentPage - 1
                        ) {
                          return (
                            <>
                              <Link
                                to={'/detail/' + v.brand + '/' + v.id}
                                className="col-6 col-md-3"
                                onMouseEnter={() => {
                                  setImgSideState(v.name)
                                }}
                                onMouseLeave={() => {
                                  setImgSideState('')
                                }}
                              >
                                <div className="m-3">
                                  <img
                                    className="mb-3"
                                    src={
                                      imgSideState === v.name
                                        ? v.image2
                                        : v.image
                                    }
                                    width="100%"
                                    style={{
                                      height: '140px',
                                      objectFit: 'contain',
                                    }}
                                    alt={''}
                                  ></img>
                                  <p className="m-0 text-center d-none d-sm-block">
                                    {v.name}
                                  </p>
                                  <p className="m-0 text-center">{v.brand}</p>
                                  <p className="m-0 text-center font-weight-bold">
                                    NT$ {v.price}
                                  </p>
                                </div>
                              </Link>
                            </>
                          )
                        }
                      })}
                  {/* 依價格最低排列 */}
                  {listOrder === 3 &&
                    ProductRes.sort(function (a, b) {
                      return a.price > b.price ? 1 : -1
                    })
                      .filter((item) => {
                        if (categoryState !== 0) {
                          return Number(item.category) === categoryState
                        } else if (categoryState === 0) {
                          return item
                        }
                      })
                      .filter((item) => {
                        if (brandState !== '所有品牌') {
                          return item.brand === brandState
                        } else if (brandState === '所有品牌') {
                          return item
                        }
                      }).filter((item) => {
                        return item.name.slice(0, document.getElementById('product-search-input').value.replace(/(^\s*)|(\s*$)/g,"").length).toLowerCase() === ProductSearch || item.brand.slice(0, document.getElementById('product-search-input').value.replace(/(^\s*)|(\s*$)/g,"").length).toLowerCase() === ProductSearch
                      })
                      .map((v, i) => {
                        console.log(v)
                        if (
                          i >= itemsPerPage * (currentPage - 1) &&
                          i <= itemsPerPage * currentPage - 1
                        ) {
                          return (
                            <>
                              <Link
                                to={'/detail/' + v.brand + '/' + v.id}
                                className="col-6 col-md-3"
                                onMouseEnter={() => {
                                  setImgSideState(v.name)
                                }}
                                onMouseLeave={() => {
                                  setImgSideState('')
                                }}
                              >
                                <div className="m-3">
                                  <img
                                    className="mb-3"
                                    src={
                                      imgSideState === v.name
                                        ? v.image2
                                        : v.image
                                    }
                                    width="100%"
                                    style={{
                                      height: '140px',
                                      objectFit: 'contain',
                                    }}
                                    alt={''}
                                  ></img>
                                  <p className="m-0 text-center d-none d-sm-block">
                                    {v.name}
                                  </p>
                                  <p className="m-0 text-center">{v.brand}</p>
                                  <p className="m-0 text-center font-weight-bold">
                                    NT$ {v.price}
                                  </p>
                                </div>
                              </Link>
                            </>
                          )
                        }
                      })}
                  {/* 依價格最高 */}
                  {listOrder === 4 &&
                    ProductRes.sort(function (a, b) {
                      return a.price < b.price ? 1 : -1
                    })
                      .filter((item) => {
                        if (categoryState !== 0) {
                          return Number(item.category) === categoryState
                        } else if (categoryState === 0) {
                          return item
                        }
                      })
                      .filter((item) => {
                        if (brandState !== '所有品牌') {
                          return item.brand === brandState
                        } else if (brandState === '所有品牌') {
                          return item
                        }
                      }).filter((item) => {
                        return item.name.slice(0, document.getElementById('product-search-input').value.replace(/(^\s*)|(\s*$)/g,"").length).toLowerCase() === ProductSearch || item.brand.slice(0, document.getElementById('product-search-input').value.replace(/(^\s*)|(\s*$)/g,"").length).toLowerCase() === ProductSearch
                      })
                      .map((v, i) => {
                        console.log(v)

                        if (
                          i >= itemsPerPage * (currentPage - 1) &&
                          i <= itemsPerPage * currentPage - 1
                        ) {
                          return (
                            <>
                              <Link
                                to={'/detail/' + v.brand + '/' + v.id}
                                className="col-6 col-md-3"
                                onMouseEnter={() => {
                                  setImgSideState(v.name)
                                }}
                                onMouseLeave={() => {
                                  setImgSideState('')
                                }}
                              >
                                <div className="m-3">
                                  <img
                                    className="mb-3"
                                    src={
                                      imgSideState === v.name
                                        ? v.image2
                                        : v.image
                                    }
                                    width="100%"
                                    style={{
                                      height: '140px',
                                      objectFit: 'contain',
                                    }}
                                    alt={''}
                                  ></img>
                                  <p className="m-0 text-center d-none d-sm-block">
                                    {v.name}
                                  </p>
                                  <p className="m-0 text-center">{v.brand}</p>
                                  <p className="m-0 text-center font-weight-bold">
                                    NT$ {v.price}
                                  </p>
                                </div>
                              </Link>
                            </>
                          )
                        }
                      })}
                  {/*  */}
                  {/*  */}
                  {/*  */}
                  {/*  */}
                  {/*  */}
                  {/*  */}
                  {/*  */}
                  {/*  */}
                  {/*  */}
                  {/*  */}
                </div>
                <div
                  className="page-select position-relative d-none d-lg-flex justify-content-center align-items-center mt-5"
                  style={{ marginBottom: '100px' }}
                >
                  <a
                    href="#!"
                    className={
                      ' font-weight-bold page-previous d-flex justify-content-between align-items-center px-2 mx-2 text-center text-decoration-none ' +
                      (currentPage === 1 ? '' : '')
                    }
                    onClick={(e) => {
                      e.preventDefault()
                      if (currentPage > 1) {
                        setCurrentPage(currentPage - 1)
                      }
                    }}
                  >
                    <img src="images/素材/icon/arrow_W.svg" alt={''}></img>
                    上一頁
                  </a>
                  {/*  */}
                  {/*  */}
                  {/*  */}
                  {(function pageSelect() {
                    let pageSelectContent = []
                    for (let i = 1; i <= (pages > 1 ? pages : 1); i++) {
                      pageSelectContent[i - 1] = i
                    }
                    // console.log(typeof pageSelectContent)
                    // console.log(pageSelectContent)
                    return (
                      <>
                        {pageSelectContent.map((v, i) => (
                          <a
                            href="#!"
                            className={
                              ' font-weight-bold page-number d-inline-block mx-2 text-center text-decoration-none ' +
                              (v === currentPage ? 'page-select-disabled' : '')
                            }
                            onClick={(e) => {
                              e.preventDefault()
                              setCurrentPage(v)
                            }}
                          >
                            {v}
                          </a>
                        ))}
                      </>
                    )
                  })()}

                  {/*  */}
                  {/*  */}
                  {/*  */}
                  {/* <a
                    href="#!"
                    className=" font-weight-bold page-number d-inline-block mx-2 text-center text-decoration-none"
                  >
                    1
                  </a>
                  <a
                    href="#!"
                    className=" font-weight-bold page-number d-inline-block mx-2 text-center text-decoration-none"
                  >
                    2
                  </a>
                  <a
                    href="#!"
                    className=" font-weight-bold page-number d-inline-block mx-2 text-center text-decoration-none"
                  >
                    3
                  </a> */}
                  <a
                    href="#!"
                    className={
                      ' font-weight-bold page-next d-flex justify-content-between align-items-center px-3 mx-2 text-center text-decoration-none ' +
                      (currentPage === pages ? '' : '')
                    }
                    onClick={(e) => {
                      e.preventDefault()
                      if (currentPage < pages) {
                        setCurrentPage(currentPage + 1)
                      }
                    }}
                  >
                    下一頁
                    <img src="images/素材/icon/arrow_W.svg" alt={''}></img>
                  </a>
                  <a
                    href="#!"
                    className=" font-weight-bold position-absolute page-all mx-2 text-center px-3 text-decoration-none"
                    onClick={(e) => {
                      e.preventDefault()
                      setBrandState('所有品牌')
                      setCategoryState(0)
                      setCurrentPage(1)
                    }}
                  >
                    所有商品
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}

export default ProductContent
