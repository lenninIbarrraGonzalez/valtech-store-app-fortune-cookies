import React from 'react';
import styles from '../styles/styles.css';

export const EmptyCookieState = () => {
  return (
    <div className={styles.initialState}>
      <div className={styles.cookieIcon}>📭</div>
      <h3>No hay galletas disponibles</h3>
    </div>
  )
}
