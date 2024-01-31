import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Account from './components/Account/Account.tsx'
import { store } from './store/store.ts'
import { Provider } from 'react-redux'
const router = createBrowserRouter([
  {
     path:'/:username?',
     element:<App/>
  },
  {
    path:"/account",
    element:<Account/>
  }
])
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
