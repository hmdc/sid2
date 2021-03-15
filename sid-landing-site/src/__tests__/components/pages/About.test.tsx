import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';

import About from '../../../components/pages/About';

afterEach(cleanup)

test('About - renders page title', () => {
  const data = render(<About />);
  const pageTitle = screen.getByText(/about/i, { selector: 'h2' });

  expect(pageTitle).toBeInTheDocument();
  expect(pageTitle.textContent).toBe('About')
});