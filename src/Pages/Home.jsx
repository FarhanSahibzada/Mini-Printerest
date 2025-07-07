import { useEffect, useMemo, useState } from "react"
import service from "../Appwrite/Services"
import praser from 'html-react-parser'
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"


export default function Home() {
  const [posts, setPosts] = useState([])
  const search = useSelector((state) => state.auth.searchterm)

  useEffect(() => {
    service.getDocments().then((res) => {
      if (res) {
        setPosts(res.documents)
      }

    })
  }, [])

  const filteredpost = useMemo(() => {
    if (search.length == 0) return posts;

    return posts.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase()))
  }, [search, posts])



  if (!posts) {
    return (

      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-slate-400 to-base-300">
        <div className="flex space-x-3 mb-6">
          <div className="w-4 h-4 bg-white rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-white rounded-full animate-bounce delay-100"></div>
          <div className="w-4 h-4 bg-white rounded-full animate-bounce delay-200"></div>
        </div>
        {/* <h1 className="text-white text-2xl font-semibold animate-pulse">Please Wait...</h1> */}
      </div>
    )
  } else {
    return (

      <div className="py-4 px-4 w-full">
        <div className="w-[100%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4  gap-4">

          {filteredpost.map((post) => {
            const image = service.Getfilepreview(post.featuredImage);
            return (
              <Link key={post.$id} to={`/PostCard/${post.$id}`}>
                <div className="card card-compact shodow-2xl m-2  bg-base-100  mx-4
                w-full ">
                  <figure className="w-full h-[200px] md:h-[250px] overflow-hidden rounded-t-xl">
                    <img
                      src={image}
                      alt={post.title}
                      className="w-full h-full object-cover object-top"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{post.title}</h2>
                    <div className="text-base line-clamp-3">{praser(post.content)}</div>
                    <div className="card-actions justify-end">
                      <button className="btn btn-primary">Exploe</button>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    )
  }

}

