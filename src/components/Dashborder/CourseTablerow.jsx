import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function CourseTablerow({ course, children }) {
  const {
    _id,
    coursetitle,
    slogan,
    thumbnail,
    courseduration,
    startdate,
    coursefee,instructors
  } = course || {};

  return (
    <tr>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-24 h-24">
              
              <img
                src={
                  import.meta.env.VITE_IMG_URL + "/courseThumnail/" + thumbnail
                }
                alt={coursetitle}
              />
            </div>
          </div>
        </div>
      </td>
      <td className="max-w-[200px]">
        <Link to={`../../single-course-view/${_id}`}>{coursetitle}</Link>
      </td>
      <td>${parseInt(coursefee)}</td>
      <td>
        
        <div className="avatar-group -space-x-6">
          
          {instructors.length > 0 &&
            instructors.map((ele, ind) => {
              return (
                
                <Link to={`/single-instructor/${ele._id}`} key={ele._id}>
                  
                  <div className="avatar">
                    <div className="w-12">
                      
                      <img src={import.meta.env.VITE_IMG_URL + "/avatars/" +  ele.avatar} />
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </td>
      <th>{children}</th>
    </tr>
  );
}
