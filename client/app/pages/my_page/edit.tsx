import { useEffect, useState } from "react";
import { setCookie, destroyCookie, parseCookies } from "nookies";
import { NextPageContext } from "next";
import { Layout } from "../../layout/Layout";
import Typography from "@mui/material/Typography";
import { Button, Card, CardActions, CardContent } from "@mui/material";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import React from "react";

export async function getServerSideProps(ctx?: NextPageContext) {
  // const url = "http://localhost:8080/auth/hello";
  const url = "http://app:8080/auth/my_page";
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

  const prefecture_url = "http://app:8080/auth/prefectures";
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
  const [userName, setUserName] = useState<string>("");
  const [nickName, setNickName] = useState<string>("");
  const [mail, setMail] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [birthplace, setBirthplace] = useState<string>(props.data.birthplace);
  const [residence, setResidence] = useState<string>(props.data.residence);

  const handleChange = (event: SelectChangeEvent) => {
    setBirthplace(event.target.value as string);
  };
  console.log(props);
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
                    onChange={handleChange}
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
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    birthplace
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={residence}
                    defaultValue={props.data.residence}
                    label="birthplace"
                    onChange={handleChange}
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
            </CardContent>
            <CardActions></CardActions>
          </Card>
        </div>
      </Layout>
    </div>
  );
}
