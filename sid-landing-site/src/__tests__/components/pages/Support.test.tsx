import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';

import Support from '../../../components/pages/Support';

afterEach(cleanup)

test('Support - renders page title', () => {
  const data = render(<Support />);
  const pageTitle = screen.getByText(/support/i, { selector: 'h2' });

  expect(pageTitle).toBeInTheDocument();
  expect(pageTitle.textContent).toBe('Support')
});