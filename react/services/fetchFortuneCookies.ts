import { IFortuneCookie } from '../interfaces/interfaces'

const API_KEY = "vtexappkey-valtech-NFMZFZ";
const API_TOKEN = "LQRXPQPTDBKGKWRVCANKXTPOLKBETQHSZQQQDLHZYQIEAAPAXXOOBBTHDAIVDFHMOJEKONISITNIVXQNAANCBSUMLUWDKTFJLMSFGKVVFRQYYHIISKVRPKSNWSVJQSNR";

const authHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "X-Vtex-Use-Https": "true",
  "X-VTEX-API-AppKey": API_KEY,
  "X-VTEX-API-AppToken": API_TOKEN,
};

export async function fetchFortuneCookies(): Promise<IFortuneCookie[]> {
  const response = await fetch(
    `/api/dataentities/CF/search?_fields=id,CookieFortune&_from=0&_to=99`,
    {
      method: "GET",
      headers: { ...authHeaders, 'REST-Range': 'resources=0-400' },
    }
  )
  if (!response.ok) throw new Error()
  return response.json()
}
