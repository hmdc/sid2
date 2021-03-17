import React from 'react'
import FooterFeatures from './FooterFeatures'

const currentYear = new Date().getFullYear()

const Footer = () => {
    return (
        <footer>
            <FooterFeatures />
            <nav className="footer-copy">
                <ul>
                    <li className="copyright">Copyright © {currentYear} The President and Fellows of Harvard College</li>
                    <li><a className="link-hover-effect" href="https://hwp.harvard.edu/privacy-policy">Privacy</a></li>
                    <li><a className="link-hover-effect" href="http://accessibility.harvard.edu/">Accessibility</a></li>
                    <li><a className="link-hover-effect" href="https://accessibility.huit.harvard.edu/digital-accessibility-policy">Digital Accessibility</a></li>
                    <li><a className="link-hover-effect" href="http://www.harvard.edu/reporting-copyright-infringements">Report Copyright Infringement</a></li>
                </ul>
            </nav>
        </footer>
    )
}

export default Footer
