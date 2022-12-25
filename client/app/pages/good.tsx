import type { NextPage } from "next";
import Dashboard from "../components/Top";
import Head from "next/head";

export default function Good() {
  return (
    <>
      <title>{"いいね"}</title>
      <Dashboard title="いいね一覧" />
    </>
  );
}
