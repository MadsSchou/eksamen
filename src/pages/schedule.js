import React, { useState } from "react";
import styles from "./Schedule.module.css";

function Schedule({ data }) {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc"); // add state for sort order
  const genres = [...new Set(data.map((item) => item.genre))];

  const handleGenreSelect = (event) => {
    const selectedGenre = event.target.value;
    setSelectedGenre(selectedGenre === "all" ? null : selectedGenre);
  };

  const handleSortClick = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
  };

  const filteredData = selectedGenre ? data.filter((item) => item.genre === selectedGenre) : data;

  const sortedData = filteredData.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (sortOrder === "asc") {
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    } else {
      if (nameA > nameB) return -1;
      if (nameA < nameB) return 1;
      return 0;
    }
  });

  return (
    <div className={`${styles.overskrift}`}>
      <h1>Schedule</h1>
      <div className={styles.filterSort}>
        <label htmlFor="genre-select">Filter by Genre:</label>
        <select id="genre-select" value={selectedGenre || "all"} onChange={handleGenreSelect}>
          <option value="all">All Genres</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        <div className={styles.sortButton} onClick={handleSortClick}>
          {sortOrder === "asc" ? "Sort A-Z" : "Sort Z-A"}
        </div>
      </div>

      <div className={`${styles.grid} ${styles.bandGrid}`}>
        {sortedData.map((item) => (
          <div key={item.id} className={styles.card}>
            <img src={item.logo} alt={item.name} style={{ maxWidth: "100%" }} />
            <h2>{item.name}</h2>
            {/* <p>Members: {item.members}</p> */}
            {/* <p>Genre: {item.genre}</p> */}
            {/* <p>Bio: {item.bio}</p>
            <p>Slug: {item.slug}</p>
            <p>Logo Credits: {item.logocredits}</p> */}
          </div>
        ))}
      </div>
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
