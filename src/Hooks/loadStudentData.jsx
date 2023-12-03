import React, { useEffect, useState } from "react";
export default function useLoadStudentData() {
  const [Students, setStudents] = useState([]);
  useEffect(() => {
    const fetchStudentsData = async () => {
      const snapshort = await fetch("/Data/Student.json");
      const response = await snapshort.json();
      setStudents(response);
    };
    fetchStudentsData();
  }, []);
  return Students;
}
