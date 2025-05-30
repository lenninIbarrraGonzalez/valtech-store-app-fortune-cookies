export interface IFortuneCookie {
  id: string
  CookieFortune: string
}

export interface ShowCookieResultProps {
  currentCookie: IFortuneCookie;
  luckyNumber: string;
}
