import React from 'react';
import { useIntl } from 'react-intl';
import {  ShowCookieResultProps } from '../interfaces/interfaces';

export const ShowCookieResult: React.FC<ShowCookieResultProps> = (
  { currentCookie,
    luckyNumber,
    fortuneCard,
    fortuneTitle,
    fortuneText,
    luckySection,
    luckyNum,
    cookieId }) => {
  const intl = useIntl();
  return (
    <div className={fortuneCard}>
      <h2 className={fortuneTitle}>🥠 {intl.formatMessage({ id: 'valtech.fortune-cookies.showcookieresult-title' })} 🥠</h2>
      <h3 className={fortuneText}>"{currentCookie.CookieFortune}"</h3>
      <div className={luckySection}>
        <h5 className={luckyNum}>
          🍀 {intl.formatMessage({ id: 'valtech.fortune-cookies.showcookieresult-number' })} <strong>{luckyNumber}</strong> 🍀
        </h5>
        <small className={cookieId}>{intl.formatMessage({ id: 'valtech.fortune-cookies.showcookieresult-id' })} {currentCookie.id}</small>
      </div>
    </div>
  )
}

