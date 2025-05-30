import React, { useEffect, useState, useCallback } from 'react';
import { Spinner } from 'vtex.styleguide';
import styles from '../styles/styles.css';

interface IFortuneCookie {
  id: string;
  CookieFortune: string;
}

type AppState = {
  allCookies: IFortuneCookie[];
  currentCookie: IFortuneCookie | null;
  isLoading: boolean;
  hasError: boolean;
  error: null | string;
  isGeneratingFortune: boolean;
};

const API_KEY = "vtexappkey-valtech-NFMZFZ";
const API_TOKEN =
  "LQRXPQPTDBKGKWRVCANKXTPOLKBETQHSZQQQDLHZYQIEAAPAXXOOBBTHDAIVDFHMOJEKONISITNIVXQNAANCBSUMLUWDKTFJLMSFGKVVFRQYYHIISKVRPKSNWSVJQSNR";

const authHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "X-Vtex-Use-Https": "true",
  "X-VTEX-API-AppKey": API_KEY,
  "X-VTEX-API-AppToken": API_TOKEN,
};

const FortuneCookies = () => {
  const [state, setState] = useState<AppState>({
    allCookies: [],
    currentCookie: null,
    isLoading: true,
    hasError: false,
    error: null,
    isGeneratingFortune: false,
  });

  const [luckyNumber, setLuckyNumber] = useState<string>("");

  const fetchAllCookies = useCallback(async () => {
    setState(prev => ({
      ...prev,
      isLoading: true,
      hasError: false,
      error: null,
    }));

    const timestamp = new Date().getTime();

    try {
      const countResponse = await fetch(
        `/api/dataentities/CF/search?_fields=id&_size=1&_t=${timestamp}`,
        {
          method: "GET",
          headers: authHeaders,
        }
      );

      if (!countResponse.ok) {
        throw new Error(`HTTP error! status: ${countResponse.status}`);
      }

      const contentRange = countResponse.headers.get('REST-Content-Range');
      const totalRecords = contentRange ? parseInt(contentRange.split('/')[1]) : 0;

      if (totalRecords === 0) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          hasError: true,
          error: "No hay galletas disponibles en la base de datos",
        }));
        return;
      }

      const allResponse = await fetch(
        `/api/dataentities/CF/search?_fields=id,CookieFortune&_size=${totalRecords}&_t=${timestamp + 1}`,
        {
          method: "GET",
          headers: authHeaders,
        }
      );

      if (!allResponse.ok) {
        throw new Error(`HTTP error! status: ${allResponse.status}`);
      }

      const allCookiesData = await allResponse.json();

      if (!allCookiesData || !Array.isArray(allCookiesData) || allCookiesData.length === 0) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          hasError: true,
          error: "No se pudieron cargar las galletas",
        }));
        return;
      }

      setState(prev => ({
        ...prev,
        allCookies: allCookiesData,
        isLoading: false,
        hasError: false,
        error: null,
      }));

    } catch (error) {
      setState(prev => ({
        ...prev,
        allCookies: [],
        isLoading: false,
        hasError: true,
        error: error instanceof Error ? error.message : "Error desconocido al cargar las galletas",
      }));
    }
  }, []);

  const generateLuckyNumber = useCallback(() => {
    const getRandom = (length: number) =>
      Array.from({ length }, () => Math.floor(Math.random() * 10)).join("");
    return `${getRandom(2)}-${getRandom(2)}-${getRandom(4)}`;
  }, []);

  const selectRandomCookie = useCallback(() => {
    if (state.allCookies.length === 0) {
      setState(prev => ({
        ...prev,
        currentCookie: null,
        hasError: true,
        error: "No hay galletas disponibles",
      }));
      return;
    }

    setState(prev => ({ ...prev, isGeneratingFortune: true }));

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * state.allCookies.length);
      const selectedCookie = state.allCookies[randomIndex];

      setState(prev => ({
        ...prev,
        currentCookie: selectedCookie,
        isGeneratingFortune: false,
        hasError: false,
        error: null,
      }));
    }, 800);

  }, [state.allCookies]);

  const handleButtonClick = useCallback(() => {
    const lucky = generateLuckyNumber();
    setLuckyNumber(lucky);
    selectRandomCookie();
  }, [generateLuckyNumber, selectRandomCookie]);

  useEffect(() => {
    fetchAllCookies();
  }, [fetchAllCookies]);

  if (state.isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner />
        <p>Cargando galletas de la fortuna...</p>
        <small>Obteniendo todas las galletas disponibles...</small>
      </div>
    );
  }

  if (state.hasError && state.allCookies.length === 0) {
    return (
      <div className={styles.errorContainer}>
        <h3>Error al cargar las galletas de la fortuna</h3>
        <p>{state.error}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🥠 Fortune Cookies 🥠</h1>

      <div className={styles.infoSection}>
        <p>
          <strong>Total de galletas disponibles: {state.allCookies.length}</strong>
        </p>
      </div>

      {state.isGeneratingFortune && (
        <div className={styles.generatingContainer}>
          <Spinner />
          <p>Seleccionando tu galleta de la fortuna...</p>
          <small>✨ La magia está sucediendo ✨</small>
        </div>
      )}

      {state.hasError && !state.isGeneratingFortune && state.allCookies.length > 0 && (
        <div className={styles.selectionError}>
          <h3>Error</h3>
          <p>{state.error}</p>
        </div>
      )}

      {state.currentCookie && !state.isGeneratingFortune && !state.hasError && (
        <div className={styles.fortuneCard}>
          <h2 className={styles.fortuneTitle}>
            🥠 Tu Fortuna 🥠
          </h2>
          <h3 className={styles.fortuneText}>
            "{state.currentCookie.CookieFortune}"
          </h3>
          <div className={styles.luckySection}>
            <h5 className={styles.luckyNumber}>
              🍀 Número de la suerte: <strong>{luckyNumber}</strong> 🍀
            </h5>
            <small className={styles.cookieId}>
              Galleta ID: {state.currentCookie.id}
            </small>
          </div>
        </div>
      )}

      {!state.currentCookie && !state.isGeneratingFortune && !state.hasError && luckyNumber === "" && (
        <div className={styles.initialState}>
          <div className={styles.cookieIcon}>🥠</div>
          <h3>¡Descubre tu fortuna!</h3>
          <p>Presiona el botón para obtener una galleta de la suerte</p>
        </div>
      )}

      <div className={styles.buttonContainer}>
        <button
          onClick={handleButtonClick}
          disabled={state.isGeneratingFortune || state.allCookies.length === 0}
          className={`${styles.mainButton} ${
            (state.isGeneratingFortune || state.allCookies.length === 0)
              ? styles.buttonDisabled
              : styles.buttonEnabled
          }`}
        >
          {state.allCookies.length === 0
            ? '🚫 No hay galletas disponibles'
            : state.isGeneratingFortune
              ? '🥠 Seleccionando...'
              : '🥠 Obtener galleta de la fortuna'
          }
        </button>
      </div>
    </div>
  );
};

export default FortuneCookies;
