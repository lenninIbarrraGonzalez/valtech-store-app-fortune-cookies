import React from 'react'

export const StartMessageCookie = ({ containerInfo, cookieIcon }: { containerInfo: string, cookieIcon: string }) => {
  return (
    <div className={containerInfo}>
      <div className={cookieIcon}>🥠</div>
      <h3>¡Descubre tu fortuna!</h3>
      <p>Presiona el botón para obtener una galleta de la suerte</p>
    </div>
  )
}
