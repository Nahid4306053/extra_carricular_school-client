import React from "react";
import { Outlet } from "react-router-dom";
import DashborderSidebar from "../components/Dashborder/DashborderSidebar";
import "../styles/dashborder.scss";
export default function Dashborder() {
  return (
    <div className="class dashborder-container">
      <div className="mt-20 rounded-lg overflow-hidden grid grid-cols-12 dashborder-layout container mx-auto bg-white h-[80vh] ">
        <DashborderSidebar />
        <div className="relative dashborder-layout-right custom-scrollber overflow-auto col-span-9  md:col-span-10 lg:col-span-9 bg-slate-100">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
}
