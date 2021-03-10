import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';

import Home from '../../../components/pages/Home';
import { UrlConstants } from '../../../utils/UrlUtils';

afterEach(cleanup)

test('Home - renders page title', () => {
  const data = render(<Home />);
  const pageTitle = screen.getByText(/iqss Description/i, { selector: 'h2' });

  expect(pageTitle).toBeInTheDocument();
  expect(pageTitle.textContent).toBe('IQSS Description')
});

test('Home - renders Data Levels feature title', () => {
  const data = render(<Home />);
  const feature = screen.getByText(/data levels supported/i, { selector: 'h3' });

  expect(feature).toBeInTheDocument();
});

test('Home - renders Statistical Applications feature title', () => {
  const data = render(<Home />);
  const feature = screen.getByText(/statistical applications/i, { selector: 'h3' });

  expect(feature).toBeInTheDocument();
});

test('Home - renders Tools & Utilities feature title', () => {
  const data = render(<Home />);
  const feature = screen.getByText(/Tools & Utilities/i, { selector: 'h3' });

  expect(feature).toBeInTheDocument();
});

test('Home - renders the connect to Sid link', () => {
  const data = render(<Home />);
  const connectToSid = screen.getByText(/connect to sid/i);

  expect(connectToSid).toBeInTheDocument();
  expect(connectToSid).toHaveAttribute('href', UrlConstants.URL_SID_CONNECT);
});