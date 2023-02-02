import { Layout } from "../layout/Layout";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Button, Card, CardActions, CardContent } from "@mui/material";
import { UserType } from "../domain_model/user";

const url = "http://app:8080/users";

export async function getServerSideProps() {
  const json = await fetch(url).then((r) => r.json());
  const user_list = json;
  return {
    props: {
      user_list: user_list,
    },
  };
}

export default function Users(props: UserType.UsersListType) {
  console.log(props.user_list);
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
      {/* <Top title="ユーザー一覧" data={data} /> */}
    </div>
  );
}
