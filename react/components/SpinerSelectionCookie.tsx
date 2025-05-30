import React from 'react'
import { Spinner } from 'vtex.styleguide';
import styles from '../styles/styles.css';

export const SpinerSelectionCookie = () => {
  return (
    <div className={styles.generatingContainer}>
          <Spinner />
          <p>Seleccionando tu galleta de la fortuna...</p>
    </div>
  )
}
