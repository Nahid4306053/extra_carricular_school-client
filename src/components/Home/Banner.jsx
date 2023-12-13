/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import useloadBanner from "../../Hooks/loadBanner";
import moment from "moment";
export default function Banner({ serchinputdata, children, bannrBacgorund }) {
  const serchInput = useRef();
  const benners = useloadBanner();

  return (
    <>
      {benners.length > 0 && (
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper z-10 -mt-36"
        >
          {benners.map((ele, ind) => {
            const {
              programTitle,
              programDescription,
              slogan,
              programDuration,
              eligibility,
              benefits,
              applicationDeadline,
              startDate,
              endDate,
              location,
              howToApply,
              contactEmail,
              bannerImageURL,
            } = ele;
            return (
              <SwiperSlide key={ind}>
                <div key={ind} className="hero min-h-screen  ">
                  <div className="col-start-1 row-start-1 h-full w-full bg-base-300 "></div>
                  <div className="container py-20 mt-20">
                    <div className="flex lg:flex-row flex-col  gap-10">
                      <div className="flex-1 space-y-3 text-white flex flex-col gap-4 justify-center">
                        <h1 className="text-2xl text-orange-400">
                          {programTitle}
                        </h1>
                        <h1 className="text-4xl  text-sky-400 font-bold">
                          {slogan}
                        </h1>
                        <p className=" text-sky-500 font-bold text-xl">
                        <i className="mr-2 fa-regular fa-clock"></i> 
                          Duration: {programDuration}
                        </p>
                        <div className="flex gap-5 flex-wrap">
                          <p className=" text-[#d9b13b] font-bold text-lg">
                            <i className="mr-3 fa-solid fa-flag-checkered"></i>
                              Starting: {moment(startDate).format('MMMM Do YYYY')}
                   
                          </p>
                          <p className=" text-[#d9b13b] font-bold text-lg">
                            
                          <i className="mr-3 fa-solid fa-ballot-check"></i>
                            Ending: {moment(endDate).format('MMMM Do YYYY')}
                          </p>

                        </div>
                        <div className="text-green-500 space-y-3 font-bold">
                          {benefits.map((ele, ind) => {
                            return (
                              <li key={ind} className="leading-7">
                                <i className="mr-2 fa-brands fa-markdown"></i>
                                {ele}
                              </li>
                            );
                          })}
                        </div>
                        <div className="actoions gap-5 mt-2 flex">
                          <button className="btn  btn-info text-white">
                            Enroll Now
                          </button>
                          <button className="btn  btn-info text-white">
                            Explore more
                          </button>
                        </div>
                      </div>

                      <div className="flex-1 py-10 flex flex-col justify-center">
                        <img
                          className="max-h-[600px]"
                          src={bannerImageURL}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </>
  );
}
