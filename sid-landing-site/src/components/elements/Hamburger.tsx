import React from 'react'

import { UrlConstants } from '../../utils/UrlUtils'

const Hamburger = ({ toggleMenu }: {toggleMenu: (event: React.MouseEvent<HTMLElement>) => void; } ) => {
  return (
    <button data-testid="btn-hamburger" className="btn-hamburger" onClick={toggleMenu}>
      <svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'><path stroke='rgba(0,0,0,0.5)' strokeLinecap='round' strokeMiterlimit='10' strokeWidth='3' d='M4 7h22M4 15h22M4 23h22' /></svg>
    </button>
  )
}

export default Hamburger