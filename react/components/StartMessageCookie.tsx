import React from 'react'
import styles from '../styles/styles.css';

export const StartMessageCookie = () => {
  return (
    <div className={styles.initialState}>
      <div className={styles.cookieIcon}>🥠</div>
      <h3>¡Descubre tu fortuna!</h3>
      <p>Presiona el botón para obtener una galleta de la suerte</p>
    </div>
  )
}
