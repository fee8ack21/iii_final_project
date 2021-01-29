import React from 'react'
// import { Link } from 'react-router-dom'
// 目前會顯示很多prettier warnings，暫時無視
function AboutContent() {
  return (
    <>
      <main className="about-me-main">
        <div className="container">
          <section className="main-content-top mb-5">
            <h2 className="text-center font-weight-bold my-5">關於我們</h2>
            <p className="font-weight-bold mb-5">
              Cool飛鳥成立於2020年的潮流品牌，宗旨在將音樂、街頭文化、體育、藝術等...
              任何特色品牌探索與發掘，帶給顧客獨有特色與故事
              性的產品，更加展現您的個人魅力。
            </p>
            <p className="font-weight-bold mb-5">
              我們追求“文化與內涵”，這種精神在尊重於世界各地的每一種文化，不受地域限制，了解與內化以及探索自己，帶出不一樣的自由生
              活態度
            </p>
            <p className="font-weight-bold mb-5">
              這也就是我們 Cool飛鳥
              一直在追求新元素與特色文化，讓所有人都能在了解別人的同時，也能發掘並融合出自己個人風格與特色!
              Cool飛鳥
              我們品牌的精神就是不漏掉任何一種特色文化故事，共同學習了解與尊重不同的文化，期待能為各您打開更多的視野。
              並且我們努力做到為客戶提供專業化、高質量的服飾與配件代購，也為會員帶來高品質的購物體驗，我們將以"誠信、可靠、特色、尊
              重、了解"為核心價值觀，成為行業中最具影響力的領頭羊。
            </p>
            <p className="font-weight-bold text-center">
              Let's Share Stories !
            </p>
          </section>
        </div>
        <section className="main-content-bottom">
          <div className="main-content-bottom-mask">
            <div className="container" style={{ marginBottom: '100px' }}>
              <div className="row time-line-lg">
                <div className="time-line-content-wrap col-6 d-flex justify-content-center align-items-end">
                  <div className="time-line-content w-50">
                    <h5 className="font-weight-bold mb-4 text-center">追求</h5>
                    <p className="font-weight-bold text-center">
                      領悟其中的道理也不是那麼的 困難。探討追求時，如果發現
                      非常複雜，那麼想必不簡單。
                    </p>
                  </div>
                </div>
                <div className="col-6"></div>
              </div>
              <div className="row time-line-sm flex-row-reverse">
                <div className="time-line-content-wrap col-6 d-flex justify-content-center align-items-end">
                  <div className="time-line-content w-50">
                    <h5 className="font-weight-bold mb-4 text-center">追求</h5>
                    <p className="font-weight-bold text-center">
                      領悟其中的道理也不是那麼的 困難。探討追求時，如果發現
                      非常複雜，那麼想必不簡單。
                    </p>
                  </div>
                </div>
                <div className="col-6"></div>
              </div>
              <div className="row time-line-lg">
                <div className="time-line-content-wrap col-6 d-flex justify-content-center align-items-end">
                  <div className="time-line-content w-50">
                    <h5 className="font-weight-bold mb-4 text-center">追求</h5>
                    <p className="font-weight-bold text-center">
                      領悟其中的道理也不是那麼的 困難。探討追求時，如果發現
                      非常複雜，那麼想必不簡單。
                    </p>
                  </div>
                </div>
                <div className="col-6"></div>
              </div>
              <div className="row time-line-sm flex-row-reverse">
                <div className="time-line-content-wrap col-6 d-flex justify-content-center align-items-end">
                  <div className="time-line-content w-50">
                    <h5 className="font-weight-bold mb-4 text-center">追求</h5>
                    <p className="font-weight-bold text-center">
                      領悟其中的道理也不是那麼的 困難。探討追求時，如果發現
                      非常複雜，那麼想必不簡單。
                    </p>
                  </div>
                </div>
                <div className="col-6"></div>
              </div>
              <div className="row time-line-lg">
                <div className="time-line-content-wrap col-6 d-flex justify-content-center align-items-end">
                  <div className="time-line-content w-50">
                    <h5 className="font-weight-bold mb-4 text-center">追求</h5>
                    <p className="font-weight-bold text-center">
                      領悟其中的道理也不是那麼的 困難。探討追求時，如果發現
                      非常複雜，那麼想必不簡單。
                    </p>
                  </div>
                </div>
                <div className="col-6"></div>
              </div>
              <div className="row time-line-sm flex-row-reverse">
                <div className="time-line-content-wrap col-6 d-flex justify-content-center align-items-end">
                  <div className="time-line-content w-50">
                    <h5 className="font-weight-bold mb-4 text-center">追求</h5>
                    <p className="font-weight-bold text-center">
                      領悟其中的道理也不是那麼的 困難。探討追求時，如果發現
                      非常複雜，那麼想必不簡單。
                    </p>
                  </div>
                </div>
                <div className="col-6"></div>
              </div>
              <div className="row time-line-img flex-row-reverse"></div>
              <div className="row flex-row-reverse">
                <div className="col-12 d-flex justify-content-center">
                  <img
                    width="200px"
                    className="align-self-center"
                    src={'images/cool_logo/time.png'}
                    alt={''}
                  ></img>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default AboutContent
