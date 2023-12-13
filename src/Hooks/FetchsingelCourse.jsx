import axios from "axios";
import  { useEffect, useState } from "react";

export default function useFetchSingelCourse(id) {
  const [coursedata, setCoursedata] = useState();

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/course/singel/${id}`,
            { withCredentials: true }
          ); 
          if (response.data) {
            setCoursedata(response.data.data);
          } else {
            setCoursedata(null);
            console.log(response.data.error);
          }
        } catch (err) {
          setCoursedata(null);
          console.log(err);
        }
      };
      fetchData();
    }
  }, [id]);

  return { coursedata };
}
