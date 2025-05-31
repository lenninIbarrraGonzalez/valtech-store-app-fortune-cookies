import React from 'react'
import { Spinner } from 'vtex.styleguide';
import { IntlShape } from 'react-intl'

export const FortuneLoadingScreen = ({ loadingContainer, intl}: { loadingContainer: string, intl:IntlShape }) => {
  return (
    <div className={loadingContainer}>
        <Spinner color="#f59e0b" size={40}/>
        <p>{intl.formatMessage({ id: 'valtech.fortune-cookies.fortuneloadingscreen' })}</p>
    </div>
  )
}
