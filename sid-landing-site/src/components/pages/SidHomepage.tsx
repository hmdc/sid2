import React from 'react'
import { UrlConstants } from '../../utils/UrlUtils'

const SidHomepage = (): JSX.Element => {
  return (
    <div id="sid">
      <div className="description">
        <h2 className="content-hide">Sid Description</h2>
        <p className="description-text">Sid is a service providing high performance computing resources to Social Scientists at <a href="https://www.iq.harvard.edu/" className="link-effect link-hover-effect">The Institute for Quantitative Social Science</a> and the larger community at <a href="https://www.harvard.edu/" className="link-effect link-hover-effect">Harvard University</a>.</p>
        <div className="description-actions">
          <div className="action">
            <span>learn how to get started</span>
            <a href="https://docs.rc.fas.harvard.edu/kb/sid-quickstart-guide/" className="btn-description btn-hover-effect">Quickstart Guide</a>
          </div>
          <div className="action">
            <span>have an account?</span>
            <a href={UrlConstants.URL_SID_CONNECT} className="btn-description btn-hover-effect">Log in to Sid</a>
          </div>
        </div>
      </div>

      <div className="content">
        <h3 className="section-title">You can submit jobs, check running jobs, and open interactive graphical sessions to run applications from the Sid Dashboard.</h3>
        <div className="section-container">
          <section>
            <h4>Getting started</h4>
            <p>
              Check out the <a href="https://docs.rc.fas.harvard.edu/kb/sid-quickstart-guide/" target="_blank" rel="noreferrer" className="link-effect link-hover-effect">Quickstart guide</a> to learn how to access and get started using Sid.
            </p>
            <p className="list-title">
              Some examples of the things you can do from the dashboard:
            </p>
            <ul>
              <li>Open an interactive remote desktop session to a compute node</li>
              <li>Run Jupyter Notebooks</li>
              <li>Run Rstudio Server sessions</li>
              <li>Browse and edit your files</li>
              <li>Open a terminal connection to a login node</li>
            </ul>

            <h4>Documentation and Training</h4>
            <p>
              Check out our documentation for the <a href="https://docs.rc.fas.harvard.edu/kb/sid-interface-guide/" target="_blank" rel="noreferrer" className="link-effect link-hover-effect">Virtual Desktop Interface.</a>
            </p>
            <p className="list-title">
              Refer to the FASRC <a href="https://docs.rc.fas.harvard.edu/" target="_blank" rel="noreferrer" className="link-effect link-hover-effect">documentation</a> to learn more on:
            </p>
            <ul>
              <li><a href="https://docs.rc.fas.harvard.edu/kb/running-jobs/" target="_blank" rel="noreferrer" className="link-effect link-hover-effect">Running jobs on the cluster and requesting resources</a></li>
              <li><a href="https://docs.rc.fas.harvard.edu/kb/convenient-slurm-commands/#Controlling_jobs" target="_blank" rel="noreferrer" className="link-effect link-hover-effect">How to check your running jobs</a> and <a href="https://docs.rc.fas.harvard.edu/kb/fairshare/" target="_blank" rel="noreferrer" className="link-effect link-hover-effect">fairshare</a>
              </li>
              <li><a href="https://docs.rc.fas.harvard.edu/kb/software/" target="_blank" rel="noreferrer" className="link-effect link-hover-effect">Access scientific software in your jobs</a></li>
            </ul>
          </section>

          <section>
            <h4>Support</h4>
            <p>
              If you need help, please contact us following <a href="https://docs.rc.fas.harvard.edu/kb/getting-help-with-sid/" target="_blank" rel="noreferrer" className="link-effect link-hover-effect">these instructions</a>, or come at visit us at our <a href="https://www.rc.fas.harvard.edu/training/office-hours/" target="_blank" rel="noreferrer" className="link-effect link-hover-effect">office hours sessions.</a>
            </p>
            <p>
              We host training sessions regularly! Please refer to our <a href="https://www.rc.fas.harvard.edu/upcoming-training/" target="_blank" rel="noreferrer" className="link-effect link-hover-effect">calendar</a> for more information.
            </p>

            <h4>System Status and Planned Downtime</h4>
            <p>
              Please refer to <a href="https://status.rc.fas.harvard.edu/" target="_blank" rel="noreferrer" className="link-effect link-hover-effect">https://status.rc.fas.harvard.edu/</a> to get the latest information on the status of the system.
            </p>
            <p>
              You can find information on our <a href="https://www.rc.fas.harvard.edu/maintenance" target="_blank" rel="noreferrer" className="link-effect link-hover-effect">monthly planned maintenance window at this page.</a>
            </p>
          </section>
        </div>

        <div className="help">
          <p>
            Sid is hosted by Research Computing at Harvard University's Faculty of Arts and Sciences, with support for Social Science provided by the Institute for Quantitative Social Science.
          </p>
        </div>
        
      </div>
    </div>
  )
}

export default SidHomepage
