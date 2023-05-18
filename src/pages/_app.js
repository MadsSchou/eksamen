import "@/styles/globals.css";
import Navbar from "@/components/Navigation/Navbar";
import Footer from "@/components/footer";
import Context from "@/context/ImgContext";
import { TicketProvider } from "@/context/ticketContext";

export default function App({ Component, pageProps }) {
  return (
    <>
      <TicketProvider>
        <Context>
          <Navbar />
          <Component {...pageProps} />
          <Footer />/
        </Context>
      </TicketProvider>
    </>
  );
}
