import  { useEffect, useState } from "react";
import EventCard from "../EventCard";
import { handleorder } from "../../Utils/HandlesOrder";
import useLoadEvents from "../../Hooks/LoadEvents";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
export default function Events() {
  const [CardOrder, setCardOrder] = useState([]);
  const events = useLoadEvents();
  const [futureEvent, setFutureEvent] = useState([]);
  const [previousEvent, setPreviuousEvent] = useState([]);
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const conatiner = document.getElementById("container2");
    const handleResize = () => {
      if (conatiner) {
        const width = conatiner.clientWidth;
        if (width >= 1400) {
          setCardOrder(handleorder(3, 6));
        } else if (width >= 976) {
          setCardOrder(handleorder(2, 6));
        } else {
          setCardOrder(handleorder(1, 6));
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
    <div id="container2" className="container mx-auto ">

      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab  label="Previous Eventes" value="1" />
              <Tab  label="Upcoming events" value="2" />
            </TabList>
          </Box>
          <TabPanel style={{padding:"30px 0px"}} className="p-0  grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3" value="1">
              {previousEvent.length > 0 &&
                previousEvent.slice(0, 6).map((ele, ind) => {
                  return (
                    <EventCard
                      elements={ele}
                      key={ind}
                      imgor={
                        CardOrder.includes(ind + 1) ? "order-1" : "order-0"
                      }
                      direction={CardOrder.includes(ind + 1) ? "translate-x-full" : "translate-x-0"}
                    />
                  );
                })}

          </TabPanel>
          <TabPanel  style={{padding:"0px",marginTop:"-30px"}} className="p-0 m-0 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3" value="2">
          
              {futureEvent.length > 0 &&
                futureEvent.slice(0, 6).map((ele, ind) => {
                  return (
                    <EventCard
                      elements={ele}
                      key={ind}
                      imgor={
                        CardOrder.includes(ind + 1) ? "order-1" : "order-0"
                      }
                       direction={CardOrder.includes(ind + 1) ? "translate-x-full" : "translate-x-0"}
                    />
                  );
                })}

          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}
