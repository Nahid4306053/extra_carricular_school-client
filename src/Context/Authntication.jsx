/* eslint-disable react/prop-types */
import axios from "axios";
import Lottie from "lottie-react";
import  { createContext, useContext, useEffect, useState } from "react";
import Authloader from '../assets/AuthLoading.json'
const AuthProvidor = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthProvidor);
};

export default function Authntication({ children }) {
  const [loading, setloading] = useState(true);
  const [user, setUser] = useState(null);

  const getCurrentuser = async () => {
    setloading(true);         
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/current`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const data = response.data;
      if (!data.error) {
        setUser(data);
        setloading(false);
      } else {
        setUser();
        setloading(false);
      }
    } catch (err) {
      console.log(err);
      setloading(false);
      setUser();
    }
  };
  useEffect(() => {
    getCurrentuser();
    return () => getCurrentuser();
  }, []);

  return (
    <AuthProvidor.Provider value={{ loading,setUser, user, getCurrentuser }}>
      {!loading && children}
      {loading && 
        <div className="min-h-screen  w-full flex justify-center items-center">
          <Lottie className="h-52" animationData={Authloader}></Lottie>
        </div>}
    </AuthProvidor.Provider>
  );
}
