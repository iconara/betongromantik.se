import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Main from './layouts/Main.tsx'
import Home from './pages/Home.tsx'
import Error from './pages/Error.tsx'
import Postcards from './pages/Postcards.tsx'
import Instagram from './pages/Instagram.tsx'
import './index.css'

const router = createBrowserRouter([
  {
    element: <Main/>,
    errorElement: <Error/>,
    children: [
      {
        path: '/',
        element: <Home/>,
      },
      {
        path: '/vykort',
        element: <Postcards/>,
      },
      {
        path: '/instagram',
        element: <Instagram/>,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
