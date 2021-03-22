import React from 'react'

import { UrlConstants } from '../../utils/UrlUtils'

const LearnMoreLink = ({ href = UrlConstants.URL_HOME, text = 'Learn more' } = {} ) => {
  return (
    <a className="learn-more" href={href}>{text}</a>
  )
}

export default LearnMoreLink
