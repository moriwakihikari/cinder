import { NextPageContext } from "next";
import router from "next/router";
import { setCookie, destroyCookie, parseCookies } from "nookies";
import { Layout } from "../layout/Layout";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Button, Card, CardActions, CardContent } from "@mui/material";

export async function getServerSideProps(ctx?: NextPageContext) {
  const url = process.env.API_SERVER_URL + "/auth/hello";
  const cookie = parseCookies(ctx);
  const useCookie = `Bearer ${cookie.accessToken}`;
  const json = await fetch(url, {
    method: "GET",
    mode: "cors",
    headers: { Authorization: useCookie },
  })
    .then((r) => r.json())
    .catch((err) => {
      console.error(err);
    });
  const data = json;
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
