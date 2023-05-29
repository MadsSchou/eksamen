import React from "react";
import MultiStepForm from "@/components/multistep/MultiStepForm";
import Head from "next/head";
import Flow from "@/components/steps";
import styles from "./personalinfo.module.css";
import Timer from "@/components/Timer/timer";

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Thunderstrike Metal Festival</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.flow}>
        <Flow step={2} />
      </div>
      <div className={styles.timer}>
        <Timer />
      </div>
      <div>
        <MultiStepForm />
      </div>
    </>
  );
};

export default HomePage;
