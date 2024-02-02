import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Account from './components/Account/Account.tsx'
import {QueryClient,QueryClientProvider} from "react-query"
import {Provider} from "react-redux"
import store  from './store/store.ts'
const queryClient = new QueryClient() 
const router = createBrowserRouter([
  {
     path:'/:username?',
     element:<App/>
  },
  {
    path:"/da/account",
    element:<Account/>
  }
])
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
)
