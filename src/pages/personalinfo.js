import React from "react";
import MultiStepForm from "@/components/multistep/MultiStepForm";
import Head from "next/head";
import Flow from "@/components/steps";

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Thunderstrike Metal Festival</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flow step={2} />

      <div>
        <h1>Multi-Step Form </h1>
        <MultiStepForm />
      </div>
    </>
  );
};

export default HomePage;
