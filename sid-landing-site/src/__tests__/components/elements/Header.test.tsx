import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';

import Header from '../../../components/elements/Header'
import { UrlConstants } from '../../../utils/UrlUtils';

afterEach(cleanup)

it('Header - renders title with link to homepage', () => {
  render(<Header />);
  const title = screen.getByText(/welcome/i)
  expect(title).toHaveAttribute('href', '/')
});

it('Header - renders navigation with links', () => {
  render(<Header />);

  const documentation = screen.getByText(/documentation/i)
  expect(documentation).toHaveAttribute('href', UrlConstants.URL_SID_DOCUMENTATION)

  const support = screen.getByText(/support/i)
  expect(support).toHaveAttribute('href', UrlConstants.URL_SID_SUPPORT)

  //const connectToSid = screen.getByText(/connect/i).closest('a')
  //NEED CUSTOM FUNCTION AS THE LINK WRAPS A SPAN WITH THE TEXT
  const connectToSid = screen.getByText((text, el) => el?.nodeName === 'A' && /connect/i.test(el.textContent || ''))
  expect(connectToSid).toHaveAttribute('href', UrlConstants.URL_SID_CONNECT)
});