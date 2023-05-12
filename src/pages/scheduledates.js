import { useEffect, useState } from "react";

function SchedulePage() {
  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const response = await fetch("http://localhost:8080/schedule");
        const data = await response.json();
        setScheduleData(data);
      } catch (error) {
        console.error("Error fetching schedule data:", error);
      }
    };

    fetchScheduleData();
  }, []);
  console.log(scheduleData);

  return <div>{/* Render scheduleData here */}</div>;
}

export default SchedulePage;
