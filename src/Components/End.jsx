import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faCopyright } from '@fortawesome/free-solid-svg-icons' // Import from the correct package
import '../Style/End.css'

// Add icons to the library
library.add(faFacebook, faInstagram, faTwitter, faYoutube, faCopyright)

const End = () => {
  return (
    <>
      <div className="end">
        <span>This website is developed and hosted by Sangeet Kumar Padhee</span>
        <div className="follow">
          <span>Follow Us On</span>
          <div className="icons">
            <FontAwesomeIcon icon={faFacebook} />
            <FontAwesomeIcon icon={faInstagram} />
            <FontAwesomeIcon icon={faTwitter} />
            <FontAwesomeIcon icon={faYoutube} />
          </div>
        </div>
        <span><FontAwesomeIcon icon={faCopyright} /> Copyright Santik Automotive</span>
      </div>
    </>
  )
}

export default End
