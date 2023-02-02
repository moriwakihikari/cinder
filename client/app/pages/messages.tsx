import { Layout } from "../layout/Layout";
import type { NextPage } from "next";
import Head from "next/head";

export default function Messages() {
  return (
    <>
      <title>{"messages"}</title>
      <Layout title="トーク一覧" />
    </>
  );
}
