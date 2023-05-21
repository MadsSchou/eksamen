import Head from "next/head";
import { Inter } from "next/font/google";
import PersonalInfo from "../components/PersonalInfo";
import styles from "./personalinfo.module.css";
import Flow from "@/components/steps";
import Basket from "@/components/ordreoversigt/ordreoversigt";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Thunderstrike Metal Festival</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flow step={2} />
      <Basket />

      <div>
        <PersonalInfo />
      </div>
    </>
  );
}
