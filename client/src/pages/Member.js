import React, { useState } from 'react'

import HeaderOther from '../components/HeaderOther'
import MainCoupon from './MainCoupon'
import MemberSidebar from '../components/MemberSidebar'
import { Row, Container } from 'react-bootstrap'
import Breadcrumb from '../components/Breadcrumb'
import MainMail from './MainMail'
import MainOrder from './MainOrder'
import MainMember from './MainMember'
import MainFavorites from './MainFavorites'
import MainSetting from './MainSetting'
import MainContact from './MainContact'

const onMatchedRoutes = (matchedRoutes) => {
  // console.log(matchedRoutes)

  return [
    {
      route: {
        path: '/setting',
        breadcrumbName: '會員首頁',
      },
    },
    ...matchedRoutes,
  ]
}

const Setting = ({ route, location }) => {
  const [detailToHeaderCart, setDetailToHeaderCart] = useState(
    !!localStorage.getItem('cartList')
      ? JSON.parse(localStorage.getItem('cartList')).length
      : 0
  )
  const [showParent, setShowParent] = useState(false)
  const [whetherLoginParent, setWhetherLoginParent] = useState(
    !!localStorage.getItem('user')
  )

  return (
    <>
      <HeaderOther
        setWhetherLoginParent={setWhetherLoginParent}
        showParent={showParent}
        setShowParent={setShowParent}
        detailToHeaderCart={detailToHeaderCart}
        setDetailToHeaderCart={setDetailToHeaderCart}
      />
      <Container>
        <Row>
          <Breadcrumb
            locationPath={location.pathname}
            // onMatchedRoutes={onMatchedRoutes}
          />
          <MemberSidebar />
          <MainSetting />
        </Row>
      </Container>
    </>
  )
}

const Mail = ({ route, location }) => {
  const [detailToHeaderCart, setDetailToHeaderCart] = useState(
    !!localStorage.getItem('cartList')
      ? JSON.parse(localStorage.getItem('cartList')).length
      : 0
  )
  const [showParent, setShowParent] = useState(false)
  const [whetherLoginParent, setWhetherLoginParent] = useState(
    !!localStorage.getItem('user')
  )
  return (
    <>
      <HeaderOther
        setWhetherLoginParent={setWhetherLoginParent}
        showParent={showParent}
        setShowParent={setShowParent}
        detailToHeaderCart={detailToHeaderCart}
        setDetailToHeaderCart={setDetailToHeaderCart}
      />
      <Container>
        <Row>
          <Breadcrumb
            locationPath={location.pathname}
            onMatchedRoutes={onMatchedRoutes}
          />
          <MemberSidebar />
          <MainMail />
        </Row>
      </Container>
    </>
  )
}

const Order = ({ route, location }) => {
  const [detailToHeaderCart, setDetailToHeaderCart] = useState(
    !!localStorage.getItem('cartList')
      ? JSON.parse(localStorage.getItem('cartList')).length
      : 0
  )
  const [showParent, setShowParent] = useState(false)
  const [whetherLoginParent, setWhetherLoginParent] = useState(
    !!localStorage.getItem('user')
  )
  return (
    <>
      <HeaderOther
        setWhetherLoginParent={setWhetherLoginParent}
        showParent={showParent}
        setShowParent={setShowParent}
        detailToHeaderCart={detailToHeaderCart}
        setDetailToHeaderCart={setDetailToHeaderCart}
      />
      <Container>
        <Row>
          <Breadcrumb
            locationPath={location.pathname}
            onMatchedRoutes={onMatchedRoutes}
          />
          <MemberSidebar />
          <MainOrder />
        </Row>
      </Container>
    </>
  )
}

const Member = ({ route, location }) => {
  const [detailToHeaderCart, setDetailToHeaderCart] = useState(
    !!localStorage.getItem('cartList')
      ? JSON.parse(localStorage.getItem('cartList')).length
      : 0
  )
  const [showParent, setShowParent] = useState(false)
  const [whetherLoginParent, setWhetherLoginParent] = useState(
    !!localStorage.getItem('user')
  )
  return (
    <>
      <HeaderOther
        setWhetherLoginParent={setWhetherLoginParent}
        showParent={showParent}
        setShowParent={setShowParent}
        detailToHeaderCart={detailToHeaderCart}
        setDetailToHeaderCart={setDetailToHeaderCart}
      />
      <Container>
        <Row>
          <Breadcrumb
            locationPath={location.pathname}
            onMatchedRoutes={onMatchedRoutes}
          />
          <MemberSidebar />
          <MainMember />
        </Row>
      </Container>
    </>
  )
}

const Favorites = ({ route, location }) => {
  const [detailToHeaderCart, setDetailToHeaderCart] = useState(
    !!localStorage.getItem('cartList')
      ? JSON.parse(localStorage.getItem('cartList')).length
      : 0
  )
  const [showParent, setShowParent] = useState(false)
  const [whetherLoginParent, setWhetherLoginParent] = useState(
    !!localStorage.getItem('user')
  )
  return (
    <>
      <HeaderOther
        setWhetherLoginParent={setWhetherLoginParent}
        showParent={showParent}
        setShowParent={setShowParent}
        detailToHeaderCart={detailToHeaderCart}
        setDetailToHeaderCart={setDetailToHeaderCart}
      />
      <Container>
        <Row>
          <Breadcrumb
            locationPath={location.pathname}
            onMatchedRoutes={onMatchedRoutes}
          />
          <MemberSidebar />
          <MainFavorites />
        </Row>
      </Container>
    </>
  )
}

const Coupon = ({ route, location }) => {
  const [detailToHeaderCart, setDetailToHeaderCart] = useState(
    !!localStorage.getItem('cartList')
      ? JSON.parse(localStorage.getItem('cartList')).length
      : 0
  )
  const [showParent, setShowParent] = useState(false)
  const [whetherLoginParent, setWhetherLoginParent] = useState(
    !!localStorage.getItem('user')
  )
  return (
    <>
      <HeaderOther
        setWhetherLoginParent={setWhetherLoginParent}
        showParent={showParent}
        setShowParent={setShowParent}
        detailToHeaderCart={detailToHeaderCart}
        setDetailToHeaderCart={setDetailToHeaderCart}
      />
      <Container>
        <Row>
          <Breadcrumb
            locationPath={location.pathname}
            onMatchedRoutes={onMatchedRoutes}
          />
          <MemberSidebar />
          <MainCoupon />
        </Row>
      </Container>
    </>
  )
}

const Contact = ({ route, location }) => {
  const [detailToHeaderCart, setDetailToHeaderCart] = useState(
    !!localStorage.getItem('cartList')
      ? JSON.parse(localStorage.getItem('cartList')).length
      : 0
  )
  const [showParent, setShowParent] = useState(false)
  const [whetherLoginParent, setWhetherLoginParent] = useState(
    !!localStorage.getItem('user')
  )
  return (
    <>
      <HeaderOther
        setWhetherLoginParent={setWhetherLoginParent}
        showParent={showParent}
        setShowParent={setShowParent}
        detailToHeaderCart={detailToHeaderCart}
        setDetailToHeaderCart={setDetailToHeaderCart}
      />
      <Container>
        <Row>
          <Breadcrumb
            locationPath={location.pathname}
            onMatchedRoutes={onMatchedRoutes}
          />
          <MemberSidebar />
          <MainContact />
        </Row>
      </Container>
    </>
  )
}

export { Mail, Order, Member, Favorites, Coupon, Setting, Contact }
