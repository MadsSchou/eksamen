import Head from "next/head";
import { Inter } from "next/font/google";
import PersonalInfo from "../Components/PersonalInfo";
import styles from "./personalinfo.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Thunderstrike Metal Festival</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.timeline} style={{ display: "flex", justifyContent: "center" }}>
        <img src="assets/step3.png" />
      </div>

      <div>
        <PersonalInfo />
      </div>
    </>
  );
}
