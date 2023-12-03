import React, { useEffect, useState } from "react";

export default function useLoadTeachers() {
  const [Teachers, setTeachers] = useState([]);
  useEffect(() => {
    const fetchTeachersData = async () => {
      const snapshort = await fetch("/Data/Instructors.json");
      const response = await snapshort.json();
      setTeachers(response);
    };
    fetchTeachersData();
  }, []);
  return Teachers;
}
