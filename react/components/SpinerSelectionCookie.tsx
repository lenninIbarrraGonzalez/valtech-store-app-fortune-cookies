import React from 'react'
import { Spinner } from 'vtex.styleguide';

export const SpinerSelectionCookie = ({ generatingContainer}: { generatingContainer: string }) => {
  return (
    <div className={generatingContainer}>
          <Spinner color="#f59e0b" size={40}/>
          <p>Seleccionando tu galleta de la fortuna...</p>
    </div>
  )
}
