import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Flow from "@/components/steps";

export default function Confirmation() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Thunderstrike Metal Festival</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flow step={4} />
      <div>Tak</div>
    </>
  );
}
