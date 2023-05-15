import "@/styles/globals.css";
import Navbar from "@/components/Navigation/Navbar";
import Footer from "@/components/footer";
import Context from "@/context/ImgContext";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Context>
        <Navbar />
        <Component {...pageProps} />
        <Footer />/
      </Context>
    </>
  );
}
