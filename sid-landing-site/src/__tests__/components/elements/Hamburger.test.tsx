import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';

import Hamburger from '../../../components/elements/Hamburger'

afterEach(cleanup)

it('Hamburger - onClick calls the toggleMenu function', () => {
  const toggleMenuMock = jest.fn()
  render(<Hamburger toggleMenu={toggleMenuMock} />);

  const hamburgerBtn = screen.getByTestId('btn-hamburger')
  fireEvent.click(hamburgerBtn)

  expect(toggleMenuMock).toBeCalled()
});