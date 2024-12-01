import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import authService from '../Appwrite/Auth'
import { useDispatch } from 'react-redux'
import {  Input } from './index.js'
import { useForm } from 'react-hook-form'
import { LockIcon, MailIcon } from 'lucide-react'
import  { login } from '../Store/Authslice.js'

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm('')
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const log = async (data) => {
    setLoading(true)
    setError('')
    try {
      const user = await authService.LoginAccount(data);
      if (user) {
        const currentuser = await authService.getCurrentUser();
        if (currentuser) {
          dispatch(login(currentuser))
          navigate('/')
        }
      }
    } catch (error) {
      console.log(error)
      setError('Failed to login')

    }

    setLoading(false)
  }
  return (
    <div className="min-h-screen flex items-center justify-center shadow-xl bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Welcome back</h2>
          <p className="mt-2 text-sm text-gray-600">Login in to your account</p>
        </div>
        <div className="mx-auto w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
          <LockIcon className="h-12 w-12 text-primary" />
        </div>

        <form onSubmit={handleSubmit(log)} className="space-y-6">
          <div>
            <div className="relative">
              <MailIcon className="absolute left-3 top-1/2 transform -translate-y-[-40%] text-gray-400" size={20} />
              <Input
                placeholder="Email address"
                type="email"
                label="Email"
                required
                {...register("email", { required: true })}
                className="pl-10 focus:ring-primary rounded-lg shadow-md"
              />
            </div>
          </div>
          <div>
            <div className="relative">
              <LockIcon className="absolute left-3 top-1/2 transform -translate-y-[-40%] text-gray-400" size={20} />
              <Input
                type="password"
                label="Password"
                {...register("password", { required: true })}
                className="pl-10 focus:ring-primary rounded-lg shadow-md"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="flex items-center justify-end">
            <div className="text-sm">
              <Link to={"#"} className="font-medium text-primary hover:text-primary/80 transition-colors">
                Forgot your password?
              </Link>
            </div>
          </div>
          <button
            // Children='Signup'
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 ease-in-out transform hover:scale-105"
          >
            {loading ? (
              <div className="flex space-x-3 py-1 ">
                <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-100"></div>
                <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-200"></div>
              </div>

            ) : 'Login'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Don't Have any Account ?{' '}
          <Link to={"/Signup"} className="font-medium text-primary hover:text-primary/80 transition-colors">
            Sign Up
          </Link>
        </p>

      </div>
      {error && <div className="text-center text-red-500">{error}</div>}
    </div>
  )
}

export default Login