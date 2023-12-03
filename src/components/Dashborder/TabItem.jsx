import React from "react";
import { NavLink } from "react-router-dom";

export default function TabItem({ children, label , path }) {
  return (
    <NavLink to={path} className="sidebaritem  border-b border-slate-300  text-neutral  text-lg font-bold flex gap-4 items-center  p-4">
        {children}
        <p className=" tab_name lg:block">{label}</p>
    </NavLink>
  );
}
