import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';

import Header from '../components/Header'

afterEach(cleanup)

it('Header - renders title with link to homepage', () => {
  render(<Header />);
  const title = screen.getByText(/welcome/i)
  expect(title).toHaveAttribute('href', '/')
});

it('Header - renders navigation with links', () => {
  render(<Header />);
  const about = screen.getByText(/about/i)
  expect(about).toHaveAttribute('href', '/about')

  const documentation = screen.getByText(/documentation/i)
  expect(documentation).toHaveAttribute('href', '/documentation')

  const support = screen.getByText(/support/i)
  expect(support).toHaveAttribute('href', '/support')

  const connectToSid = screen.getByText(/connect/i)
  expect(connectToSid).toHaveAttribute('href', 'https://www.sid.hmdc.harvard.edu/auth/cas')
});