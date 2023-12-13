import axios from "axios";
import  { useEffect, useState } from "react";

export default function useFetchSingelCourse(id) {
  const [coursedata, setCoursedata] = useState();
  const [loading,setloading] = useState(true)
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          setloading(true)
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
          setloading(false)
        } catch (err) {
          setloading(false)
          setCoursedata(null);
          console.log(err);
        }
      };
      fetchData();
    }
  }, [id]);

  return { coursedata ,loading};
}
