import { Layout } from "../../layout/Layout";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Button, Card, CardActions, CardContent } from "@mui/material";
import router from "next/router";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

export async function getServerSideProps(ctx: any) {
  const queryId = String(ctx.query.id);
  const url = "http://app:8080/user/" + queryId;
  const json = await fetch(url).then((r) => r.json());
  const data = json;

  return {
    props: {
      data: data,
    },
  };
}

export default function GetUser(props: any) {
  function Login() {
    router.push("/users");
  }
  console.log(props);
  return (
    <div>
      <title>{"ユーザー詳細"}</title>
      <Layout>
        <IconButton onClick={Login}>
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
