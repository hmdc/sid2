import React from 'react'
import { UrlConstants } from '../../utils/UrlUtils'

const NotFound = () => {
  return (
    <div id="notfound">
        <h2 className="content-hide">Not Found</h2>
        <p>The URL might be incorrect or have changed. Please go back to the <a href={UrlConstants.URL_HOME}>homepage</a></p>
    </div>
  )
}

export default NotFound
