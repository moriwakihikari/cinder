import type { NextPage } from "next";
import Dashboard from "../../components/Top";
import Head from "next/head";

export default function MyPageFootprints() {
  return (
    <>
      <title>{"足跡"}</title>
      <Dashboard title="足跡" />
    </>
  );
}
