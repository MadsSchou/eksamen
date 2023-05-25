import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "./checkout.module.css";
import CardForm from "@/components/CardForm";
import Ordreoversigt from "@/components/ordreoversigt/ordreoversigt";
import Flow from "@/components/steps";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Thunderstrike Metal Festival</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flow step={3} />

      <div className={styles.container}>
        <div className={styles.column}>
          <div className={styles.cardForm}>
            <CardForm />
          </div>{" "}
        </div>
        <div className={styles.column}>
          <Ordreoversigt></Ordreoversigt>
        </div>
      </div>
    </>
  );
}
