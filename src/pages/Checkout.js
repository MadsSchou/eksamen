import Head from "next/head";
import styles from "./checkout.module.css";
import CardForm from "@/components/CardForm";
import Ordreoversigt from "@/components/ordreoversigt/ordreoversigt";
import Flow from "@/components/steps";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
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
      <button
        onClick={() => {
          router.push("./confirmation");
        }}
      >
        Gennemfør køb
      </button>
    </>
  );
}
