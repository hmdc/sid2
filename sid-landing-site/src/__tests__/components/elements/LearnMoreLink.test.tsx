import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';

import LearnMoreLink from '../../../components/elements/LearnMoreLink'

afterEach(cleanup)

it('LearnMoreLink - renders with defaults', () => {
  render(<LearnMoreLink />);
  const title = screen.getByText(/learn more/i)
  expect(title).toHaveAttribute('href', '/')
});

it('LearnMoreLink - renders with props', () => {
  render(<LearnMoreLink href='/test/link' text='Some text' />);
  const about = screen.getByText('Some text')
  expect(about).toHaveAttribute('href', '/test/link')
});