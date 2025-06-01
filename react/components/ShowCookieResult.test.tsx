import React from 'react'
import { render } from '@testing-library/react'
import { ShowCookieResult } from './ShowCookieResult'
import { ShowCookieResultProps } from '../interfaces/interfaces'

jest.mock('react-intl', () => ({
  useIntl: () => ({
    formatMessage: ({ id }: { id: string }) => {
      const messages: Record<string, string> = {
        'valtech.fortune-cookies.showcookieresult-title': 'Tu Fortuna',
        'valtech.fortune-cookies.showcookieresult-number': 'Número de la suerte:',
        'valtech.fortune-cookies.showcookieresult-id': 'ID de la galleta:',
      }
      return messages[id] || id
    },
  }),
}))

const defaultProps: ShowCookieResultProps = {
  currentCookie: { id: '123', CookieFortune: '¡Hoy es tu día de suerte!' },
  luckyNumber: '12-34-5678',
  fortuneCard: 'fortune-card',
  fortuneTitle: 'fortune-title',
  fortuneText: 'fortune-text',
  luckySection: 'lucky-section',
  luckyNum: 'lucky-num',
  cookieId: 'cookie-id',
}

describe('ShowCookieResult', () => {
  it('renderiza correctamente la fortuna, el número y el id', () => {
    const { getByText, container } = render(<ShowCookieResult {...defaultProps} />)

    expect(container.firstChild).toHaveClass('fortune-card')
    expect(getByText(/Tu Fortuna/)).toBeInTheDocument()
    expect(getByText(/¡Hoy es tu día de suerte!/)).toBeInTheDocument()
    expect(getByText(/Número de la suerte:/)).toBeInTheDocument()
    expect(getByText('12-34-5678')).toBeInTheDocument()
    expect(getByText(/ID de la galleta:/)).toBeInTheDocument()
    expect(getByText(/123/)).toBeInTheDocument()
  })
})
