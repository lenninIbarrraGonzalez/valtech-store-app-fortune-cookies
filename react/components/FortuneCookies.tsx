import React, { useEffect, useState } from 'react';

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
  const [infoCookies, setinfoCookies] = useState({
    data: [],
    isLoading: true,
    hasError: false,
    error: null as null | string,
  });

  const timestamp = new Date().getTime();

  const fetchData = async () => {
    try {
      const response = await fetch(
        `/api/dataentities/CF/search?_fields=id,CookieFortune&_sort=createdIn DESC&_t=${timestamp}`,
        {
          method: "GET",
          headers: { ...authHeaders, "REST-Range": "resources=0-400" },
        }
      );
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setinfoCookies({
        data,
        isLoading: false,
        hasError: false,
        error: null,
      });
    } catch (error) {
      setinfoCookies({
        data: [],
        isLoading: false,
        hasError: true,
        error: error.message || "Error desconocido",
      });
    }
  };

  console.log(infoCookies);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Fortune Cookies</h1>
      <h3>Aquí va la Cookie</h3>
      <h5>Numero Random</h5>
      {/* <h5>{JSON.stringify(infoCookies)}</h5> */}
      <button>Obtener galleta de la fortuna</button>
    </div>
  )
}

export default FortuneCookies
