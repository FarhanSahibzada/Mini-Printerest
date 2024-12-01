import { useEffect, useMemo, useState } from "react"
import service from "../Appwrite/Services"
import praser from 'html-react-parser'
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"


export default function Home() {
  const [posts, setPosts] = useState([])
  const search = useSelector((state)=> state.auth.searchterm)

  useEffect(() => {
    service.getDocments().then((res) => {
      if (res) {
        setPosts(res.documents)
      }
    })
  }, [])

  const filteredpost = useMemo(()=>{
    if(search.length == 0 ) return posts ; 

   return  posts.filter((post)=> 
    post.title.toLowerCase().includes(search.toLowerCase()))
  },[search , posts])

    return (

      <div className="py-4 px-4 w-full ">
        <div className="flex flex-wrap gap-4 justify-start">
          {filteredpost.map((post) => (
            <Link key={post.$id} to={`/PostCard/${post.$id}`}>
            <div  className="card card-compact shodow-2xl bg-base-100 w-80 h-[30vh] md:h-[60vh] m-2 shadow-xl">
              <figure>
                <img
                  src={service.Getfilepreview(post.featuredImage)}
                  alt="Shoes" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{post.title}</h2>
                <div className="text-base">{praser(post.content)}</div>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Exploe</button>
                </div>
              </div>
            </div>
                  </Link>
          ))}
        </div>
      </div>
    )
  }

