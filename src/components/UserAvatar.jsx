/* eslint-disable react/prop-types */
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/Authntication";

export default function UserAvatar({ user }) {
  const navigate = useNavigate();
  const { username, avatar, role, _id } = user || {};
  const { getCurrentuser } = useAuth();
  const handelLogout = async () => {
    try {
      const snapshort = await axios.delete(
        `${import.meta.env.VITE_API_URL}/user/logout`,
        { withCredentials: true }
      );
      if (snapshort.status === 200) {
        getCurrentuser();
        navigate("/login");
      } else {
        alert(snapshort.data.msg);
      }
    } catch (err) {
      alert("Somthing happend wrong");
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
        className="dropdown-content z-[1000000] menu p-4  bg-slate-300 shadow-lg rounded-box w-56 py-5 flex flex-col items-center justify-center"
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

        <div className="flex justify-between gap-2">
          <Link to="/dashborder/profile">
            <button className="btn btn-info mt-4 text-white flex-1 ">
              Profile
            </button>
          </Link>
          <button
            onClick={handelLogout}
            className="btn btn-info mt-4 text-white flex-1  "
          >
            Logout
          </button>
        </div>
      </ul>
    </div>
  );
}
//
