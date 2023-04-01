import { Layout } from "../../layout/Layout";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Button, Card, CardActions, CardContent } from "@mui/material";
import router from "next/router";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { NextPageContext } from "next";
import { parseCookies } from "nookies";
import { useRecoilValue } from "recoil";
import { userState } from "../../components/store/Auth/auth";
import { useEffect, useState } from "react";

export async function getServerSideProps(ctx: any) {
  const queryID = Number(ctx.query.id);
  const url = "http://app:8080/auth/user/" + queryID;
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
  // const intQueryId = parseInt(queryId, 10);
  return {
    props: {
      data: data,
      queryID: queryID,
    },
  };
}

export default function GetUser(props: any) {
  const user_id = useRecoilValue<number>(userState);
  const [alreadyLike, setAlreadyLike] = useState<boolean>(false);
  console.log(alreadyLike);

  useEffect(() => {
    console.log(props);
    console.log(user_id);

    (async () => {
      const url =
        "http://localhost:8080/auth/good_check/" +
        user_id +
        "/" +
        props.queryID;
      const cookie = parseCookies();
      const useCookie = `Bearer ${cookie.accessToken}`;
      const res = await fetch(url, {
        method: "GET",
        headers: { Authorization: useCookie },
        mode: "cors",
      })
        .then((r) => r.json())
        .catch((err) => {
          console.error(err);
        });
      setAlreadyLike(res);
    })();
  }, []);

  const PostGood = async () => {
    const url = "http://localhost:8080/auth/good";
    const cookie = parseCookies();
    const useCookie = `Bearer ${cookie.accessToken}`;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { Authorization: useCookie },
        body: JSON.stringify({
          to_user_id: user_id,
          from_user_id: props.queryID,
        }),
        mode: "cors",
      });
      if (!res.ok) {
        throw new Error(`Failed to post data: ${res.statusText}`);
      }
      setAlreadyLike(true);
      console.log("Success:", res);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div>
      <title>{"ユーザー詳細"}</title>
      <Layout>
        {alreadyLike ? (
          <IconButton onClick={PostGood} disabled={alreadyLike}>
            <>
              いいね済み
              <ThumbUpAltIcon color={"secondary"} />
            </>
          </IconButton>
        ) : (
          <IconButton onClick={PostGood}>
            <>
              いいね！
              <ThumbUpOffAltIcon color={"secondary"} />
            </>
          </IconButton>
        )}
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
