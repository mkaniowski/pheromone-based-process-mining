/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import Translations from './i18n/Translations'
import { routeTree } from './routeTree.gen'
import { store } from './store'
import ErrorPage from './views/ErrorPage'

// Set up a Router instance
const router = createRouter({ routeTree, defaultNotFoundComponent: ErrorPage })

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const queryClient = new QueryClient()

const rootElement = document.getElementById('root')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <Provider store={store}>
      <Translations>
        <QueryClientProvider client={queryClient}>
          <RouterProvider
            router={router}
            notFoundMode='fuzzy'
          />
        </QueryClientProvider>
      </Translations>
    </Provider>,
  )
}
