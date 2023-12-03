import axios from "axios";
import React, { useEffect, useState } from "react";

export default function useFetchSingelUserWithCourse(id,role) {
  const [userwithCourse, setuserwithCourse] = useState();
  useEffect(() => {
    const fetchUseWithCourse = async () => {
      try {
        const snapshort = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/singel/${id}?role=${role}`,
          { withCredentials: true }
        );
        setuserwithCourse(snapshort.data);
        
      } catch (err) {
        console.log(err);
      }
    };
    fetchUseWithCourse()
  }, []);
  return {userwithCourse}
}