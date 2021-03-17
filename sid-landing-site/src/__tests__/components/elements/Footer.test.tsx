import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';

import Footer from '../../../components/elements/Footer'

afterEach(cleanup)

it('Footer - renders copy text', () => {
  render(<Footer />);
  const title = screen.getByText(/copyright ©/i)
  expect(title).toBeInTheDocument()
});

it('Footer - renders privacy link', () => {
  render(<Footer />);
  const title = screen.getByText(/privacy/i)
  expect(title.getAttribute('href')).not.toBeNull()
});

it('Footer - renders accessibility link', () => {
  render(<Footer />);
  const title = screen.getByText('Accessibility')
  expect(title.getAttribute('href')).not.toBeNull()
});

it('Footer - renders digital accessibility link', () => {
  render(<Footer />);
  const title = screen.getByText(/digital accessibility/i)
  expect(title.getAttribute('href')).not.toBeNull()
});

it('Footer - renders report copyright infringement link', () => {
  render(<Footer />);
  const title = screen.getByText(/report copyright infringement/i)
  expect(title.getAttribute('href')).not.toBeNull()
});