import React from 'react'
import { Link } from 'react-router-dom'
// 目前會顯示很多prettier warnings，暫時無視
// Link 路由還沒寫的精準
function HomeContent() {
  return (
    <>
      <main className="home-main">
        <section className="shop-now-top mb-5 position-relative d-flex justify-content-center align-items-end">
          <p className="top-word position-absolute">2020Latest</p>
          <p className="bottom-word position-absolute">Fashion Trends</p>
          <Link
            to="/product"
            className="d-inline-block text-decoration-none font-italic"
          >
            SHOP NOW
          </Link>
        </section>
        <div className="container">
          <section className="shop-now-bottom">
            <div className="row justify-content-between shop-now-bottom-wrap">
              <div className="col-12 col-md-4">
                <div className="d-flex flex-column align-items-center">
                  <div className="position-relative">
                    <img
                      className="img-fluid"
                      style={{ objectFit: 'cover', height: '520px' }}
                      src="images/首頁/Home_image_3-1.png"
                      alt={''}
                    ></img>
                    <p
                      className="position-absolute py-2 px-3 big-word"
                      style={{
                        bottom: '120px',
                        left: '-10px',
                        backgroundColor: 'black',
                        color: 'white',
                        fontWeight: '900',
                        transform: 'rotate(-5deg)',
                      }}
                    >
                      STUDIO 7
                    </p>
                    <p
                      className="position-absolute py-1 small-word px-3 font-weight-bold"
                      style={{
                        bottom: '50px',
                        left: '-10px',
                        color: 'white',
                        backgroundColor: '#f37022',
                        transform: 'rotate(3deg)',
                      }}
                    >
                      生日快樂滿千送百
                    </p>
                  </div>
                  <Link
                    to="/product"
                    className="d-inline-block  py-2 px-5 my-4 text-decoration-none font-weight-bold font-italic"
                  >
                    SHOP NOW
                  </Link>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="d-flex position-relative flex-column align-items-center">
                  <div className="position-relative">
                    <img
                      className="img-fluid"
                      style={{ objectFit: 'cover', height: '520px' }}
                      src="images/首頁/Home_image_5-1.png"
                      alt={''}
                    ></img>
                    <p
                      className="position-absolute py-1 px-3 font-weight-bold big-word"
                      style={{
                        bottom: '120px',
                        left: '-30px',
                        color: '#f37022',
                        backgroundColor: 'white',
                      }}
                    >
                      Cool飛鳥鑽石會員
                    </p>
                    <p
                      className="position-absolute py-2 px-3 big-word"
                      style={{
                        bottom: '50px',
                        right: '-10px',
                        backgroundColor: '#353c1d',
                        color: 'white',
                        fontWeight: '900',
                        transform: 'rotate(5deg)',
                      }}
                    >
                      限定特別賣場
                    </p>
                  </div>
                  <Link
                    to="/product"
                    className="d-inline-block py-2 px-5 my-4  text-decoration-none font-weight-bold font-italic"
                  >
                    SHOP NOW
                  </Link>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="d-flex position-relative flex-column align-items-center">
                  <div className="position-relative">
                    <img
                      className="img-fluid"
                      style={{ objectFit: 'cover', height: '520px' }}
                      src="images/首頁/Home_image_4-1.png"
                      alt={''}
                    ></img>
                    <p
                      className="position-absolute py-2 small-word px-3 font-weight-bold"
                      style={{
                        bottom: '120px',
                        left: '-30px',
                        color: 'white',
                        backgroundColor: '#353c1d',
                        transform: 'rotate(5deg)',
                      }}
                    >
                      BILLIONAIRE BOYS CLUB
                    </p>
                    <p
                      className="position-absolute py-2 px-3 small-word"
                      style={{
                        bottom: '25px',
                        right: '-10px',
                        backgroundColor: '#f37022',
                        color: 'white',
                        fontWeight: '900',
                        transform: 'rotate(-5deg)',
                      }}
                    >
                      聖代派對<span className="big-word">買一送一</span>
                    </p>
                  </div>
                  <Link
                    to="/product"
                    className="d-inline-block py-2 px-5 my-4  text-decoration-none font-weight-bold font-italic"
                  >
                    SHOP NOW
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
        {/* shopping ok */}
        <div className="horizon-line-sm position-relative my-4 mx-auto"></div>
        <div className="horizon-line-lg position-relative my-5 mx-auto text-center font-weight-bold h2">
          嚴選品牌
        </div>
        <div className="container brand-choose">
          <div className="row brand-choose-content justify-content-between mb-5">
            <div className="col-6 col-md-2 d-flex justify-content-center align-items-center content-top">
              <Link to="/product">
                <img
                  src="images/素材/品牌_logo/C21B46C9-6335-4F0A-8159-EA815EB69DA4_1000x.png"
                  alt={''}
                ></img>
              </Link>
            </div>
            <div className="col-6 col-md-2 d-flex justify-content-center align-items-center content-top">
              <Link to="/product">
                <img
                  src="images/素材/品牌_logo/Palace-Logo2.png"
                  alt={''}
                ></img>
              </Link>
            </div>
            <div className="col-6 col-md-2 d-flex justify-content-center align-items-center">
              <Link to="/product">
                <img src="images/素材/品牌_logo/candy+dispo.png" alt={''}></img>
              </Link>
            </div>
            <div className="col-6 col-md-2 d-flex justify-content-center align-items-center">
              <Link to="/product">
                <img src="images/素材/品牌_logo/adidas_PNG7.png" alt={''}></img>
              </Link>
            </div>
            <div className="col-6 col-md-2 d-flex justify-content-center align-items-center">
              <Link to="/product">
                <img
                  src="images/素材/品牌_logo/3d-golf-logo_300x300 (1).png"
                  alt={''}
                ></img>
              </Link>
            </div>
            <div className="col-6 col-md-2 d-flex justify-content-center align-items-center">
              <Link to="/product">
                <img src="images/素材/品牌_logo/HUF.jpeg" alt={''}></img>
              </Link>
            </div>
          </div>
          <div className="more-brand d-flex justify-content-end">
            <Link
              to="/product"
              className="d-flex align-items-center h5 font-weight-bold text-right text-decoration-none"
            >
              更多嚴選品牌
              <img
                className="d-inline-block ml-3"
                src="images/素材/icon/Forward arrow_W.svg"
                alt={''}
              ></img>
            </Link>
          </div>
        </div>
        <div className="horizon-line-alt-top"></div>
        <div className="horizon-line-alt-bottom mb-5"></div>
        {/* brand ok */}
        <div className="container">
          <section className="latest-clothing mb-5">
            <h2 className="h2 font-weight-bold">最新穿搭</h2>
            <h3 className="d-inline-block h1 mb-5 font-weight-bolder font-italic position-relative">
              LATEST CLOTHING
              <img
                className="position-absolute"
                src="images/素材/物件素材/pngkey.com-starburst-background-png-413390.png"
                width="200px"
                alt={''}
                style={{ top: '-55px', right: '-40px', zIndex: '-1' }}
              ></img>
            </h3>
            <div className="row">
              <div className="col-12 col-md-6 mb-5 mb-md-0">
                <div className="row">
                  <div className="col-6 col-md-8 position-relative">
                    <img
                      className="img-fluid"
                      src="images/首頁/02_1024x1024.jpg"
                      alt={''}
                    ></img>
                    <img
                      className="position-absolute"
                      style={{ top: '-10px', left: '-15px', width: '115%' }}
                      src="images/首頁/框線.svg"
                      alt={''}
                    ></img>
                  </div>
                  <div className="col-6 col-md-4 px-0 d-flex justify-content-center align-items-center">
                    <div className="w-100 position-relative">
                      <img
                        className="position-absolute w-25"
                        style={{ top: '-120px' }}
                        src="images/素材/物件素材/pngkey.com-arrow-png-75406.png"
                        alt={''}
                      ></img>
                      <Link
                        to="/product"
                        className="h5 w-100 d-flex justify-content-center align-items-center font-weight-bold"
                        style={{ color: '#353c1d', whiteSpace: 'nowrap' }}
                      >
                        GOLF花襯衫
                        <img
                          className="ml-2"
                          src="images/素材/icon/shopping_cart_G.svg"
                          width="18px"
                          alt={''}
                        ></img>
                      </Link>
                      <Link
                        to="/product"
                        className="w-100 d-flex justify-content-center align-items-center font-weight-bold"
                        style={{ color: '#353c1d', whiteSpace: 'nowrap' }}
                      >
                        ADIDAS休閒褲
                        <img
                          className="ml-2"
                          src="images/素材/icon/shopping_cart_G.svg"
                          width="18px"
                          alt={''}
                        ></img>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 mb-5 mb-md-0">
                <div className="row">
                  <div className="col-6 col-md-4 px-0 d-flex justify-content-center align-items-center">
                    <div className="w-100 position-relative">
                      <img
                        className="position-absolute w-25"
                        style={{
                          bottom: '-120px',
                          right: '0px',
                          transform: 'rotate(-180deg)',
                        }}
                        src="images/素材/物件素材/pngkey.com-arrow-png-75406.png"
                        alt={''}
                      ></img>
                      <Link
                        to="/product"
                        className="w-100 d-flex justify-content-center align-items-center font-weight-bold"
                        style={{ color: '#353c1d', whiteSpace: 'nowrap' }}
                      >
                        花襯衫
                        <img
                          className="ml-2"
                          src="images/素材/icon/shopping_cart_G.svg"
                          width="18px"
                          alt={''}
                        ></img>
                      </Link>
                    </div>
                  </div>
                  <div className="col-6 col-md-8 position-relative">
                    <img
                      className="img-fluid"
                      src="images/首頁/OP16148_AM_Palace_7474_03_sRGB-479x600.jpg"
                      alt={''}
                    ></img>
                    <img
                      className="position-absolute"
                      style={{ top: '-40px', left: '15px', width: '100%' }}
                      src="images/首頁/框線.svg"
                      alt={''}
                    ></img>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-4 d-none d-md-flex justify-content-center align-items-center">
                <div>
                  <img
                    style={{ width: '130%', transform: 'translateX(-15%)' }}
                    src="images/素材/物件素材/pngkey.com-mulher-maravilha-png-5008293.png"
                    alt={''}
                  ></img>
                </div>
              </div>
              <div className="col-6 col-md-4 position-relative">
                <img
                  className="img-fluid"
                  src="images/首頁/GW_A20_LB-06_1024x1024.jpg"
                  alt={''}
                ></img>
                <img
                  className="position-absolute"
                  style={{
                    bottom: '-35px',
                    right: '20px',
                    width: '115%',
                    transform: 'rotate(180deg)',
                  }}
                  src="images/首頁/框線.svg"
                  alt={''}
                ></img>
              </div>
              <div className="col-4 d-none px-0 d-md-flex justify-content-center align-items-center">
                <div className="w-100 position-relative">
                  <img
                    className="position-absolute w-25"
                    style={{ top: '-120px' }}
                    src="images/素材/物件素材/pngkey.com-arrow-png-75406.png"
                    alt={''}
                  ></img>
                  <Link
                    to="/product"
                    className=" w-100 d-flex justify-content-center align-items-center font-weight-bold"
                    style={{ color: '#353c1d', whiteSpace: 'nowrap' }}
                  >
                    GOLF花襯衫
                    <img
                      className="ml-2"
                      src="images/素材/icon/shopping_cart_G.svg"
                      width="18px"
                      alt={''}
                    ></img>
                  </Link>
                  <Link
                    to="/product"
                    className="h5 w-100 d-flex justify-content-center align-items-center font-weight-bold"
                    style={{ color: '#353c1d', whiteSpace: 'nowrap' }}
                  >
                    ADIDAS休閒褲
                    <img
                      className="ml-2"
                      src="images/素材/icon/shopping_cart_G.svg"
                      width="18px"
                      alt={''}
                    ></img>
                  </Link>
                </div>
              </div>
              {/* 手機版內容 */}
              {/* <div className="col-6 d-md-none">
                                <div className="col-12 d-flex h-50 justify-content-center align-items-center">
                                    <div><img style={{ width: '100%', transform: 'translateX(-15%)' }}
                                        src="images/素材/物件素材/pngkey.com-mulher-maravilha-png-5008293.png" alt={""}></img></div>
                                </div>
                                <div className="col-12 px-0 h-50 d-flex justify-content-center align-items-center">
                                    <div className="w-100 position-relative">
                                        <img className="position-absolute w-25"
                                            style={{ bottom: '20px', left: '-20px', transform: 'rotate(0deg)' }}
                                            src="images/素材/物件素材/pngkey.com-arrow-png-75406.png" alt={""}></img>
                                        <a href="#!"
                                            className="text-decoration-none w-100 d-flex justify-content-center align-items-center font-weight-bold"
                                            style={{ color: '#353c1d', whiteSpace: 'nowrap' }}>GOLF花襯衫<img className="ml-2"
                                                src="images/素材/icon/shopping_cart_G.svg" width="18px" alt={""}></img></a>
                                        <a href="#!"
                                            className="text-decoration-none w-100 d-flex justify-content-center align-items-center font-weight-bold"
                                            style={{ color: '#353c1d', whiteSpace: 'nowrap' }}>ADIDAS休閒褲<img className="ml-2"
                                                src="images/素材/icon/shopping_cart_G.svg" width="18px" alt={""}></img></a>
                                    </div>
                                </div>
                            </div> */}
            </div>
            <div className="more-clothing d-flex justify-content-end">
              <Link
                to="/clothing"
                className="d-flex align-items-center h5 font-weight-bold text-right text-decoration-none"
              >
                更多穿搭
                <img
                  className="d-inline-block ml-3"
                  src="images/素材/icon/Forward arrow_W.svg"
                  alt={''}
                ></img>
              </Link>
            </div>
          </section>
          <section
            className="latest-article mt-5"
            style={{ marginBottom: '100px' }}
          >
            <h2 className="h2 font-weight-bold">最新文章</h2>
            <h3 className="d-inline-block h1 mb-5 font-weight-bolder font-italic position-relative">
              LATEST ARTICLES
            </h3>
            <div className="row">
              <div className="latest-article-content col-12 col-md-4 mb-5 mb-md-0">
                <div className="d-flex flex-column align-items-center">
                  <img
                    src="images/首頁/小日本正面.JPG"
                    alt={''}
                    className="img-fluid mb-5 mb-mb-4"
                  ></img>
                  <h5 className="font-weight-bold">潮流先驅</h5>
                  <p className="font-weight-bold" style={{ fontSize: '14px' }}>
                    簡約又特殊的剪裁，配上百搭的牛仔藍。簡約又特殊的剪裁，配上百搭的牛仔藍。簡約又特殊的剪裁，配上百搭的牛仔藍。
                  </p>
                  <Link
                    to="/news"
                    style={{
                      color: '#353c1d',
                      fontSize: '12px',
                    }}
                  >
                    {' '}
                    繼續閱讀 {'>'} {'>'}
                  </Link>
                </div>
              </div>
              <div className="latest-article-content middle-content col-12 col-md-4 mb-5 mb-md-0">
                <div className="d-flex flex-column align-items-center">
                  <img
                    src="images/首頁/黑妹蹲.JPG"
                    alt={''}
                    className="img-fluid mb-5 mb-mb-4"
                  ></img>
                  <h5 className="font-weight-bold">潮流先驅</h5>
                  <p className="font-weight-bold" style={{ fontSize: '14px' }}>
                    簡約又特殊的剪裁，配上百搭的牛仔藍。簡約又特殊的剪裁，配上百搭的牛仔藍。簡約又特殊的剪裁，配上百搭的牛仔藍。
                  </p>
                  <Link
                    to="/news"
                    className=""
                    style={{ color: '#353c1d', fontSize: '12px' }}
                  >
                    繼續閱讀 {'>'} {'>'}
                  </Link>
                </div>
              </div>
              <div className="latest-article-content col-12 col-md-4 mb-5 mb-md-0">
                <div className="d-flex flex-column align-items-center">
                  <img
                    src="images/首頁/17.jpg"
                    alt={''}
                    className="img-fluid mb-5 mb-mb-4"
                  ></img>
                  <h5 className="font-weight-bold">潮流先驅</h5>
                  <p className="font-weight-bold" style={{ fontSize: '14px' }}>
                    簡約又特殊的剪裁，配上百搭的牛仔藍。簡約又特殊的剪裁，配上百搭的牛仔藍。簡約又特殊的剪裁，配上百搭的牛仔藍。
                  </p>
                  <Link
                    to="/news"
                    className=""
                    style={{ color: '#353c1d', fontSize: '12px' }}
                  >
                    繼續閱讀 {'>'} {'>'}
                  </Link>
                </div>
              </div>
            </div>
            <div className="more-article d-flex justify-content-end">
              <Link
                to="/news"
                className="d-flex align-items-center h5 font-weight-bold text-right text-decoration-none"
              >
                更多文章
                <img
                  className="d-inline-block ml-3"
                  src="images/素材/icon/Forward arrow_W.svg"
                  alt=""
                ></img>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}

export default HomeContent
