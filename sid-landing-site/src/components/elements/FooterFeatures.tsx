import React from 'react'
import { UrlConstants } from '../../utils/UrlUtils'
import facebookLogo from '../../assets/facebook.png'
import twitterLogo from '../../assets/twitter.png'

const FooterFeatures = () => {
    return (
        <div id="footer-features">
            <div className="feature">
                <h3><abbr title="Institute for Quantitative Social Science">IQSS</abbr></h3>
                <p className="vcard">
                    <span>Institute for Quantitative Social Science</span><br />
                    <span>1737 Cambridge Street</span><br />
                    <span>CGIS Knafel Building, Room 350</span><br />
                    <span>Cambridge, <abbr title="Massachusetts">MA</abbr> 02138</span><br />
                    <span>Phone: 617-496-2450</span><br />
                    <span>Email: <a href="mailto:help@iq.harvard.edu">help@iq.harvard.edu</a></span>
                    <span>
                    </span>
                </p>
                <p className="vcard-icons">
	                <a href="https://www.facebook.com/iqssharvard" title="harvard facebook link">
                        <img alt="facebook" src={facebookLogo} width="48" height="48" />
                    </a>
                    <a href="https://twitter.com/IQSS"  title="harvard twitter link">
                        <img alt="twitter" src={twitterLogo} width="48" height="48" />
                    </a>
                </p>
            </div>
            <div className="feature">
                <ul>
                    <li><a href={UrlConstants.URL_ABOUT}>About</a></li>
                    <li><a href={UrlConstants.URL_ABOUT_SERVICES}>Services</a></li>
                    <li><a href={UrlConstants.URL_ABOUT_ROADMAP}>Roadmap</a></li>
                    <li><a href={UrlConstants.URL_ABOUT_MIGRATION}>Migration</a></li>
                </ul>
                <ul>
                    <li><a href={UrlConstants.URL_DOCUMENTATION}>Documentation</a></li>
                    <li><a href={UrlConstants.URL_SUPPORT}>Support</a></li>
                </ul>
            </div>
            <div className="feature">
                <ul>
                    <li><a href={UrlConstants.URL_HOME}>More links</a></li>
                </ul>
            </div>
            <div className="feature">
                <ul>
                    <li><a href={UrlConstants.URL_HOME}>More links</a></li>
                </ul>
            </div>
        </div>
    )
}

export default FooterFeatures
