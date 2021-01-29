import React from 'react'
import { Logo, No } from '../components/icons'

function MainMail() {
  return (
    <>
      <div className="main col-9">
        <div className="title ml-3 mb-2  font-weight-bold">我的信箱</div>
        <div className="mx-2 mail-wrap">
          {/* <div className="mailamount ml-3 my-2 font-weight-bold">
            共有1/1信件
          </div> */}
          <div className="row mx-5 text-center d-flex align-items-center">
            <div className="titleIcon"></div>
            <div className="titleContent">共有1/1信件</div>
          </div>
          <div className="linkTop"></div>

          <div className="mx-auto mails overflow-auto">
            <ul className="MailList list-group list-group-flush">
              <li className="MailListItem list-group-item d-flex">
                <div className="w-100 d-flex align-items-center">
                  <Logo className="mx-4" />
                  <div className="mx-4 font-weight-bold">酷飛鳥</div>
                  <ul className="mx-4 list-unstyled flex-grow-1">
                    <li className="font-weight-bold">最新優惠!!</li>
                    <li className="font-weight-bold">
                      12/30~1/31 購買全站商品滿千折百
                    </li>
                    <li className="newstime font-weight-bold">
                      2020/12/15 17:00
                    </li>
                  </ul>
                  <button type="button" className="close">
                    <No className="close-icon ml-auto" />
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default MainMail
