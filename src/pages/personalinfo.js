import Head from "next/head";
import { Inter } from "next/font/google";
import PersonalInfo from "../Components/PersonalInfo";
import styles from "./personalinfo.module.css";
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

      <div>
        <PersonalInfo />
      </div>
    </>
  );
}
