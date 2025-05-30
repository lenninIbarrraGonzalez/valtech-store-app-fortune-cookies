import React, { useEffect, useState } from 'react';
import { Spinner } from 'vtex.styleguide';
import styles from '../styles/styles.css';

interface IFortuneCookie {
  id: string;
  CookieFortune: string;
}

const API_KEY = "vtexappkey-valtech-NFMZFZ";
const API_TOKEN = "LQRXPQPTDBKGKWRVCANKXTPOLKBETQHSZQQQDLHZYQIEAAPAXXOOBBTHDAIVDFHMOJEKONISITNIVXQNAANCBSUMLUWDKTFJLMSFGKVVFRQYYHIISKVRPKSNWSVJQSNR";

const authHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "X-Vtex-Use-Https": "true",
  "X-VTEX-API-AppKey": API_KEY,
  "X-VTEX-API-AppToken": API_TOKEN,
};

const FortuneCookies = () => {
  const [cookies, setCookies] = useState<IFortuneCookie[]>([]);
  const [currentCookie, setCurrentCookie] = useState<IFortuneCookie | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSpinner, setShowSpinner] = useState(false);
  const [luckyNumber, setLuckyNumber] = useState<string>("");

  useEffect(() => {
    const fetchCookies = async () => {
      try {
        const response = await fetch(
          `/api/dataentities/CF/search?_fields=id,CookieFortune&_from=0&_to=99`,
          {
            method: "GET",
            headers: authHeaders,
          }
        );
        if (!response.ok) throw new Error();
        const data: IFortuneCookie[] = await response.json();
        setCookies(data);
      } catch {
        setCookies([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCookies();
  }, []);

  const generateLuckyNumber = () => {
    const getRandom = (length: number) =>
      Array.from({ length }, () => Math.floor(Math.random() * 10)).join("");
    return `${getRandom(2)}-${getRandom(2)}-${getRandom(4)}`;
  };

  const handleGetCookie = () => {
    if (cookies.length === 0) return;
    setShowSpinner(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * cookies.length);
      setCurrentCookie(cookies[randomIndex]);
      setLuckyNumber(generateLuckyNumber());
      setShowSpinner(false);
    }, 2000);
  };

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
