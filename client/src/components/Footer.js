import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
      <footer className="main-footer">
        <div className="footer-container container">
          <div className="footer-content row justify-content-center">
            <div className="footer-slogan  col-12 order-2 order-md-1 col-md-6 d-flex mt-5 mt-md-0 justify-content-center justify-content-md-start">
              <div className="d-flex d-md-block justify-content-between align-items-center">
                <div className="mx-2 mx-sm-4 mx-md-0">
                  <img
                    src="/images/cool_logo/LOGO_W.png"
                    width="85px"
                    alt={''}
                  />
                </div>
                <div className="mx-2 mx-sm-4 mx-md-0 mt-md-5">
                  <h2>Explorer</h2>
                  <h2>understands</h2>
                  <h2>and respects</h2>
                </div>
              </div>
            </div>
            <div className="footer-contact d-flex justify-content-center justify-content-md-end order-1 order-md-2 col-12 col-md-6">
              <div className="">
                <ul className="d-flex mb-4 list-unstyled justify-content-between">
                  <li className="mx-3">
                    <Link to="/">首頁</Link>
                  </li>
                  <li className="mx-3">
                    <Link to="/about">關於</Link>
                  </li>
                  <li className="mx-3">
                    <Link to="/product">商品</Link>
                  </li>
                  <li className="mx-3">
                    <Link to="/news">新聞</Link>
                  </li>
                  <li className="mx-3">
                    <Link to="/clothing">穿搭集</Link>
                  </li>
                </ul>
                <ul className="list-unstyled mb-4 d-flex d-md-block">
                  <li className="mx-3 mb-lg-4">
                    <p style={{ fontSize: '14px' }}>酷飛鳥</p>
                    <p style={{ fontSize: '14px' }}>桃園市平鎮區中央路</p>
                  </li>
                  <li className="mx-3 mb-lg-4">
                    <p style={{ fontSize: '14px' }}>電話</p>
                    <p style={{ fontSize: '14px' }}>02-0000-0000</p>
                  </li>
                  <li className="mx-3 mb-lg-4">
                    <p style={{ fontSize: '14px' }}>Email</p>
                    <p style={{ fontSize: '14px' }}>test@gmail.com</p>
                  </li>
                </ul>
                <ul className="footer-icon d-flex list-unstyled justify-content-between">
                  <li className="mx-3">
                    <a href="#!">
                      <img src="/images/素材/icon/Instagram_W.svg" alt={''} />
                    </a>
                  </li>
                  <li className="mx-3">
                    <a href="#!">
                      <img src="/images/素材/icon/facebook_W.svg" alt={''} />
                    </a>
                  </li>
                  <li className="mx-3">
                    <a href="#!">
                      <img src="/images/素材/icon/twitter_W.svg" alt={''} />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-copyright pb-3">
            <p className="text-center font-weight-bold">
              ©2020 COOL - Architecture & Design. All right reserved.{' '}
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
