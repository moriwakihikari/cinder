import { parseCookies } from "nookies";
import { NextPageContext } from "next";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../components/store/Auth/auth";
import { Layout } from "../../layout/Layout";
import { Button, Card, CardActions, CardContent } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import Typography from "@mui/material/Typography";

/**
 * 異性のユーザー詳細画面取得
 * @param ctx
 * @return ユーザー詳細, ユーザーID
 */
export async function getServerSideProps(ctx: NextPageContext) {
  const queryID = Number(ctx.query.id);
  const url = process.env.API_SERVER_URL + "auth/user/" + queryID;
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
      data: data,
      queryID: queryID,
    },
  };
}

export default function GetUser(props: any) {
  const user_id = useRecoilValue<number>(userState);
  const [alreadyLike, setAlreadyLike] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const url =
        process.env.NEXT_PUBLIC_API_SERVER_URL +
        "auth/good_check/" +
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

  /**
   * いいねを押した時の処理
   */
  const PostGood = async () => {
    const url = process.env.NEXT_PUBLIC_API_SERVER_URL + "auth/good";
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
