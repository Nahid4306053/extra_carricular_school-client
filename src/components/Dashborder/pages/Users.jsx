import React, { useEffect, useState } from "react";
import useLoadTeachers from "../../../Hooks/LoadTeachersData";
import UserRow from "../UserRow";
import useLoadStudentData from "../../../Hooks/loadStudentData";
import DashborderSearchBox from "../DashborderSearchBox";
import usefetchUserData from "../../../Hooks/fetchUserData";
import { uniqBy } from "lodash";

export default function Users() {
  const teachers = useLoadTeachers(); 
  const students = useLoadStudentData();
  const [displayuser, setDisplayuser] = useState([]) 
  const [page,setpage] = useState(1);
  const {users,fetchUsers} = usefetchUserData();
  const [loading,setloading] = useState(false);
 
  const handelData = async (e) =>{
    if(e.target.scrollTop  === (e.target.scrollHeight - e.target.offsetHeight )){
     if(users.totaluser !== displayuser.length){
      console.log("call")
      setpage(page+1)
      setloading(true)
      await  fetchUsers('',page,10);
      setDisplayuser(uniqBy([...displayuser,...users.data],'_id'))
      setloading(false)
     }
    }
  }
  useEffect(()=>{
   if(users){
     setDisplayuser(uniqBy([...displayuser,...users.data],'_id'))
   }
  },[users])  

  useEffect(()=>{
    fetchUsers('',page,10)
  },[]) 
 

  return ( 
    <>
     <DashborderSearchBox></DashborderSearchBox>
     <div onScroll={handelData} className="overflow-x-auto h-[70vh] custom-scrollber table_custom  ">
      <table className="table-pin-rows table ">
        {/* head */}
        <thead className="">
          <tr>
            <th>Username</th> 
            <th>Contact Info</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {displayuser.length > 0 &&  
          displayuser.map((user) => (
            <UserRow key={user._id} user={user} />
          ))}
        </tbody>
        
      </table>
      {loading && <div className="w-full text-center"><span className="loading loading-spinner loading-lg"></span></div>}
    </div>             

    </>
  );
}
