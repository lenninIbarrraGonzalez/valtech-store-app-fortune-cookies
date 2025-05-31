import React from 'react';
import { IntlShape } from 'react-intl'

export const EmptyCookieState = ({ containerInfo, cookieIcon, intl }: { containerInfo: string, cookieIcon: string, intl:IntlShape }) => {
  return (
    <div className={containerInfo}>
      <div className={cookieIcon}>📭</div>
      <h3>{intl.formatMessage({ id: 'valtech.fortune-cookies.emptycookiestate-paragraph' })}</h3>
    </div>
  )
}
