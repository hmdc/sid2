import React from 'react'
import { UrlConstants } from '../../utils/UrlUtils'

const Home = () => {
    return (
        <div id="homepage">
            <div id="main-content">
                <h2 className="content-hide">IQSS Description</h2>
                <p className="main-text">
                IQSS offer access to high-performance machines through its on-premise labs, data science consulting services, specialized social science research computing support, and data science products that the Harvard social science community has come to rely on.
                </p>
                <a className="btn-hover-effect" href="#">Learn more</a>
            </div>
            <div id="features">
                <div className="feature-item">
                    <h3>Data Levels Supported</h3>
                    <div className="feature-item-content">
                        <p>
                            IQSS/HMDC can only support up to <a href="https://policy.security.harvard.edu/level-3">Level 3 data.</a>
                        </p>
                        <p>
                            When you apply for an RCE account, you are asked which category would best suit your needs.
                            Therefore, you should know ahead of time if your data is rated as <a href="#">confidential information</a> by your <a href="http://vpr.harvard.edu/pages/human-subjects-and-irbs">IRB</a>.
                        </p>
                    </div>
                    <a className="learn-more" href={UrlConstants.URL_ABOUT}>Learn more</a>
                </div>
                <div className="feature-item">
                    <h3>Statistical Applications</h3>
                    <div className="feature-item-content">
                    <p>
	                    The following statistical applications are available on the RCE:
                    </p>

                    <ul>
                        <li><a href="http://www.aptech.com/" target="_blank" rel="noreferrer">GAUSS</a> (8, 14) </li>
	                    <li><a href="http://www.wolfram.com/mathematica/" target="_blank" rel="noreferrer">Mathematica</a> (latest version)</li>
	                    <li><a href="http://www.mathworks.com/products/matlab/" target="_blank" rel="noreferrer">MATLAB</a> (latest version)</li>
	                    <li><a href="http://www.gnu.org/software/octave/" target="_blank" rel="noreferrer">Octave</a> (latest version from <a href="http://dl.fedoraproject.org/pub/epel/6/x86_64/repoview/octave.html">EPEL repo</a>)</li>
	                    <li><a href="http://www.r-project.org/" target="_blank" rel="noreferrer">R</a> (latest version from <a href="http://dl.fedoraproject.org/pub/epel/6/x86_64/repoview/R.html">EPEL repo</a>)</li>
	                    <li><a href="http://www.rstudio.com/" target="_blank" rel="noreferrer">RStudio</a></li>
	                    <li><a href="http://www.sas.com/" target="_blank" rel="noreferrer">SAS</a> (latest version)</li>
	                    <li><a href="http://www.stata.com/" target="_blank" rel="noreferrer">Stata</a> SE and MP (latest version)</li>
                    </ul>
                    </div>
                    <a className="learn-more" href={UrlConstants.URL_DOCUMENTATION}>Learn more</a>
                </div>
                <div className="feature-item">
                    <h3>Tools &amp; Utilities</h3>
                    <div className="feature-item-content">
                    <p>Many common code and text editors are available, such as:</p>
                    <ul>
                        <li>Emacs</li>
                        <li>Eclipse</li>
                        <li>Gedit</li>
                        <li>Bluefish</li>
                        <li>Kwrite</li>
                        <li>Vim</li>
                    </ul>
                    <p>
                        Version control tools are available to interact source code repositories:
                    </p>

                    <ul>
                        <li>git (to interface with <a href="http://github.com/">GitHub</a> <a href="http://git.huit.harvard.edu/">Gitorious</a> or private git repo's)</li>
	                    <li>Subversion (svn)</li>
	                    <li>CVS</li>
                    </ul>
                    </div>
                    <a className="learn-more" href={UrlConstants.URL_DOCUMENTATION}>Learn more</a>
                </div>
            </div>
            <div className="feature-actions">
                <a className="btn-hover-effect" href={UrlConstants.URL_SID_CONNECT}>Connect to Sid</a>
            </div>
            
        </div>
    )
}

export default Home
