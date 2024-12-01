import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import authService from "../../Appwrite/Auth"
import { useDispatch } from "react-redux"
import { logout, Setsearchterm } from '../../Store/Authslice'
import { useNavigate } from "react-router-dom"


function Header() {
  const activeUser = useSelector(state => state.auth.status)
  const user = useSelector(state => state.auth.userData)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await authService.logOut().then(() => {
        dispatch(logout())
        navigate('/login')
      })
    }
    catch (error) {
      console.log("logout error :", error)
    }
  }
 

  return (
    <div className="navbar bg-base-200 w-[92vw] ">
      <div className="flex-1">
        <input type="search" className='w-[100%] h-[50px] bg-slate-200 rounded-lg px-4 py-2
 text-base  font-semibold  border-4 border-transparent focus:border-blue-300 outline-0'
          placeholder='Search'
          onChange={(e) => dispatch(Setsearchterm(e.target.value))}
        />
      </div>
      <div className="dropdown dropdown-bottom dropdown-end">
        <div tabIndex={0} role="button" className="btn m-1">More </div>
        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
          {activeUser ? (
            <>
              <li><Link to="/Profile" className="py-2 bg-blue-600 text-white flex ">
                <div className="rounded-full bg-blue-500 w-16 h-16 flex justify-center items-center">
                  <p className="text-4xl font-semibold  ">
                    {user?.name.charAt(0)}
                  </p>
                </div>
                {user?.name} <br />{user?.email}</Link></li>
              <li onClick={handleLogout}><button >Logout</button></li>
            </>
          ) : (
            <li><Link to="/Login">Login Your Account</Link></li>
          )}

        </ul>
      </div >
    </div >
  )
}

export default Header