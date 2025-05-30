import React from 'react';

export const EmptyCookieState = ({ containerInfo, cookieIcon }: { containerInfo: string, cookieIcon: string }) => {
  return (
    <div className={containerInfo}>
      <div className={cookieIcon}>📭</div>
      <h3>No hay galletas disponibles</h3>
    </div>
  )
}
