import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "./checkout.module.css";
import CardForm from "../components/CardForm";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Thunderstrike Metal Festival</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.timeline}>
        <img src="assets/step4.png" />
      </div>
      <div className={styles.cardFormContainer}>
        <div className={styles.cardForm}>
          <CardForm />
        </div>
      </div>
    </>
  );
}
