import React from 'react'
import { Spinner } from 'vtex.styleguide';
import { IntlShape } from 'react-intl'

export const SpinerSelectionCookie = ({generatingContainer , intl}: { generatingContainer: string, intl:IntlShape }) => {
  return (
    <div className={generatingContainer}>
          <Spinner color="#f59e0b" size={40}/>
          <p>{intl.formatMessage({ id: 'valtech.fortune-cookies.spinerselectioncookie-msn' })}</p>
    </div>
  )
}
