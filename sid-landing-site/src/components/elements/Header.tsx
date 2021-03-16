import React from 'react'
import { UrlConstants } from '../../utils/UrlUtils'
import SidConnect from './SidConnect'

const Header = () => {
    return (
        <div className="header">
            <h1><a href="/">Welcome to </a></h1>
            <nav>
                <ul className="nav">
                    <li><a className="link-hover-effect" href={UrlConstants.URL_ABOUT}>About</a></li>
                    <li><a className="link-hover-effect" href={UrlConstants.URL_DOCUMENTATION}>Documentation</a></li>
                    <li><a className="link-hover-effect" href={UrlConstants.URL_SUPPORT}>Support</a></li>
                    <li><SidConnect className="btn-hover-effect" /></li>
                </ul>
            </nav>
            
        </div>
    )
}

export default Header
