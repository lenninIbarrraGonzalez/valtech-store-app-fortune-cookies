import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import FortuneCookies from './FortuneCookies'

// Mock dependencias
jest.mock('./SpinerSelectionCookie', () => ({
  SpinerSelectionCookie: ({ generatingContainer }: any) => <div data-testid="spinner" className={generatingContainer}>Spinner</div>,
}))
jest.mock('./ShowCookieResult', () => ({
  ShowCookieResult: (props: any) => <div data-testid="show-cookie-result">{props.currentCookie?.CookieFortune}</div>,
}))
jest.mock('./StartMessageCookie', () => ({
  StartMessageCookie: (props: any) => <div data-testid="start-message-cookie">StartMessage</div>,
}))
jest.mock('./EmptyCookieState', () => ({
  EmptyCookieState: (props: any) => <div data-testid="empty-cookie-state">EmptyState</div>,
}))
jest.mock('./FortuneLoadingScreen', () => ({
  FortuneLoadingScreen: (props: any) => <div data-testid="fortune-loading-screen">LoadingScreen</div>,
}))
jest.mock('../hooks/useFortuneCookies', () => ({
  useFortuneCookies: jest.fn(),
}))
jest.mock('react-intl', () => ({
  useIntl: () => ({
    formatMessage: ({ id }: { id: string }) => id,
  }),
}))

const { useFortuneCookies } = require('../hooks/useFortuneCookies')

describe('FortuneCookies', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('muestra la pantalla de carga cuando loading es true', () => {
    useFortuneCookies.mockReturnValue({
      cookies: [],
      currentCookie: null,
      loading: true,
      showSpinner: false,
      luckyNumber: '',
      handleGetCookie: jest.fn(),
    })
    const { getByTestId } = render(<FortuneCookies />)
    expect(getByTestId('fortune-loading-screen')).toBeInTheDocument()
  })

  it('muestra EmptyCookieState cuando no hay galletas', () => {
    useFortuneCookies.mockReturnValue({
      cookies: [],
      currentCookie: null,
      loading: false,
      showSpinner: false,
      luckyNumber: '',
      handleGetCookie: jest.fn(),
    })
    const { getByTestId, queryByTestId } = render(<FortuneCookies />)
    expect(getByTestId('empty-cookie-state')).toBeInTheDocument()
    expect(queryByTestId('start-message-cookie')).not.toBeInTheDocument()
  })

  it('muestra SpinerSelectionCookie cuando showSpinner es true', () => {
    useFortuneCookies.mockReturnValue({
      cookies: [{ id: '1', CookieFortune: 'Test fortune' }],
      currentCookie: null,
      loading: false,
      showSpinner: true,
      luckyNumber: '',
      handleGetCookie: jest.fn(),
    })
    const { getByTestId } = render(<FortuneCookies />)
    expect(getByTestId('spinner')).toBeInTheDocument()
  })

  it('muestra ShowCookieResult cuando hay currentCookie', () => {
    useFortuneCookies.mockReturnValue({
      cookies: [{ id: '1', CookieFortune: 'Test fortune' }],
      currentCookie: { id: '1', CookieFortune: 'Test fortune' },
      loading: false,
      showSpinner: false,
      luckyNumber: '12-34-5678',
      handleGetCookie: jest.fn(),
    })
    const { getByTestId } = render(<FortuneCookies />)
    expect(getByTestId('show-cookie-result')).toHaveTextContent('Test fortune')
  })

  it('muestra StartMessageCookie cuando hay galletas pero no currentCookie', () => {
    useFortuneCookies.mockReturnValue({
      cookies: [{ id: '1', CookieFortune: 'Test fortune' }],
      currentCookie: null,
      loading: false,
      showSpinner: false,
      luckyNumber: '',
      handleGetCookie: jest.fn(),
    })
    const { getByTestId } = render(<FortuneCookies />)
    expect(getByTestId('start-message-cookie')).toBeInTheDocument()
  })

  it('el botón está oculto si no hay galletas', () => {
    useFortuneCookies.mockReturnValue({
      cookies: [],
      currentCookie: null,
      loading: false,
      showSpinner: false,
      luckyNumber: '',
      handleGetCookie: jest.fn(),
    })
    const { queryByRole } = render(<FortuneCookies />)
    expect(queryByRole('button')).not.toBeInTheDocument()
  })

  it('el botón llama a handleGetCookie cuando se hace click', () => {
    const handleGetCookie = jest.fn()
    useFortuneCookies.mockReturnValue({
      cookies: [{ id: '1', CookieFortune: 'Test fortune' }],
      currentCookie: null,
      loading: false,
      showSpinner: false,
      luckyNumber: '',
      handleGetCookie,
    })
    const { getByRole } = render(<FortuneCookies />)
    fireEvent.click(getByRole('button'))
    expect(handleGetCookie).toHaveBeenCalled()
  })
})
