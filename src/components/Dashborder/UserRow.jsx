/* eslint-disable react/prop-types */
import axios from "axios";
import  { useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

export default function UserRow({ user }) {
  const { pathname } = useLocation();
  const [userdeatils, setuserdetails] = useState(user);
  const { _id, username, avatar, email, phone_number, address, role } =
    userdeatils || {};

  const [newrole, setNewRole] = useState(role);

  const handleRole = (e) => {
    setNewRole(e.target.value);
  };
  const UpdateRole = () => {
    if (role === newrole) {
      toast.error("The role already Existing");
    } else {
      axios
        .put(
          `${import.meta.env.VITE_API_URL}/user/role/${_id}`,
          { role: newrole },
          { withCredentials: true }
        )
        .then((res) => {
          const newdata = res.data.data;
          if (pathname === "/students" && role === "student") {
            row = "";
          } else if (pathname === "/instructors" && role === "instructor") {
            row = "";
          } else {
            setuserdetails(newdata);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  let row = (
    <tr>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img
                src={ avatar }
                alt={username}
              />
            </div>
          </div>
          <div>
            <div className="font-bold">{username}</div>
            <div className="text-sm opacity-50">{role}</div>
          </div>
        </div>
      </td>
      <td>
        {email}
        <br />
        <span className="badge badge-ghost badge-sm">{phone_number}</span>
      </td>
      <td>{address}</td>
      <th>
        <div className="dropdown dropdown-left">
          <div tabIndex={0} className="tooltip" data-tip="Change role">
            <button className="btn btn-ghost btn-xs text-xl">
              <i className="fa-solid fa-user-tie-hair"></i>
            </button>
          </div>
          <div
            tabIndex={0}
            className=" dropdown-content z-[1] menu p-5 shadow bg-base-300 rounded-box w-64"
          >
            <select
              onChange={handleRole}
              className="capitalize select select-bordered focus:outline-none w-full max-w-xs"
            >
              <option defaultValue={role}>{role}</option>
              {role === "student" && (
                <option value="instructor">Instructor</option>
              )}
              <option value="admin">Admin</option>
            </select>
            <div className="flex justify-end mt-4">
              {newrole === role ? (
                <button disabled className="btn btn-neutral">
                  save
                </button>
              ) : (
                <button onClick={UpdateRole} className="btn btn-neutral">
                  save
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="tooltip" data-tip="Delete user">
          <button className="btn btn-ghost btn-xs text-xl">
            <i className="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </th>
    </tr>
  );
  return row;
}
