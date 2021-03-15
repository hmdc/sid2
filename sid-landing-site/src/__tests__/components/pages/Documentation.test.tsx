import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';

import Documentation from '../../../components/pages/Documentation';

afterEach(cleanup)

test('Documentation - renders page title', () => {
  const data = render(<Documentation />);
  const pageTitle = screen.getByText(/documentation/i, { selector: 'h2' });

  expect(pageTitle).toBeInTheDocument();
  expect(pageTitle.textContent).toBe('Documentation')
});