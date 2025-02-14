import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'

const App = lazy(() => import('./App.tsx'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<h1>Loading中だよ...</h1>}>
      <App />
    </Suspense>
  </StrictMode>,
)
