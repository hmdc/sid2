import React from 'react';
import {Router} from 'react-router-dom'
import {createMemoryHistory} from 'history'
import { render, screen, cleanup } from '@testing-library/react';

import App from '../components/App'
import { UrlConstants } from '../utils/UrlUtils';

afterEach(cleanup)

it('App - url [/] renders homepage', () => {
  const history = createMemoryHistory({initialEntries: [UrlConstants.URL_HOME]})
  const {getByTestId, queryByTestId, getByText} = render(
    <Router history={history}>
      <App />
    </Router>,
  )
  const title = screen.getByText(/iqss description/i, {selector: 'h2'})
  expect(title).toBeInTheDocument()
});

it('App - url [/about] renders about page', () => {
  const history = createMemoryHistory({initialEntries: [UrlConstants.URL_ABOUT]})
  const {getByTestId, queryByTestId, getByText} = render(
    <Router history={history}>
      <App />
    </Router>,
  )
  const title = screen.getByText(/about/i, {selector: 'h2'})
  expect(title).toBeInTheDocument()
});

it('App - url [/documentation] renders documentation page', () => {
  const history = createMemoryHistory({initialEntries: [UrlConstants.URL_DOCUMENTATION]})
  const {getByTestId, queryByTestId, getByText} = render(
    <Router history={history}>
      <App />
    </Router>,
  )
  const title = screen.getByText(/documentation/i, {selector: 'h2'})
  expect(title).toBeInTheDocument()
});

it('App - url [/support] renders support page', () => {
  const history = createMemoryHistory({initialEntries: [UrlConstants.URL_SUPPORT]})
  render(
    <Router history={history}>
      <App />
    </Router>,
  )
  const title = screen.getByText(/support/i, {selector: 'h2'})
  expect(title).toBeInTheDocument()
});