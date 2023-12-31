/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { isEmpty, uniqBy } from "lodash";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import usefetchcourseData from "../Hooks/FetchCourseData";
import Card from "../components/Card";

export default function Courses() {
  // const courses = useloadCoursedata([]);
  const [page, setpage] = useState(1);
  const [displaydata, setDisplaydata] = useState([]);
  const { Courses, fetchcourses, loading } = usefetchcourseData();
  const { categorey } = useParams();
  useEffect(() => {
    fetchcourses(page, 6);
  }, [page]);

  useEffect(() => {
    if (Courses) {
      setDisplaydata(uniqBy([...displaydata, ...Courses.data], "_id"));
    }
  }, [Courses]);
  return (
    <>
      <div className=" mx-auto">
        <div className="banner">
          <div
            className="hero -mt-36 min-h-[600px]"
            style={{
              backgroundImage:
                "url(https://blogassets.leverageedu.com/blog/wp-content/uploads/2020/04/16191353/Online-Courses.png)",
              backgroundPosition: "top",
            }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-2xl">
                <h1 className="mb-5 text-5xl font-bold">
                  {categorey.toLocaleLowerCase() === "all"
                    ? "Courses"
                    : `${categorey} Courses`}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        { !isEmpty(displaydata) ? (
          displaydata.length > 0 ? (
            <InfiniteScroll
              className="grid gap-10 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 my-20 container mx-auto"
              dataLength={displaydata.length}
              next={() => setpage((old) => old + 1)}
              hasMore={Courses.totalData !== displaydata.length}
              loader={
                <div className="col-span-3 text-center">
                  <span className="loading text-sky-500 loading-spinner loading-lg"></span>
                </div>
              }
            >
              {displaydata.map((ele, ind) => {
                return (
                  <Card
                    redirect={`/details/${ele._id}`}
                    key={ind}
                    element={ele}
                  />
                );
              })}
            </InfiniteScroll>
          ) : (
            <h1 className="text-4xl font-bold text-center  col-span-12">
              No Data found
            </h1>
          )
        ) :  (
          <div className="w-full col-span-3 min-h-[300px] flex justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}
      </div>
    </>
  );
}
