import React from 'react'
import ReactDOM from 'react-dom/client'

import { App } from './app'
import { enableMsw } from './api/mocks'

enableMsw().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
})
