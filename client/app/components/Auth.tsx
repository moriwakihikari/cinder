import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Router } from "@mui/icons-material";
import router from "next/router";
import { setCookie, destroyCookie, parseCookies } from "nookies";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../components/store/Auth/auth";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
// const router = useRouter();

const theme = createTheme();

export default function SignInSide() {
  const [usermail, setUsermail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [user, setUser] = useRecoilState(userState);
  // const storedJwt = localStorage.getItem("token");
  // const [jwt, setJwt] = useState(storedJwt || null);

  console.log(usermail);
  console.log(password);

  const Login = async () => {
    const url = "http://localhost:8080/login";
    const data = { Username: usermail, Password: password };
    fetch(url, {
      method: "POST", // or 'PUT'
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(async (data) => {
        console.log("Success:", data);
        if (data.code === 200) {
          localStorage.setItem("token", data.token);
          setCookie(null, "accessToken", data.token, {
            maxAge: 30 * 24 * 60 * 60,
          });
          // setJwt(data.token);
          const login_get_url = "http://localhost:8080/auth/my_page";
          const cookie = parseCookies();
          const useCookie = `Bearer ${cookie.accessToken}`;
          console.log(useCookie);
          const json = await fetch(login_get_url, {
            method: "GET",
            headers: { Authorization: useCookie },
            mode: "cors",
          })
            .then((r) => r.json())
            .catch((err) => {
              console.error(err);
            });
          const login_user = json;
          setUser(login_user.id);
          console.log(login_user.id);
          router.push("/users");
        } else {
          alert("ログインに失敗しました。");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      mail: data.get("mail"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="mail"
                label="mail Address"
                name="mail"
                autoComplete="mail"
                autoFocus
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setUsermail(e.target.value);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPassword(e.target.value);
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                onClick={Login}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
