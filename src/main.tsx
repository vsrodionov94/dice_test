import React from 'react'
import ReactDOM from 'react-dom/client'
import DicePage from './ui/pages/DicePage'
import './index.css'

async function enableMocking() {
  const { worker } = await import('./mocks/browser')
  return worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: {
      url: import.meta.env.BASE_URL + 'mockServiceWorker.js'
    }
  })
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <DicePage />
    </React.StrictMode>,
  )
})
