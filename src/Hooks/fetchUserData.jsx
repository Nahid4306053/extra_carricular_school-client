import axios from "axios";
import React, { useEffect, useState } from "react";

export default function usefetchUserData() {
  const [loading,setloading] = useState(true);
  const [users, setusers] = useState();
   const fetchUsers = async (role, page, limit) => {
      try {
        const snapshort = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/all?${role ? "role=" + role + "&" : "" }${
            page ? "page=" + page + "&" : ""
          }${limit ? "limit=" + limit : ""}`
        ,{withCredentials:true});
        setusers(snapshort.data);
        setloading(false)
      } catch (err) {
        setloading(false)
        console.log(err);
      }
    };
 
  return {users,fetchUsers,loading}
}
