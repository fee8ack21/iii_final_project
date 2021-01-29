import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { MemberSidebarData } from './MemberSidebarData'
import { useLocation, useHistory } from 'react-router-dom'

function MemberSidebar(props) {
  const locationPath = props.location.pathname

  const loc = useLocation()
  // console.log(loc)
  const history = useHistory()
  const id = !!loc.state ? loc.state.id : history.push('/clothing')
  return (
    <>
      <div className="Sidebar col-3">
        <ul className="SidebarList">
          <div
            className="py-3 font-weight-bold"
            style={{ borderBottom: '2px solid black' }}
          >
            我的COOL
          </div>
          {/* <p className="solid-bottom"></p> */}
          {MemberSidebarData.map((val, key) => {
            const isActive = val.link === locationPath

            return (
              <Link
                to={{
                  pathname: val.link,
                  state: { id: id },
                }}
                key={key}
                className="font-weight-bold row w-100 m-0 d-flex justify-content-center py-3 align-items-center"
                id={isActive ? 'active' : ''}
              >
                <div className="mr-3 icon">{val.icon}</div>
                <div className="">{val.title}</div>
              </Link>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default withRouter(MemberSidebar)
