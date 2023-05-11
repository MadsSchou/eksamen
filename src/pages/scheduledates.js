// import React from "react";

// function ScheduleDates({ data }) {
//   return (
//     <div>
//       <h1>Schedule</h1>
//       {data.map((item, index) => (
//         <div key={index}>
//           <h2>{item.day}</h2>
//           <ul>
//             {item.schedule.map((event, index) => (
//               <li key={index}>
//                 <p>Start: {event.start}</p>
//                 <p>End: {event.end}</p>
//                 <p>Act: {event.act}</p>
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// }

// export async function getServerSideProps() {
//   const res = await fetch("http://localhost:8080/schedule");
//   const data = await res.json();

//   // convert the data to an array of objects
//   const days = Object.keys(data);
//   const schedule = days.map((day) => ({ day, schedule: data[day].mon }));

//   return {
//     props: {
//       schedule,
//     },
//   };
// }

// export default ScheduleDates;
import React from "react";

function ScheduleDate({ data }) {
  return (
    <div>
      <h1>Schedule</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <p>Start: {item.start}</p>
            <p>End: {item.end}</p>
            <p>Act: {item.act}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:8080/schedule");
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

export default ScheduleDate;
