import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import ScrollToTop from './components/ScrollToTop'
import routes from './routes/routes'

function App() {
  return (
    <BrowserRouter>
      <>
        <ScrollToTop>
          <Switch>{renderRoutes(routes)}</Switch>
        </ScrollToTop>
      </>
    </BrowserRouter>
  )
}

export default App
