/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import "../styles/techCard.scss";
export default function TeacherCard({ instructor }) {
  const { avatar, email, phone_number, username, _id } = instructor || {};
  return (
    <div className="rounded-lg overflow-hidden techCard cursor-pointer">
      <img className="w-full h-full max-h-[550px]" src={avatar} alt="" />
      <div className="details">
        <div className="name"></div>

        <div className="relative w-full  h-full">
          <div className="subjects h-full  flex justify-between">
            <p>Contact Info:</p>
            <div className="mb-5">
              <a className="" href={"tel:+88" + phone_number}>
                <i className="hover:text-[#0A283F] transition-all fa-solid fa-tty"></i>
              </a>
              <a className="" href={"mailto:" + email}>
                <i className="hover:text-[#0A283F] transition-all fa-solid fa-envelope"></i>
              </a>
            </div>
          </div>
          <div className=" teachname">
            <Link to={`/single-instructor/${_id}`}>
              <p className="capitalize">{username}</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
