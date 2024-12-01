import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import service from "../Appwrite/Services"


export default function Profile() {
    const profile = useSelector((state) => state.auth.userData)
    const [side , setSide ] = useState('Created')
    const navigate = useNavigate()
    const [post , setpost ] = useState([])
    useEffect(()=> {
        service.getDocments().then((res) => {
            if(res){
                setpost(res.documents)
            }
        })
    }, [])

    const mypost = post.filter((postdata)=> postdata.userId == profile.$id)


    return profile ? (
        <div className="flex justify-center items-center mt-2">
            <div className="flex flex-col justify-center items-center  text-center">
                <div className="rounded-full w-32 h-32 bg-blue-800 flex justify-center items-center">
                    <p className="text-white  font-semibold text-7xl  ">
                        {profile.name.charAt(0)}
                    </p>
                </div>
                <div className="mt-4">
                    <h2 className="text-gray-700 text-3xl font-bold">{profile.name}</h2>
                    <h2 className="text-gray-700 text-xl font-semibold mt-2">{profile.email}</h2>
                    <h2 className="text-gray-700 text-base font-semibold mt-2">0 following</h2>
                </div>
                <div className="mt-8  flex gap-6 items-center">
                    <p onClick={()=> setSide('Created')} className={`font-semibold text-gray-900 text-xl underline-offset-4
                         cursor-pointer ${side == 'Created' ? 'underline' : 'no-underline' }`} >Create Post </p>
                    <p onClick={()=> setSide('Saved')} className={`font-semibold text-gray-900 text-xl underline-offset-4
                         cursor-pointer ${side == 'Saved' ? 'underline' : 'no-underline' }`} >Your Post </p>
                </div>
                <div className="mt-8">
                    {side == 'Created' && (
                        < >
                        <p className="text-gray-600 italic text-xl">Nothing to show ..yet! pins you Create will live true</p>
                        <button onClick={()=> navigate('/add-post')} className="text-white px-4 py-1.5 mt-6 rounded-full font-bold bg-red-600">Created Post</button>
                        </>
                    )}
                     {side == 'Saved' && (
                        <div className="flex flex-wrap gap-6  justify-center items-center w-[90vw] rounded-xl">
                        {mypost.map((post , index) => (
                            <div key={index} className="w-96 h-80  m-6" >
                                <img src={service.Getfilepreview(post.featuredImage)} alt=""
                                className="w-full h-full object-cover  shadow-xl"
                                />
                            </div>
                        ))}
                        </div>
                    )}

                </div>
            </div>
        </div>
    ) : null
}
