import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';

import FooterBanner from '../../../components/elements/FooterBanner'

afterEach(cleanup)

it('FooterBanner - IQSS link with image', () => {
  render(<FooterBanner />);
  const element = screen.getByAltText(/IQSS/i)
  expect(element).toBeInTheDocument()
  expect(element.parentElement).toHaveAttribute('href', 'https://www.iq.harvard.edu/')
});

it('FooterBanner - FASRC link with image', () => {
  render(<FooterBanner />);
  const element = screen.getByAltText(/FASRC/i)
  expect(element).toBeInTheDocument()
  expect(element.parentElement).toHaveAttribute('href', 'https://www.rc.fas.harvard.edu/')
});