/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import bannimg from "/images/course_bg.jpg";
export default function CourseBanner() {
  return (
    <div
      style={{ background: `url(${bannimg})`, backgroundAttachment: "fixed" }}
      className="my-20 py-20 flex justify-center items-center min-h-[600px]"
    >
      <div className="content container mx-auto flex justify-center items-center">
        <div className="content text-center space-y-5">
          <h5 className="text-yellow-400 text-lg  up">
            Crafting an Inspired Future with Innovation, Passion, and Vision at
            the Core
          </h5>
          <h2 className="text-5xl text-center leading-[60px]  text-white">
            Architect of <span className="font-bold"> Educational Excellence</span> Pioneering Tomorrow's Minds
          </h2>
           <Link to="/courses/all"><button className="btn btn-info btn-lg mt-10 rounded-none hover:-translate-y-2 text-white">Explore All Course </button></Link>
        </div>
      </div>
    </div>
  );
}
