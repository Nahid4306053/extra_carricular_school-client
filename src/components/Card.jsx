import React from "react";
import Rating from "react-rating";
import "../styles/card.scss";
import { Link } from "react-router-dom";
export default function Card({
  element,
  children,
  customcss,
  redirect,
  titlecolor,
}) {
  const {
    _id,
    coursetitle,
    slogan,
    thumbnail,
    courseduration,
    startdate,
    coursefee,instructors ,description, category
  } = element || {};

  return (
    <div
      className={`card rounded-xl relative shadow-lg overflow-hidden cursor-pointer  bg-base-100 ${customcss}`}
    >
      <figure className="rounded-none coursefigure relative overflow-hidden h-72">
        <img className={`w-full h-full `} src={import.meta.env.VITE_IMG_URL+'/courseThumnail/'+ thumbnail } alt={coursetitle} />
        <div className="overlay absolute bg-black top-0 h-full w-full"> </div>
      </figure>
      <div className="card-body gap-4">
        <div className=" flex justify-between">

           <Link to={`/courses/${category}`}>          
           <span className="px-2 py-1 text-sm font-bold rounded-sm bg-sky-500 text-white">
            {category}
          </span></Link>
          {/* <Rating
            className="text-yellow-400"
            fullSymbol={<i className="fa-solid fa-star"></i>}
            emptySymbol={<i className="fa-regular fa-star"></i>}
            initialRating={Review}
            readonly
          /> */}
        </div>
        <Link to={`/single-course-view/${_id}`} className={`card-title block hover:text-sky-500 transition-all`}>
          {" "}
          {coursetitle.length > 10
            ? coursetitle
            : `(${coursetitle})` + " " + slogan}
        </Link>
        <p>{description.slice(0, 180) + " [...]"}</p>
        <hr className="my-5 border-gray-300" />
        <div className="flex justify-between">
          <p className="text-lg text-sky-500 ">
            ${coursefee}
          </p>
          <div className="bookmark">
            <i className="text-sky-500 fa-light fa-bookmark"></i>
          </div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
