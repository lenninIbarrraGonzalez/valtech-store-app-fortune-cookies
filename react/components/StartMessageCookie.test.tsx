import React from 'react'
import { render } from '@testing-library/react'
import { StartMessageCookie } from './StartMessageCookie'

const mockIntl = {
  formatMessage: ({ id }: { id: string }) => {
    const messages: Record<string, string> = {
      'valtech.fortune-cookies.startmessagecookie-discover': '¡Descubre tu fortuna!',
      'valtech.fortune-cookies.startmessagecookie-paragraph': 'Presiona el botón para obtener una galleta de la suerte.',
    }
    return messages[id] || id
  },
} as any

describe('StartMessageCookie', () => {
  it('renderiza el mensaje de inicio correctamente', () => {
    const { getByText, container } = render(
      <StartMessageCookie
        containerInfo="test-container"
        cookieIcon="test-icon"
        intl={mockIntl}
      />
    )

    expect(container.firstChild).toHaveClass('test-container')
    expect(container.querySelector('.test-icon')).toBeInTheDocument()
    expect(getByText('¡Descubre tu fortuna!')).toBeInTheDocument()
    expect(getByText('Presiona el botón para obtener una galleta de la suerte.')).toBeInTheDocument()
  })
})
