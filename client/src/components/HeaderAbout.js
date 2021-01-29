import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

/* global gapi */
function HeaderAbout(props) {
  const [shoppingCartStorage, setShoppingCartStorage] = useState(
    props.detailToHeaderCart
  )
  const cartMap = () => {
    let cartTotalValue = Number(0)
    return shoppingCartStorage ? (
      <>
        <div className="cart-icon-wrap position-absolute pt-3">
          <div
            className="cart-icon-ul-wrap position-relative rounded"
            style={{ padding: '8px 15px' }}
          >
            <ul className="cart-icon-ul list-unstyled">
              {JSON.parse(localStorage.getItem('cartList')).map((v, i) => {
                cartTotalValue += Number(v.price) * Number(v.amount)
                return (
                  <>
                    <li
                      style={{ borderBottom: '1px solid gray' }}
                      className="my-2"
                    >
                      <div className="row m-0 pb-2">
                        <div className="col-3 pl-0 content-img">
                          <div>
                            <a className="d-block" href="#!">
                              <img
                                className="img-fluid"
                                src={v.image}
                                alt={''}
                              ></img>
                            </a>
                          </div>
                        </div>
                        <div className="col-7 pr-0 content-word">
                          <div>
                            <p className="m-0 text-left font-weight-bold">
                              {v.name}
                            </p>
                            <p className="m-0 text-left font-weight-bold">
                              數量
                              <span
                                className="mx-2"
                                style={{
                                  width: '20px',
                                  display: 'inline-block',
                                  textAlign: 'center',
                                  borderBottom: '1px solid black',
                                }}
                              >
                                {v.amount}
                              </span>
                            </p>
                            <p className="m-0 text-left font-weight-bold">
                              NT$ {Number(v.price) * Number(v.amount)}
                            </p>
                          </div>
                        </div>
                        <div className="col-2 d-flex align-items-center">
                          <a
                            href="#!"
                            style={{ color: 'red' }}
                            className="text-decoration-none font-weight-bold"
                            onClick={(e) => {
                              e.preventDefault()
                              let removeData = JSON.parse(
                                localStorage.getItem('cartList')
                              )
                              let removeList = []
                                .concat(removeData.slice(0, i))
                                .concat(removeData.slice(i + 1))
                              console.log(removeList)
                              localStorage.setItem(
                                'cartList',
                                JSON.stringify(removeList)
                              )
                              props.setDetailToHeaderCart(
                                props.detailToHeaderCart - 1
                              )
                            }}
                          >
                            x
                          </a>
                        </div>
                      </div>
                    </li>
                  </>
                )
              })}
            </ul>
            <div className="total-price-wrap">
              <p className="d-flex justify-content-between font-weight-bold">
                <span>結帳金額：</span>
                <span>NT${Number(cartTotalValue)}</span>
              </p>
            </div>
            <div className="checkout-btn-wrap d-flex flex-column">
              <Link
                to="/shoppingcart"
                className="see-cart-btn my-1 py-1 d-block font-weight-bold rounded text-decoration-none"
              >
                查看購物車
              </Link>
              <Link
                to="/shoppingcart"
                className="go-check-btn my-1 py-1 d-block font-weight-bold rounded text-decoration-none"
              >
                前往結帳
              </Link>
            </div>
          </div>
        </div>
      </>
    ) : (
      ''
    )
  }
  useEffect(() => {
    setShoppingCartStorage(props.detailToHeaderCart)
  }, [props.detailToHeaderCart])
  //
  //
  //
  //
  const history = useHistory()
  const [id, setId] = useState(
    !!localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))[0].id
      : null
  )
  const [name, setName] = useState(
    !!localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))[0].name
      : ''
  )
  const [total, setTotal] = useState(
    !!localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))[0].total
      : 0
  )
  const [show, setShow] = useState(props.showParent)
  const [modal, setModal] = useState(1)

  useEffect(() => {
    setShow(props.showParent)
  }, [props.showParent])

  const [user, setUser] = useState({ account: '', password: '', email: '' })
  const [loginStatus, setLoginStatus] = useState(0)
  const [certificateEmail, setCertificateEmail] = useState('')
  const [signupData, setSignupData] = useState({
    account: '',
    password: '',
    email: '',
    letter: 'N',
    type: 'N',
  })
  const [loginMessage, setLoginMessage] = useState('')
  const [certificateMessage, setCertificateMessage] = useState('')
  const [signupMessage, setSignpMessage] = useState('')

  useEffect(() => {
    const apiLogin = (login) => {
      var btnSignIn = document.getElementById(login)
      if (btnSignIn) {
        btnSignIn.addEventListener('click', function () {
          GoogleLogin()
        })
      }
    }
    const apiLogout = (logout) => {
      var btnDisconnect = document.getElementById(logout)
      if (btnDisconnect) {
        btnDisconnect.addEventListener('click', function () {
          Google_disconnect()
        })
      }
    }
    if (!!name) setLoginStatus(1)
    if (loginStatus === 1) apiLogout('logout')
    if (show || modal !== 0) apiLogin('gmail')
  }, [name, show, loginStatus, modal])

  const cleanData = () => {
    setName('')
    setUser({ account: '', password: '' })
    setCertificateEmail('')
    setSignupData({
      account: '',
      password: '',
      email: '',
      letter: 'N',
      type: 'N',
    })
    setLoginMessage('')
    setCertificateMessage('')
    setSignpMessage()
  }

  const close = (id) => {
    document.addEventListener('click', function (e) {
      if (e.target.id === id) {
        // setShow(false)
        props.setShowParent(false)
        setModal(1)
        cleanData()
      }
    })
  }

  const Login = (user) => {
    const data = {
      account: user.user.account,
      password: user.user.password,
    }
    const loginMethod = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }
    fetch('http://localhost:3001/profile/login', loginMethod)
      .then((res) => res.json())
      .then((res) => {
        if (res.length > 0) {
          setLoginStatus(1)
          setShow(false)
          setName(res[0].name)
          setId(res[0].id)
          setTotal(res[0].total)
          localStorage.setItem('user', JSON.stringify(res))
        } else {
          setLoginMessage(res.message)
        }
      })
      .catch((err) => console.log('錯誤:', err))
  }

  const SignUp = (signupData) => {
    const data = {
      account: signupData.signupData.account,
      password: signupData.signupData.password,
      email: signupData.signupData.email,
      letter: signupData.signupData.letter,
      type: signupData.signupData.type,
    }
    const signupMethod = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }
    fetch('http://localhost:3001/profile/signup', signupMethod)
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          setSignpMessage(res.message)
        } else {
          setModal(4)
        }
      })
      .catch((err) => console.log('錯誤:', err))
  }

  const certificate = (email) => {
    const data = {
      email: email,
    }
    const certificateMethod = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }
    fetch('http://localhost:3001/profile/certificate', certificateMethod)
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        if (res.length > 0) {
          setModal(4)
        } else {
          setCertificateMessage(res.message)
        }
      })
      .catch((err) => console.log('錯誤:', err))
  }

  const login = () => {
    close('log-in-modal')
    return (
      <>
        <div
          id="log-in-modal"
          className="log-in-modal position-fixed d-flex justify-content-center align-items-center"
        >
          <div className="log-in-content">
            <div className="content-top mb-1 d-flex justify-content-center align-items-center">
              <img
                src="images/cool_logo/LOGO-G.png"
                width="150px"
                alt={''}
              ></img>
            </div>
            <div className="content-bottom py-4">
              <form action="" className="w-75 mx-auto">
                <div className="position-relative mb-4">
                  <label
                    className="font-weight-bold mb-0"
                    htmlFor="log-in-account"
                  >
                    帳號
                  </label>
                  <input
                    id="log-in-account"
                    className="d-block py-1 font-weight-bold"
                    type="text"
                    placeholder="請輸入帳號"
                    style={{ width: '100%', paddingLeft: '38px' }}
                    value={user.account}
                    onChange={(e) => {
                      setUser({ ...user, account: e.target.value })
                    }}
                  ></input>
                  <img
                    className="position-absolute"
                    src="images/素材/icon/Profile_G.svg"
                    style={{
                      width: '20px',
                      bottom: '8px',
                      left: '10px',
                    }}
                    alt={''}
                  ></img>
                </div>
                <div className="position-relative mb-2">
                  <label
                    className="font-weight-bold mb-0"
                    htmlFor="log-in-password"
                  >
                    密碼
                  </label>
                  <input
                    id="log-in-password"
                    className="d-block py-1 font-weight-bold"
                    type="password"
                    placeholder="請輸入密碼"
                    style={{ width: '100%', paddingLeft: '38px' }}
                    value={user.password}
                    onChange={(e) => {
                      setUser({ ...user, password: e.target.value })
                    }}
                  ></input>
                  <img
                    className="position-absolute"
                    src="images/素材/icon/Attachment_G.svg"
                    style={{
                      width: '20px',
                      bottom: '8px',
                      left: '10px',
                    }}
                    alt={''}
                  ></img>
                </div>
                <div className="forget-password-wrap mb-2">
                  <a
                    href="#!"
                    className="font-weight-bold"
                    style={{ fontSize: '14px' }}
                    onClick={(e) => {
                      e.preventDefault()
                      setModal(3)
                      cleanData()
                    }}
                  >
                    忘記密碼
                  </a>
                </div>
                <div className="create-account-wrap mb-2">
                  <a
                    href="#!"
                    className="font-weight-bold"
                    style={{ fontSize: '14px' }}
                    onClick={() => {
                      setModal(2)
                      cleanData()
                    }}
                  >
                    立即註冊新帳號
                  </a>
                </div>
                <div className="log-in-cancel-btn-wrap d-flex justify-content-between mb-4 flex-wrap">
                  <a
                    href="#!"
                    className="font-weight-bold rounded text-center d-inline-block py-2 text-decoration-none"
                    style={{
                      width: '45%',
                      border: '1px solid #353c1d',
                      color: '#353c1d',
                    }}
                    onClick={(e) => {
                      e.preventDefault()
                      props.setShowParent(false)
                      cleanData()
                    }}
                  >
                    取消
                  </a>
                  <a
                    href="#!"
                    className="font-weight-bold rounded text-center d-inline-block py-2 text-decoration-none is-invalid"
                    style={{
                      width: '45%',
                      border: '1px solid #353c1d',
                      color: 'white',
                      backgroundColor: '#353c1d',
                    }}
                    onClick={(e) => {
                      e.preventDefault()
                      Login({ user })
                    }}
                  >
                    登入
                  </a>
                  <div className="invalid-feedback text-center mt-3">
                    {loginMessage}
                  </div>
                </div>
                <hr
                  className="mt-0 mb-4"
                  style={{ backgroundColor: 'lightgray' }}
                />
                <div className="social-account-wrap">
                  <p
                    className="font-weight-bold text-center mb-2"
                    style={{ fontSize: '12px' }}
                  >
                    使用社群帳號快速註冊
                  </p>
                  <div className="d-flex justify-content-center align-items-center">
                    <a
                      id="gmail"
                      href="#!"
                      className="mx-2 rounded d-flex justify-content-center align-items-center"
                      style={{
                        width: '25px',
                        height: '25px',
                        border: '1px solid #353c1d',
                      }}
                      onClick={(e) => {
                        e.preventDefault()
                      }}
                    >
                      <img
                        src="images/素材/icon/1004px-Google__G__Logo.svg.png"
                        alt={''}
                        style={{ width: '15px' }}
                      ></img>
                    </a>
                    <a
                      href="#!"
                      className="mx-2 rounded d-flex justify-content-center align-items-center"
                      style={{
                        width: '25px',
                        height: '25px',
                        border: '1px solid #353c1d',
                      }}
                    >
                      <img
                        src="images/素材/icon/Facebook_G.svg"
                        alt={''}
                        style={{ width: '15px' }}
                      ></img>
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    )
  }
  const signUp = () => {
    close('sign-up-modal')
    return (
      <>
        <div
          id="sign-up-modal"
          className="sign-up-modal position-fixed d-flex justify-content-center align-items-center"
        >
          <div className="sign-up-content">
            <div className="content-top mb-1 d-flex justify-content-center align-items-center">
              <img
                src="images/cool_logo/LOGO-G.png"
                width="150px"
                alt={''}
              ></img>
            </div>
            <div className="content-bottom py-4">
              <form action="" className="w-75 mx-auto">
                <div className="position-relative mb-4">
                  <label
                    className="font-weight-bold mb-0"
                    htmlFor="sign-up-account"
                  >
                    帳號
                  </label>
                  <input
                    id="sign-up-account"
                    className="d-block py-1 font-weight-bold"
                    type="text"
                    placeholder="請輸入帳號"
                    style={{ width: '100%', paddingLeft: '38px' }}
                    value={signupData.account}
                    onChange={(e) => {
                      setSignupData({ ...signupData, account: e.target.value })
                    }}
                  ></input>
                  <img
                    className="position-absolute"
                    src="images/素材/icon/Profile_G.svg"
                    style={{
                      width: '20px',
                      bottom: '8px',
                      left: '10px',
                    }}
                    alt={''}
                  ></img>
                </div>
                <div className="position-relative mb-4">
                  <label
                    className="font-weight-bold mb-0"
                    htmlFor="sign-up-password"
                  >
                    密碼
                  </label>
                  <input
                    id="sign-up-password"
                    className="d-block py-1 font-weight-bold"
                    type="password"
                    placeholder="請輸入密碼"
                    style={{ width: '100%', paddingLeft: '38px' }}
                    value={signupData.password}
                    onChange={(e) => {
                      setSignupData({ ...signupData, password: e.target.value })
                    }}
                  ></input>
                  <img
                    className="position-absolute"
                    src="images/素材/icon/Attachment_G.svg"
                    style={{
                      width: '20px',
                      bottom: '8px',
                      left: '10px',
                    }}
                    alt={''}
                  ></img>
                </div>
                <div className="position-relative mb-2">
                  <label
                    className="font-weight-bold mb-0"
                    htmlFor="sign-up-email"
                  >
                    信箱
                  </label>
                  <input
                    id="sign-up-email"
                    className="d-block py-1 font-weight-bold"
                    type="text"
                    placeholder="請輸入信箱"
                    style={{ width: '100%', paddingLeft: '38px' }}
                    value={signupData.email}
                    onChange={(e) => {
                      setSignupData({ ...signupData, email: e.target.value })
                    }}
                  ></input>
                  <img
                    className="position-absolute"
                    src="images/素材/icon/Messages_G.svg"
                    style={{
                      width: '20px',
                      bottom: '8px',
                      left: '10px',
                    }}
                    alt={''}
                  ></img>
                </div>
                <div className="subscribe-wrap mb-2 d-flex align-items-center">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      setSignupData({
                        ...signupData,
                        letter: e.target.checked ? 'Y' : 'N',
                      })
                    }}
                  ></input>{' '}
                  <span
                    className="font-weight-bold ml-1"
                    style={{ fontSize: '14px' }}
                  >
                    我要訂閱電子報
                  </span>
                </div>
                <div className="already-have-account-wrap mb-2">
                  <a
                    href="#!"
                    className="font-weight-bold"
                    style={{ fontSize: '14px' }}
                    onClick={() => setModal(1)}
                  >
                    已經有帳號了嗎？
                  </a>
                </div>
                <div className="sign-up-cancel-btn-wrap d-flex justify-content-between mb-4 flex-wrap">
                  <a
                    href="#!"
                    className="font-weight-bold rounded text-center d-inline-block py-2 text-decoration-none"
                    style={{
                      width: '45%',
                      border: '1px solid #353c1d',
                      color: '#353c1d',
                    }}
                    onClick={(e) => {
                      e.preventDefault()
                      props.setShowParent(false)
                    }}
                  >
                    取消
                  </a>
                  <a
                    href="#!"
                    className="font-weight-bold rounded text-center d-inline-block py-2 text-decoration-none is-invalid"
                    style={{
                      width: '45%',
                      border: '1px solid #353c1d',
                      color: 'white',
                      backgroundColor: '#353c1d',
                    }}
                    onClick={(e) => {
                      e.preventDefault()
                      SignUp({ signupData })
                    }}
                  >
                    註冊
                  </a>
                  <div className="invalid-feedback text-center mt-3">
                    {signupMessage}
                  </div>
                </div>
                <hr
                  className="mt-0 mb-4"
                  style={{ backgroundColor: 'lightgray' }}
                />
                <div className="social-account-wrap">
                  <p
                    className="font-weight-bold text-center mb-2"
                    style={{ fontSize: '12px' }}
                  >
                    使用社群帳號快速註冊
                  </p>
                  <div className="d-flex justify-content-center align-items-center">
                    <a
                      id="gmail"
                      href="#!"
                      className="mx-2 rounded d-flex justify-content-center align-items-center"
                      style={{
                        width: '25px',
                        height: '25px',
                        border: '1px solid #353c1d',
                      }}
                      onClick={(e) => e.preventDefault()}
                    >
                      <img
                        src="images/素材/icon/1004px-Google__G__Logo.svg.png"
                        alt={''}
                        style={{ width: '15px' }}
                      ></img>
                    </a>
                    <a
                      href="#!"
                      className="mx-2 rounded d-flex justify-content-center align-items-center"
                      style={{
                        width: '25px',
                        height: '25px',
                        border: '1px solid #353c1d',
                      }}
                    >
                      <img
                        src="images/素材/icon/Facebook_G.svg"
                        style={{ width: '15px' }}
                        alt={''}
                      ></img>
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    )
  }
  const getPassword = () => {
    close('certificate-modal')
    return (
      <>
        {/* 忘記密碼 */}
        <div
          id="certificate-modal"
          className="certificate-modal position-fixed d-flex justify-content-center align-items-center"
        >
          <div className="certificate-content">
            <div className="content-top mb-1 d-flex justify-content-center align-items-center">
              <img
                src="images/cool_logo/LOGO-G.png"
                width="150px"
                alt={''}
              ></img>
            </div>
            <div className="content-bottom py-4">
              <form action="" className="w-75 mx-auto">
                <div className="position-relative mb-4">
                  <label
                    className="font-weight-bold mb-0"
                    htmlFor="certificate-email"
                  >
                    信箱
                  </label>
                  <input
                    id="certificate-email"
                    className="d-block py-1 font-weight-bold"
                    type="text"
                    placeholder="請輸入信箱"
                    style={{ width: '100%', paddingLeft: '38px' }}
                    value={certificateEmail}
                    onChange={(e) => {
                      setCertificateEmail(e.target.value)
                    }}
                  ></input>
                  <img
                    className="position-absolute"
                    src="images/素材/icon/Messages_G.svg"
                    style={{
                      width: '20px',
                      bottom: '8px',
                      left: '10px',
                    }}
                    alt={''}
                  ></img>
                </div>
                <div className="certificate-cancel-btn-wrap d-flex justify-content-between mb-4 flex-wrap">
                  <a
                    href="#!"
                    className="font-weight-bold rounded text-center d-inline-block py-2 text-decoration-none"
                    style={{
                      width: '45%',
                      border: '1px solid #353c1d',
                      color: '#353c1d',
                    }}
                    onClick={() => setModal(1)}
                  >
                    返回
                  </a>
                  <a
                    href="#!"
                    className="font-weight-bold rounded text-center d-inline-block py-2 text-decoration-none is-invalid"
                    style={{
                      width: '45%',
                      border: '1px solid #353c1d',
                      color: 'white',
                      backgroundColor: '#353c1d',
                    }}
                    onClick={() => {
                      certificate(certificateEmail)
                    }}
                  >
                    送出
                  </a>
                  <div className="invalid-feedback text-center mt-3">
                    {certificateMessage}
                  </div>
                </div>
                <hr
                  className="mt-0 mb-4"
                  style={{ backgroundColor: 'lightgray' }}
                />

                <div className="social-account-wrap">
                  <p
                    className="font-weight-bold text-center mb-2"
                    style={{ fontSize: '12px' }}
                  >
                    使用社群帳號快速註冊
                  </p>
                  <div className="d-flex justify-content-center align-items-center">
                    <a
                      id="gmail"
                      href="#!"
                      className="mx-2 rounded d-flex justify-content-center align-items-center"
                      style={{
                        width: '25px',
                        height: '25px',
                        border: '1px solid #353c1d',
                      }}
                      onClick={(e) => e.preventDefault()}
                    >
                      <img
                        src="images/素材/icon/1004px-Google__G__Logo.svg.png"
                        alt={''}
                        style={{ width: '15px' }}
                      ></img>
                    </a>
                    <a
                      href="#!"
                      className="mx-2 rounded d-flex justify-content-center align-items-center"
                      style={{
                        width: '25px',
                        height: '25px',
                        border: '1px solid #353c1d',
                      }}
                    >
                      <img
                        src="images/素材/icon/Facebook_G.svg"
                        alt={''}
                        style={{ width: '15px' }}
                      ></img>
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    )
  }

  const success = () => {
    close('certificate-send-modal')
    return (
      <>
        <div
          id="certificate-send-modal"
          className="certificate-send-modal position-fixed d-flex justify-content-center align-items-center"
        >
          <div className="certificate-send-content">
            <div className="content-top mb-1 d-flex justify-content-center align-items-center">
              <img
                src="images/cool_logo/LOGO-G.png"
                width="150px"
                alt={''}
              ></img>
            </div>
            <div className="content-bottom py-4">
              <div className="mx-auto d-flex justify-content-center align-items-center flex-column">
                <img
                  className="mb-4"
                  style={{ width: '25%' }}
                  src="images/素材/icon/check_big.svg"
                  alt={''}
                ></img>
                <p
                  className="text-center font-weight-bold"
                  style={{ color: 'green', fontSize: '40px' }}
                >
                  送出成功！
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  const profileNavbar = () => {
    return (
      <>
        <div className="profile-icon-wrap position-absolute pt-3">
          <div
            className="profile-icon-ul-wrap position-relative rounded"
            style={{ padding: '8px 15px' }}
          >
            <ul className="profile-icon-ul  list-unstyled w-100">
              <li className="d-flex justify-content-start">
                <Link
                  to={{
                    pathname: '/setting',
                    state: { id: id },
                  }}
                  className="font-weight-bold d-flex justify-content-center align-items-center py-1"
                >
                  {name}
                  <img
                    src={
                      total > 10000
                        ? '/images/素材/會員等級icon/winner.svg'
                        : '/images/素材/會員等級icon/award.svg'
                    }
                    alt={''}
                    className="ml-2"
                  ></img>
                </Link>
              </li>
              <li className="d-flex justify-content-start">
                <Link
                  to={{
                    pathname: '/mail',
                    state: { id: id },
                  }}
                  className="font-weight-bold d-inline-block py-1"
                >
                  我的信箱
                </Link>
              </li>
              <li className="d-flex align-items-start flex-column">
                <Link
                  to={{
                    pathname: '/member',
                    state: { id: id },
                  }}
                  className="font-weight-bold d-inline-block py-1"
                >
                  會員專區
                </Link>
                <ul className="list-unstyled text-left">
                  <li>
                    <div
                      className="py-1 pr-3 pl-1"
                      style={{ color: 'gray', fontSize: '12px' }}
                    >
                      {total > 10000 ? '黃金會員' : '一般會員'}
                    </div>
                  </li>
                  <li>
                    <div
                      className="py-1 pr-3 pl-1"
                      style={{ color: 'gray', fontSize: '12px' }}
                    >
                      累積消費金額
                      <br />
                      <span>{total}</span>
                    </div>
                  </li>
                </ul>
              </li>
              <li className="d-flex justify-content-start">
                <Link
                  to={{
                    pathname: '/coupon',
                    state: { id: id },
                  }}
                  className=" font-weight-bold d-inline-block py-1"
                >
                  優惠券
                </Link>
              </li>
              <li className="d-flex justify-content-start">
                <Link
                  to={{
                    pathname: '/order',
                    state: { id: id },
                  }}
                  className="font-weight-bold d-inline-block py-1"
                >
                  購買紀錄
                </Link>
              </li>
              <li
                className="d-flex justify-content-start"
                style={{ borderBottom: '1px solid black' }}
              >
                <Link
                  to={{
                    pathname: '/setting',
                    state: { id: id },
                  }}
                  className="font-weight-bold d-inline-block py-1"
                >
                  帳號設定
                </Link>
              </li>
              <li className="d-flex justify-content-start">
                <a
                  id="logout"
                  href="#!"
                  className="font-weight-bold d-inline-block py-1"
                  onClick={(e) => {
                    e.preventDefault()
                    cleanData()
                    setLoginStatus(0)
                    localStorage.removeItem('user')
                    localStorage.removeItem('favorites')
                    history.push('/')
                  }}
                >
                  登出
                </a>
              </li>
            </ul>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <header className="about-header position-relative">
        <div className="photo-mask">
          <div className="photo-mask-mask"></div>
        </div>
        <div className="container position-relative" style={{ height: '100%' }}>
          <nav className="main-navbar navbar navbar-expand-lg px-0 pt-5">
            <div className="container-fluid p-0 justify-content-start align-items-end">
              <a className="navbar-brand d-inline-block mr-4" href="/">
                <img src={'images/cool_logo/LOGO_W.png'} alt={''}></img>
              </a>
              <ul className="navbar-menu navbar-nav d-flex">
                <li className="nav-item mx-4">
                  <Link
                    to="/product"
                    id="product-navbar-link"
                    className="product-navbar-link nav-link active"
                    aria-current="page"
                    onMouseEnter={() => {
                      document.getElementById('product-hover-menu-wrap').style[
                        'display'
                      ] = 'block'
                    }}
                    onMouseLeave={(e) => {
                      console.log(e.target.id)
                      if (e.target.id !== 'product-hover-menu') {
                        document.getElementById(
                          'product-hover-menu-wrap'
                        ).style['display'] = 'none'
                      }
                    }}
                  >
                    商品
                  </Link>
                </li>
                <li className="nav-item mx-4">
                  <Link to="/about" className="nav-link">
                    關於
                  </Link>
                </li>
                <li className="nav-item mx-4">
                  <Link to="/news" className="nav-link">
                    新聞
                  </Link>
                </li>
                <li className="nav-item mx-4">
                  <Link to="/clothing" className="nav-link">
                    穿搭集
                  </Link>
                </li>
              </ul>

              <ul className="navbar-icon navbar-nav ml-auto flex-row">
                {/* 搜尋欄 */}
                <li className="d-flex nav-item mx-2 mx-sm-3 mx-lg-2">
                  <div className="d-flex align-items-end search-icon-input-wrap mx-2">
                    <input
                      type="text"
                      className="px-2"
                      style={{ color: 'white', borderColor: 'white' }}
                    ></input>
                  </div>
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="#!"
                    onClick={(e) => {
                      e.preventDefault()
                    }}
                  >
                    <img src={'images/素材/icon/Search_W.svg'} alt={''}></img>
                  </a>
                </li>

                {/* 購物車 */}
                <li className="cart-navbar-li nav-item mx-2 mx-sm-3 mx-lg-2 position-relative">
                  <a
                    className="cart-navbar-a nav-link"
                    href="#!"
                    onClick={(e) => {
                      e.preventDefault()
                    }}
                  >
                    <img
                      src={'images/素材/icon/shopping_cart_W.svg'}
                      alt={''}
                    ></img>
                    {shoppingCartStorage ? (
                      <span
                        class="badge position-absolute rounded-pill bg-danger d-flex align-items-center justify-content-center"
                        style={{
                          color: 'white',
                          textAlign: 'center',
                          top: '-3px',
                          left: '15px',
                          minHeight: '20px',
                          minWidth: '20px',
                        }}
                      >
                        {!!localStorage.getItem('cartList')
                          ? JSON.parse(localStorage.getItem('cartList')).length
                          : ''}
                      </span>
                    ) : (
                      ''
                    )}
                  </a>
                  {shoppingCartStorage ? cartMap() : ''}
                </li>

                {/* 會員 */}
                <li className="profile-navbar-li nav-item mx-2 mx-sm-3 mx-lg-2 position-relative">
                  <a
                    className="nav-link"
                    href="#!"
                    onClick={(e) => {
                      e.preventDefault()
                      setModal(1)
                      if (loginStatus === 0) props.setShowParent(true)
                    }}
                  >
                    <img src="images/素材/icon/Profile_W.svg" alt={''}></img>
                  </a>
                  {loginStatus === 1 ? profileNavbar() : ''}
                </li>
                <li className="nav-item mx-2 mx-sm-3 mx-lg-2 d-block d-lg-none">
                  <a className="nav-link" href="#!">
                    <img src="images/素材/icon/Menu_W.svg" alt={''}></img>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <div className="page-title">
            <h2 className="text-center text-sm-right">ABOUT US</h2>
          </div>
        </div>

        {show && modal === 1
          ? login()
          : show && modal === 2
          ? signUp()
          : show && modal === 3
          ? getPassword()
          : show && modal === 4
          ? success()
          : ''}

        {/* mega menu */}
        <div
          id="product-hover-menu-wrap"
          className="product-hover-menu-wrap position-absolute"
          style={{
            left: '0',
            right: '0',
          }}
          onMouseEnter={() => {
            document.getElementById('product-hover-menu-wrap').style[
              'display'
            ] = 'block'
          }}
          onMouseLeave={(e) => {
            if (e.target.id !== 'product-navbar-link') {
              document.getElementById('product-hover-menu-wrap').style[
                'display'
              ] = 'none'
            }
          }}
        >
          <div
            id="product-hover-menu"
            className="product-hover-menu p-5 "
            style={{
              backgroundColor: 'rgba(255,255,255,0.85)',
            }}
          >
            <div className="container">
              <div className="row w-100">
                <div className="col-6">
                  <div className="row">
                    <div className="col-4">
                      <h6 className="font-weight-bold mb-3">商品分類</h6>
                      <ul className="list-unstyled">
                        <li>
                          <a href="#!">新品</a>
                        </li>
                        <li>
                          <a href="#!">外套</a>
                        </li>
                        <li>
                          <a href="#!">長褲</a>
                        </li>
                        <li>
                          <a href="#!">短褲</a>
                        </li>
                        <li>
                          <a href="#!">牛仔褲</a>
                        </li>
                        <li>
                          <a href="#!">西裝褲</a>
                        </li>
                        <li>
                          <a href="#!">衣服</a>
                        </li>
                        <li>
                          <a href="#!">褲子</a>
                        </li>
                        <li>
                          <a href="#!">鞋子</a>
                        </li>
                        <li>
                          <a href="#!">配件</a>
                        </li>
                      </ul>
                    </div>
                    <div className="col-4">
                      <h6 className="font-weight-bold mb-3">品牌</h6>
                      <ul className="list-unstyled">
                        <li>
                          <a href="#!">undefeated</a>
                        </li>
                        <li>
                          <a href="#!">OnlyNY</a>
                        </li>
                        <li>
                          <a href="#!">NOAH</a>
                        </li>
                        <li>
                          <a href="#!">BBCICECREAM</a>
                        </li>
                        <li>
                          <a href="#!">Tribal</a>
                        </li>
                        <li>
                          <a href="#!">Palace</a>
                        </li>
                        <li>
                          <a href="#!">Wckdthghts</a>
                        </li>
                        <li>
                          <a href="#!">studio-seven</a>
                        </li>
                        <li>
                          <a href="#!">Products</a>
                        </li>
                        <li>
                          <a href="#!">424</a>
                        </li>
                      </ul>
                    </div>
                    <div className="col-4">
                      <h6 className="font-weight-bold mb-3">活動</h6>
                      <ul className="list-unstyled">
                        <li>
                          <a href="#!">十二月新品上市</a>
                        </li>
                        <li>
                          <a href="#!">免運活動</a>
                        </li>
                        <li>
                          <a href="#!">換季出清</a>
                        </li>
                        <li>
                          <a href="#!">VIP商品區</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="row">
                    <div className="col-6">
                      <img
                        className="img-fluid"
                        src="images/navbar/https___hk.hypebeast.com_files_2020_10_fairfax-usa-2020-fall-winter-collection-lookbook-8-scaled.jpg"
                        alt={''}
                        style={{ objectFit: 'cover', height: '300px' }}
                      ></img>
                    </div>
                    <div className="col-6">
                      <img
                        className="img-fluid"
                        src="images/navbar/黑人單人照.JPG"
                        alt={''}
                        style={{ objectFit: 'cover', height: '300px' }}
                      ></img>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )

  function GoogleLogin() {
    let auth2 = gapi.auth2.getAuthInstance() //取得GoogleAuth物件
    auth2.signIn().then(
      function (GoogleUser) {
        console.log('Google登入成功')
        setLoginStatus(1)
        setShow(false)
        let user_id = GoogleUser.getId() //取得user id，不過要發送至Server端的話，為了資安請使用id_token，本人另一篇文章有範例：https://dotblogs.com.tw/shadow/2019/01/31/113026
        console.log(`user_id:${user_id}`)
        let AuthResponse = GoogleUser.getAuthResponse(true) //true會回傳包含access token ，false則不會
        let id_token = AuthResponse.id_token //取得id_token
        //people.get方法參考：https://developers.google.com/people/api/rest/v1/people/get
        gapi.client.people.people
          .get({
            resourceName: 'people/me',
            //通常你會想要知道的用戶個資↓
            personFields:
              'names,phoneNumbers,emailAddresses,addresses,residences,genders,birthdays,occupations',
          })
          .then(function (res) {
            //success
            let str = JSON.stringify(res.result) //將物件列化成string，方便顯示結果在畫面上
            console.log(str)
            //顯示授權你網站存取的用戶個資
            let name = '',
              email = '',
              yyyy = '',
              mm = '',
              dd = '',
              phone = '',
              address = ''
            if (res.result.hasOwnProperty('names'))
              name =
                res.result.names[0].familyName + res.result.names[0].givenName
            if (res.result.hasOwnProperty('emailAddresses'))
              email = res.result.emailAddresses[0].value
            if (res.result.hasOwnProperty('birthdays')) {
              yyyy = res.result.birthdays[0].date.year
              mm =
                res.result.birthdays[0].date.month.length === 2
                  ? res.result.birthdays[0].date.month
                  : '0' + res.result.birthdays[0].date.month
              dd =
                res.result.birthdays[0].date.day.length === 2
                  ? res.result.birthdays[0].date.day
                  : '0' + res.result.birthdays[0].date.day
            }
            if (res.result.hasOwnProperty('phoneNumbers'))
              phone = res.result.phoneNumbers[0].value
            if (res.result.hasOwnProperty('addresses'))
              address = res.result.addresses[0].formattedValue
            let data = {
              name: name,
              account: email.substr(0, email.indexOf('@')),
              password: '',
              email: email,
              letter: 'Y',
              birth: yyyy + '-' + mm + '-' + dd,
              birth2: mm + dd,
              phone: phone,
              address: address,
              type: 'G',
            }
            // console.log(data)
            fetch('http://localhost:3001/profile/googlelogin', {
              method: 'POST',
              body: JSON.stringify(data),
              headers: new Headers({
                'Content-Type': 'application/json',
              }),
            })
              .then((res) => res.json())
              .then((res) => {
                // gmail註冊過
                if (res.length > 0) {
                  setLoginStatus(1)
                  setName(res[0].name)
                  setId(res[0].id)
                }
                localStorage.setItem('user', JSON.stringify(res))
                // console.log(res)
              })
              .catch((err) => console.log('錯誤:', err))
            //↑通常metadata標記primary:true的個資就是你該抓的資料

            //請再自行Parse JSON，可以將JSON字串丟到線上parse工具查看：http://json.parser.online.fr/

            //最終，取得用戶個資後看要填在畫面表單上或是透過Ajax儲存到資料庫(記得是傳id_token給你的Web Server而不是明碼的user_id喔)，本範例就不贅述，請自行努力XD
            console.log(id_token)
          })
      },
      function (error) {
        console.log('Google登入失敗')
        console.log(error)
      }
    )
  } //end function GoogleLogin

  function Google_disconnect() {
    let auth2 = gapi.auth2.getAuthInstance() //取得GoogleAuth物件

    auth2.disconnect().then(function () {
      console.log('User disconnect.')
    })
  }
}

export default HeaderAbout
