import React, { useContext, useState } from "react";
import styles from "./Bands.module.css";
import { imgContext } from "@/context/ImgContext";

function Schedule() {
  const { images } = useContext(imgContext);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [applySorting, setApplySorting] = useState(false);
  const genres = [...new Set(images?.map((item) => item.genre))];
  console.log(images);
  const [selectedImage, setSelectedImage] = useState(null); // New state for selected image

  const handleGenreSelect = (event) => {
    const selectedGenre = event.target.value;
    setSelectedGenre(selectedGenre === "all" ? null : selectedGenre);
  };

  const handleSortClick = () => {
    if (applySorting) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortOrder("asc");
      setApplySorting(true);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image); // Set the selected image
  };

  const handleClosePopup = () => {
    setSelectedImage(null); // Reset the selected image
  };

  const filteredData = selectedGenre ? images?.filter((item) => item.genre === selectedGenre) : images;

  const sortedData = applySorting
    ? filteredData?.sort((a, b) => {
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
      })
    : filteredData;

  return (
    <div className={`${styles.overskrift}`}>
      <h1>Bands</h1>
      <div className={styles.filterSort}>
        <label htmlFor="genre-select">
          Filtrer genrer:
          <select id="genre-select" value={selectedGenre || "all"} onChange={handleGenreSelect}>
            <option value="all">Alle genrer</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </label>

        <div style={{ display: "flex", alignItems: "center" }}>
          <div className={styles.sortButton} onClick={handleSortClick}>
            {sortOrder === "asc" ? "Sorter A-Z" : "Sorter Z-A"}
          </div>
        </div>
      </div>

      <div className={`${styles.grid} ${styles.bandGrid}`}>
        {sortedData?.map((item) => (
          <div key={item.id} className={styles.card}>
            <img src={item.logo} alt={item.name} style={{ maxWidth: "100%" }} onClick={() => handleImageClick(item.logo)} />
            <h2>{item.name}</h2>
            {selectedImage === item.logo && (
              <div className={styles.popup} style={{ zIndex: 9999 }}>
                {" "}
                <div className={styles.popupContent}>
                  <img src={selectedImage} alt="Selected Image" />
                  <div>
                    <h3>{item.name}</h3>
                    <p>Medlemmer: {item.members}</p>
                    <p>Genre: {item.genre}</p>
                    <p>Bio: {item.bio}</p>
                    <p>{item.logoCredits ? item.logoCredits : "Placeholder"}</p>
                    <button onClick={handleClosePopup}>Close</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Schedule;
