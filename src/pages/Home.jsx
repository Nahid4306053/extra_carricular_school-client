/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import  { useEffect, useState } from "react";
import Banner from "../components/Home/Banner";
import { Link, useLoaderData } from "react-router-dom";
import Card from "../components/Card";
import AboutLearningEinvrionment from "../components/Home/AboutLearningEinvrionment";
import useloadCoursedata from "../Hooks/loadCoursedata";
import Gellary from "../components/Gellary";
import useLoadGallerys from "../Hooks/lodaGellarey";
import Events from "../components/Home/Events";
import Teacher from "../components/Teacher";
import useLoadTeachers from "../Hooks/LoadTeachersData";
import ViewAllBtn from "../components/ViewAllBtn";
import usefetchcourseData from "../Hooks/FetchCourseData";
import fetchUserData from '../Hooks/fetchUserData'
import { uniqBy } from "lodash";
import CourseBanner from "../components/Home/CourseBanner";
export default function Home() {
  const datas = useLoaderData();
  const [displyeData,setdisplyeData] = useState([]);
  
  const Gallerys = useLoadGallerys();
  const {Courses,fetchcourses , loading} = usefetchcourseData()
  const [instructors,setinstructors] = useState([])
  const {fetchUsers,users,loading:instaloading} = fetchUserData();
  
  useEffect(()=>{
    fetchUsers('instructor',1,6)
  },[]) 
  useEffect(()=>{
    if(users){
      
         setinstructors(uniqBy([...instructors,...users.data],'_id'))
       }
  },[users])

  useEffect(()=>{
    fetchcourses(1,6)
  },[])
  useEffect(()=>{
    if(datas){
      setdisplyeData(datas);
    }
  },[datas]);

  const handleSearch = (searchKeyword) =>{
   if(searchKeyword){
     const findserchitem = datas.filter(ele => ele.Category.toLowerCase() === searchKeyword.toLowerCase())
     setdisplyeData(findserchitem);
   }
  }

  return (
    <div className="mb-20">
      <Banner serchinputdata={handleSearch} />
      <AboutLearningEinvrionment/>
      <div className="grid gap-10 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 grid-cols-1  mb-28 container mx-auto">
      <div className=" capitalize container mx-auto text-center col-span-full mt-28 mb-20 space-y-2">
      <h3 className="text-xl text-sky-500">Embark on a Learning Adventure</h3>
       <h1 className="text-5xl mb-5 font-bold">Explore Our Courses</h1>

          </div>
         {!loading ? Courses?.data.length > 0 ? 
          Courses.data.slice(0,6).map((ele,ind)=>{
           return <Card  redirect={`/details/${ele._id}`} key={ind} element={ele}/>
          })
          : <h1 className='text-4xl font-bold text-center  col-span-12'>No Data found</h1>
         : <div className="w-full col-span-3 flex justify-center">
          <span className="loading loading-spinner loading-lg"></span>
         </div>
        }
        </div>
        <CourseBanner></CourseBanner> 
        <div className=" capitalize container mx-auto text-center  my-28 space-y-2">
          <h3 className="text-xl text-sky-500">Explore our creator</h3>
          <h1 className="text-5xl mb-5 font-bold">Our Genious Instructors</h1>
          </div>
       
        {!instaloading ? instructors.length > 0 && <Teacher instructors={instructors}/>
       : <div className="w-full  min-h-[300px] flex justify-center">
       <span className="loading loading-spinner loading-lg"></span>
   </div>  
      }
       
        <Link to="/instructors"><ViewAllBtn>See all instructor</ViewAllBtn></Link>
        {/* <ViewAllBtn>View all COURSE</ViewAllBtn> */}       
         <div className=" capitalize container mx-auto text-center mt-20 my-20 space-y-3">
        <h3 className="text-xl text-sky-500">Dive into Experiences</h3>
       <h1 className="text-5xl mb-5 font-bold">Unveiling Our Vibrant Events</h1>
          </div>
        <Events />

       
       <Link to="/events"> <ViewAllBtn>view all events</ViewAllBtn></Link>
        <div className=" capitalize container mx-auto text-center mt-20 my-28 space-y-2">
        <h3 className="text-xl text-sky-500">Immerse Yourself in Our Activities</h3>
         <h1 className="text-5xl mb-5 font-bold"> Our Captivating Gallery</h1>

        </div>
        {Gallerys.length > 0 &&   <Gellary  elements={Gallerys.slice(0,6)}/> }
        <div className="col-span-12 flex justify-end container mx-auto"><button className="btn btn-info text-white my-20">View all Activites<i className="fa-thin fa-arrow-right"></i></button></div> 
        


       
    </div>
  );
}
