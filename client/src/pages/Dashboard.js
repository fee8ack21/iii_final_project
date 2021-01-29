import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChartBar,
  faHome,
  faListAlt,
  faBarcode,
  faSuitcase,
  faEnvelope,
  faBell,
  faUserCircle,
  faCaretDown,
  faCog,
  faUser,
  faFileAlt,
  faPowerOff,
  faAngleDown,
} from '@fortawesome/free-solid-svg-icons'
import { Switch, Route, Link } from 'react-router-dom'
import OrderListDashboardContent from '../components/OrderListDahboardContent'

function Dashboard() {
  return (
    <>
      <div className="dashboard">
        <div className="wrap">
          <aside className="main-aside">
            <div className="logo-wrap">
              <a href="#!">
                <img src="./images/dashboard/logo_w.svg" alt={''} />
              </a>
            </div>
            <ul className="menu-ul google-font list-unstyled">
              <li className="menu-li">
                <a href="#!" className="menu-a">
                  <i>
                    <FontAwesomeIcon icon={faHome} />
                  </i>
                  總覽
                </a>
              </li>
              <li className="menu-li" id="menuLi">
                <a
                  href="#!"
                  className="menu-a"
                  data-num="1"
                  id="menuu"
                  onClick={() => {
                    document.getElementById('menuLi').classList.toggle('open')
                    document
                      .getElementById('faAngle1')
                      .classList.toggle('icon-rotate')
                  }}
                >
                  <i>
                    <FontAwesomeIcon icon={faListAlt} />
                  </i>
                  {/* <i className="far faListAlt"></i> */}
                  訂單列表
                  <FontAwesomeIcon
                    id="faAngle1"
                    icon={faAngleDown}
                    style={{ marginLeft: 'auto' }}
                  ></FontAwesomeIcon>
                </a>
                <ul
                  className="menu-inner-ul list-unstyled"
                  data-num="1"
                  id="menu-inner-ul1"
                >
                  <li>
                    <a href="#!">無未結案訂單</a>
                  </li>
                  <li>
                    <a href="#!">訂單報表匯出</a>
                  </li>
                </ul>
              </li>
              <li className="menu-li" id="menuLi2">
                <a
                  href="#!"
                  className="menu-a"
                  data-num="2"
                  onClick={() => {
                    document.getElementById('menuLi2').classList.toggle('open')
                    document
                      .getElementById('faAngle2')
                      .classList.toggle('icon-rotate')
                  }}
                >
                  <i>
                    <FontAwesomeIcon icon={faChartBar} />
                  </i>
                  營運分析
                  <FontAwesomeIcon
                    id="faAngle2"
                    icon={faAngleDown}
                    style={{ marginLeft: 'auto' }}
                  ></FontAwesomeIcon>
                </a>
                <ul
                  id="menu-inner-ul2"
                  className="menu-inner-ul list-unstyled"
                  data-num="2"
                >
                  <li>
                    <Link to="/dashboard/orderlist">基本報表</Link>
                  </li>
                  <li>
                    <a href="#!">商品圖表</a>
                  </li>
                  <li>
                    <a href="#!">營收分析</a>
                  </li>
                  <li>
                    <a href="#!">訂單分析</a>
                  </li>
                  <li>
                    <a href="#!">會員分析</a>
                  </li>
                  <li>
                    <a href="#!">商品分析</a>
                  </li>
                  <li>
                    <a href="#!">行銷活動分析</a>
                  </li>
                </ul>
              </li>
              <li className="menu-li" id="menuLi3">
                <a
                  href="#!"
                  className="menu-a"
                  data-num="3"
                  onClick={() => {
                    document.getElementById('menuLi3').classList.toggle('open')
                    document
                      .getElementById('faAngle3')
                      .classList.toggle('icon-rotate')
                  }}
                >
                  <i>
                    <FontAwesomeIcon icon={faUser} />
                  </i>
                  {/* <i className="fas fa-users"></i> */}
                  會員管理
                  <FontAwesomeIcon
                    id="faAngle3"
                    icon={faAngleDown}
                    style={{ marginLeft: 'auto' }}
                  ></FontAwesomeIcon>
                </a>
                <ul
                  id="menu-inner-ul3"
                  className="menu-inner-ul list-unstyled"
                  data-num="3"
                >
                  <li>
                    <a href="#!">顧客列表</a>
                  </li>
                  <li>
                    <a href="#!">回饋建議</a>
                  </li>
                  <li>
                    <a href="#!">鑽石會員</a>
                  </li>
                  <li>
                    <a href="#!">顧客匯入</a>
                  </li>
                </ul>
              </li>
              <li className="menu-li" id="menuLi4">
                <a
                  href="#!"
                  className="menu-a"
                  data-num="4"
                  onClick={() => {
                    document.getElementById('menuLi4').classList.toggle('open')
                    document
                      .getElementById('faAngle4')
                      .classList.toggle('icon-rotate')
                  }}
                >
                  {/* <i className="fas faBarcode"></i> */}
                  <i>
                    <FontAwesomeIcon icon={faBarcode} />
                  </i>
                  商品管理
                  <FontAwesomeIcon
                    id="faAngle4"
                    icon={faAngleDown}
                    style={{ marginLeft: 'auto' }}
                  ></FontAwesomeIcon>
                </a>
                <ul
                  className="menu-inner-ul list-unstyled"
                  data-num="4"
                  id="menu-inner-ul4"
                >
                  <li>
                    <a href="#!">新增商品</a>
                  </li>
                  <li>
                    <a href="#!">商品管理</a>
                  </li>
                  <li>
                    <a href="#!">庫存列表</a>
                  </li>
                  <li>
                    <a href="#!">試算表匯入</a>
                  </li>
                </ul>
              </li>
              <li className="menu-li" id="menuLi5">
                <a
                  href="#!"
                  className="menu-a"
                  data-num="4"
                  onClick={() => {
                    document.getElementById('menuLi5').classList.toggle('open')
                    document
                      .getElementById('faAngle5')
                      .classList.toggle('icon-rotate')
                  }}
                >
                  {/* <i className="fas faSuitcase"></i> */}
                  <i>
                    <FontAwesomeIcon icon={faSuitcase} />
                  </i>
                  商品群組
                  <FontAwesomeIcon
                    id="faAngle5"
                    icon={faAngleDown}
                    style={{ marginLeft: 'auto' }}
                  ></FontAwesomeIcon>
                </a>
                <ul
                  className="menu-inner-ul list-unstyled"
                  data-num="4"
                  id="menu-inner-ul5"
                >
                  <li>
                    <a href="#!">商品分類</a>
                  </li>
                  <li>
                    <a href="#!">條件分類</a>
                  </li>
                  <li>
                    <a href="#!">任選折扣群組</a>
                  </li>
                  <li>
                    <a href="#!">訂單加價購設定</a>
                  </li>
                  <li>
                    <a href="#!">滿額贈品</a>
                  </li>
                  <li>
                    <a href="#!">後臺群組排序</a>
                  </li>
                </ul>
              </li>
              <li className="menu-li" id="menuLi6">
                <a
                  href="#!"
                  className="menu-a"
                  data-num="4"
                  onClick={() => {
                    document.getElementById('menuLi6').classList.toggle('open')
                    document
                      .getElementById('faAngle6')
                      .classList.toggle('icon-rotate')
                  }}
                >
                  {/* <i className="fas faEnvelope"></i> */}
                  <i>
                    <FontAwesomeIcon icon={faEnvelope} />
                  </i>
                  客服問答
                  <FontAwesomeIcon
                    id="faAngle6"
                    icon={faAngleDown}
                    style={{ marginLeft: 'auto' }}
                  ></FontAwesomeIcon>
                </a>
                <ul
                  className="menu-inner-ul list-unstyled"
                  data-num="4"
                  id="menu-inner-ul6"
                >
                  <li>
                    <a href="#!">問題分類</a>
                  </li>
                  <li>
                    <a href="#!">問題管理</a>
                  </li>
                  <li>
                    <a href="#!">依訂單分類</a>
                  </li>
                  <li>
                    <a href="#!">依會員分類</a>
                  </li>
                </ul>
              </li>
            </ul>
          </aside>
          <main className="main-main">
            <nav className="main-nav">
              <ul className="main-nav-ul mb-0 list-unstyled">
                <li
                  className="main-nav-ul-li"
                  style={{ marginLeft: 'auto', marginRight: '40px' }}
                >
                  <a className="nav-a" href="#!">
                    {/* <i className="fas faBell"></i> */}
                    <i>
                      <FontAwesomeIcon icon={faBell} />
                    </i>

                    <span className="bell-badge google-font">1</span>
                  </a>
                </li>
                <li className="main-nav-ul-li" style={{ marginRight: '40px' }}>
                  <a className="nav-a" href="#!">
                    {/* <i className="fas fa-home"></i> */}
                    <i>
                      <FontAwesomeIcon icon={faHome} />
                    </i>
                  </a>
                </li>
                <li className="main-nav-ul-li" style={{ marginRight: '40px' }}>
                  <a href="#!" className="nav-a" style={{ cursor: 'default' }}>
                    <i className="far faUserCircle"></i>
                    {/* <i className="fas fa-home"></i> */}
                    <i>
                      <FontAwesomeIcon icon={faUserCircle} />
                    </i>

                    <span
                      className="google-font"
                      style={{
                        color: 'white',
                        paddingLeft: '10px',
                        position: 'relative',
                        top: '-3px',
                      }}
                    >
                      Hello User
                    </span>
                  </a>
                </li>
                <li
                  className="setting-li main-nav-ul-li"
                  style={{ marginRight: '40px' }}
                  id="nav-ul1"
                >
                  <a
                    href="#!"
                    className="nav-a setting-li-a"
                    onClick={() => {
                      document
                        .getElementById('nav-ul1')
                        .classList.toggle('setting-open')
                    }}
                  >
                    {/* <i className="fas faCog"></i> */}
                    <i>
                      <FontAwesomeIcon icon={faCog} />
                    </i>

                    {/* <i className="fas faCaretDown"></i> */}
                    <i>
                      <FontAwesomeIcon icon={faCaretDown} />
                    </i>
                  </a>
                  <ul className="setting-inner-ul google-font list-unstyled">
                    <li>
                      <a href="#!">
                        {/* <i className="far faUser"></i> */}
                        <i>
                          <FontAwesomeIcon icon={faUser} />
                        </i>

                        <span className="setting-word">帳號</span>
                      </a>
                    </li>
                    <li>
                      <a href="#!">
                        {/* <i className="fas faFileAlt"></i> */}
                        <i>
                          <FontAwesomeIcon icon={faFileAlt} />
                        </i>

                        <span className="setting-word">文件</span>
                      </a>
                    </li>
                    <li>
                      <a href="#!">
                        {/* <i className="fas faPowerOff"></i> */}
                        <i>
                          <FontAwesomeIcon icon={faPowerOff} />
                        </i>

                        <span className="setting-word">登出</span>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
            <div className="main-content">
              <nav className="breadcrumb-nav">
                <ol className="breadcrumb google-font">
                  <li className="">
                    <a href="#!" className="breadcrumb-actived">
                      營運分析
                    </a>
                  </li>
                  <span className="breadcrumb-split ">></span>
                  <li>
                    <a href="#!" className="breadcrumb-disabled">
                      基本報表
                    </a>
                  </li>
                </ol>
              </nav>
              {/* <!-- 內容打在下面 --> */}
              <Switch>
                <Route path="/dashboard/orderlist">
                  <OrderListDashboardContent />
                </Route>
              </Switch>
              {/* <!-- 內容打在上面 --> */}
            </div>
            <footer className="main-footer google-font">
              {/* <a className="go-top google-font">Top</a> */}
              <p>Copyright © 2020 Cool. All rights reserved.</p>
            </footer>
          </main>
        </div>
      </div>
    </>
  )
}

export default Dashboard
