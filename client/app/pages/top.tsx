// import type { NextPage } from "next";
import Dashboard from "../components/Dashboard";
// import Head from "next/head";
// import { useState } from "react";

const url = "http://localhost:8080/users";

export async function getServerSideProps() {
  const json = await fetch(url).then((r) => r.json());
  const data = json;

  return {
    props: {
      data: data,
    },
  };
}

export default function Top(data: any) {
  console.log(data);

  return (
    <>
      <title>{"Top"}</title>
      <Dashboard title="ユーザー一覧" dates={data} />
    </>
  );
}
