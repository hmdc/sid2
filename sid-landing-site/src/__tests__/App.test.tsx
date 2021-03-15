import React from 'react';
import {Router} from 'react-router-dom'
import {createMemoryHistory} from 'history'
import { render, screen, cleanup } from '@testing-library/react';

import App from '../components/App'
import { UrlConstants } from '../utils/UrlUtils';

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
  const title = screen.getByText(/iqss description/i, {selector: 'h2'})
  expect(title).toBeInTheDocument()
});

it('App - url [/about] renders about page', () => {
  renderWithHistory(UrlConstants.URL_ABOUT)
  const title = screen.getByText(/about/i, {selector: 'h2'})
  expect(title).toBeInTheDocument()
});

it('App - url [/documentation] renders documentation page', () => {
  renderWithHistory(UrlConstants.URL_DOCUMENTATION)
  const title = screen.getByText(/documentation/i, {selector: 'h2'})
  expect(title).toBeInTheDocument()
});

it('App - url [/support] renders support page', () => {
  renderWithHistory(UrlConstants.URL_SUPPORT)
  const title = screen.getByText(/support/i, {selector: 'h2'})
  expect(title).toBeInTheDocument()
});

it('App - invalid url renders not-found page', () => {
  renderWithHistory('/invalidpage')
  const title = screen.getByText(/not found/i, {selector: 'h2'})
  expect(title).toBeInTheDocument()
});