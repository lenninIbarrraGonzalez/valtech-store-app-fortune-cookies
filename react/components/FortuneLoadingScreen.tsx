import React from 'react'
import { Spinner } from 'vtex.styleguide';

export const FortuneLoadingScreen = ({ loadingContainer }: { loadingContainer: string }) => {
  return (
    <div className={loadingContainer}>
        <Spinner color="#f59e0b" size={40}/>
        <p>Cargando galletas de la fortuna...</p>
    </div>
  )
}
