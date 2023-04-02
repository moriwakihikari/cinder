import { NextPageContext } from "next";
import router from "next/router";
import { setCookie, destroyCookie, parseCookies } from "nookies";
import { Layout } from "../../layout/Layout";
import Typography from "@mui/material/Typography";
import { Button, Card, CardActions, CardContent, Grid } from "@mui/material";

/**
 * ログインユーザーの詳細情報を取得する
 * @param ctx cookieからjwtトークン取得
 * @returns ログインユーザー情報と都道府県マスタ
 */
export async function getServerSideProps(ctx?: NextPageContext) {
  const url = process.env.API_SERVER_URL + "auth/my_page";
  const cookie = parseCookies(ctx);
  const useCookie = `Bearer ${cookie.accessToken}`;
  const json = await fetch(url, {
    method: "GET",
    mode: "cors",
    headers: { Authorization: useCookie },
  })
    .then((response) => response.json())
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

export default function GetMyPageDetail(props: any) {
  function editPage() {
    router.push("/my_page/edit");
  }
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
