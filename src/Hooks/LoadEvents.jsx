import React, { useEffect, useState } from "react";

export default function useLoadEvents() {
  const [Events, setEvents] = useState([]);
  useEffect(() => {
    const fetchEventsData = async () => {
      const snapshort = await fetch("/Data/Events.json");
      const response = await snapshort.json();
      setEvents(response);
    };
    fetchEventsData();
  }, []);
  return Events;
}
