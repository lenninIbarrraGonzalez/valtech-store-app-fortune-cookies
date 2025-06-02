import React from 'react'
import { render } from '@testing-library/react'
import { FortuneLoadingScreen } from './FortuneLoadingScreen'

jest.mock('vtex.styleguide', () => ({
  Spinner: () => <div data-testid="spinner" className="vtex-spinner" />,
}))

const mockIntl = {
  formatMessage: ({ id }: { id: string }) => {
    if (id === 'valtech.fortune-cookies.fortuneloadingscreen') {
      return 'Cargando galletas de la fortuna...'
    }
    return id
  },
} as any

describe('FortuneLoadingScreen', () => {
  it('renderiza el spinner y el mensaje de carga', () => {
    const { getByText, getByTestId, container } = render(
      <FortuneLoadingScreen loadingContainer="test-loading" intl={mockIntl} />
    )

    expect(container.firstChild).toHaveClass('test-loading')
    expect(getByTestId('spinner')).toBeInTheDocument()
    expect(getByText('Cargando galletas de la fortuna...')).toBeInTheDocument()
  })
})
