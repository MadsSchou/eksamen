import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Thunderstrike Metal Festival</title>

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
    </>
  );
}
