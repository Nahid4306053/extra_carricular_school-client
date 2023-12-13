/* eslint-disable no-unused-vars */

import { useLocation } from "react-router-dom";


import logo from "/images/footer.png";
export default function Footer() {
  const { Darkmood } = {}
  const { pathname } = useLocation();
  const paths = ["/login", "/signup" , "/dashborder"];
  return (
    <footer className={`  pt-10  ${Darkmood ? "bg-base-300" : "bg-[#09253D]"}`}> {/* bg-sky-100 */}
    <div className="grid container mx-auto text-white lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
      <div className="about_info mt-10">
        <img className="h-14" src={logo} alt="" />
        <br />
        <div className="info mt-5 flex gap-4 items-center">
          <h2 className="text-4xl  text-sky-400 w-10">
            <strong>
              <i className="fa-regular fa-location-dot"></i>
            </strong>
          </h2>
          <div className="location">
            <p>
              685 Market Street San Francisco, <br /> Dhaka, Bangladesh
            </p>
          </div>
        </div>
        <div className="info mt-5  flex gap-4 items-center">
          <h2 className="text-4xl text-sky-400  w-10">
            <strong>
              <i className="fa-regular fa-phone"></i>
            </strong>
          </h2>
          <div className="tel">
            <p>Call us +(880) 01954849695</p>
          </div>
        </div>
        <div className="info mt-5  flex gap-4 items-center">
          <h2 className="text-4xl text-sky-400  w-10">
            <strong>
              <i className="fa-regular fa-envelope"></i>
            </strong>
          </h2>
          <div className="tel">
            <p>Mail us ku4306053@gmail.com</p>
          </div>
        </div>
        <div className="socials flex gap-4">
          <a className="rounded-full mt-4" href="/">
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a className="rounded-full mt-4" href="/">
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a className="rounded-full mt-4" href="/">
            <i className="fa-brands fa-youtube"></i>
          </a>
          <a className="rounded-full mt-4" href="/">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a className="rounded-full mt-4" href="/">
            <i className="fa-brands fa-github"></i>
          </a>
        </div>
      </div>
      <div className="links mt-10">
        <h1 className="shops mt-4 text-2xl font-bold text-sky-400">Shops</h1>
        <ul className="mt-8 w-auto ">
          <li className="leading-10 hover:text-sky-400 hover:underline cursor-pointer">
            New Collections
          </li>
          <li className="leading-10 hover:text-sky-400 hover:underline cursor-pointer">
            Trending product
          </li>
          <li className="leading-10 hover:text-sky-400 hover:underline cursor-pointer">
            Sale and Special offers
          </li>
          <li className="leading-10 hover:text-sky-400 hover:underline cursor-pointer">
            Top brends
          </li>
          <li className="leading-10 hover:text-sky-400 hover:underline cursor-pointer">
            Smart phones
          </li>
          <li className="leading-10 hover:text-sky-400 hover:underline cursor-pointer">
            Desktop{" "}
          </li>
        </ul>
      </div>
      <div className="links mt-10">
        <h1 className="shops mt-4 text-2xl font-bold text-sky-400">
          Further Information
        </h1>
        <ul className="mt-8 w-auto ">
          <li className="leading-10 hover:text-sky-400 hover:underline cursor-pointer">
            {" "}
            About{" "}
          </li>
          <li className="leading-10 hover:text-sky-400 hover:underline cursor-pointer">
            {" "}
            Customer Service
          </li>
          <li className="leading-10 hover:text-sky-400 hover:underline cursor-pointer">
            {" "}
            Reward Program
          </li>
          <li className="leading-10 hover:text-sky-400 hover:underline cursor-pointer">
            {" "}
            Shipping & Returns
          </li>
          <li className="leading-10 hover:text-sky-400 hover:underline cursor-pointer">
            {" "}
            Privacy Policy
          </li>
          <li className="leading-10 hover:text-sky-400 hover:underline cursor-pointer">
            Terms & Conditions
          </li>
        </ul>
      </div>
      <div className="links mt-10">
        <h1 className="shops mt-4 text-2xl font-bold text-sky-400">
          Customer Service
        </h1>
        <ul className="mt-8 w-auto ">
          <li className="leading-10 hover:text-sky-400 hover:underline cursor-pointer">
            {" "}
            Search Terms{" "}
          </li>
          <li className="leading-10 hover:text-sky-400 hover:underline cursor-pointer">
            {" "}
            Advanced Search{" "}
          </li>
          <li className="leading-10 hover:text-sky-400 hover:underline cursor-pointer">
            {" "}
            Orders And Returns{" "}
          </li>
          <li className="leading-10 hover:text-sky-400 hover:underline cursor-pointer">
            {" "}
            Shipping & Contact Us
          </li>
          <li className="leading-10 hover:text-sky-400 hover:underline cursor-pointer">
            {" "}
            Consultant
          </li>
          <li className="leading-10 hover:text-sky-400 hover:underline cursor-pointer">
            Store Locations
          </li>
        </ul>
      </div>
    </div>
    <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between"></div>
     <div className={`coppwright  ${Darkmood ? "bg-[#0e1218]" : "bg-[#051b30]"}  `}>
     <div className="container py-6 mx-auto mt-10 flex-col gap-5 lg:flex-row flex justify-between items-center">
      <span className="text-sm text-white text-center w-full">
        © {new Date().getFullYear()}{" "}
        <a href="#" className="hover:underline">
          NahidTechNoWorld™
        </a>
        . All Rights Reserved.
      </span>
      <div>
       
      </div>
    </div>
     </div>
  </footer>
  );
}
