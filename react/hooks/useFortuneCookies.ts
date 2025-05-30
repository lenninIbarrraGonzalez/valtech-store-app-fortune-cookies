import { useEffect, useState } from 'react'
import { IFortuneCookie } from '../interfaces/interfaces'
import { fetchFortuneCookies } from '../services/fetchFortuneCookies'
import { generateLuckyNumber } from '../utils/generateLuckyNumber'

export function useFortuneCookies() {
  const [cookies, setCookies] = useState<IFortuneCookie[]>([])
  const [currentCookie, setCurrentCookie] = useState<IFortuneCookie | null>(null)
  const [loading, setLoading] = useState(true)
  const [showSpinner, setShowSpinner] = useState(false)
  const [luckyNumber, setLuckyNumber] = useState<string>('')

  useEffect(() => {
    fetchFortuneCookies()
      .then((data) => {
        setCookies(data)
        if (data.length === 0) {
          setCurrentCookie(null)
          setLuckyNumber('')
        }
      })
      .catch(() => {
        setCookies([])
        setCurrentCookie(null)
        setLuckyNumber('')
      })
      .finally(() => setLoading(false))
  }, [])

  const handleGetCookie = () => {
    if (cookies.length === 0) return
    setShowSpinner(true)
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * cookies.length)
      setCurrentCookie(cookies[randomIndex])
      setLuckyNumber(generateLuckyNumber())
      setShowSpinner(false)
    }, 2000)
  }

  return {
    cookies,
    currentCookie,
    loading,
    showSpinner,
    luckyNumber,
    handleGetCookie,
  }
}
