import { NextPageContext } from "next";
import { parseCookies } from "nookies";
import { UserType } from "../domain_model/user";
import { Layout } from "../layout/Layout";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Button, Card, CardActions, CardContent } from "@mui/material";

/**
 * TOP画面（異性のユーザーが表示される）
 */

/**
 * 異性のユーザー取得
 * @param  都道府県セレクトボックスイベント
 * @returns array 異性のユーザー
 */
export async function getServerSideProps(ctx?: NextPageContext) {
  const url = process.env.API_SERVER_URL + "auth/users";
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
  const user_list = json;
  return {
    props: {
      user_list: user_list,
    },
  };
}

export default function Users(props: UserType.UsersListType) {
  return (
    <div>
      <title>{"Top"}</title>
      <Layout>
        {props.user_list &&
          props.user_list.map((data: UserType.UserDetailType) => (
            <div key={data.id}>
              <Card sx={{ minWidth: 275, m: "2rem" }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {data.nickname}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {data.age}歳
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    出身地：{data.birthplace}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    居住地：{data.residence}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link href={`/user/${data.id}`}>Learn More</Link>
                </CardActions>
              </Card>
            </div>
          ))}
      </Layout>
    </div>
  );
}
