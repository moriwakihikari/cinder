import type { NextPage } from "next";
import Dashboard from "../../components/Dashboard";
import Head from "next/head";

export default function MyPageDetail() {
  return (
    <>
      <title>{"会員情報"}</title>
      <Dashboard title="会員情報" />
    </>
  );
}
