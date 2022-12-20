import type { NextPage } from "next";
import Dashboard from "../../components/Dashboard";
import Head from "next/head";

export default function MyPageFootprints() {
  return (
    <>
      <title>{"足跡"}</title>
      <Dashboard title="足跡" />
    </>
  );
}
