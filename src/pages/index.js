import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import landing_pic from "../assets/landing.jpeg";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Thunderstrike Metal Festival</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{ position: "relative" }}>
        <Image src={landing_pic} alt="Background image" layout="responsive" />

        <div className={styles.container} style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
          <h1 className={styles.headline} style={{ position: "relative", zIndex: 1 }}>
            Thunderstrike Metal Festival
          </h1>

          <h2 className={styles.center} style={{ position: "relative", zIndex: 1 }}>
            1-7 AUGUST 2023 <br></br> REFSHALEØEN - KØBENHAVN
          </h2>
        </div>
      </div>
    </>
  );
}
