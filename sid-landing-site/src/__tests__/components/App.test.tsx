import React from 'react';
import {Router} from 'react-router-dom'
import {createMemoryHistory} from 'history'
import { render, screen, cleanup } from '@testing-library/react';

import App from '../../components/App'
import { UrlConstants } from '../../utils/UrlUtils';

function renderWithHistory(urlToRender: string) {
  const history = createMemoryHistory({initialEntries: [urlToRender]})
  return render(
    <Router history={history}>
      <App />
    </Router>
  )
}

afterEach(cleanup)

it('App - url [/] renders homepage', () => {
  renderWithHistory(UrlConstants.URL_HOME)
  const title = screen.getByText(/sid description/i, {selector: 'h2'})
  expect(title).toBeInTheDocument()
});

it('App - url [/sid] renders homepage', () => {
  renderWithHistory(UrlConstants.URL_SID)
  const title = screen.getByText(/sid description/i, {selector: 'h2'})
  expect(title).toBeInTheDocument()
});

it('App - invalid url renders not-found page', () => {
  renderWithHistory('/invalidpage')
  const title = screen.getByText(/not found/i, {selector: 'h2'})
  expect(title).toBeInTheDocument()
});