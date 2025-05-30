export interface IFortuneCookie {
  id: string
  CookieFortune: string
}

export interface ShowCookieResultProps {
  currentCookie: IFortuneCookie;
  luckyNumber: string;
  fortuneCard: string;
  fortuneTitle: string;
  fortuneText: string;
  luckySection: string;
  luckyNum: string;
  cookieId: string
}
