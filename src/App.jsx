import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from './Appwrite/Auth';
import { login, logout } from './Store/Authslice';
import { Header, Aside } from './Components';
import { Outlet } from 'react-router-dom';

function App() {

  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();

  // ESLint will not complain about missing dependencies now
  useEffect(() => {
    setLoading(true)
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])


  return !loading ? (
    <div className='flex gap-1 flex-col-reverse sm:flex-row bg-base-200  overflow-hidden'>
      <div>
        <Aside />
      </div>
      <div className='w-full'>
        <Header />
        <Outlet />
      </div>
    </div>

  ) : (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-slate-400 to-base-300">
      <div className="flex space-x-3 mb-6">
        <div className="w-4 h-4 bg-white rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-white rounded-full animate-bounce delay-100"></div>
        <div className="w-4 h-4 bg-white rounded-full animate-bounce delay-200"></div>
      </div>
      {/* <h1 className="text-white text-2xl font-semibold animate-pulse">Please Wait...</h1> */}
    </div>
  )
}

export default App