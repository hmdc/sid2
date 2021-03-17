import React from 'react';
import { Route, Switch } from 'react-router-dom'
import { UrlConstants } from '../utils/UrlUtils';
import Header from './elements/Header';
import Footer from './elements/Footer';
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
            <Route exact path={UrlConstants.URL_ABOUT_SERVICES} component={About} />
            <Route exact path={UrlConstants.URL_ABOUT_ROADMAP} component={About} />
            <Route exact path={UrlConstants.URL_ABOUT_MIGRATION} component={About} />
            <Route exact path={UrlConstants.URL_DOCUMENTATION} component={Documentation} />
            <Route exact path={UrlConstants.URL_SUPPORT} component={Support} />
            <Route component={NotFound} />
      </Switch>
      <Footer />
    </div>
  )
}

export default App
