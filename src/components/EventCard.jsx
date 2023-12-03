import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../styles/EventCard.scss'
import { useModal } from "../Context/ModalContext";
export default function EventCard({ elements, imgor ,children , direction }) { const { data, openModal , closeModel} = useModal()
  const { event_id, event_poster, event_title, event_date, description } =
    elements;
  const [hoveractive, sethoveractive]  = useState(false);
  const eventDate = new Date(event_date);
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = eventDate.toLocaleDateString("en-US", options);
  const dataformodel = {
    Img: event_poster,
    date: event_date,
    title: event_title,
    description : description
  }
  return (
    <div  onMouseOver={()=>sethoveractive(true)} onMouseLeave={()=>sethoveractive(false)} className="card  cursor-pointer maincard rounded-none  grid grid-cols-2 bg-base-100 ">
      <figure id="eventCard" className={`rounded-none   ${imgor} `}>
        <img className="h-full w-full" src={event_poster} alt="Shoes" />
      </figure>
      <div className="card-body cursor-pointer">
        <h2 className="card-title">{event_title}</h2>
        <p>{formattedDate}</p>
        {children}
        <div onClick={()=>openModal(dataformodel)} className="text-sky-500">
          <div className="flex items-center gap-2 capitalize">
            view details  <i className="fa-light fa-arrow-right"></i>
          </div>
        </div>
      </div>  
      {direction === "translate-x-0" ?   <p className={ `transition-all duration-500  overlays ${hoveractive  ?  "translate-x-0" : "translate-x-full"}`} ></p> : 
      <p className={ `transition-all duration-500  overlays  ${hoveractive ?  "translate-x-full" : "translate-x-0"}`} ></p>}
     
    </div>
  );
}
