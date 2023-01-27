import { useEffect, useState } from "react";
import Good from "../components/Good";
import { setCookie, destroyCookie, parseCookies } from "nookies";
import { NextPageContext } from "next";

export async function getServerSideProps(ctx?: NextPageContext) {
  // const url = "http://localhost:8080/auth/hello";
  const url = "http://app:8080/auth/hello";
  const cookie = parseCookies(ctx);
  const cookie2 = `Bearer ${cookie.accessToken}`;
  console.log(cookie2);

  const json = await fetch(url, {
    method: "GET", // or 'PUT'
    mode: "cors",
    headers: { Authorization: cookie2 },
  })
    .then((response) => response.json())
    // .then((data) => data)
    // .then((res) => {
    //   setTodos(res)
    //   console.error(res);
    // })
    .catch((err) => {
      console.error(err);
    });
  const data = json;
  console.log(json);
  console.log(data);
  console.log(`${parseCookies(ctx)}`);

  return {
    props: {
      data: data ? data : "",
      // data: cookie2,
    },
  };
}

export default function GetGood(data: any) {
  // const [data, setdata] = useState<any>();

  // const getTodosData = async () => {
  //   await fetch(url, {
  //     method: "GET", // or 'PUT'
  //     mode: "cors",
  //     headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => setdata(data))
  //     // .then((res) => {
  //     //   setTodos(res)
  //     //   console.error(res);
  //     // })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

  // useEffect(() => {
  //   getTodosData();
  // }, []);
  console.log(data);

  // useEffect(() => {
  //   // Perform localStorage action
  //   const token = async () => {
  //     localStorage.getItem("token");
  //     console.log(token);
  //     const data = await fetch(url, {
  //       method: "GET", // or 'PUT'
  //       mode: "cors",
  //       headers: {
  //         authorization: `Bearer ${token}`,
  //       },
  //     }).then((r) => r.json());
  //   };
  // }, []);
  return (
    <>
      <title>{"Good"}</title>
      {/* <Good /> */}

      <Good data={data} />

      {/* {data && <div>{data.mail}</div>}
      {data && <div>{data.text}</div>} */}
    </>
  );
}
