import React from 'react';
import styles from '../styles/styles.css';
import {  ShowCookieResultProps } from '../interfaces/interfaces';

export const ShowCookieResult: React.FC<ShowCookieResultProps> = ({ currentCookie, luckyNumber }) => {
  return (
    <div className={styles.fortuneCard}>
      <h2 className={styles.fortuneTitle}>🥠 Tu Fortuna 🥠</h2>
      <h3 className={styles.fortuneText}>"{currentCookie.CookieFortune}"</h3>
      <div className={styles.luckySection}>
        <h5 className={styles.luckyNumber}>
          🍀 Número de la suerte: <strong>{luckyNumber}</strong> 🍀
        </h5>
        <small className={styles.cookieId}>Galleta ID: {currentCookie.id}</small>
      </div>
    </div>
  )
}
