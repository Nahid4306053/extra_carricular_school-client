/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import  { useEffect, useState } from "react";

export default function useFetchSingelUserWithCourse(id,role) {
  const [loading,setloading] = useState(true);
  const [userwithCourse, setuserwithCourse] = useState();
  useEffect(() => {
    const fetchUseWithCourse = async () => {
      try {
        setloading(true)
        const snapshort = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/singel/${id}?role=${role}`,
          { withCredentials: true }
        );
        setuserwithCourse(snapshort.data);
        setloading(false)
      } catch (err) {
        console.log(err);
        setloading(false)
      }
    };
    fetchUseWithCourse()
  }, []);
  return {userwithCourse , loading}
}