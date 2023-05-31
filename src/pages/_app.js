import "@/styles/globals.css";
import Navbar from "@/components/Navigation/Navbar";
import Footer from "@/components/footer";
import Context from "@/context/ImgContext";
import AuthProvider from "@/context/AuthContext";
import { TicketProvider } from "@/context/ticketContext";
import Timer from "@/components/Timer/timer";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const showTimer = router.pathname === "/personalinfo" || router.pathname === "/Checkout";

  return (
    <>
      <AuthProvider>
        <TicketProvider>
          <Context>
            <Navbar />
            {showTimer && <Timer />}

            <Component {...pageProps} />
            <Footer />
          </Context>
        </TicketProvider>
      </AuthProvider>
    </>
  );
}
