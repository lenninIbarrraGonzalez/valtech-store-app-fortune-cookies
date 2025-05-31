import React from 'react'
import { IntlShape } from 'react-intl'

export const StartMessageCookie = ({ containerInfo, cookieIcon, intl }: { containerInfo: string, cookieIcon: string, intl:IntlShape }) => {
  return (
    <div className={containerInfo}>
      <div className={cookieIcon}>🥠</div>
      <h3>{intl.formatMessage({ id: 'valtech.fortune-cookies.startmessagecookie-discover' })}</h3>
      <p>{intl.formatMessage({ id: 'valtech.fortune-cookies.startmessagecookie-paragraph' })}</p>
    </div>
  )
}
