import React from 'react'
import {
  MailIcon,
  OrderIcon,
  MemberIcon,
  FavoritesIcon,
  CouponIcon,
  SettingIcon,
  ContactIcon,
} from './icons'

export const MemberSidebarData = [
  {
    title: '帳號設定',
    icon: <SettingIcon />,
    link: '/setting',
  },
  {
    title: '我的信箱',
    icon: <MailIcon />,
    link: '/mail',
  },
  {
    title: '訂單紀錄',
    icon: <OrderIcon />,
    link: '/order',
  },
  {
    title: '會員專區',
    icon: <MemberIcon />,
    link: '/member',
  },
  {
    title: '蒐藏清單',
    icon: <FavoritesIcon />,
    link: '/favorites',
  },
  {
    title: '優惠券　',
    icon: <CouponIcon />,
    link: '/coupon',
  },
  {
    title: '聯絡我們',
    icon: <ContactIcon />,
    link: '/contact',
  },
]
