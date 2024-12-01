import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import Store from './Store/Store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import Authlayout from './Components/Authlayout.jsx'
import Signup from './Pages/Signup.jsx'
import Addpost from './Pages/Addpost.jsx'
import Editpost from './Pages/Editpost.jsx'
import Explore from './Pages/Explore.jsx'
import PostCard from './Pages/PostCard.jsx'
import Profile from './Pages/Profile.jsx'

const route = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: (
          <Authlayout authentication={false}>
            <Login />
          </Authlayout>
        ),

      },
      {
        path: '/signup',
        element: (
          <Authlayout authentication={false}>
            <Signup />
          </Authlayout>
        ),
      },
      {
        path: "/add-post",
        element: (
          <Authlayout authentication>
            <Addpost />
          </Authlayout>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <Authlayout authentication>
            <Editpost />
          </Authlayout>
        )
      },
      {
        path: "/Explore",
        element: (
          <Authlayout authentication>
            <Explore />
          </Authlayout>
        )
      },
      {
        path: "/PostCard/:slug",
        element:  <PostCard/> 
      },
      {
        path: "/Profile",
        element:  <Profile/> 
      }

    ]

  }

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>
      <RouterProvider router={route} />
    </Provider>
  </StrictMode>,
)
