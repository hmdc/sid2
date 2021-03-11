import React from 'react'

import { UrlConstants } from '../../utils/UrlUtils'

const SidConnect = ({ className = '' } = {} ) => {
  return (
    <a className={'sid-connect ' + className} href={UrlConstants.URL_SID_CONNECT}>
      <span className="connect-icon">Connect to</span>
    </a>
  )
}

export default SidConnect
