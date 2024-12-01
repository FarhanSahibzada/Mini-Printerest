import { useState , useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function Authlayout({ children , authentication = true }) {
    const navigate = useNavigate()
    const [loader , setLoader] = useState(true)
    const authstatus = useSelector(state => state.auth.status) 
    
    useEffect(() => { 
        if(authentication && authstatus !== authentication) { 
            navigate('/login')
        }else if (!authentication && authstatus !== authentication) {
            navigate('/')
        }

        setLoader(false)  
    } , [navigate , authstatus , authentication])
 

    return loader ? <div className="min-h-screen font-bold text-blue-600 flex justify-center items-center">...Loading</div> : 
    <div className="flex flex-col min-h-screen items-center justify-center">
        {children}
    </div>
}
