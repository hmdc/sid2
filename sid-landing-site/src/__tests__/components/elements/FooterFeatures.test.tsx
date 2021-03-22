import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';

import FooterFeatures from '../../../components/elements/FooterFeatures'

afterEach(cleanup)

it('FooterFeatures - IQSS information', () => {
  render(<FooterFeatures />);
  const title = screen.getByText((text, el) => el?.nodeName === 'H3' && /iqss/i.test(el.textContent || ''))
  expect(title).toBeInTheDocument()
});