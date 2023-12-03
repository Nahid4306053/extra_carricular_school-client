import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function NavbarManus({children ,routes , customclass , handleManubar}) {
  return (
    <ul className={`nav_manus flex  ${customclass}`}>
      {routes.map((navlinks, ind) => {
        return (
          <li key={ind} style={{wordBreak:"keep-all"}}  className="flex nav_manu justify-center nav_item  " >
            <NavLink onClick={handleManubar} className="whitespace-nowrap"  to={navlinks.path} >{navlinks.name}</NavLink>
          </li>
        );
      })}
     <li className="flex justify-center"> {children}</li>
    </ul>
  );
}
