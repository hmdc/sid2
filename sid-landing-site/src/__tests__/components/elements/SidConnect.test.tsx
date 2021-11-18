import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';

import SidConnect from '../../../components/elements/SidConnect'
import { UrlConstants } from '../../../utils/UrlUtils';

afterEach(cleanup)

it('SidConnect - renders the connect to sid link', () => {
  render(<SidConnect />);
   //const connectToSid = screen.getByText(/connect/i).closest('a')
  //NEED CUSTOM FUNCTION AS THE LINK WRAPS A SPAN WITH THE TEXT
  const connectToSid = screen.getByText((text, el) => el?.nodeName === 'A' && /connect/i.test(el.textContent || ''))
  expect(connectToSid).toHaveAttribute('href', UrlConstants.URL_SID_CONNECT)
});