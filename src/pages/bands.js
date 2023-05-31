import React, { useContext, useState } from "react";
import styles from "./Bands.module.css";
import { imgContext } from "@/context/ImgContext";

function Bands() {
  const { images } = useContext(imgContext);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [applySorting, setApplySorting] = useState(false);
  const [searchLetter, setSearchLetter] = useState("");
  const genres = [...new Set(images?.map((item) => item.genre))];
  const [selectedImage, setSelectedImage] = useState(null);

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
    setSelectedImage(image);
  };

  const handleClosePopup = () => {
    setSelectedImage(null);
  };

  const handleSearchChange = (event) => {
    const letter = event.target.value.toLowerCase();
    setSearchLetter(letter);
  };

  const filteredData = selectedGenre ? images?.filter((item) => item.genre === selectedGenre) : images;

  const searchData = searchLetter ? filteredData?.filter((item) => item.name.toLowerCase().startsWith(searchLetter)) : filteredData;

  const sortedData = applySorting
    ? searchData?.sort((a, b) => {
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
    : searchData;

  return (
    <div className={`${styles.overskrift} ${styles.searchBar}`}>
      <h1>Bands</h1>
      <input type="text" placeholder="Søg efter band..." value={searchLetter} onChange={handleSearchChange} />

      <div className={styles.filterSort}>
        <div className={styles.buttonContainer}>
          <label htmlFor="genre-select">
            <select id="genre-select" value={selectedGenre || "all"} onChange={handleGenreSelect}>
              <option value="all">Alle genrer</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className={styles.sortButton} onClick={handleSortClick}>
          {sortOrder === "asc" ? "Sorter A-Z" : "Sorter Z-A"}
        </div>
      </div>

      <div className={`${styles.grid} ${styles.bandGrid}`}>
        {sortedData?.map((item) => (
          <div key={item.id} className={styles.card}>
            <img src={item.logo} alt={item.name} style={{ maxWidth: "100%" }} onClick={() => handleImageClick(item.logo)} />
            <h2>{item.name}</h2>
            {selectedImage === item.logo && (
              <div className={styles.popup} style={{ zIndex: 9999 }}>
                <div className={styles.popupContent}>
                  <img src={selectedImage} alt="Selected Image" />
                  <div>
                    <h3>{item.name}</h3>
                    <p>Medlemmer: {item.members.join(", ")}</p>
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

export default Bands;
