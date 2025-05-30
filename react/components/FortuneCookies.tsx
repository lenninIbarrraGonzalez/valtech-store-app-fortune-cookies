import React from 'react';
import { SpinerSelectionCookie } from './SpinerSelectionCookie';
import { ShowCookieResult } from './ShowCookieResult';
import { StartMessageCookie } from './StartMessageCookie';
import { EmptyCookieState } from './EmptyCookieState';
import { FortuneLoadingScreen } from './FortuneLoadingScreen';
import { useFortuneCookies } from '../hooks/useFortuneCookies';
import { useCssHandles } from 'vtex.css-handles';

const CSS_HANDLES = [
    'container',
    'containerInfo',
    'cookieIcon',
    'buttonSend',
    'mainButton',
    'buttonDisabled',
    'buttonEnabled',
    'containerInfo',
    'loadingContainer',
    'generatingContainer',
    'fortuneCard',
    'fortuneTitle',
    'fortuneText',
    'luckySection',
    'luckyNum',
    'cookieId'

] as const

const FortuneCookies = () => {
  const handles = useCssHandles(CSS_HANDLES);
  const {
    cookies,
    currentCookie,
    loading,
    showSpinner,
    luckyNumber,
    handleGetCookie,
  } = useFortuneCookies();

  // Agrega este log para ver el estado de las galletas
  console.log('Estado de cookies:', cookies);

  if (loading) {
    return (
        <FortuneLoadingScreen
          loadingContainer={handles.loadingContainer}
        />
    );
  }

  return (
    <div className={`${handles.container}`}>
      {showSpinner && (
        <SpinerSelectionCookie generatingContainer={handles.generatingContainer} />
      )}

      {!showSpinner && cookies.length === 0 && (
        <EmptyCookieState
          containerInfo={handles.containerInfo}
          cookieIcon={handles.cookieIcon}
        />
      )}

      {!showSpinner && currentCookie && (
        <ShowCookieResult
          currentCookie={currentCookie}
          luckyNumber={luckyNumber}
          fortuneCard={handles.fortuneCard}
          fortuneTitle={handles.fortuneTitle}
          fortuneText={handles.fortuneText}
          luckySection={handles.luckySection}
          luckyNum={handles.luckyNumber}
          cookieId={handles.cookieId}
        />
      )}

      {!showSpinner && !currentCookie && cookies.length > 0 && (
        <StartMessageCookie
          containerInfo={handles.containerInfo}
          cookieIcon={handles.cookieIcon}
        />
      )}

      {/* Oculta el botón si no existen galletas */}
      {cookies.length > 0 && (
        <div className={`${handles.buttonSend}`}>
          <button
            onClick={handleGetCookie}
            disabled={showSpinner || cookies.length === 0}
            className={`${handles.mainButton} ${
              (showSpinner || cookies.length === 0) ? handles.buttonDisabled : handles.buttonEnabled
            }`}
          >
            {showSpinner ? '🥠 Buena suerte...' : '🥠 Obtener galleta de la fortuna'}
          </button>
        </div>
      )}
    </div>
  )
};

export default FortuneCookies;
