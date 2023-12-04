import { useEffect, useState } from "react"; import { Link, useParams } from "react-router-dom";
import Pagebanner from "../components/Pagebanner";
import Card from "../components/Card"; 
import useFetchSingelCourse from "../Hooks/FetchsingelCourse";
import moment from "moment";
import usefetchcourseData from "../Hooks/FetchCourseData";
import useWhichList from "../Hooks/WhichList";
import { useAuth } from "../Context/Authntication";
import axios from "axios";
export default function SingleCourseView() {

  const {user} = useAuth()
  const { id } = useParams(); 
  const {addCourseinLocalStorage,getLocalStorageCourse} = useWhichList()
  const {coursedata} = useFetchSingelCourse(id || null)
  const [relatedCourse, setrelatedCourse] = useState([]);
  const {Courses,fetchcourses} = usefetchcourseData()
  const [isenrolled,setIsenrolled] = useState(false);
  const {_id, coursetitle, category, description, slogan ,status, eligibility, benifits, applicationdeadline,courseduration,instructors, startdate, thumbnail, coursefee} = coursedata || {};
  const CommmonButtonClass = "rounded-lg btn-lg  capitalize text-xl text-white"
  useEffect(() => {
    if(coursedata){
      setrelatedCourse(coursedata);
    }
  }, [id,coursedata]); 
  useEffect(()=>{
    if(coursedata){  
      fetchcourses(1,3,category); 
     }
           
  },[category, coursedata, fetchcourses])          
  useEffect(()=>{

    if(Courses){
      setrelatedCourse(Courses.data);
    }
   
  },[Courses])

     const handelCoursseEnroll = async () =>{
     try{
       const res = await axios.post(`${import.meta.env.VITE_API_URL}/course/enroll/${_id}`,{},{ headers: { "Content-Type": "application/json", }, withCredentials: true, }) 
         if(res.data.error){ alert(JSON.stringify(res.data.error.msg)) } 
         else{ alert(JSON.stringify(res.data.msg)); setIsenrolled(true);}
         } 
     catch(err){ console.log(err) } }

   useEffect(()=>{
     if(coursedata){
      const CheackEnrollAvilAvility = async () =>{
        const sanpshort = await axios.get(`${import.meta.env.VITE_API_URL}/course/enroll/${_id}`,{withCredentials:true});
        if(sanpshort.data.enroll){
           setIsenrolled(true);
           console.log(sanpshort.data.enroll)
        }  
        else{ 
         setIsenrolled(false);
        } 
      }
      CheackEnrollAvilAvility()
     }
   },[_id, coursedata])
  
    const handelCourseWhichList = () =>{
      const oldata = getLocalStorageCourse()
      if(oldata.includes(_id)){ alert("allready added")}
      else{ addCourseinLocalStorage(_id) }
    }


console.log(isenrolled);

  return ( < > { 
    coursedata &&
        ( < >  

    <Pagebanner backimg={thumbnail}>
      <h1 className="sub_title text-xl mb-5"> {slogan} </h1>
      <h1 className="mb-5 text-5xl font-bold">{coursetitle}</h1>
    </Pagebanner>

    <div className="coursedetails mx-auto mb-40 p-10 relative rounded-lg   container -mt-24 bg-white">
      <div className="grid items-center grid-cols-12 gap-10">
        <div className="col-span-full lg:col-span-8 md:col-spna-6">
          <div className="flex w-full">
            <div className="details w-full">
              <div className="mainDetails grid justify-between  items-center grid-cols-2 lg:grid-cols-3">
                <div className="flex items-center gap-4 text-2xl">
                  <div className="avatar-group -space-x-6"> {instructors.length > 0 && instructors.map((ele) => {
                    return (
                    <Link to={`/single-instructor/${ele._id}`} key={ele._id}> <div className="avatar">
                    <div className="w-12"> <img src={ele.avatar} /> </div>
                  </div>
                  </Link> ); })}
                </div>
              </div>
              <div className="text-lg ">
                <p>Catgorey:</p>
                <Link to={`/courses/${category}`} className="text-sky-500 ">{category}</Link>
              </div> 

              <div className="cursor-pointer text-sky-500 bookmark"> <i className="mr-2 fa-light fa-bookmark"></i>
                <span className="cursor-pointer" onClick={handelCourseWhichList}>Whislist</span> </div>
            </div>
            <div className="desc mt-10 flex flex-col gap-4">
              <h1 className="Course_title text-5xl font-semibold"> {coursetitle} </h1>
              <h1 className="slogan text-2xl font-semibold mt-6"> {slogan} </h1>
              <p className="leading-8 text-lg mt-5">{description}</p>
              <div className="course_outline">
                <div className="grid grid-cols-2 gap-5 text-lg mt-6 justify-between">
                  <p> <i className="mr-2 fa-light fa-clock"></i> Duration: {courseduration} Mounth</p>
                  <p> <i className="mr-3 fa-light fa-flag-checkered"></i> Starting: {moment(startdate).format('MMMM Do YYYY')} </p>
                  <p> <i className="mr-3 fa-light fa-chart-line-down"></i>Application Deadline: {moment(applicationdeadline).format('MMMM Do YYYY')}</p>                  
                  <p> <i className="mr-3 fa-light fa-chart-line-down"></i> Eligibility: {eligibility} </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
       <div className="text-center col-span-full grid  gap-8  lg:col-span-4 md:col-spna-6">
        <h1 className="text-6xl font-semibold"> ${coursefee} </h1> 
       
       {user.role ==="student" && <div>
        { isenrolled  ? <button disabled className={`${ CommmonButtonClass } btn-info`}>already Enroled </button> : status === "aproved" ?
        <button  onClick={handelCoursseEnroll}   className={`${ CommmonButtonClass } btn-info`}> Enrole Now </button> : 
          <button  disabled  className={ `${CommmonButtonClass} ${status === "pending" ? 'btn-secondary' :"btn"} `}> {status} Course </button>}
        </div>}

        <div className="benifits text-lg  flex flex-col gap-1">
          <h1 className="text-2xl capitalize">benifits</h1>
          <p className="p-2">{benifits.join(" , ")}</p>
        </div>
      </div>
    </div>
    <div className="mt-40 relatedCourse grid gap-10 grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
      <h1 className="col-span-full text-4xl">Related Courses:</h1> {relatedCourse.length > 1 &&
      relatedCourse.map((ele)=>{ 
       return (
       <Card key={ele._id}  element={ele} /> ) }) }
        {relatedCourse.length === 1 && <p className="text-lg">Not found any data</p>
       }
    </div>
    </div> 

  </> )} </> ); }