import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import MobileHeader from "./MobileHeader";
import NavbarManus from "./NavbarManus";
import logo from "/images/web_logo.png";
import "../App.css"
import UserAvatar from "./UserAvatar";
import { useAuth } from "../Context/Authntication";
export default function Navbar() {
  const {user} = useAuth()

  const [Manue, SetManue] = useState(false);
  const [stickyheader, setStcikyHeader] = useState(false);
  const routes = [
    { id: 1, name: "Home", path: "/" },
    { id: 1, name: "Courses", path: "/courses/all" },
    { id: 2, name: "Gallery", path: "/gallery" },
    { id: 3, name: "Instructors", path: "/instructors" },
    { id: 4, name: "Events", path: "/schoolEvents" },
  ];
  const handleManubar = () => {
    SetManue(false);
  };
  useEffect(() => {
    const handleStickyHeader = () => {
      if (window.pageYOffset > 400) {
        setStcikyHeader(true);
      } else {
        setStcikyHeader(false);
      }
    };
    window.addEventListener("scroll", handleStickyHeader);

    return () => window.removeEventListener("scroll", handleStickyHeader);
  }, []);

  return (
    <> 
      <header
        className={`  ${
          stickyheader
            ? "mt-0 fixed w-full  bg-sky-100 shadow-2xl transition-all duration-500"
            : " md:rounded-lg md:container md:mt-10  relative"
        } mx-auto  text-[#1F2937]  z-50 w-full`}
      >
        <nav
          className={`navbar w-full mx-auto ${!stickyheader && "shadow-lg"}  rounded-lg bg-sky-100  ${stickyheader && "md:container"}`}
        >
          <div className="navsection flex justify-between w-full">
            <div className="navbrend text-2xl font-bold">
              <Link to="/">
                <img className="h-20" src={logo} alt="" />
              </Link>
            </div>
          </div>

          <div className="manus">
            <NavbarManus
              customclass=" gap-10 hidden lg:flex font-semibold lg:flex-row"
              routes={routes}
            ></NavbarManus>
          </div>
          <div className="defualt">
            <div className="nav_manu">    
            {!user &&  <NavLink to="/login" className=" font-bold mr-10">Login</NavLink>}</div>
          {user && <UserAvatar user={user}/>}
          </div>
          <div className="manuHandeler text-2xl cursor-pointer"> <i onClick={() => SetManue(true)} className="mr-2 lg:hidden block fa-solid fa-bars" ></i> </div>
        </nav>
      </header>
      <MobileHeader customclass={`${Manue ? "-translate-x-0" : "-translate-x-full"}`} handleManubar={handleManubar} routes={routes} />
    </>
  );
}
