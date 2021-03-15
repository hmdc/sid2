import React from 'react';
import { Route, Switch } from 'react-router-dom'
import { UrlConstants } from '../utils/UrlUtils';
import Header from './Header';
import Home from './pages/Home'
import About from './pages/About'
import Documentation from './pages/Documentation'
import Support from './pages/Support'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div id="app">
      <Header />
      <Switch>
            <Route exact path={UrlConstants.URL_HOME} component={Home} />
            <Route exact path={UrlConstants.URL_ABOUT} component={About} />
            <Route exact path={UrlConstants.URL_ABOUT_SECTION1} component={About} />
            <Route exact path={UrlConstants.URL_ABOUT_SECTION2} component={About} />
            <Route exact path={UrlConstants.URL_ABOUT_SECTION3} component={About} />
            <Route exact path={UrlConstants.URL_DOCUMENTATION} component={Documentation} />
            <Route exact path={UrlConstants.URL_SUPPORT} component={Support} />
            <Route component={NotFound} />
      </Switch>
    </div>
  )
}

export default App
