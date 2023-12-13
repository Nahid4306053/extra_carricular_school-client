/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/Authntication";
import toast from "react-hot-toast";

export default function UserAvatar({ user }) {
  const navigate = useNavigate();
  const { username, avatar, role, _id } = user || {};
  const {   setUser } = useAuth();
  const Darkmood = {};
  const handelLogout = async () => {
    try {
      const snapshort = await axios.delete(
        `${import.meta.env.VITE_API_URL}/user/logout`,
        { withCredentials: true }
      );
      if (snapshort.status === 200) {
        setUser(null);
        navigate("/login");
      } else {
        toast.error(snapshort.data.msg);
      }
    } catch (err) {
      toast.error("Somthing happend wrong");
    }
  };
  return (
    <div className="dropdown cursor-pointer dropdown-end  dropdown-hover">
      <div tabIndex={5} className="avatar cursor-pointer pr-3">
        <div className="w-14 rounded-full ring  ring-offset-base-100 ring-offset-2">
          <img
            src={avatar}
          />
        </div>
      </div>
      <ul
        tabIndex={5}
        className="dropdown-content z-[1000000] menu p-4  bg-sky-100 border-t-4 border-sky-200 shadow-2xl rounded-none  w-64 py-5 flex flex-col items-center justify-center"
      >
        <div className="avatar">
          <div className="w-24 rounded-full ring ring-offset-base-100 ring-offset-2">
            <img
              src={`${avatar}`}
            />
          </div>
        </div>
        <h2 className="userName mt-4 font-bold  capitalize">
          {role} ID: {_id.slice(0, 6)}
        </h2>
        <h2 className="userName mt-2 font-bold text-xl">{username}</h2>
         <div>
          
         <div className={`text-start  mt-4 space-y-2 text-lg font-bold  `}>
          <div>
            <Link className="space-x-5" to="/dashborder/profile">
              <i className="fa-solid fa-chart-mixed"></i> Dashboard
            </Link>
          </div>
          <div>
            <Link className="space-x-5" to="/dashboard/announcements">
              <i className="fa-regular fa-bullhorn mr-2"></i>Emergency Notice
            </Link>
          </div>
        </div>
        <hr className={`border mt-3   border-opacity-5 `} />
        <div className={`text-start  mt-3 space-y-2 text-lg font-bold  `}>
          <div>
            <div onClick={handelLogout}>
              <i className="fa-solid fa-right-from-bracket"></i> Log Out
            </div>
          </div>
        </div>
         </div>
       
      </ul>
    </div>
  );
}
//
