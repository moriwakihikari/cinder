import { Layout } from "../../layout/Layout";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Button, Card, CardActions, CardContent } from "@mui/material";
import router from "next/router";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { NextPageContext } from "next";
import { parseCookies } from "nookies";
import { useRecoilValue } from "recoil";
import { userState } from "../../components/store/Auth/auth";

export async function getServerSideProps(ctx: any) {
  const queryID = Number(ctx.query.id);
  const url = "http://app:8080/auth/user/" + queryID;
  const cookie = parseCookies(ctx);
  const useCookie = `Bearer ${cookie.accessToken}`;
  const json = await fetch(url, {
    method: "GET", // or 'PUT'
    mode: "cors",
    headers: { Authorization: useCookie },
  })
    .then((r) => r.json())
    .catch((err) => {
      console.error(err);
    });
  const data = json;
  // const intQueryId = parseInt(queryId, 10);
  return {
    props: {
      data: data,
      queryID: queryID,
    },
  };
}

export default function GetUser(props: any) {
  const user_id = useRecoilValue<string>(userState);
  const PostGood = async () => {
    const url = "http://localhost:8080/auth/good";
    const cookie = parseCookies();
    const useCookie = `Bearer ${cookie.accessToken}`;
    await fetch(url, {
      method: "POST",
      headers: { Authorization: useCookie },
      body: JSON.stringify({
        to_user_id: props.queryID,
        from_user_id: props.queryID,
      }),
      mode: "cors",
    });
  };
  console.log(props);
  console.log(user_id);
  return (
    <div>
      <title>{"ユーザー詳細"}</title>
      <Layout>
        <IconButton onClick={PostGood}>
          <>
            いいね！
            <ThumbUpAltIcon color={"secondary"} />
          </>
        </IconButton>
        <div>
          <Card sx={{ minWidth: 275, m: "2rem" }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {props.data.nickname}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {props.data.age}歳
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {props.data.introduction.String}
              </Typography>
            </CardContent>
            <CardActions></CardActions>
          </Card>
        </div>
      </Layout>
    </div>
  );
}
