import React, { useState } from 'react'
import { UrlConstants } from '../../utils/UrlUtils'
import SidConnect from './SidConnect'

const Header = () => {
    const [showMenu, setShowMenu] = useState(false)

    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }

    return (
        <header id="header">
            <h1><a href="/">Welcome to </a></h1>
            <nav>
                <ul className="nav">
                    <li className="desktop-hide">
                        <button className="btn-hamburger" onClick={toggleMenu}>
                            <svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'><path stroke='rgba(0,0,0,0.5)' strokeLinecap='round' strokeMiterlimit='10' strokeWidth='3' d='M4 7h22M4 15h22M4 23h22' /></svg>
                        </button>
                    </li>
                    <li className="tablet-hide mobile-hide"><a className="link-hover-effect" href={UrlConstants.URL_ABOUT}>About</a></li>
                    <li className="tablet-hide mobile-hide"><a className="link-hover-effect" href={UrlConstants.URL_DOCUMENTATION}>Documentation</a></li>
                    <li className="tablet-hide mobile-hide"><a className="link-hover-effect" href={UrlConstants.URL_SUPPORT}>Support</a></li>
                    <li className="mobile-hide"><SidConnect className="btn-hover-effect" /></li>
                </ul>
            </nav>
            {showMenu && (
                <nav className="hamburger-menu desktop-hide">
                    <ul className="nav">
                        <li><a className="link-hover-effect" href={UrlConstants.URL_ABOUT}>About</a></li>
                        <li><a className="link-hover-effect" href={UrlConstants.URL_DOCUMENTATION}>Documentation</a></li>
                        <li><a className="link-hover-effect" href={UrlConstants.URL_SUPPORT}>Support</a></li>
                        <li className="tablet-hide item-sid-connect"><SidConnect className="btn-hover-effect" /></li>
                    </ul>
                </nav>
            )}
        </header>
    )
}

export default Header
