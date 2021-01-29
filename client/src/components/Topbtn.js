import React, { useEffect } from 'react'

function Topbtn() {
  useEffect(() => {
    document.querySelector('.go-top').addEventListener('click', function (e) {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })
    })
  })
  return (
    <>
      <a
        href="#!"
        className="go-top position-fixed d-flex flex-column jusify-content-center align-items-center text-decoration-none"
      >
        <i className="text-center mb-2 fas fa-arrow-up"></i>
        <span>TOP</span>
      </a>
    </>
  )
}

export default Topbtn
