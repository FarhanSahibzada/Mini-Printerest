import service from "../Appwrite/Services"
import { useNavigate, useParams } from "react-router-dom"

import { useEffect, useState } from "react"
import Postform from "../Components/post-form/Postform"

export default function Editpost() {
    const [post, setPost] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(slug){
            service.Getpost(slug).then((res) => {
                if(res){
                    setPost(res)
                }
            })
        }else {
            navigate('/')
        }
    }, [slug, navigate])

return post ? (
    <div className="py-4 flex justify-center items-center" >
        <Postform post={post} />
    </div>
) : null;  
}
