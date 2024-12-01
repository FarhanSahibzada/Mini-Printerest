import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import service from "../Appwrite/Services"
import praser from 'html-react-parser'
import { useSelector } from "react-redux"

export default function PostCard() {
    const { slug } = useParams()
    const [post, setpost] = useState(null)
    const navigate = useNavigate()

    const userdata = useSelector((state) => state.auth.userData)
    const isAuthor = post && userdata ? post.userId == userdata.$id : false

    useEffect(() => {
        if (slug) {
            service.Getpost(slug).then((post) => {
                if (post) setpost(post)
                else navigate('/')
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
    
    const handleDelet = () => {
        service.DeletPost(post.$id).then((status)=>{
            if(status){
                service.Deletfile(post.featuredImage)
                navigate('/')
            }
        })
    }

    return post ? (
        <div className="w-[80vw] h-auto shadow-2xl   bg-base-100 m-12 p-4 rounded-xl ">
            <div>
                <div className="flex justify-around  flex-col md:flex-row gap-6  w-full h-[50vh] md:h-[70vh] relative">
                    <div className="h-full " >
                        <img
                            src={service.Getfilepreview(post.featuredImage)}
                            className=" w-full md:w-[30vw]  h-[280px] md:h-full  rounded-3xl shadow-lg object-cover"
                        />
                    </div>
                    <div className="min-w-[40%]">
                        <h1 className="text-5xl font-bold">{post.title}</h1>
                        <div className="py-10 sm:py-6">
                            {praser(post.content)}
                        </div>
                        <p className="text-green-400 font-semibold text-base">Created By :
                            <span className="text-black font-bold text-base" > {isAuthor ?
                                'You' : 'Unknown'
                            } </span>
                        </p>
                        {isAuthor && (
                            <div className="absolute bottom-2 right-3 gap-3 flex justify-around  ">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <button className=" bg-blue-600  hover:bg-blue-400
                         text-white font-bolf px-5 py-1.5  rounded-full"
                                    >Edit</button>
                                </Link>
                                <button className=" bg-gray-600  hover:bg-gray-400
                         text-white font-bolf px-5 py-1.5 rounded-full"
                         onClick={ handleDelet}
                         >Delet</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    ) : null
}
