import React from 'react'
import iqssLogo from '../../assets/iqss_logo.png'
import fasrcLogo from '../../assets/fasrc_logo.jpg'

const FooterBanner = (): JSX.Element => {
    return (
        <div id="footer-banner">
            <a className="btn-hover-effect" href="https://www.iq.harvard.edu/">
                <img alt="IQSS" src={iqssLogo} height="40" />
            </a>
            <a className="btn-hover-effect" href="https://www.rc.fas.harvard.edu/">
                <img alt="FASRC" src={fasrcLogo} height="40" />
            </a>
        </div>
    )
}

export default FooterBanner
