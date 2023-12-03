import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { handleorder } from "../Utils/HandlesOrder";
import useLoadEvents from "../Hooks/LoadEvents";
export default function Events() {
  const [CardOrder, setCardOrder] = useState([]);
  const events = useLoadEvents();
  const [futureEvent, setFutureEvent] = useState([]);
  const [previousEvent, setPreviuousEvent] = useState([]);
  const [DisplayEvent, setDisplayEvent] = useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [eventlenth , setEventlent] = useState(0);

  useEffect(() => {
    setEventlent(events.length)
    setDisplayEvent(events)
    const conatiner = document.getElementById("eventContainerr");
    const handleResize = () => {
      if (conatiner) {
        const width = conatiner.clientWidth;
        if (width >= 1400) {
          setCardOrder(handleorder(2, eventlenth));
        } else if (width >= 976) {
          setCardOrder(handleorder(2, eventlenth));
        } else {
          setCardOrder(handleorder(1, eventlenth));
        }
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [events]);

  useEffect(() => {
    if (events.length > 0) {
      const fuevent = events.filter(
        (ele) => new Date() < new Date(ele.event_date)
      );
      const prevevent = events.filter(
        (ele) => new Date() > new Date(ele.event_date)
      );
      setFutureEvent(fuevent);
      setPreviuousEvent(prevevent);
    }
  }, [events]);
  return (
    <>
    <div className=' mx-auto'>
           <div className="banner">
        <div
          className="hero -mt-36 min-h-[600px]"
          style={{
            backgroundImage:
              "url(https://residentnewsnetwork.com/wp-content/uploads/2022/07/aRlomF09DNZDp4zf7Fx0CvmjTCs7K8Cs1657031450.jpg)", backgroundPosition:"top"
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">Events</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
   <div id="eventContainerr" className='my-20 container mx-auto'>
   <div style={{padding:"30px 0px"}} className="p-0  grid grid-cols-1 lg:grid-cols-2 " value="1">
              {DisplayEvent.length > 0 &&
                DisplayEvent.map((ele, ind) => {
                  return (
                    <EventCard
                      elements={ele}
                      key={ind}
                      imgor={
                        CardOrder.includes(ind + 1) ? "order-1" : "order-0"
                      }
                      direction={CardOrder.includes(ind + 1) ? "translate-x-full" : "translate-x-0"}
                    >
                    <p>{ele.description.slice(0,60)}</p>  
                    </EventCard>
                  );
                })}

          </div>
   </div>
    </>
  )
}
