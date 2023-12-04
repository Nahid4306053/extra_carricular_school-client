/* eslint-disable react/prop-types */
import axios from "axios";
import  { createContext, useContext, useEffect, useState } from "react";
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
    <AuthProvidor.Provider value={{ loading, user, getCurrentuser }}>
      {!loading && children}
    </AuthProvidor.Provider>
  );
}
