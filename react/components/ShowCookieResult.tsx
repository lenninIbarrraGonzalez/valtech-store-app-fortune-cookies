import React from 'react';
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
  return (
    <div className={fortuneCard}>
      <h2 className={fortuneTitle}>🥠 Tu Fortuna 🥠</h2>
      <h3 className={fortuneText}>"{currentCookie.CookieFortune}"</h3>
      <div className={luckySection}>
        <h5 className={luckyNum}>
          🍀 Número de la suerte: <strong>{luckyNumber}</strong> 🍀
        </h5>
        <small className={cookieId}>Galleta ID: {currentCookie.id}</small>
      </div>
    </div>
  )
}
