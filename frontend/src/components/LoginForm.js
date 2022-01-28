import React, { useContext, useState, useEffect, useRef } from "react";
import {
  Button,
  Snackbar,
  CssBaseline,
  TextField,
  Typography,
  Container,
  CircularProgress,
} from "@material-ui/core/";
import { GlobalContext } from "../context/GlobalState";
import { Redirect } from "react-router-dom";
import { Alert } from "@material-ui/lab/";
import { loginStyle } from "../muiStyling";

const LoginForm = () => {
  const classes = loginStyle();
  const { login, user, errors, clearErrors, isLoggingIn } =
    useContext(GlobalContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorSnackbar, setErrorSnackbar] = useState(false);

  const refContainer = useRef(true);

  const LOGO = "https://lets-eat-imgs.s3.amazonaws.com/kirby_logo.png";
  const errorMessage = "Login Failed (っ´ω`)ﾉ (╥ω╥)";

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorSnackbar(false);
    clearErrors();
  };

  useEffect(() => {
    if (refContainer.current) {
      refContainer.current = false;
    } else {
      setErrorSnackbar(true);
    }
  }, [user]);

  useEffect(() => {
    if (errors.login) {
      setErrorSnackbar(true);
    }
  }, [errors.login]);

  const renderLoadingOrForm = () => {
    if (isLoggingIn) {
      return <CircularProgress className={classes.loading} />;
    } else {
      return (
        <>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(e) => {
                e.preventDefault();
                login(username, password);
              }}
            >
              let's eat!
            </Button>
          </form>
        </>
      );
    }
  };

  if (user) {
    return <Redirect to="/recipes" />;
  } else {
    return (
      <Container component="main" maxWidth={"xs"}>
        <CssBaseline />
        <div className={classes.paper}>
          <Snackbar open={errorSnackbar} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              {errorMessage}
            </Alert>
          </Snackbar>
          <img className={classes.kirby} src={LOGO} alt="Chef Kirby" />
          <Typography component="h1" variant="h5">
            sign in to view recipes
          </Typography>
          {renderLoadingOrForm()}
        </div>
      </Container>
    );
  }
};

export default LoginForm;
