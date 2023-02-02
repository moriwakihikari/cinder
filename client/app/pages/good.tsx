import { useEffect, useState } from "react";
import { setCookie, destroyCookie, parseCookies } from "nookies";
import { NextPageContext } from "next";
import { Layout } from "../layout/Layout";
import Typography from "@mui/material/Typography";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import { Button, Card, CardActions, CardContent } from "@mui/material";
import router from "next/router";

export async function getServerSideProps(ctx?: NextPageContext) {
  // const url = "http://localhost:8080/auth/hello";
  const url = "http://app:8080/auth/hello";
  const cookie = parseCookies(ctx);
  const useCookie = `Bearer ${cookie.accessToken}`;
  console.log(useCookie);

  const json = await fetch(url, {
    method: "GET", // or 'PUT'
    mode: "cors",
    headers: { Authorization: useCookie },
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
    },
  };
}

export default function GetGood(props: any) {
  function GoodEffect() {
    router.push("/users");
  }
  console.log(props);
  return (
    <div>
      <title>{"Good"}</title>
      <Layout>
        <IconButton onClick={GoodEffect}>
          <>
            いいね！
            <ThumbUpAltIcon color={"secondary"} />
          </>
        </IconButton>
        <div>
          <Card sx={{ minWidth: 275, m: "2rem" }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {props.data.mail}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {props.data.text}
              </Typography>
            </CardContent>
            <CardActions></CardActions>
          </Card>
        </div>{" "}
      </Layout>{" "}
    </div>
  );
}
