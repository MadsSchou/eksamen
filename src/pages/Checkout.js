import Head from "next/head";
import styles from "./checkout.module.css";
import CardForm from "@/components/CardForm";
import Ordreoversigt from "@/components/ordreoversigt/ordreoversigt";
import Flow from "@/components/steps";

export default function Home() {
  return (
    <>
      <Head>
        <title>Thunderstrike Metal Festival</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.flow}>
        <Flow step={3} />
      </div>

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
