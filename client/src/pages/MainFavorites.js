import React, { useEffect, useState } from 'react'
import { InputGroup, FormControl, Form } from 'react-bootstrap'
import { Search, Heart } from '../components/icons'
import { useLocation, useHistory } from 'react-router-dom'

function MainFavorites() {
  const loc = useLocation()
  const history = useHistory()
  const id = !!loc.state ? loc.state.id : history.push('/clothing')

  const [search, setSearch] = useState('')
  const [FavoritesData, setFavoritesData] = useState([])

  const getFavoritesData = (id) => {
    let url = new URL('http://localhost:3001/member/favorites')
    let params = {
      memberNo: id,
      valid: 1,
    }
    url.search = new URLSearchParams(params).toString()

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setFavoritesData(data)
        // console.log(data)
      })
      .catch((err) => console.log('錯誤:', err))
  }

  const deleteFavoritesData = (id) => {
    const data = {
      id: id,
      valid: 0,
    }
    const deleteMethod = {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(data),
    }
    let url = new URL('http://localhost:3001/member/favorites')
    fetch(url, deleteMethod)
      .then(() => {
        setFavoritesData(FavoritesData.filter((val) => val.fav_ID !== id))
      })
      .catch((err) => console.log('錯誤:', err))
  }

  useEffect(() => {
    if (!!id) getFavoritesData(id)
  }, [id])

  return (
    <>
      <div className="main col-9">
        <div className="title ml-3 mb-2  font-weight-bold">蒐藏清單</div>
        <div className="mx-2 favorites-wrap ">
          <InputGroup
            className="favorites-wrap-container mx-auto row justify-content-between"
            onChange={(e) => {
              setSearch(e.target.value)
            }}
          >
            <div className="col-6 d-flex align-items-center pl-0">
              <FormControl placeholder="搜尋商品" />
              <Search style={{ transform: 'translate(-35px, 0px)' }} />
            </div>
            <div className="col-3 pr-0">
              <Form.Control className="d-none" as="select" custom>
                <option>依加入順序</option>
              </Form.Control>
            </div>
          </InputGroup>
          <div className="row mt-3" style={{ width: '95%', margin: 'auto' }}>
            {FavoritesData.map((val, key) =>
              val.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 ? (
                <div
                  key={key}
                  className="col-12 col-sm-6 col-md-4 col-lg-3 px-0"
                >
                  <div className="text-center border position-relative rounded">
                    <a
                      className="d-inline-block p-2"
                      href={`http://localhost:3000/detail/${val.brand}/${val.pro_ID}`}
                    >
                      <img
                        src={val.image}
                        alt=""
                        style={{
                          width: '100%',
                          height: '150px',
                          objectFit: 'contain',
                        }}
                      ></img>
                    </a>
                    <a
                      href="#!"
                      onClick={(e) => {
                        e.preventDefault()
                        deleteFavoritesData(val.fav_ID)
                      }}
                    >
                      <Heart
                        className="position-absolute"
                        style={{
                          fill: '#F37022',
                          bottom: '6%',
                          right: '10%',
                        }}
                      />
                    </a>
                  </div>
                  <div className="card-body p-1">
                    <h5
                      className="card-title m-0 mx-2 my-1 font-weight-bold text-center"
                      style={{ fontSize: '12px' }}
                    >
                      {val.name.slice(0, val.name.indexOf('^'))}
                    </h5>
                    <p
                      className="card-text m-0 mx-2 my-1 font-weight-bold text-center"
                      style={{ fontSize: '14px', color: '#f37022' }}
                    >
                      {val.name.slice(
                        val.name.indexOf('^') + 1,
                        val.name.length
                      )}
                    </p>
                    <p
                      className="card-text m-0 mx-2 my-1 font-weight-bold text-center"
                      style={{ fontSize: '12px' }}
                    >
                      NT$: {val.price}
                    </p>
                  </div>
                </div>
              ) : (
                ''
              )
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default MainFavorites
