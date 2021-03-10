import React from 'react'
import { UrlConstants } from '../utils/UrlUtils'

const Header = () => {
    return (
        <div id="header">
            <h1><a href="/">Welcome to </a></h1>
            <nav>
                <ul className="nav">
                    <li><a className="link-hover-effect" href={UrlConstants.URL_ABOUT}>About</a></li>
                    <li><a className="link-hover-effect" href={UrlConstants.URL_DOCUMENTATION}>Documentation</a></li>
                    <li><a className="link-hover-effect" href={UrlConstants.URL_SUPPORT}>Support</a></li>
                    <li className="connect-icon btn-hover-effect"><a className="connect-icon" href={UrlConstants.URL_SID_CONNECT}>Connect to</a></li>
                </ul>
            </nav>
            
        </div>
    )
}

export default Header
