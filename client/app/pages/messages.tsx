import type { NextPage } from "next";
import Dashboard from "../components/Dashboard";
import Head from "next/head";

export default function Messages() {
  return (
    <>
      <title>{"messages"}</title>
      <Dashboard title="トーク一覧" />
    </>
  );
}
