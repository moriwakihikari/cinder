import type { NextPage } from "next";
import Dashboard from "../components/Dashboard";
import Head from "next/head";
import { useState } from "react";

type Props = {
  title?: string;
  num?: number;
};
export default function Top() {
  const props: Props = {
    title: "testtitle",
    num: 123,
  };
  return (
    <>
      <title>{"Top"}</title>
      <Dashboard title="ユーザー一覧" />
    </>
  );
}
