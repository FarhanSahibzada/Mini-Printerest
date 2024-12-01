import { useEffect, useState } from "react"
import service from "../Appwrite/Services"

export default function Explore() {

  const currentdate = new Date().toDateString().slice(4)
  const [post, setpost] = useState([])
  useEffect(() => {
    service.getDocments().then((res) => {
      if (res) setpost(res.documents)
      else
        console.error("No documents found");

    })
  }, [])


  const modelll = ['model', 'star', 'handsome', 'men'];
  const clothesoption = ['shilwar', 'kameez', 'pant', 'shirt', 'shoes'];

  const fashion = post.filter((colthes) =>
    clothesoption.some((option) => colthes.title?.toLowerCase().includes(option))
  );

  const modelpost = post.filter((mod) =>
    modelll.some((option) => mod.title?.toLowerCase().includes(option))
  );


  return (
    <div className='bg-base-200  h-full w-[100%]'>
      <div className="flex justify-center   items-center min-h-screen flex-col">
        <div className="text-center mt-6">
          <p className="font-bold text-2xl ">{currentdate}</p>
          <p className="font-bold text-4xl mt-0 md:mt-2    bg-clip-text text-transparent  
                bg-gradient-to-b from-neutral-100 to-neutral-600"> Stay Inspired </p>
        </div>
        <div className="flex flex-wrap justify-center  gap-10 w-[80%]  py-20" >
          <div className="div1 w-full h-[200px] md:w-[45%] md:h-[60vh]  rounded-xl bg-pink-500  relative ">
            {fashion.length > 0 && fashion[0]?.featuredImage ? (
              <img
                src={service.Getfilepreview(fashion[0].featuredImage)}
                alt="Fashion"
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <p className="text-white font-bold absolute bottom-3 right-5">No Fashion Posts</p>
            )}
            <p className="text-white font-bold absolute bottom-3 right-5">Fashion</p>
          </div>
          <div className="div2 w-full h-[200px] md:w-[45%] md:h-[60vh] rounded-xl bg-pink-500  relative">
            {modelpost.length > 0 && modelpost[0]?.featuredImage ? (
              <img
                src={service.Getfilepreview(modelpost[0].featuredImage)}
                alt="Model"
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <p className="text-white font-bold absolute bottom-3 right-5">No Model Posts</p>
            )}
            <p className="text-white font-bold absolute bottom-3 right-5">Models</p>
          </div>
          {/* <div className="div3 w-full h-[200px] md:w-[45%] md:h-[40vh] rounded-xl bg-pink-500  relative ">
            <p className="text-white font-bold absolute bottom-3 right-5">hello 3</p>
          </div>
          <div className="div4 w-full h-[200px] md:w-[45%] md:h-[40vh]  rounded-xl bg-pink-500  relative">
            <p className="text-white font-bold absolute bottom-3 right-5">hello 4</p>
          </div> */}
        </div>
      </div>
    </div>
  )
}
