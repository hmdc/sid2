import React from 'react';
import { Route, Switch } from 'react-router-dom'
import { UrlConstants } from '../utils/UrlUtils';
import Header from './Header';
import Home from './pages/Home'
import About from './pages/About'
import Documentation from './pages/Documentation'
import Support from './pages/Support'

function App() {
  return (
    <div id="app">
      <Header />
      <Switch>
            <Route exact path={UrlConstants.URL_HOME} component={Home} />
            <Route exact path={UrlConstants.URL_ABOUT} component={About} />
            <Route exact path={UrlConstants.URL_DOCUMENTATION} component={Documentation} />
            <Route exact path={UrlConstants.URL_SUPPORT} component={Support} />
      </Switch>
    </div>
  )
}

export default App
