import React from 'react'
import { Spinner } from 'vtex.styleguide';
import styles from '../styles/styles.css';

export const FortuneLoadingScreen = () => {
  return (
    <div className={styles.loadingContainer}>
        <Spinner />
        <p>Cargando galletas de la fortuna...</p>
    </div>
  )
}
