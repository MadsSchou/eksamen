import Head from "next/head";
import { Inter } from "next/font/google";
import Link from "next/link";
import styles from "./CampgroundForm.module.css";
import Ordreoversigt from "../Components/ordreoversigt/ordreoversigt";
import Flow from "@/Components/steps";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Thunderstrike Metal Festival</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flow />

      <div className={styles.container}>
        <div className={styles.column}>
          <img className={styles.image} src="/assets/map.svg" alt="Map" />
          <h1>Do you want to be a part of the green change?</h1>
          <p>The climate crisis is no joke and a big festival like this puts a lot of strain on the ground it’s standing on. Be a part of a greener tomorrow by adding the green camping option, that will be used to compensate any damages to the environment and area caused during the festival.</p>
          <label>
            <input type="checkbox" />
            Add green camping
          </label>
        </div>
        <div className={styles.column}>
          <Ordreoversigt></Ordreoversigt>
          <div className={styles.centerButton}>
            <Link href="/personalinfo">
              <button>Reserver Biletter</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
