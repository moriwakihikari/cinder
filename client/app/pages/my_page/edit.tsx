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
  console.log(useCookie);

  const json = await fetch(url, {
    method: "GET", // or 'PUT'
    mode: "cors",
    headers: { Authorization: useCookie },
  })
    .then((response) => response.json())
    // .then((data) => data)
    // .then((res) => {
    //   setTodos(res)
    //   console.error(res);
    // })
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
  const [userName, setUserName] = useState<string>("");
  const [nickName, setNickName] = useState<string>("");
  const [mail, setMail] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [birthplace, setBirthplace] = React.useState(props.data.birthplace);

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
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
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    birthplace
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={birthplace}
                    defaultValue={birthplace ? birthplace : ""}
                    label="birthplace"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                    <MenuItem value={"北海道"}>北海道</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Typography variant="h5" component="div">
                {props.data.residence}
              </Typography>
            </CardContent>
            <CardActions></CardActions>
          </Card>
        </div>
      </Layout>
    </div>
  );
}
