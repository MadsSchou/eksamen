import "@/styles/globals.css";
import Navbar from "@/components/Navigation/Navbar";
import Footer from "@/components/footer";
import Context from "@/context/ImgContext";
import AuthProvider from "@/context/AuthContext";
import { TicketProvider } from "@/context/ticketContext";

export default function App({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <TicketProvider>
          <Context>
            <Navbar />
            <Component {...pageProps} />
            <Footer />/
          </Context>
        </TicketProvider>
      </AuthProvider>
    </>
  );
}
