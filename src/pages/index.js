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

        <div className={styles.container}>
          <h1 className={styles.headline}>Thunderstrike Metal Festival</h1>

          <h2 className={`${styles.center} ${styles.subtitle}`}>
            1-7 AUGUST 2023 <br /> REFSHALEØEN - KØBENHAVN
          </h2>
        </div>
      </div>
    </>
  );
}
