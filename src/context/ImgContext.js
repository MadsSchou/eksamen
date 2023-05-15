import { createContext, useState } from "react";

export const imgContext = createContext(null);

export default function Context({ children }) {
  const [images, setImages] = useState(null);

  return (
    <imgContext.Provider value={{ images, setImages }}>
      {children}
    </imgContext.Provider>
  );
}
