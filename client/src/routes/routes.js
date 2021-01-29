import Home from '../pages/Home'
import Clothing from '../pages/Clothing'
import About from '../pages/About'
import Product from '../pages/Product'
import Detail from '../pages/Detail'
import News from '../pages/News'
import ShoppingCart from '../pages/ShoppingCart'
import MessageBoard from '../components/MessageBoard'
import Dashboard from '../pages/Dashboard'
import ClothingBackstage from '../pages/ClothingBackstage'

import {
  Mail,
  Order,
  Member,
  Favorites,
  Coupon,
  Setting,
  Contact,
} from '../pages/Member'

const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/product',
    component: Product,
  },
  {
    path: '/detail/',
    component: Detail,
  },
  {
    path: '/about',
    component: About,
  },
  {
    path: '/news',
    component: News,
  },
  {
    path: '/clothing',
    component: Clothing,
  },
  {
    path: '/clothingbackstage',
    component: ClothingBackstage,
  },
  {
    path: '/setting',
    component: Setting,
    breadcrumbName: '會員首頁',
  },
  {
    path: '/mail',
    component: Mail,
    breadcrumbName: '我的信箱',
  },
  {
    path: '/order',
    component: Order,
    breadcrumbName: '訂單紀錄',
  },
  {
    path: '/member',
    component: Member,
    breadcrumbName: '會員專區',
  },
  {
    path: '/favorites',
    component: Favorites,
    breadcrumbName: '蒐藏清單',
  },
  {
    path: '/coupon',
    component: Coupon,
    breadcrumbName: '優惠券',
  },
  {
    path: '/contact',
    component: Contact,
    breadcrumbName: '聯絡我們',
  },
  {
    path: '/messageBoard',
    component: MessageBoard,
  },
  {
    // 購物車
    path: '/shoppingcart',
    component: ShoppingCart,
  },
  {
    // 後台
    path: '/dashboard',
    component: Dashboard,
  },
]

export default routes
