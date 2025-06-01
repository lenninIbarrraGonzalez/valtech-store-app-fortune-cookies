import React from 'react'
import { render } from '@testing-library/react'
import { SpinerSelectionCookie } from './SpinerSelectionCookie'

const mockIntl = {
  formatMessage: ({ id }: { id: string }) => {
    if (id === 'valtech.fortune-cookies.spinerselectioncookie-msn') {
      return 'Seleccionando tu galleta de la fortuna...'
    }
    return id
  },
} as any

describe('SpinerSelectionCookie', () => {
  it('renderiza el spinner y el mensaje correctamente', () => {
    const { getByText, getByTestId, container } = render(
      <SpinerSelectionCookie generatingContainer="test-spinner" intl={mockIntl} />
    )

    expect(container.firstChild).toHaveClass('test-spinner')
    expect(getByTestId('spinner')).toBeInTheDocument()
    expect(getByText('Seleccionando tu galleta de la fortuna...')).toBeInTheDocument()
  })
})
