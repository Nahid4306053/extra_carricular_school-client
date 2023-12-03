import axios from "axios";
import React, { useState } from "react";

export default function useGetAllFollow() {
  const [Follows, setFollow] = useState();
  const fetchFollow = async (page, limit) => {
    try {
      const snapshort = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/follows?${
          page ? "page=" + page + "&" : ""
        }${limit ? "limit=" + limit  : ""}`,
        { withCredentials: true }
      );
      setFollow(snapshort.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  return { Follows, fetchFollow };
}
