import React, { useEffect, useState } from "react";

export default function useLoadGallerys() {
  const [Gallerys, setGallerys] = useState([]);
  useEffect(() => {
    const fetchGallerysData = async () => {
      const snapshort = await fetch("/Data/gellarys.json");
      const response = await snapshort.json();
      setGallerys(response);
    };
    fetchGallerysData();
  }, []);
  return Gallerys;
}
