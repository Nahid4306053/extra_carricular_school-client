import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Profile from "../components/Dashborder/pages/Profile";
import MainLayouts from "../layouts/MainLayouts";
import Dashborder from "../pages/Dashborder";    
import Home from "../pages/Home";
import Instructors from "../pages/Instructors";
import Login from "../pages/Login"; 
import Notfound from "../pages/Notfound";
import SchoolEvents from "../pages/SchoolEvents";
import SchollGellary from "../pages/SchoolGellary";
import Signup from "../pages/SignUp";
import SingleCourseView from "../pages/SingleCourseView";
import SingleInstructor from "../pages/SingleInstructor";
import Courses from "../pages/courses";
import Users from "../components/Dashborder/pages/Users";
import Students from "../components/Dashborder/Students";
import InstructorTable from "../components/Dashborder/pages/InstructorTable";
import CourseTablerow from "../components/Dashborder/CourseTablerow";
import CourseTable from "../components/Dashborder/pages/CourseTable";
import Authntication from "../Context/Authntication";
import Notice from "../components/Dashborder/pages/Notice";
import Follow from "../components/Dashborder/pages/Follow";
import Gallerys from "../components/Dashborder/pages/Gallerys";
import Events from "../components/Dashborder/pages/Events";
import MyCourses from "../components/Dashborder/pages/MyCourses";
import WhichlistCourses from "../components/Dashborder/pages/WhichlistCourses";
import AdminPrivateRoute from "./AdminPrivateRoute";
import StudentPrivateRoute from "./StudentPrivateRoute";
const CreateDRouter = createBrowserRouter([
  {
    path: "/",
    element: <Authntication><><MainLayouts /></></Authntication> ,
    errorElement: <Notfound />,
    children: [
      {
        path: "/",
        loader: () => fetch("/Data/data.json"),
        element: <Home />,
      },
      {
        path: "/courses/:categorey",
        loader: () => fetch("/Data/data.json"),
        element: <Courses />,
      },
      {
        path: "/gallery",
        loader: () => fetch("/Data/data.json"),
        element: <SchollGellary />,
      },
      {
        path: "/instructors",
        loader: () => fetch("/Data/data.json"),
        element: <Instructors />,
      },
      {
        path: "/schoolEvents",
        loader: () => fetch("/Data/data.json"),
        element: <SchoolEvents />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/dashborder",
        element: <Dashborder />,
        children: [
          {
            path: "/dashborder/profile",
            element: <Profile />,
          },        
            {
            path: "/dashborder/whichlist-courses",
            element: <StudentPrivateRoute><WhichlistCourses /></StudentPrivateRoute>,
          },
         
            {
            path: "/dashborder/my-courses",
            element: <MyCourses />,
          },           
           {
            path: "/dashborder/users",
            element: <AdminPrivateRoute><Users /></AdminPrivateRoute>,
          } ,         
           {
            path: "/dashborder/students",
            element: <AdminPrivateRoute><Students /></AdminPrivateRoute>,
          },       
           {
            path: "/dashborder/instructors",
            element: <AdminPrivateRoute><InstructorTable /></AdminPrivateRoute>,
          },{
            path: "/dashborder/coursetable",
            element:<AdminPrivateRoute><CourseTable /></AdminPrivateRoute> ,
          },
          ,{
            path: "/dashborder/notice",
            element: <Notice />,
          },       
             ,{
            path: "/dashborder/follow",
            element: <Follow />,
          },            
          ,{
            path: "/dashborder/events",
            element:<AdminPrivateRoute> <Events /></AdminPrivateRoute>,
          },          ,{
            path: "/dashborder/gallerys",
            element: <AdminPrivateRoute><Gallerys /></AdminPrivateRoute>,
          },
        ],
      },
      {
        path: "/single-course-view/:id",
        loader: async () => {
          const sanpshrcotourse = await fetch("/Data/courses.json");
          const sanpshrotInstructors = await fetch("/Data/Instructors.json");
          return {
            course: await sanpshrcotourse.json(),
            Instructors: await sanpshrotInstructors.json(),
          };
        },
        element: <SingleCourseView />,
      },
      {
        path: "/single-instructor/:id",
        loader: async () => {
          const sanpshrcotourse = await fetch("/Data/courses.json");
          const sanpshrotInstructors = await fetch("/Data/Instructors.json");
          return {
            course: await sanpshrcotourse.json(),
            Instructors: await sanpshrotInstructors.json(),
          };
        },
        element: <SingleInstructor />,
      },
    ],
  },
]);

export default CreateDRouter;
