import React from 'react'
import authService from '../Appwrite/Auth.js'
import { Link, useNavigate } from 'react-router-dom'
import {  Input } from './index.js'
import { useForm } from 'react-hook-form'
import { login } from "../Store/Authslice"
import { useDispatch } from 'react-redux'
import { UserRound, MailIcon, LockIcon, EyeIcon, EyeOffIcon, Contact } from 'lucide-react'


function Signup() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = React.useState('');
    const { register, handleSubmit } = useForm('')
    const [showPassword, setShowPassword] = React.useState(false)
    const [loading , setLoading] = React.useState(false);

    const signup = async (data) => {
        setLoading(true)
        setError('')
        try {
            const user = await authService.CreateAccount(data);
            if (user) {
                const currentuser = await authService.getCurrentUser();
                if (currentuser) {
                    dispatch(login(currentuser))
                    navigate('/')
                }
            }
        }
        catch (error) {
            console.log(error)
            setError('Failed to signup')
        }
        setLoading(false)        
    }

    return (
        <div className="min-h-screen flex items-center justify-center  shadow-xl bg-gray-50 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
                    <p className="mt-2 text-sm text-gray-600">Join us and start your journey</p>
                </div>

                <div className="mx-auto w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                    <UserRound className="h-12 w-12 text-primary" />
                </div>
                {error && <div className="text-center text-red-500">{error}</div>}
                <form onSubmit={handleSubmit(signup)} className="space-y-8">
                    <div>
                        <div className=' relative'>
                            <Contact className="absolute left-3 top-1/2 transform -translate-y-[-37%] text-gray-400" size={20} />
                            <Input
                                type="text"
                                label="Full name"
                                {...register("name", { required: true })}
                                className=" pl-10 focus:ring-primary rounded-lg shadow-md"
                                placeholder="Full name"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="relative">
                            <MailIcon className="absolute left-3 top-1/2 transform -translate-y-[-40%] text-gray-400" size={20} />
                            <Input
                                type="email"
                                label="Email address"
                                {...register("email", { required: true })}
                                className="pl-10 focus:ring-primary rounded-lg shadow-md"
                                placeholder="Email address"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="relative">
                            <LockIcon className="absolute left-3 top-1/2 transform -translate-y-[-40%] text-gray-400" size={20} />
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                label="Password"
                                {...register("password", { required: true })}
                                className="pl-10 pr-10 focus:ring-primary rounded-lg shadow-md"
                                placeholder="Password"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-[-40%] text-gray-400"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                            </button>
                        </div>
                    </div>
                    <div>
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
        
                            ) : 'Signup'}
                        </button>
                    </div>
                </form>

                <p className="text-center text-base py-4 text-gray-600">
                    Already have an account?{' '}
                    <Link to={"/Login"} className="font-medium text-primary hover:text-primary/80 transition-colors">
                        Login
                    </Link> 
                </p>
            </div>
            
        </div>
    )
}

export default Signup