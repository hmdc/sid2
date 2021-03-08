import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'

function App() {
  return (
    <div id="app">
      <Switch>
            <Route exact path='/' component={Home} />
      </Switch>
    </div>
  )
}

export default App
