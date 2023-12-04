/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import usefetchUserData from "../../Hooks/fetchUserData";
import Input from "../../components/InputBox";
import { map } from "lodash";
import { useModal } from "../../Context/ModalContext";

export default function Handlecorseinfo({ data, render }) {
  const {_id,applicationdeadline,benifits,
    category,courseduration,coursefee,coursetitle,description,eligibility,instructors,slogan,startdate,thumbnail
} = data.data || {}
  const {closeModel,setupdate} = useModal()
  const [img, setimg] = useState();
  const [Category, setCategory] = useState();
  const { users, fetchUsers } = usefetchUserData();
  const [selectedInstructors, setSelectedInstructors] = useState([]);
  const [Benifit, setBenifit] = useState([]);
  const [errorMsg, setErrorMsg] = useState([]);
  const getform = useRef();
  const [inputvalue , setinputvalue] = useState({});
  const [benifitInput,setBenifitInput] = useState();
  const handleimg = (inputimg) => {
    const profileimg = inputimg.target.files[0];
    setimg(URL.createObjectURL(profileimg));
  };
   const handleInput = (input) =>{
    setinputvalue({
    ...inputvalue,
      [input.target.name] : input.target.value
    })
    }
  const handleselectedInstructors = (Techer) => {
    if (selectedInstructors.includes(Techer.target.value)) {
      alert("This Instructors already selected");
    } else {
      setSelectedInstructors((old) => [...old, Techer.target.value]);
    }
  };
  const RemoveInstructors = (_id) => {
    const newdata = [...selectedInstructors];
    const index = newdata.indexOf(_id);
    newdata.splice(index, 1);
    setSelectedInstructors(newdata);
  };
  const handleBenifit = (Benifit) => {
    setBenifitInput(Benifit.target.value)
    setBenifit(benifitInput.split("\n").filter((ele) => ele.trim().length > 0));
    if (Benifit.key === "Backspace") {
      setBenifit(data.split("\n").filter((ele) => ele.trim().length > 0));
    } 

  };

  useEffect(() => {
    const loadcatgorey = async () => {
      const snapshort = await fetch("/Data/CourseCategorey.json");
      const data = await snapshort.json();
      setCategory(data);
    };
    fetchUsers("instructor");
    loadcatgorey();
  }, [fetchUsers]);

  useEffect(() => {
    getform.current.reset();
    setErrorMsg([]);
    if(data.mood === 'edit'){
        setinputvalue({ category : category  , courseduration : courseduration  , coursefee : coursefee  , coursetitle : coursetitle , description : description  , eligibility : eligibility  , slogan : slogan  , startdate :  startdate.split("T")[0]  , applicationdeadline:  applicationdeadline.split("T")[0] , })
      setSelectedInstructors(map(instructors,"_id")); setBenifit(benifits) , setBenifitInput(benifits.join("\n")) , setimg();
    }
    
    else{
      setimg(); setBenifit([]); setSelectedInstructors([]);  setBenifitInput('');
      setinputvalue(  { category :   '' , courseduration : '' , coursefee : '' , coursetitle : '' , description :  '' , eligibility :  '' , slogan : '' , startdate : '' , applicationdeadline: ''})
    }

  }, [render, data, category, courseduration, coursefee, coursetitle, description, eligibility, slogan, startdate, applicationdeadline, instructors, benifits]);


  const submitCourseInfo = async (form) => {
    form.preventDefault();
    form.stopPropagation();
    const error = [];
    const thumbnail = form.target.thumbnail.files;
    const startdate = form.target.startdate.value;
    const applicationdeadline = form.target.applicationdeadline.value;

    if (data.mood === "add" && thumbnail.length === 0) {
      error.push("Please upload a thumbnail");
    }
    if (thumbnail.length > 1) {
      error.push("Please upload only one thumbnail");
    }
    //  check selectinstructor length
    if (selectedInstructors.length === 0) {
      error.push("Please select atleast one Instructor");
    }
    if (startdate === "") {
      error.push("Please set a start date");
    }
    if (applicationdeadline === "") {
      error.push("Please set a application deadline");
    }
    if (startdate < applicationdeadline) {
      error.push("applicationdeadline should less then start date");
    }
    if (startdate < new Date()) {
      error.push("start date should less then current date");
    }
    if (applicationdeadline < new Date()) {
      error.push("applicationdeadline should less then current date");
    }

    // check benifit
    if (Benifit.length === 0) {
      error.push("Please select atleast one Benifit");
    }

    setErrorMsg(error);
    if (error.length === 0) {
      setErrorMsg([]);
      const formdata = new FormData(form.target);
      formdata.append("instructors", JSON.stringify(selectedInstructors));
      formdata.append("benifits", JSON.stringify(Benifit));

      try {
        const sanpshort = data.mood === "add" 
        ? await axios.post(
          `${import.meta.env.VITE_API_URL}/course`,
          formdata,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        ) : 
       
        await axios.put(
          `${import.meta.env.VITE_API_URL}/course/${_id}`,
          formdata,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        )
        if (
          sanpshort.data.error &&
          Object.keys(sanpshort.data.error).length > 0
        ) {
          for (let erros in sanpshort.data.error) {
            setErrorMsg((old) => [...old, sanpshort.data.error[erros].msg]);
          }
        } else {
          if (sanpshort.data.data) { 
            setupdate(sanpshort.data.data);
            closeModel()
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
   data &&   <div className="card  w-full   bg-base-100">
   <div className="p-10  items-center gap-10">
     <div className="h-96 flex justify-center overflow-hidden ">
       <img
         className=" h-full"
         src={img ? img : thumbnail ? thumbnail : "https://i.ibb.co/6BGt0LL/summer-internship.webp"}
         alt=""
       />
     </div>
     <div className="flex flex-col justify-evenly">
       <div>
         {errorMsg.length > 0 && (
           <div className="errobox mt-4 py-4 px-5">
             <ul className="erros  p-4 flex flex-wrap gap-3 bg-red-300 rounded-lg text-red-600">
               {errorMsg.map((ele, ind) => {
                 return (
                   <li className="ml-4" key={ind}>
                     😐️ {ele}
                   </li>
                 );
               })}
             </ul>
           </div>
         )}
         <form
           ref={getform}
           onSubmit={submitCourseInfo}
           className="p-4 grid gap-3"
         >
           <div className="form-control">
             <label className="label">
               <span className="label-text">Course Banner</span>
             </label>
             <input
                 name="thumbnail"
               onChange={handleimg}
               accept=".jpg,.png,.webp,.jpeg"
               type="file"
               className="file-input file-input-bordered w-full "
             />
           </div>
           <Input
             placeholder="Course Title"
             label="Course Title"
             onChange={handleInput}   name="coursetitle"

             value={inputvalue.coursetitle}
           />
           <div className="form-control">
             <label className="label">
               <span className="label-text">Course Categorey</span>
             </label>
             <select

               onChange={handleInput}   name="category"
               className="select select-bordered w-full "
               value={inputvalue.category}
             >
               <option defaultChecked>Select a Catgorey</option>
               {Category &&
                 Category.map((item) => (
                   <option key={item._id} value={item.category}>
                     
                     {item.category}
                   </option>
                 ))}
             </select>
           </div>
           <Input placeholder="Slogan" label="Slogan" onChange={handleInput}   name="slogan" value={inputvalue.slogan} />
           <Input
             placeholder="Eligibility"
             label="Eligibility"
             onChange={handleInput}   name="eligibility"
             value={inputvalue.eligibility}
           />
           <div className="flex lg:flex-row flex-col  justify-between gap-4 ">
             <Input
               placeholder="Start Date"
               type="date"
               label="Start Date"
               onChange={handleInput}   name="startdate"
               value={inputvalue.startdate}	
             />

             <Input
               placeholder="ApplicationDeadline"
               type="date"
               label="ApplicationDeadline"
               onChange={handleInput}   name="applicationdeadline"
               value={inputvalue.applicationdeadline}
             />
             <Input
               placeholder="Course Fee"
               type="number"
               label="Course Fee"
               onChange={handleInput}   name="coursefee"
               value={inputvalue.coursefee}
             />

             <Input
               placeholder="Course duration"
               type="number"
               label="Course duration(month)"
               onChange={handleInput}   name="courseduration"
               value={inputvalue.courseduration}
             />
           </div>
        {users &&  
         <div className="selectechers">
             <div className="form-control">
               <label className="label">
                 <span className="label-text">
                   Select Instructors for this course
                 </span>
               </label>
                <select
                 onChange={handleselectedInstructors}
                 className="select select-bordered w-full "
               >
                 <option defaultChecked>Select a Instructors</option>
                 {users &&
                   users.data.map((item) => (
                     <option key={item._id} value={item._id}>
                       
                       {item.username}
                     </option>
                   ))}
               </select>
             </div>

             <div className="flex flex-wrap gap-4 my-4">
               {users && selectedInstructors.length > 0 &&
                 users.data
                   .filter((ele) =>
                     selectedInstructors.includes(ele._id.toString())
                   )
                   .map((ele) => {
                     return (
                       <div key={ele._id} className="flex gap-4">
                         <img
                           className="h-14"
                           src={
                             ele.avatar
                           }
                           alt=""
                         />

                         <div className="flex flex-col  justify-center">
                           <p className="text-sm font-medium text-gray-900">
                             
                             {ele.username}
                           </p>

                           <div>
                             <div
                               onClick={() => RemoveInstructors(ele._id)}
                               className="cursor-pointer text-xs p-2 "
                             >
                               Remove
                             </div>
                           </div>
                         </div>
                       </div>
                     );
                   })}
             </div>
           </div>
           }
           <div className="benifits grid grid-cols-2 gap-5">
             <div className="form-control flex-1">
               <label className="label">
                 <span className="label-text">
                   Write benifits start with (__) for create list
                 </span>
               </label>
               <textarea
                 onInput={handleBenifit}
                 onKeyDown={handleBenifit}
                 className="textarea textarea-bordered h-fullg w-full"
                 value={benifitInput}
               ></textarea>
             </div>
             <div className="flex-1">
               <h1>Benifits List:</h1>
               <ul>
                 {Benifit.length > 0 &&
                   Benifit.map((ele, ind) => (
                     <li className="break-words" key={ind}>
                       {ind + 1}. {ele}
                     </li>
                   ))}
               </ul>
             </div>
           </div>
           <div className="form-control mt-6">
             <label className="label">
               <span className="label-text">Course Description</span>
             </label>
             <textarea
               onChange={handleInput}   name="description"
               className="textarea textarea-bordered"
               rows="5"
               placeholder="Enter Course Description"
               value={inputvalue.description}
             />
           </div>
           <div className="form-control mt-6">
             <input  type="submit" value= {data.mood === "add" ? " Publish Now" : "Update Now"} className="btn btn-primary"/>
             
             
           </div>
         </form>
       </div>
     </div>
   </div>
 </div>
  );
}
