import { Link } from "react-router-dom";
import { CiHome } from "react-icons/ci";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { LuStickyNote } from "react-icons/lu";
import { jwtDecode } from 'jwt-decode';

const Sidebar = () => {
  const user = {}
  const token = JSON.parse(localStorage.getItem('token'));
  console.log("user-token", token)
  if (token && typeof token === 'string' && token.length > 0) {
    const data = jwtDecode(token);
    console.log(data)
    user.data = data;
    console.log(user)
  }
  return (
    <div className="flex justify-center flex-col pl-4 pt-4" >
      <h1 className="text-2xl mb-8">Taskify</h1>
      {/* <h2 className="uppercase text-sm mb-4 text-blue-300">Your Company</h2> */}
      <ul className="mt-1  w-full flex flex-col ">
        <li className="mb-4  flex gap-2 items-center pr-4">
          <span><CiHome size={20} className="text-gray-400" /></span>
          <Link to={"/dashboard"} >Dashboard</Link>
          <MdOutlineKeyboardArrowRight size={20} className="text-gray-400 ml-auto  px " />
        </li>
        <li className="mb-4  flex gap-2 items-center ">
          <span><FiUsers size={20} className="text-gray-400" /></span>
          <Link to={user?.data?.project_manager ? "/users-reflection" : `/reflection/${user?.user_id}`} >Reflection</Link>
        </li>
        <li className="mb-4  flex gap-2 items-center pr-4 ">
          <span><FaRegEdit size={20} className="text-gray-400" /></span>
          <Link to={user?.data?.project_manager ? "/projects" : "/project"} >Projects</Link>
          <MdOutlineKeyboardArrowRight size={20} className="text-gray-400 ml-auto" />
        </li>
        <li className="mb-4  flex gap-2 items-center ">
          <span><FiUsers size={20} className="text-gray-400" /></span>
          <Link to={"/chat"} >Chat</Link>

        </li>

        <li className="flex gap-2 items-center ">
          <span><LuStickyNote size={20} className="text-gray-400" /></span>
          <Link to={"/calendars"} >Calendars</Link>
        </li>

      </ul>
    </div>
  );
}

export default Sidebar;
