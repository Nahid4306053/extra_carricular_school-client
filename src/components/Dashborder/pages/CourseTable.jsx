import axios from "axios";
import { uniqBy } from "lodash";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useModal } from "../../../Context/ModalContext";
import usefetchcourseData from "../../../Hooks/FetchCourseData";
import "../../../styles/CustomTable.scss";
import CourseTablerow from "../CourseTablerow";
export default function CourseTable() {
  const navigate = useNavigate();
  const { Courses, fetchcourses } = usefetchcourseData();
  const { closeModel, Updatedata, setupdate, openModal } = useModal();
  const [page, setpage] = useState(1);
  const [loading, setloading] = useState(false);
  const [displayCourses, setDisplayCourses] = useState([]);

  const handelData = async (e) => {
    if (e.target.scrollTop === e.target.scrollHeight - e.target.offsetHeight) {
      if (Courses.totalData !== displayCourses.length) {
        setpage(page + 1);
        setloading(true);
        await fetchcourses(page, 5);
        setDisplayCourses(uniqBy([...displayCourses, ...Courses.data], "_id"));
        setloading(false);
      }
    }
  };

  useEffect(() => {
    if (Courses) {
      setDisplayCourses(uniqBy([...displayCourses, ...Courses.data], "_id"));
    }
  }, [Courses]);

  useEffect(() => {
    fetchcourses(1, 5);
    if (Courses) {
      setDisplayCourses(uniqBy([...displayCourses, ...Courses.data], "_id"));
    }
  }, []);
  useEffect(() => {
    if (Updatedata) {
      const updateIndex = displayCourses.findIndex(
        (ele) => ele._id === Updatedata._id
      );
      const newdata = [...displayCourses];
      if (updateIndex > -1) {
        newdata.splice(updateIndex, 1, Updatedata);
        setDisplayCourses(newdata);
      
      } else {
        const newdata = [...displayCourses];
        newdata.push(Updatedata);
        setDisplayCourses(newdata);
      }
    }
  }, [Updatedata]);
  const handelCorsestatus = (event, id, oldvalue) => {
    event.preventDefault();
    const newvalue = event.target.value;
    const button = document.getElementById(id);
    if (oldvalue === newvalue) {
      button.setAttribute("disabled", "");
    } else {
      button.removeAttribute("disabled");
    }
  };
  const handelUpdateSatus = async (form, id, oldvalue) => {
    form.preventDefault();
    const newdata = form.target.status.value;
    if (oldvalue === newdata) {
      alert("No changes found");
    } else {
      try {
        const snapshort = await axios.put(
          `${import.meta.env.VITE_API_URL}/course/status/${id}`,
          { status: newdata },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if (snapshort.status === 200) {
          const newdaat = snapshort.data.data;
          const updateIndex = displayCourses.findIndex((ele) => ele._id === id);
          const newdata = [...displayCourses];
          if (updateIndex > -1) {
            newdata.splice(updateIndex, 1, newdaat);
            setDisplayCourses(newdata);
          } else {
            const newdata = [...displayCourses];
            newdata.unshift(newdaat);
            setDisplayCourses(newdata);
          }
        } else {
          alert(snapshort.data.msg);
        }
      } catch (err) {
        alert("Something went wrong");
      }
    }
  };
  return (
    <>
      <div className="header sticky flex   bg-slate-200 left-0  top-0  p-5 w-full">
        <div className="form-control w-full">
          <div className="input-group">
            <input
              type="text"
              placeholder="Search…"
              className="w-full input input-bordered"
            />
            <button className="btn btn-square">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        onScroll={handelData}
        className="overflow-x-auto h-[64vh] table_custom custom-scrollber "
      >
        <table className="table-pin-rows table ">
          {/* head */}
          <thead className="">
            <tr>
              <th>Course Banner</th>
              <th>Title</th>
              <th>Price</th>
              <th>Instructors</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-lg">
            {displayCourses.length > 0 &&
              displayCourses.map((ele) => {
                return (
                  // view details
                  <CourseTablerow key={ele._id} course={ele}>
                    {/* View details */}
                    <Link to={`../../single-course-view/${ele._id}`}>
                      <div className="tooltip" data-tip="Deatils">
                        <button className="btn btn-ghost btn-xs text-xl">
                          <i className="fa-solid fa-circle-info"></i>
                        </button>
                      </div>
                    </Link>

                    {/* View satus  */}
                    <div className="dropdown dropdown-left">
                      <div tabIndex={1} className="tooltip" data-tip="Status">
                        <button className="btn btn-ghost btn-xs text-xl">
                          <i className="fa-solid fa-signal-bars"></i>
                        </button>
                      </div>
                      <div
                        tabIndex={1}
                        className=" dropdown-content z-[1] menu p-5 shadow bg-base-300 rounded-box w-64"
                      >
                        <form
                          onSubmit={(e) =>
                            handelUpdateSatus(e, ele._id, ele.status)
                          }
                        >
                          <select
                            name="status"
                            onChange={(e) =>
                              handelCorsestatus(e, ele._id, ele.status)
                            }
                            defaultValue={ele.status}
                            className="capitalize select select-bordered focus:outline-none w-full max-w-xs"
                          >
                            <option value="pending">pending</option>
                            <option value="disabled">Disable</option>
                            <option value="aproved">Aprove</option>
                          </select>
                          <div className="flex justify-end mt-4">
                            <button
                              type="submit"
                              id={ele._id}
                              disabled
                              className="btn btn-neutral"
                            >
                              save
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>

                    {/* Edit   */}

                    <div
                      onClick={() =>
                        openModal({
                          type: "form",
                          mood: "edit",
                          fieldname: "course",
                          data: ele,
                        })
                      }
                      className="tooltip"
                      data-tip="Edit"
                    >
                      <button className="btn btn-ghost btn-xs text-xl">
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                    </div>
                    {/* Delete course  */}

                    <div className="tooltip" data-tip="Remove">
                      <button className="btn btn-ghost btn-xs text-xl">
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </div>
                  </CourseTablerow>
                );
              })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end items-center  px-4 py-2">
        <button
          onClick={() =>
            openModal({
              type: "form",
              mood: "add",
              fieldname: "course",
              data: null,
            })
          }
          className="btn-neutral btn "
        >
          Add New Course<i className="fa-regular fa-circle-plus"></i>
        </button>
      </div>
    </>
  );
}
