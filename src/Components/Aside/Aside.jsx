import { FaHome } from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

function Aside() {

    const navigate = useNavigate();
    const acitveuser = useSelector(state => state.auth.status)
    const user = useSelector(state => state.auth.userData)    

    
    const handleCreate = () => {
        if (acitveuser) {
            navigate("/add-post")
        } else {
            navigate("/Login")
        }
    }

    return (
        <div className=' w-[100vw] sm:w-20 lg:w-22  h-40 md:h-[100vh]
     relative border-r-2 border-r-slate-200'>
            <div className='pt-3 sm:pt-14 flex flex-row sm:flex-col 
             justify-between sm:justify-normal  items-center  px- 6  sm:px-0'>
                <div className="tooltip  tooltip-Up sm:tooltip-right  " data-tip="Home"
                    onClick={() => navigate("/")}>
                    <button className="btn rounded-lg font-bold text-xl md:text-3xl p-2"><FaHome /></button>
                </div>
                <div className="tooltip   tooltip-Up sm:tooltip-right  sm:mt-8  " data-tip="Explore"
                    onClick={() => navigate("/Explore")}
                >
                    <button className="btn rounded-lg font-bold text-3xl p-2"><MdOutlineExplore /></button>
                </div>
                <div className="tooltip  tooltip-Up sm:tooltip-right sm:mt-8  " data-tip="Create"
                    onClick={() => handleCreate()}
                >
                    <button className="btn rounded-lg font-bold text-3xl p-2"><IoAdd /></button>
                </div>
                <div className="tooltip  tooltip-Up sm:tooltip-right sm:mt-8  " data-tip="Updates"
                
                >
                    <button className="btn rounded-lg font-bold text-3xl p-2"><MdOutlineSystemUpdateAlt /></button>
                </div>
                {acitveuser && (
                    <div  className="rounded-full w-14 h-14 bg-blue-600  cursor-pointer sm:mt-7 flex justify-center items-center" onClick={() => navigate('/Profile')} >
                        <p className="text-3xl text-white font-bold ">
                            {user?.name.charAt(0)}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Aside