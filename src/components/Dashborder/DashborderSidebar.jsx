
import TabItem from "./TabItem";
import { useAuth } from "../../Context/Authntication";

export default function DashborderSidebar() {
  const {user} = useAuth()
//  console.log(user.avatar)
  return (
    <div className="overflow-hidden dashborder-layout-left  col-span-3 md:col-span-2 lg:col-span-3 bg-slate-200">
      <div className="h-[25%] dashborder-layout-left-header border-b border-slate-300 py-5 flex items-center">
        <div className="avatra p-2 mx-auto mt-5 overflow-hidden">
          <div className="rounded-full overflow-hidden h-[50px] w-[50px] lg:h-[100px] lg:w-[100px] ring-4">
           {user && <img className="h-full w-full object-cover" src={import.meta.env.VITE_IMG_URL + "/avatars/" + user.avatar} alt="avatar" />}
          </div>
        </div>
      </div>
      <div className="h-[75%] Sidebar_tab custom-scrollber overflow-auto  text-neutral lg:text-lg  md:text-2xl text-lg">

         <TabItem path="/dashborder/profile" label={'My Profile'}><i className="fa-regular fa-user"></i></TabItem>

         {user.role === "student" &&
         <TabItem path="/dashborder/whichlist-courses" label={'Whichlist Courses'}> <i className="fa-duotone fa-bookmark"></i></TabItem>}

        {(user.role === "student" || "instructor") && <TabItem path="/dashborder/my-courses" label={'My Courses'}><i className="fa-duotone fa-book"></i></TabItem>
         }
          {(user.role === "student" || "instructor" ) &&
         <TabItem path="/dashborder/follow" label={user.role === "student" ? 'Following instructor' :"My Followers"}><i className="fa-solid fa-heart"></i></TabItem>}
        
         <TabItem path="/dashborder/notice" label={'Emergency Notice'}> <i className="fa-solid fa-light-emergency"></i></TabItem> 
         {user.role === "admin" && 
         <TabItem path="/dashborder/users" label={'Users'}> <i className="fa-duotone fa-users"></i></TabItem>    } 
         {user.role === "admin" && 
         <TabItem path="/dashborder/students" label={'Students'}> <i className="fa-solid fa-graduation-cap"></i></TabItem>}

         {user.role === "admin" && 
         <TabItem path="/dashborder/instructors" label={'Instructors'}> <i className="fa-solid fa-person-chalkboard"></i></TabItem>}
         {user.role === "admin" && 
         <TabItem path="/dashborder/coursetable" label={'Courses'}> <i className="fa-light fa-book-open"></i></TabItem> }
         {user.role === "admin" && 
         <TabItem path="/dashborder/events" label={'Events'}><i className="fa-duotone fa-calendar-days"></i></TabItem>}
        {user.role === "admin" && 
         <TabItem path="/dashborder/gallerys" label={'Gallery'}><i className="fa-sharp fa-light fa-gallery-thumbnails"></i></TabItem>}


      </div>
    </div>
  );
}
