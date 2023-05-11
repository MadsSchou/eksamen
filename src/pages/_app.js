import "@/styles/globals.css";
import Navbar from "@/components/Navigation/Navbar";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
