import styled from 'styled-components'
// MemberSidebar
import { ReactComponent as MailIcon } from '../images/Mail.svg'
import { ReactComponent as OrderIcon } from '../images/Order.svg'
import { ReactComponent as MemberIcon } from '../images/Member.svg'
import { ReactComponent as FavoritesIcon } from '../images/Favorites.svg'
import { ReactComponent as CouponIcon } from '../images/Coupon.svg'
import { ReactComponent as SettingIcon } from '../images/Setting.svg'
import { ReactComponent as ContactIcon } from '../images/Contact.svg'
import { ReactComponent as ArrowDown } from '../images/arrow-down.svg'
import arrowup from '../images/arrow-down.svg'
// MainMail
import logo from '../images/Logo.png'
import no from '../images/No.svg'
// MainMember
import lv1 from '../images/lv1.svg'
import lv2 from '../images/lv2.svg'
import lv3 from '../images/lv3.svg'
//Main Favorites
import { ReactComponent as Search } from '../images/Search.svg'
import { ReactComponent as Heart } from '../images/Heart.svg'

const Logo = styled.img.attrs({
  src: `${logo}`,
})`
  width: 60px;
  height: 60px;
`

const No = styled.img.attrs({
  src: `${no}`,
})`
  width: 20px;
  height: 20px;
`

const ArrowUp = styled.img.attrs({
  src: `${arrowup}`,
})`
  transform: rotate(180deg);
`

const Lv1 = styled.img.attrs({
  src: `${lv1}`,
})`
  width: 80px;
`

const LV1 = styled.img.attrs({
  src: `${lv1}`,
})`
  width: 100px;
`

const Lv2 = styled.img.attrs({
  src: `${lv2}`,
})`
  width: 80px;
`
const LV2 = styled.img.attrs({
  src: `${lv2}`,
})`
  width: 120px;
`
const Lv3 = styled.img.attrs({
  src: `${lv3}`,
})`
  width: 80px;
`

const LV3 = styled.img.attrs({
  src: `${lv3}`,
})`
  width: 100px;
`
export {
  Logo,
  No,
  MailIcon,
  OrderIcon,
  MemberIcon,
  FavoritesIcon,
  CouponIcon,
  SettingIcon,
  ContactIcon,
  ArrowDown,
  ArrowUp,
  Lv1,
  LV1,
  Lv2,
  LV2,
  Lv3,
  LV3,
  Search,
  Heart,
}
