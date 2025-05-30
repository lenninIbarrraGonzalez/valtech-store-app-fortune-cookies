import React from 'react';
import { useFortuneCookies } from '../hooks/useFortuneCookies';
import styles from '../styles/styles.css';
import { SpinerSelectionCookie } from './SpinerSelectionCookie';
import { ShowCookieResult } from './ShowCookieResult';
import { StartMessageCookie } from './StartMessageCookie';
import { EmptyCookieState } from './EmptyCookieState';
import { FortuneLoadingScreen } from './FortuneLoadingScreen';

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
        <FortuneLoadingScreen/>
    );
  }

  return (
    <div className={styles.container}>
      {showSpinner && (
        <SpinerSelectionCookie/>
      )}

      {!showSpinner && currentCookie && (
        <ShowCookieResult
          currentCookie={currentCookie}
          luckyNumber={luckyNumber}
        />
      )}

      {!showSpinner && !currentCookie && cookies.length > 0 && (
          <StartMessageCookie/>
      )}

      {!showSpinner && cookies.length === 0 && (
        <EmptyCookieState/>
      )}

      <div className={styles.buttonContainer}>
        <button
          onClick={handleGetCookie}
          disabled={showSpinner || cookies.length === 0}
          className={`${styles.mainButton} ${
            (showSpinner || cookies.length === 0) ? styles.buttonDisabled : styles.buttonEnabled
          }`}
        >
          {showSpinner ? '🥠 Buena suerte...' : '🥠 Obtener galleta de la fortuna'}
        </button>
      </div>
    </div>
  );
};

export default FortuneCookies;
