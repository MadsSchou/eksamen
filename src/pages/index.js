import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Thunderstrike Metal Festival</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{ position: "relative" }}>
        <Image src="/assets/baggrund.jpg" alt="Background image" width={800} height={600} layout="responsive" />

        <div className={styles.container} style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
          <h1 className={styles.headline} style={{ position: "relative", zIndex: 1 }}>
            Thunderstrike Metal Festival
          </h1>

          <h2 className={styles.center} style={{ position: "relative", zIndex: 1 }}>
            Thunderstruck Music Festival is a seven-day event that brings together some of the best heavy metal bands from around the world. Held in a sprawling outdoor venue, the festival boasts multiple stages that feature non-stop performances from morning until night.
          </h2>
        </div>
      </div>
    </>
  );
}
