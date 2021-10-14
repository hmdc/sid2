import React, { useState } from 'react'
import { UrlConstants } from '../../utils/UrlUtils'
import Hamburger from './Hamburger'
import SidConnect from './SidConnect'

const Header = (): JSX.Element => {
    const [showMenu, setShowMenu] = useState(false)

    const toggleMenu = (): void => {
        setShowMenu(!showMenu)
    }

    return (
        <header id="header">
            <h1><a href="/">Welcome to </a></h1>
            <nav>
                <ul className="nav">
                    <li className="desktop-hide">
                        <Hamburger toggleMenu={toggleMenu} />
                    </li>
                    <li className="tablet-hide mobile-hide"><a className="link-hover-effect" href={UrlConstants.URL_SID_DOCUMENTATION}>Documentation</a></li>
                    <li className="tablet-hide mobile-hide"><a className="link-hover-effect" href={UrlConstants.URL_SID_SUPPORT}>Support</a></li>
                    <li className="mobile-hide"><SidConnect className="btn-hover-effect" /></li>
                </ul>
            </nav>
            {showMenu && (
                <nav className="hamburger-menu desktop-hide">
                    <ul className="nav">
                        <li><a className="link-hover-effect" href={UrlConstants.URL_SID_DOCUMENTATION}>Documentation</a></li>
                        <li><a className="link-hover-effect" href={UrlConstants.URL_SID_SUPPORT}>Support</a></li>
                        <li className="tablet-hide item-sid-connect"><SidConnect className="btn-hover-effect" /></li>
                    </ul>
                </nav>
            )}
        </header>
    )
}

export default Header
