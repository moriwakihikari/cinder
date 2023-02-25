import { useEffect, useState } from "react";
import { setCookie, destroyCookie, parseCookies } from "nookies";
import { NextPageContext } from "next";
import { Layout } from "../../layout/Layout";
import Typography from "@mui/material/Typography";
import { Button, Card, CardActions, CardContent, Grid } from "@mui/material";
import router from "next/router";

export async function getServerSideProps(ctx?: NextPageContext) {
  // const url = "http://localhost:8080/auth/hello";
  const url = "http://app:8080/auth/my_page";
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

export default function GetMyPageDetail(props: any) {
  function editPage() {
    router.push("/my_page/edit");
  }
  console.log(props);
  return (
    <div>
      <title>{"MyPageDetail"}</title>
      <Layout>
        <div>
          <Card sx={{ minWidth: 275, m: "2rem" }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {props.data.name}
              </Typography>
              <Typography variant="h5" component="div">
                {props.data.nickname}
              </Typography>
              <Typography variant="h5" component="div">
                {props.data.mail}
              </Typography>
              <Typography variant="h5" component="div">
                {props.data.age}
              </Typography>
              <Typography variant="h5" component="div">
                {props.data.birthplace}
              </Typography>
              <Typography variant="h5" component="div">
                {props.data.residence}
              </Typography>
            </CardContent>
            <CardActions></CardActions>
          </Card>
        </div>
        <div>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            direction="column"
          >
            <Grid item xs={12}>
              <Button variant="contained" onClick={editPage}>
                編集
              </Button>
            </Grid>
          </Grid>
        </div>
      </Layout>
    </div>
  );
}
