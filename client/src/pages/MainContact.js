import React, { useState } from 'react'

function MainContact() {
  const [email, setEmail] = useState('')
  const [service, setService] = useState('')
  const [subject, setSubject] = useState('')
  const [content, setContent] = useState('')

  const insertContact = () => {
    const data = {
      email: email,
      service: service,
      subject: subject,
      content: content,
    }
    const insertMethod = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }
    let url = new URL('http://localhost:3001/member/contact')
    fetch(url, insertMethod)
      .then(() => {
        setEmail('')
        setService('')
        setSubject('')
        setContent('')
        alert('我們會盡快回復你')
      })
      .catch((err) => console.log('錯誤:', err))
  }

  const checkValue = (change) => {
    let bool = true
    if (!!change) {
      document.getElementById(change).classList.remove('is-invalid')
      return false
    }
    const obj = {
      email: '50',
      service: '20',
      subject: '200',
      content: '2000',
    }

    Object.keys(obj).forEach(function (item) {
      let el = document.getElementById(item)
      let textLength = el.value.length
      let maxLength = obj[item]

      if (textLength > maxLength) {
        el.classList.add('is-invalid')
        bool = false
      } else if (textLength === 0) {
        el.classList.add('is-invalid')
        bool = false
      } else {
        el.classList.remove('is-invalid')
      }
    })
    return bool
  }

  return (
    <>
      <div className="main col-9">
        <div className="title ml-3 mb-2 font-weight-bold">聯絡我們</div>
        <div className="mx-2 contact">
          <div className="row mx-5 text-center  d-flex align-items-center">
            <div className="titleIcon"></div>
            <div className="titleContent ">
              請輸入您的Email及問題，我們將會以最快的速度回覆您
            </div>
          </div>
          <div className="linkTop"></div>

          <form>
            <div className="form-group mx-5 my-2 p-0">
              <label htmlFor="email" className="form-label">
                *Email
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                  checkValue('email')
                }}
                // aria-describedby="emailHelp"
                maxLength="50"
                placeholder="電子郵件地址"
                required
              />
              <small
                id="emailHelp"
                className="form-text my-2"
                style={{ fontSize: '12px', color: 'gray' }}
              >
                為了讓您順利收到 cool 回信，請務必確認 EMAIL
                填寫正確，並避免使用 Yahoo、Hotmail
                等免費信箱，以免發生擋信、漏信的狀況。
              </small>
            </div>
            <div className="form-group mx-5 my-2 p-0">
              <label htmlFor="service" className="form-label">
                *服務類別
              </label>
              <select
                id="service"
                className="form-control"
                value={service}
                onChange={(event) => {
                  setService(event.target.value)
                  checkValue('service')
                }}
                // aria-label="Default select example"
                required
              >
                <option value="">請選擇服務類別</option>
                <option value="1">系統問題</option>
                <option value="2">商品問題</option>
                <option value="3">其他</option>
              </select>
            </div>
            <div className="form-group mx-5 my-2 p-0">
              <label htmlFor="subject" className="form-label">
                *主旨
              </label>
              <input
                type="text"
                id="subject"
                className="form-control"
                value={subject}
                onChange={(event) => {
                  setSubject(event.target.value)
                  checkValue('subject')
                }}
                placeholder="請輸入您的問題"
                maxLength="200"
                required
              />
              <div className="invalid-feedback">限制字數200字</div>
            </div>
            <div className="form-group mx-5 my-2 p-0">
              <label htmlFor="content" className="form-label">
                *內容
              </label>
              <textarea
                id="content"
                className="form-control"
                value={content}
                onChange={(event) => {
                  setContent(event.target.value)
                  checkValue('content')
                }}
                placeholder="請敘述您的問題"
                maxLength="2000"
                required
              ></textarea>
              <div className="invalid-feedback">限制字數2000字</div>
            </div>
            <div className="mx-5  p-0 text-center">
              <button
                className="btn px-5 py-2 my-2"
                type="button"
                onClick={() => {
                  if (checkValue()) {
                    insertContact()
                  }
                }}
              >
                確認
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default MainContact
