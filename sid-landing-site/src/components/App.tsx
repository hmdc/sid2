import React from 'react';
import { Route, Switch } from 'react-router-dom'
import { UrlConstants } from '../utils/UrlUtils';
import Header from './elements/Header';
import Footer from './elements/Footer';
import SidHomepage from './pages/SidHomepage'
import NotFound from './pages/NotFound'

function App(): JSX.Element {
  return (
    <div id="app">
      <Header />
      <Switch>
            <Route exact path={UrlConstants.URL_HOME} component={SidHomepage} />
            <Route exact path={UrlConstants.URL_SID} component={SidHomepage} />
            <Route component={NotFound} />
      </Switch>
      <Footer />
    </div>
  )
}

export default App
