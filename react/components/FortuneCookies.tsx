import React from 'react';
import { Spinner } from 'vtex.styleguide';
import { useFortuneCookies } from '../hooks/useFortuneCookies';
import styles from '../styles/styles.css';

const FortuneCookies = () => {
  const {
    cookies,
    currentCookie,
    loading,
    showSpinner,
    luckyNumber,
    handleGetCookie,
  } = useFortuneCookies();

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner />
        <p>Cargando galletas de la fortuna...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {showSpinner && (
        <div className={styles.generatingContainer}>
          <Spinner />
          <p>Seleccionando tu galleta de la fortuna...</p>
        </div>
      )}

      {!showSpinner && currentCookie && (
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
      )}

      {!showSpinner && !currentCookie && cookies.length > 0 && (
        <div className={styles.initialState}>
          <div className={styles.cookieIcon}>🥠</div>
          <h3>¡Descubre tu fortuna!</h3>
          <p>Presiona el botón para obtener una galleta de la suerte</p>
        </div>
      )}

      {!showSpinner && cookies.length === 0 && (
        <div className={styles.initialState}>
          <div className={styles.cookieIcon}>📭</div>
          <h3>No hay galletas disponibles</h3>
        </div>
      )}

      <div className={styles.buttonContainer}>
        <button
          onClick={handleGetCookie}
          disabled={showSpinner || cookies.length === 0}
          className={`${styles.mainButton} ${
            (showSpinner || cookies.length === 0) ? styles.buttonDisabled : styles.buttonEnabled
          }`}
        >
          {showSpinner ? '🥠 Seleccionando...' : '🥠 Obtener galleta de la fortuna'}
        </button>
      </div>
    </div>
  );
};

export default FortuneCookies;
