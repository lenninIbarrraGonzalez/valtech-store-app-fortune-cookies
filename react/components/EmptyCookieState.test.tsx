import React from 'react'
import { render } from '@testing-library/react'
import { EmptyCookieState } from './EmptyCookieState'

const mockIntl = {
  formatMessage: ({ id }: { id: string }) => {
    if (id === 'valtech.fortune-cookies.emptycookiestate-paragraph') {
      return 'No hay galletas de la fortuna disponibles'
    }
    return id
  },
} as any

describe('EmptyCookieState', () => {
  it('renderiza el mensaje vacío correctamente', () => {
    const { getByText } = render(
      <EmptyCookieState
        containerInfo="container-info"
        cookieIcon="cookie-icon"
        intl={mockIntl}
      />
    )

    expect(getByText('No hay galletas de la fortuna disponibles')).toBeInTheDocument()
  })

  it('usa las clases recibidas por props', () => {
    const { container } = render(
      <EmptyCookieState
        containerInfo="test-container"
        cookieIcon="test-icon"
        intl={mockIntl}
      />
    )
    expect(container.firstChild).toHaveClass('test-container')
    expect(container.querySelector('.test-icon')).toBeInTheDocument()
  })
})
