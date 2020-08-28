import React, { useContext, useState, useEffect, useRef } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar'
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { GlobalContext } from "../context/GlobalState";
import { Redirect } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  kirby: {
    width: 'auto',
    height: theme.spacing(12),
    margin: '20px'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LoginForm() {
  const classes = useStyles();
  const { login, user, errors, clearErrors } = useContext(GlobalContext);

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorSnackbar, setErrorSnackbar] = useState(false)

  const refContainer = useRef(true)

  const LOGO = "https://lets-eat-imgs.s3.amazonaws.com/kirby_logo.png"
  const errorMessage = "Login Failed (っ´ω`)ﾉ (╥ω╥)"

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setErrorSnackbar(false)
    clearErrors()
  }

  useEffect(() => {
    if (refContainer.current) {
      refContainer.current = false
    }
    else {
      setErrorSnackbar(true)
    }
  }, [user])

  useEffect(() => {
    if (errors.login) {
      setErrorSnackbar(true)
    }
  }, [errors.login])

  if (user) {
    return (
      <Redirect to="/" />
    );
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
              onChange = {e => setUsername(e.target.value)}
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
              onChange = {e => setPassword(e.target.value)}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={e => {
                    e.preventDefault();
                    login(username, password)
                }}
            >
                let's eat!
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}