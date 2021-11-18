import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';

import SidHomepage from '../../../components/pages/SidHomepage';
import { UrlConstants } from '../../../utils/UrlUtils';

afterEach(cleanup)

test('SidHomepage - renders page title', () => {
  render(<SidHomepage />);
  const pageTitle = screen.getByText(/Sid Description/i, { selector: 'h2' });

  expect(pageTitle).toBeInTheDocument();
  expect(pageTitle.textContent).toBe('Sid Description')
});

test('SidHomepage - renders Getting started feature title', () => {
  render(<SidHomepage />);
  const feature = screen.getByText(/Getting started/i, { selector: 'h4' });

  expect(feature).toBeInTheDocument();
});

test('SidHomepage - renders Documentation and Training feature title', () => {
  render(<SidHomepage />);
  const feature = screen.getByText(/Documentation and Training/i, { selector: 'h4' });

  expect(feature).toBeInTheDocument();
});

test('SidHomepage - renders Support feature title', () => {
  render(<SidHomepage />);
  const feature = screen.getByText(/Support/i, { selector: 'h4' });

  expect(feature).toBeInTheDocument();
});

test('SidHomepage - renders System Status and Planned Downtime feature title', () => {
  render(<SidHomepage />);
  const feature = screen.getByText(/System Status and Planned Downtime/i, { selector: 'h4' });

  expect(feature).toBeInTheDocument();
});

test('SidHomepage - renders the log in to Sid link', () => {
  render(<SidHomepage />);
  //const connectToSid = screen.getByText(/Log in to Sid/i).closest('a')
  //NEED CUSTOM FUNCTION AS THE LINK WRAPS A SPAN WITH THE TEXT
  const element = screen.getByText((text, el) => el?.nodeName === 'A' && /Log in to Sid/i.test(el.textContent || ''))

  expect(element).toBeInTheDocument();
  expect(element).toHaveAttribute('href', UrlConstants.URL_SID_CONNECT);
});