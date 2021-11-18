import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';

import NotFound from '../../../components/pages/NotFound';

afterEach(cleanup)

test('NotFound - renders page title', () => {
  render(<NotFound />);
  const pageTitle = screen.getByText(/not found/i, { selector: 'h2' });

  expect(pageTitle).toBeInTheDocument();
  expect(pageTitle.textContent).toBe('Not Found')
});