/* eslint-disable react-hooks/exhaustive-deps */
import  { useEffect, useState } from "react";
import useGetAllFollow from "../../../Hooks/GetAllFollow";
import { map, uniqBy } from "lodash";
import DashborderSearchBox from "../DashborderSearchBox";
import { useAuth } from "../../../Context/Authntication";
import { Link } from "react-router-dom";

export default function Follow() { 
  const[page] = useState(1)
  const {fetchFollow,Follows,loading} = useGetAllFollow(page);
  const [displayfollows,setDisplayfollows] = useState([]);
 
  const {user} = useAuth()
  useEffect(()=>{
    if(Follows){
      if(user.role === "student"){
        setDisplayfollows(uniqBy([...displayfollows,...map(Follows,"following")],"_id"))
      }
      else{
        setDisplayfollows(uniqBy([...displayfollows,...map(Follows,"student")],"_id"))
      }
    }
  },[Follows, user])
  useEffect(()=>{
    fetchFollow(page,10)
  },[page])

  return (
    <>
    <>
     <DashborderSearchBox></DashborderSearchBox>
    </>
    { displayfollows.length > 0 ? 
        <div className="overflow-x-auto h-[70vh] custom-scrollber table_custom  ">
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
            {displayfollows.length > 0 &&  
            displayfollows.map((user) => (
              <tr key={user._id}> 
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={user.avatar}
                        alt={user.username}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{user.username}</div>
                    <div className="text-sm opacity-50">{user.role}</div>
                  </div>

                </div>
              </td>
              <td>
                {user.email}
                <br />
                <span className="badge badge-ghost badge-sm">{user.phone_number}</span>
              </td>
              <td>{user.address}</td>
               <td>
                {user.role === "instructor" && 
                 <Link to={`../../single-instructor/${user._id}`}>
                 <div className="tooltip" data-tip="Deatils">
                   <button className="btn btn-ghost btn-xs text-xl">
                     <i className="fa-solid fa-circle-info"></i>
                   </button>
                 </div>
               </Link>
                }

                  <div className="tooltip" data-tip="Remove">
                    <button className="btn btn-ghost btn-xs text-xl">
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
               </td>
            </tr>
            ))}
          </tbody>
        </table>
        
      </div> 

    :

    <>
    {loading ? <div className="w-full text-center my-20"><span className="loading loading-spinner loading-lg"></span></div>
     : <div className="h-full flex justify-center items-center w-full">
      <h1 className="text-center text-5xl font-bold">
        No follower Found
      </h1>
    </div>}
    </>}
  </>);
}
