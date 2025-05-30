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
  isUpdatingData: boolean;
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
    isUpdatingData: false,
  });

  const [luckyNumber, setLuckyNumber] = useState<string>("");

  // Función para obtener TODAS las galletas una sola vez
  const fetchAllCookies = useCallback(async () => {
    setState(prev => ({
      ...prev,
      isLoading: true,
      hasError: false,
      error: null,
    }));

    const timestamp = new Date().getTime();

    try {
      // Primer llamado para obtener el total de registros
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

      // Obtener el total del header
      const contentRange = countResponse.headers.get('REST-Content-Range');
      const totalRecords = contentRange ? parseInt(contentRange.split('/')[1]) : 0;

      console.log(`Total de galletas encontradas: ${totalRecords}`);

      // Si no hay registros, actualizar el estado y salir
      if (totalRecords === 0) {
        setState(prev => ({
          ...prev,
          allCookies: [], // Limpiar array de galletas
          currentCookie: null, // Limpiar galleta actual
          isLoading: false,
          hasError: false, // No es un error, simplemente no hay datos
          error: null,
        }));
        return;
      }

      // Segundo llamado para obtener TODAS las galletas
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

      if (!allCookiesData || !Array.isArray(allCookiesData)) {
        setState(prev => ({
          ...prev,
          allCookies: [],
          currentCookie: null,
          isLoading: false,
          hasError: false,
          error: null,
        }));
        return;
      }

      console.log(`Galletas cargadas exitosamente: ${allCookiesData.length}`);

      setState(prev => ({
        ...prev,
        allCookies: allCookiesData,
        isLoading: false,
        hasError: false,
        error: null,
      }));

    } catch (error) {
      console.error('Error fetching cookies:', error);
      setState(prev => ({
        ...prev,
        allCookies: [],
        currentCookie: null,
        isLoading: false,
        hasError: true,
        error: error instanceof Error ? error.message : "Error desconocido al cargar las galletas",
      }));
    }
  }, []);

  // Función para verificar si hay nuevas galletas en el Master Data
  const checkForNewCookies = useCallback(async () => {
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
      const currentTotalRecords = contentRange ? parseInt(contentRange.split('/')[1]) : 0;

      console.log(`Galletas en Master Data: ${currentTotalRecords}, Galletas en memoria: ${state.allCookies.length}`);

      return {
        hasNewData: currentTotalRecords !== state.allCookies.length,
        totalRecords: currentTotalRecords
      };
    } catch (error) {
      console.error('Error checking for new cookies:', error);
      return {
        hasNewData: false,
        totalRecords: state.allCookies.length
      };
    }
  }, [state.allCookies.length]);

  // Función para actualizar galletas cuando hay nuevos datos
  const updateCookiesData = useCallback(async (totalRecords: number) => {
    setState(prev => ({ ...prev, isUpdatingData: true }));

    try {
      // Si totalRecords es 0, limpiar el estado
      if (totalRecords === 0) {
        console.log('No hay galletas en Master Data. Limpiando estado local.');
        setState(prev => ({
          ...prev,
          allCookies: [],
          currentCookie: null,
          isUpdatingData: false,
          hasError: false,
          error: null,
        }));
        return true;
      }

      const timestamp = new Date().getTime();
      const allResponse = await fetch(
        `/api/dataentities/CF/search?_fields=id,CookieFortune&_size=${totalRecords}&_t=${timestamp}`,
        {
          method: "GET",
          headers: authHeaders,
        }
      );

      if (!allResponse.ok) {
        throw new Error(`HTTP error! status: ${allResponse.status}`);
      }

      const allCookiesData = await allResponse.json();

      if (!allCookiesData || !Array.isArray(allCookiesData)) {
        setState(prev => ({
          ...prev,
          allCookies: [],
          currentCookie: null,
          isUpdatingData: false,
          hasError: false,
          error: null,
        }));
        return true;
      }

      console.log(`Galletas actualizadas exitosamente: ${allCookiesData.length}`);

      setState(prev => ({
        ...prev,
        allCookies: allCookiesData,
        isUpdatingData: false,
        hasError: false,
        error: null,
      }));

      return true;
    } catch (error) {
      console.error('Error updating cookies:', error);
      setState(prev => ({
        ...prev,
        isUpdatingData: false,
        hasError: true,
        error: error instanceof Error ? error.message : "Error al actualizar las galletas",
      }));
      return false;
    }
  }, []);

  const generateLuckyNumber = useCallback(() => {
    const getRandom = (length: number) =>
      Array.from({ length }, () => Math.floor(Math.random() * 10)).join("");
    return `${getRandom(2)}-${getRandom(2)}-${getRandom(4)}`;
  }, []);

  // Función para seleccionar una galleta aleatoria del estado local
  const selectRandomCookie = useCallback(() => {
    if (state.allCookies.length === 0) {
      setState(prev => ({
        ...prev,
        currentCookie: null,
        hasError: false, // No es un error, simplemente no hay galletas
        error: null,
      }));
      return;
    }

    setState(prev => ({ ...prev, isGeneratingFortune: true }));

    // Simular un pequeño delay para mejor UX
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * state.allCookies.length);
      const selectedCookie = state.allCookies[randomIndex];

      console.log(`Galleta seleccionada: índice ${randomIndex} de ${state.allCookies.length}`);
      console.log(`ID: ${selectedCookie.id}, Fortuna: ${selectedCookie.CookieFortune}`);

      setState(prev => ({
        ...prev,
        currentCookie: selectedCookie,
        isGeneratingFortune: false,
        hasError: false,
        error: null,
      }));
    }, 800); // Delay de 800ms para efecto visual

  }, [state.allCookies]);

  // Manejador del botón - ahora incluye validación de nuevos datos
  const handleButtonClick = useCallback(async () => {
    // Solo generar número de la suerte si hay galletas disponibles
    if (state.allCookies.length > 0) {
      const lucky = generateLuckyNumber();
      setLuckyNumber(lucky);
    }

    // Verificar si hay nuevas galletas en el Master Data
    console.log('Verificando si hay nuevas galletas...');
    const { hasNewData, totalRecords } = await checkForNewCookies();

    if (hasNewData) {
      console.log(`Se detectaron cambios en los datos. Total de registros: ${totalRecords}`);
      const updateSuccess = await updateCookiesData(totalRecords);

      if (!updateSuccess) {
        // Si falló la actualización, usar datos actuales
        selectRandomCookie();
        return;
      }

      // Si totalRecords es 0, no intentar seleccionar galleta
      if (totalRecords === 0) {
        console.log('No hay galletas disponibles después de la actualización.');
        return;
      }

      // Esperar un momento para que el estado se actualice
      setTimeout(() => {
        selectRandomCookie();
      }, 100);
    } else {
      console.log('No hay cambios en los datos. Usando datos en memoria.');
      // Seleccionar galleta aleatoria del estado local actual
      selectRandomCookie();
    }
  }, [generateLuckyNumber, checkForNewCookies, updateCookiesData, selectRandomCookie, state.allCookies.length]);

  // Cargar galletas al montar el componente
  useEffect(() => {
    fetchAllCookies();
  }, [fetchAllCookies]);

  // Estado de carga inicial
  if (state.isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner />
        <p>Cargando galletas de la fortuna...</p>
        <small>Obteniendo todas las galletas disponibles...</small>
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
        {state.allCookies.length === 0 && (
          <p className={styles.noDataMessage}>
            📭 No hay galletas de la fortuna disponibles en este momento.
          </p>
        )}
      </div>

      {/* Estado: Actualizando datos */}
      {state.isUpdatingData && (
        <div className={styles.generatingContainer}>
          <Spinner />
          <p>Actualizando galletas desde el servidor...</p>
          <small>🔄 Sincronizando con Master Data</small>
        </div>
      )}

      {/* Estado: Generando fortuna */}
      {state.isGeneratingFortune && !state.isUpdatingData && (
        <div className={styles.generatingContainer}>
          <Spinner />
          <p>Seleccionando tu galleta de la fortuna...</p>
          <small>✨ La magia está sucediendo ✨</small>
        </div>
      )}

      {/* Estado: Error */}
      {state.hasError && !state.isGeneratingFortune && !state.isUpdatingData && (
        <div className={styles.selectionError}>
          <h3>Error</h3>
          <p>{state.error}</p>
        </div>
      )}

      {/* Estado: Galleta seleccionada */}
      {state.currentCookie && !state.isGeneratingFortune && !state.isUpdatingData && !state.hasError && (
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

      {/* Estado: Sin galletas pero con botón habilitado para refrescar */}
      {state.allCookies.length === 0 && !state.isGeneratingFortune && !state.isUpdatingData && !state.hasError && (
        <div className={styles.initialState}>
          <div className={styles.cookieIcon}>📭</div>
          <h3>No hay galletas disponibles</h3>
          <p>Presiona el botón para verificar si hay nuevas galletas</p>
        </div>
      )}

      {/* Estado: Inicial con galletas disponibles */}
      {state.allCookies.length > 0 && !state.currentCookie && !state.isGeneratingFortune && !state.isUpdatingData && !state.hasError && luckyNumber === "" && (
        <div className={styles.initialState}>
          <div className={styles.cookieIcon}>🥠</div>
          <h3>¡Descubre tu fortuna!</h3>
          <p>Presiona el botón para obtener una galleta de la suerte</p>
        </div>
      )}

      {/* Botón principal */}
      <div className={styles.buttonContainer}>
        <button
          onClick={handleButtonClick}
          disabled={state.isGeneratingFortune || state.isUpdatingData}
          className={`${styles.mainButton} ${
            (state.isGeneratingFortune || state.isUpdatingData)
              ? styles.buttonDisabled
              : styles.buttonEnabled
          }`}
        >
          {state.isUpdatingData
            ? '🔄 Actualizando datos...'
            : state.isGeneratingFortune
              ? '🥠 Seleccionando...'
              : state.allCookies.length === 0
                ? '🔄 Verificar galletas disponibles'
                : '🥠 Obtener galleta de la fortuna'
          }
        </button>
      </div>

      {/* Información adicional */}
      <div className={styles.infoFooter}>
        <p>
          💡 <strong>Inteligente:</strong> Las galletas se sincronizan automáticamente<br/>
          con Master Data cada vez que presionas el botón. ✨
        </p>
      </div>
    </div>
  );
};

export default FortuneCookies;
