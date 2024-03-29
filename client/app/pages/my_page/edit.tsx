import { NextPageContext } from "next";
import router from "next/router";
import { setCookie, destroyCookie, parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { Layout } from "../../layout/Layout";
import Typography from "@mui/material/Typography";
import { Button, Card, CardActions, CardContent, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";

/**
 * ログインユーザーの詳細情報を取得する
 * @param ctx cookieからjwtトークン取得
 * @returns ログインユーザー情報, 都道府県マスタ
 */
export async function getServerSideProps(ctx?: NextPageContext) {
  const url = process.env.API_SERVER_URL + "auth/my_page";
  const cookie = parseCookies(ctx);
  const useCookie = `Bearer ${cookie.accessToken}`;

  const json = await fetch(url, {
    method: "GET", // or 'PUT'
    mode: "cors",
    headers: { Authorization: useCookie },
  })
    .then((response) => response.json())
    .catch((err) => {
      console.error(err);
    });
  const data = json;

  const prefecture_url = process.env.API_SERVER_URL + "auth/prefectures";
  const prefecture_json = await fetch(prefecture_url, {
    method: "GET", // or 'PUT'
    mode: "cors",
    headers: { Authorization: useCookie },
  })
    .then((response) => response.json())
    .catch((err) => {
      console.error(err);
    });
  const prefecture_data = prefecture_json;

  return {
    props: {
      data: data ? data : "",
      prefecture_data: prefecture_data ? prefecture_data : "",
    },
  };
}

export default function GetMyPageDetail(props: any) {
  const [userName, setUserName] = useState<string>(props.data.name);
  const [nickName, setNickName] = useState<string>(props.data.nickname);
  const [image, setImage] = useState<string>("none");
  const [mail, setMail] = useState<string>(props.data.mail);
  const [age, setAge] = useState<string>(props.data.age);
  const [introduction, setIntroduction] = useState<string>(
    props.data.introduction.String
  );
  const [birthplace, setBirthplace] = useState<string>(props.data.birthplace);
  const [birthplaceId, setBirthplaceId] = useState<number>(
    props.data.birthplace_id
  );

  const [residence, setResidence] = useState<string>(props.data.residence);
  const [residenceId, setResidenceId] = useState<number>(
    props.data.residence_id
  );
  /**
   * 都道府県選択の処理
   * @param event 都道府県セレクトボックスイベント
   * @set birthplace(出身地)
   */
  const birthplaceHandleChange = (event: SelectChangeEvent) => {
    setBirthplace(event.target.value as string);
    for (let i = 0; i < props.prefecture_data.length; i++) {
      if (props.prefecture_data[i].name === event.target.value) {
        setBirthplaceId(props.prefecture_data[i].id);
      }
    }
  };

  /**
   * 都道府県選択の処理
   * @param event 都道府県セレクトボックスイベント
   * @set residence(住居地)
   */
  const residenceHandleChange = (event: SelectChangeEvent) => {
    setResidence(event.target.value as string);
    for (let i = 0; i < props.prefecture_data.length; i++) {
      if (props.prefecture_data[i].name === event.target.value) {
        setResidenceId(props.prefecture_data[i].id);
      }
    }
  };

  /**
   * ユーザー情報更新
   */
  const updateUserPost = async () => {
    // デフォルトでは文字列なのでnumberに変換する処理他の方法が良く分からないダメだと思うコード
    const ageNumber = parseInt(age, 10);
    const url = process.env.NEXT_PUBLIC_API_SERVER_URL + "auth/my_page/edit";
    const cookie = parseCookies();
    const useCookie = `Bearer ${cookie.accessToken}`;
    console.log(useCookie);
    await fetch(url, {
      method: "POST",
      headers: { Authorization: useCookie },
      body: JSON.stringify({
        id: props.data.id,
        name: userName,
        nickname: nickName,
        image: image,
        mail: mail,
        age: ageNumber,
        introduction: {
          string: introduction,
        },
        birthplace_id: birthplaceId,
        Residence_id: residenceId,
      }),
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        if (data.code) {
          console.log("Error:", data);
          router.push("/");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    router.push("/my_page/detail");
  };

  return (
    <div>
      <title>{"MyPageDetail"}</title>
      <Layout>
        <div>
          <Card sx={{ minWidth: 275, m: "2rem" }}>
            <CardContent>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="name"
                name="name"
                autoComplete="name"
                autoFocus
                defaultValue={props.data.name ? props.data.name : ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setUserName(e.target.value);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="nickname"
                label="nickname"
                id="nickname"
                autoComplete="nickname"
                defaultValue={props.data.nickname ? props.data.nickname : ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setNickName(e.target.value);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="mail"
                label="mail"
                id="mail"
                autoComplete="mail"
                defaultValue={props.data.mail ? props.data.mail : ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setMail(e.target.value);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="age"
                label="age"
                id="age"
                type="number"
                autoComplete="age"
                defaultValue={props.data.age ? props.data.age : ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setAge(e.target.value);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="introduction"
                label="introduction"
                id="introduction"
                multiline
                rows={4}
                autoComplete="introduction"
                defaultValue={
                  props.data.introduction.String
                    ? props.data.introduction.String
                    : ""
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setIntroduction(e.target.value);
                }}
              />
              <Box sx={{ minWidth: 120, pb: 2 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    birthplace
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={birthplace}
                    defaultValue={props.data.birthplace}
                    label="birthplace"
                    onChange={birthplaceHandleChange}
                  >
                    {props.prefecture_data &&
                      props.prefecture_data.map((data: any) => (
                        <MenuItem key={data.id} value={data.name}>
                          {data.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ minWidth: 120, pb: 2 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    residence
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={residence}
                    defaultValue={props.data.residence}
                    label="residence"
                    onChange={residenceHandleChange}
                  >
                    {props.prefecture_data &&
                      props.prefecture_data.map((data: any) => (
                        <MenuItem key={data.id} id={data.id} value={data.name}>
                          {data.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Box>
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                direction="column"
              >
                <Button variant="contained" onClick={updateUserPost}>
                  編集
                </Button>
              </Grid>
            </CardContent>
            <CardActions></CardActions>
          </Card>
        </div>
      </Layout>
    </div>
  );
}
