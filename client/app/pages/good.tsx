import { useEffect, useState } from "react";
import Top from "../components/Top";

const url = "http://localhost:8080/auth/hello";

// export async function getServerSideProps() {
//   const json = await fetch(url).then((r) => r.json());
//   const data = json;
//   return {
//     props: {
//       data: data,
//     },
//   };
// }

export default function Good(test: any) {
  const [data, setdata] = useState<any>();

  const getTodosData = async () => {
    await fetch(url, {
      method: "GET", // or 'PUT'
      mode: "cors",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((response) => response.json())
      .then((data) => setdata(data))
      // .then((res) => {
      //   setTodos(res)
      //   console.error(res);
      // })
      .catch((err) => {
        console.error(err);
      });
  };

  // useEffect(() => {
  //   getTodosData();
  // }, [data]);
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

      {data && <div>{data.mail}</div>}
      {data && <div>{data.text}</div>}
    </>
  );
}
