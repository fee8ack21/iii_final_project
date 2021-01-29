import React, { useEffect, useState } from 'react'
import HeaderOther from '../components/HeaderOther'
import Topbtn from '../components/Topbtn'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

function News() {
  const [detailToHeaderCart, setDetailToHeaderCart] = useState(
    !!localStorage.getItem('cartList')
      ? JSON.parse(localStorage.getItem('cartList')).length
      : 0
  )
  const [itemsPerPage, setItemsPerPage] = useState(14)
  const [showParent, setShowParent] = useState(false)
  const [whetherLoginParent, setWhetherLoginParent] = useState(
    !!localStorage.getItem('user')
  )
  const [currentPage, setCurrentPage] = useState(1)
  const [status, setStatus] = useState(0)
  const [newsLink, setNewsLink] = useState('')
  const [Content1, setContent1] = useState('')
  const [Content2, setContent2] = useState('')
  const [Src, setSrc] = useState('')
  const [newsImages, setNewsImages] = useState([])
  const newsImages2 = []
  const [sortstatus, setSortStatus] = useState(1)

  let pages = Math.ceil(newsImages.length / itemsPerPage)

  for (let i = 9; i < newsImages.length; i++) {
    newsImages2.push(newsImages[i])
  }
  // console.log(newsImages2)
  useEffect(() => {
    // async await
    async function getNews() {
      // 要使用try-catch來作錯誤處理
      try {
        // 從伺服器得到資料
        const response = await fetch('http://localhost:3001/news', {
          method: 'get',
        })
        if (response.ok) {
          // 剖析資料為JS的數值
          const data = await response.json()

          // 設定資料到ProductRes狀態
          setNewsImages(data)
          console.log(data)
        }
      } catch (error) {
        // 發生錯誤的處理情況
        alert('無法得到伺服器資料，請稍後再重試')
        // console.log(error)
      }
    }
    getNews()
  }, [])

  const modal = () => {
    return (
      <div
        id="news-modal"
        className="news-modal d-flex justify-content-center align-items-center"
        onClick={(e) => {
          // console.log(e.target.id)
          if (e.target.id === 'news-modal') setStatus(0)
        }}
      >
        <div className="news-content pt-5 position-relative">
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
          <div className="row mt-4  position-relative">
            <img
              src={Src}
              className="position-absolute"
              style={{
                width: '40%',
                height: '80%',
                top: '50%',
                transform: 'translateY(-50%)',
                right: '50px',
                zIndex: '1',
                objectFit: 'cover',
              }}
              alt={''}
            ></img>
            <div className="row mx-0">
              <div className="col-6 pr-0">
                <div
                  className="p-5"
                  style={{ backgroundColor: '#353c1d', color: 'white' }}
                >
                  <h4 className="font-weight-bold">{Content1}</h4>
                  <br></br>
                  <p className="font-weight-bold" style={{ fontSize: '16px' }}>
                    {Content2}
                  </p>
                </div>
              </div>
              <div className="col-6 pl-0">
                <div
                  style={{
                    backgroundColor: '#353c1d',
                    color: 'white',
                    width: '100%',
                    height: '100%',
                  }}
                ></div>
              </div>
            </div>
            <div className="row mx-3">
              <div className="col-12 pr-0">
                <div className="p-4" style={{ backgroundColor: 'white' }}>
                  <a
                    className="font-weight-bold"
                    style={{ fontSize: '14px' }}
                    href="/detail/UNDEFEATED/27"
                  >
                    {newsLink}
                  </a>
                </div>
              </div>
              <div className="col-6 pl-0">
                <div
                  style={{
                    backgroundColor: 'white',
                    width: ' 100%',
                    height: '100%',
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  //---------------------------------------------------------
  return (
    <>
      <HeaderOther
        setWhetherLoginParent={setWhetherLoginParent}
        showParent={showParent}
        setShowParent={setShowParent}
        detailToHeaderCart={detailToHeaderCart}
        setDetailToHeaderCart={setDetailToHeaderCart}
      />
      <div
        className="horizon-line-sm position-relative mb-5 mx-auto text-center h2"
        style={{ marginTop: '96px' }}
      >
        <span
          className="font-weight-bold position-relative"
          style={{ top: '-16px' }}
        >
          最新新聞
        </span>
      </div>
      {/* <!-- <div>
                            <h3 className="newsTitle newsLetter-Spacing"><span>最新新聞</span></h3>
                          </div> --> */}
      {/* <!-- <div className="newsImageBox"> --> */}
      <div className="container-fluid  ">
        {/* <!-- Stack the columns on mobile by making one full-width and the other half-width --> */}
        <div className="row">
          <div className="col-8 px-0">
            <div className="row mx-0">
              <div className="col-8 px-0">
                <div
                  className="newsImageMain1 newsBg-cover newsRow newsBig-pic-mask "
                  style={{
                    backgroundImage: `url(${
                      newsImages.length > 0 ? newsImages[0].src : ''
                    })`,
                  }}
                  onClick={(e) => {
                    e.preventDefault()
                    setStatus(1)
                    setContent1(newsImages[0].news_content1)
                    setContent2(newsImages[0].news_content2)
                    setNewsLink(newsImages[0].news_link)
                    setSrc(newsImages[0].src)
                  }}
                >
                  <h3 className="newsBig-pic-text ">
                    {newsImages.length > 0 ? newsImages[0].news_title1 : ''}
                  </h3>
                  <h5 className="newsBig-pic-text-sm ">
                    <span className="zox-byline-name">
                      {newsImages.length > 0 ? newsImages[0].news_title2 : ''}
                    </span>
                    <span className="zox-byline-date">
                      <i className="far fa-clock"></i>
                      {newsImages.length > 0 ? newsImages[0].date : ''}
                    </span>
                  </h5>
                </div>
              </div>
              <div className="col-4 px-0">
                <div
                  className="newsImageMain2 newsBg-cover newsBox "
                  style={{
                    backgroundImage: `url(${
                      newsImages.length > 0 ? newsImages[1].src : ''
                    })`,
                  }}
                ></div>
                <div
                  className="newsImageMain4 newsBg-cover newsBox newsBig-pic-mask "
                  style={{
                    backgroundImage: `url(${
                      newsImages.length > 0 ? newsImages[3].src : ''
                    })`,
                  }}
                  onClick={(e) => {
                    e.preventDefault()
                    setStatus(1)
                    setContent1(newsImages[3].news_content1)
                    setContent2(newsImages[3].news_content2)
                    setNewsLink(newsImages[3].news_link)
                    setSrc(newsImages[3].src)
                  }}
                >
                  <h3 className="newsBig-pic-text3">
                    {newsImages.length > 0 ? newsImages[3].news_title1 : ''}
                  </h3>
                  <h5 className="newsBig-pic-text-sm">
                    <span className="zox-byline-name">
                      {newsImages.length > 0 ? newsImages[3].news_title2 : ''}
                    </span>
                    <span className="zox-byline-date">
                      <i className="far fa-clock"></i>
                      {newsImages.length > 0 ? newsImages[3].date : ''}
                    </span>
                  </h5>
                </div>
              </div>
            </div>
            <div className="row mx-0">
              <div className="col-4 px-0">
                <div
                  className="newsImageMain6 newsBg-cover newsBox newsBig-pic-mask "
                  style={{
                    backgroundImage: `url(${
                      newsImages.length > 0 ? newsImages[5].src : ''
                    })`,
                  }}
                  onClick={(e) => {
                    e.preventDefault()
                    setStatus(1)
                    setContent1(newsImages[5].news_content1)
                    setContent2(newsImages[5].news_content2)
                    setNewsLink(newsImages[5].news_link)
                    setSrc(newsImages[5].src)
                  }}
                >
                  <h3 className="newsBig-pic-text3">
                    {newsImages.length > 0 ? newsImages[5].news_title1 : ''}
                  </h3>
                  <h5 className="newsBig-pic-text-sm">
                    <span className="zox-byline-name">
                      {newsImages.length > 0 ? newsImages[5].news_title2 : ''}
                    </span>
                    <span className="zox-byline-date">
                      <i className="far fa-clock"></i>
                      {newsImages.length > 0 ? newsImages[5].date : ''}
                    </span>
                  </h5>
                </div>
                <div
                  className="newsImageMain8 newsBg-cover newsBox newsBig-pic-mask "
                  style={{
                    backgroundImage: `url(${
                      newsImages.length > 0 ? newsImages[7].src : ''
                    })`,
                  }}
                  onClick={(e) => {
                    e.preventDefault()
                    setStatus(1)
                    setContent1(newsImages[7].news_content1)
                    setContent2(newsImages[7].news_content2)
                    setNewsLink(newsImages[7].news_link)
                    setSrc(newsImages[7].src)
                  }}
                >
                  <h3 className="newsBig-pic-text3">
                    {newsImages.length > 0 ? newsImages[7].news_title1 : ''}
                  </h3>
                  <h5 className="newsBig-pic-text-sm">
                    <span className="zox-byline-name">
                      {newsImages.length > 0 ? newsImages[7].news_title2 : ''}
                    </span>
                    <span className="zox-byline-date">
                      <i className="far fa-clock"></i>
                      {newsImages.length > 0 ? newsImages[7].date : ''}
                    </span>
                  </h5>
                </div>
              </div>
              <div className="col-8 px-0">
                <div
                  className="newsImageMain7 newsBg-cover newsRow newsBig-pic-mask "
                  style={{
                    backgroundImage: `url(${
                      newsImages.length > 0 ? newsImages[6].src : ''
                    })`,
                  }}
                  onClick={(e) => {
                    e.preventDefault()
                    setStatus(1)
                    setContent1(newsImages[6].news_content1)
                    setContent2(newsImages[6].news_content2)
                    setNewsLink(newsImages[6].news_link)
                    setSrc(newsImages[6].src)
                  }}
                >
                  <h3 className="newsBig-pic-text">
                    {newsImages.length > 0 ? newsImages[6].news_title1 : ''}
                  </h3>
                  <h5 className="newsBig-pic-text-sm">
                    <span className="zox-byline-name">
                      {newsImages.length > 0 ? newsImages[6].news_title2 : ''}
                    </span>
                    <span className="zox-byline-date">
                      <i className="far fa-clock"></i>
                      {newsImages.length > 0 ? newsImages[6].date : ''}
                    </span>
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <div className="col-4 px-0 d-flex flex-column">
            <div
              className=" newsImageMain3 newsBg-cover newsBox newsBig-pic-mask "
              style={{
                backgroundImage: `url(${
                  newsImages.length > 0 ? newsImages[2].src : ''
                })`,
              }}
              onClick={(e) => {
                e.preventDefault()
                setStatus(1)
                setContent1(newsImages[2].news_content1)
                setContent2(newsImages[2].news_content2)
                setNewsLink(newsImages[2].news_link)
                setSrc(newsImages[2].src)
              }}
            >
              <h3 className="newsBig-pic-text2">
                {newsImages.length > 0 ? newsImages[2].news_title1 : ''}
              </h3>
              <h5 className="newsBig-pic-text-sm">
                <span className="zox-byline-name">
                  {newsImages.length > 0 ? newsImages[2].news_title2 : ''}
                </span>
                <span className="zox-byline-date">
                  <i className="far fa-clock"></i>
                  {newsImages.length > 0 ? newsImages[2].date : ''}
                </span>
              </h5>
            </div>
            <div
              className="newsImageMain5 newsBg-cover newsBox newsBig-pic-mask "
              style={{
                backgroundImage: `url(${
                  newsImages.length > 0 ? newsImages[4].src : ''
                })`,
                flexGrow: '1',
              }}
              onClick={(e) => {
                e.preventDefault()
                setStatus(1)
                setContent1(newsImages[4].news_content1)
                setContent2(newsImages[4].news_content2)
                setNewsLink(newsImages[4].news_link)
                setSrc(newsImages[4].src)
              }}
            >
              <h3 className="newsBig-pic-text2">
                {newsImages.length > 0 ? newsImages[4].news_title1 : ''}
              </h3>
              <h5 className="newsBig-pic-text-sm">
                <span className="zox-byline-name">
                  {newsImages.length > 0 ? newsImages[4].news_title2 : ''}
                </span>
                <span className="zox-byline-date">
                  <i className="far fa-clock"></i>
                  {newsImages.length > 0 ? newsImages[4].date : ''}
                </span>
              </h5>
            </div>
            <div
              className="newsImageMain9 newsBg-cover newsBox newsBig-pic-mask "
              style={{
                backgroundImage: `url(${
                  newsImages.length > 0 ? newsImages[8].src : ''
                })`,
              }}
              onClick={(e) => {
                e.preventDefault()
                setStatus(1)
                setContent1(newsImages[8].news_content1)
                setContent2(newsImages[8].news_content2)
                setNewsLink(newsImages[8].news_link)
                setSrc(newsImages[8].src)
              }}
            >
              <h3 className="newsBig-pic-text2">
                {newsImages.length > 0 ? newsImages[8].news_title1 : ''}
              </h3>
              <h5 className="newsBig-pic-text-sm">
                <span className="zox-byline-name">
                  {newsImages.length > 0 ? newsImages[8].news_title2 : ''}
                </span>
                <span className="zox-byline-date">
                  <i className="far fa-clock"></i>
                  {newsImages.length > 0 ? newsImages[8].date : ''}
                </span>
              </h5>
            </div>
          </div>
        </div>
      </div>
      <div
        className="horizon-line-sm position-relative mb-5 mx-auto text-center h2"
        style={{ marginTop: '96px' }}
      >
        <span
          className="font-weight-bold position-relative"
          style={{ top: '-16px' }}
        >
          推薦新聞
        </span>
      </div>
      <div className="news">
        <div className="container">
          <div className="d-flex justify-content-between ">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb px-0 d-none d-lg-flex">
                <li className="breadcrumb-item">
                  <a href="/">首頁</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="/news">新聞頁面</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  推薦新聞
                </li>
              </ol>
            </nav>
            <div className="dropdown d-flex py-2">
              <div className="position-relative" style={{ zIndex: '9999' }}>
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
                  排序
                  <img
                    className="mx-3"
                    src="images/素材/icon/arrow_G.svg"
                    alt={''}
                  ></img>
                </a>
                <div
                  id="items-per-page-wrap"
                  className="items-per-page-wrap position-absolute ;"
                  style={{ display: 'none' }}
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
                  <ul className="sort-ul  list-unstyled mb-0">
                    {/*  */}
                    <li>
                      <a
                        href="#!"
                        className="d-inline-block py-2 px-3 text-decoration-none"
                        onClick={(e) => {
                          e.preventDefault()
                          setSortStatus(1)
                        }}
                      >
                        從日期最新
                      </a>
                    </li>
                    <li>
                      <a
                        href="#!"
                        className="d-inline-block py-2 px-3 text-decoration-none"
                        onClick={(e) => {
                          e.preventDefault()
                          setSortStatus(2)
                        }}
                      >
                        從日期最舊
                      </a>
                    </li>
                    {/*  */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/*  */}
          {status === 1 ? modal() : ''}
          <div className=" d-flex justify-content-between flex-wrap">
            {/* <!-- 小圖開始 --> */}
            {sortstatus === 1
              ? newsImages2
                  .sort(function (a, b) {
                    return a.id > b.id ? 1 : -1
                  })
                  .map((v, i) => {
                    if (
                      i >= itemsPerPage * (currentPage - 1) &&
                      i <= itemsPerPage * currentPage - 1
                    ) {
                      return (
                        <>
                          <div
                            className="card mb-3 col-6"
                            style={{ maxWidth: '540px', cursor: 'pointer' }}
                            key={i}
                          >
                            <div className="row no-gutters">
                              <div className="col-md-4 d-flex justify-content-center align-items-center">
                                <img
                                  style={{
                                    backgroundImage: `url(${v.src})`,
                                  }}
                                  className="img-fluid news-small-cover-image"
                                  alt={''}
                                ></img>
                              </div>
                              <div className="col-md-8">
                                <div className="card-body news-card-body-text">
                                  {/* <h5 className="card-title"></h5> */}
                                  <p
                                    className="news-article card-text font-weight-bold"
                                    style={{ color: '#353c1d' }}
                                  >
                                    {v.news_title1}
                                  </p>
                                </div>
                                <div className="card-body news-card-body-link">
                                  <p className="card-text d-flex justify-content-end ">
                                    <a
                                      href="#!"
                                      style={{
                                        color: '#353c1d',
                                        fontSize: '12px',
                                      }}
                                      onClick={(e) => {
                                        e.preventDefault()
                                        setStatus(1)
                                        setContent1(v.news_content1)
                                        setContent2(v.news_content2)
                                        setNewsLink(v.news_link)
                                        setSrc(v.src)
                                      }}
                                    >
                                      繼續閱讀 ...
                                    </a>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          )
                        </>
                      )
                    }
                  })
              : sortstatus === 2
              ? newsImages2
                  .sort(function (a, b) {
                    return a.id < b.id ? 1 : -1
                  })
                  .map((v, i) => {
                    return (
                      <>
                        <div
                          className="card mb-3 col-6"
                          style={{ maxWidth: '540px', cursor: 'pointer' }}
                          key={i}
                        >
                          <div className="row no-gutters">
                            <div className="col-md-4 d-flex justify-content-center align-items-center">
                              <img
                                style={{
                                  backgroundImage: `url(${v.src})`,
                                }}
                                className="img-fluid news-small-cover-image"
                                alt={''}
                              ></img>
                            </div>
                            <div className="col-md-8">
                              <div className="card-body news-card-body-text">
                                {/* <h5 className="card-title"></h5> */}
                                <p
                                  className="news-article card-text font-weight-bold"
                                  style={{ color: '#353c1d' }}
                                >
                                  {v.news_title1}
                                </p>
                              </div>
                              <div className="card-body news-card-body-link">
                                <p className="card-text d-flex justify-content-end ">
                                  <a
                                    href="#!"
                                    style={{
                                      color: '#353c1d',
                                      fontSize: '12px',
                                    }}
                                    onClick={(e) => {
                                      e.preventDefault()
                                      setStatus(1)
                                      setContent1(v.news_content1)
                                      setContent2(v.news_content2)
                                      setNewsLink(v.news_link)
                                      setSrc(v.src)
                                    }}
                                  >
                                    繼續閱讀 ...
                                  </a>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        )
                      </>
                    )
                  })
              : ''}
            {/* </div> */}
          </div>
          {/* 段落 */}
          <div className="page-select position-relative d-none d-lg-flex justify-content-center align-items-center my-5">
            <a
              href="#!"
              className="font-weight-bold page-previous d-flex justify-content-between align-items-center px-2 mx-2 text-center text-decoration-none"
              onClick={(e) => {
                e.preventDefault()
                if (currentPage <= pages && currentPage > 1) {
                  setCurrentPage(currentPage - 1)
                }
              }}
            >
              <img src="images/素材/icon/arrow_W.svg" alt={''}></img>上一頁
            </a>
            <a
              href="#!"
              className=" font-weight-bold page-number d-inline-block mx-2 text-center text-decoration-none"
              onClick={(e) => {
                e.preventDefault()
                setCurrentPage(1)
              }}
            >
              1
            </a>
            <a
              href="#!"
              className=" font-weight-bold page-number d-inline-block mx-2 text-center text-decoration-none"
              onClick={(e) => {
                e.preventDefault()
                setCurrentPage(2)
              }}
            >
              2
            </a>
            <a
              href="#!"
              className=" font-weight-bold page-number d-inline-block mx-2 text-center text-decoration-none"
              onClick={(e) => {
                e.preventDefault()
                setCurrentPage(3)
              }}
            >
              3
            </a>
            <a
              href="#!"
              className="font-weight-bold page-next d-flex justify-content-between align-items-center px-2 mx-2 text-center text-decoration-none"
              onClick={(e) => {
                e.preventDefault()
                if (currentPage < pages) {
                  setCurrentPage(currentPage + 1)
                }
              }}
            >
              下一頁<img src="images/素材/icon/arrow_W.svg" alt={''}></img>
            </a>
          </div>
        </div>
      </div>
      <Topbtn />
      <Footer />
    </>
  )
}

export default News
