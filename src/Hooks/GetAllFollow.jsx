import axios from "axios";
import  { useState } from "react";

export default function useGetAllFollow() {
  const[loading,setloading] = useState(true)
  const [Follows, setFollow] = useState();
  const fetchFollow = async (page, limit) => {
    try {
      setloading(true);
      const snapshort = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/follows?${
          page ? "page=" + page + "&" : ""
        }${limit ? "limit=" + limit  : ""}`,
        { withCredentials: true }
      );
      setFollow(snapshort.data.data);
      setloading(false);
    } catch (err) {
      setloading(false);
      console.log(err);
    }
  };
  
  return { Follows, fetchFollow,loading };
}
