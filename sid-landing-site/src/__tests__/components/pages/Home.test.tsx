import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../../../components/pages/Home';

test('Home - renders SID', () => {
  render(<Home />);
  const pageElement = screen.getByText(/SID/i);

  expect(pageElement).toBeInTheDocument();
});