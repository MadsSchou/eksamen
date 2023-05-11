import React from "react";

function Schedule({ data }) {
  return (
    <div>
      <h1>Schedule</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <p>Name: {item.name}</p>
            <p>Members: {item.members}</p>
            <p>Genre: {item.genre}</p>
            <p>Logo Credits: {item.logocredits}</p>
            <img src={item.logo} alt={item.name} />
            <p>Bio: {item.bio}</p>
            <p>Slug: {item.slug}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:8080/bands");
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

export default Schedule;
