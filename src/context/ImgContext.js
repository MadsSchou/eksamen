import { createContext, useState, useEffect } from "react";

export const imgContext = createContext(null);

export default function Context({ children }) {
  const [images, setImages] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost:8080/images");
        const data = await response.json();
        setImages(data); // Set the fetched image data in the state
      } catch (error) {
        console.log(error);
      }
    };

    if (!images) {
      fetchImages();
    }
  }, [images]);

  return (
    <imgContext.Provider value={{ images, setImages }}>
      {children}
    </imgContext.Provider>
  );
}
