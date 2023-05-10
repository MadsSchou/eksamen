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
      <h1 className={styles.headline}>Thunderstrike Metal Festival</h1>
    </>
  );
}
