import Head from "next/head";
import { Inter } from "next/font/google";
import Link from "next/link";
import styles from "./CampgroundForm.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Thunderstrike Metal Festival</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.timeline} style={{ display: "flex", justifyContent: "center" }}>
        <img src="assets/step2.png" />
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Link href="/personalinfo">
          <button>Continue</button>
        </Link>
      </div>
    </>
  );
}
