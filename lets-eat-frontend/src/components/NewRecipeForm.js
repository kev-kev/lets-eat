import React, { useContext, useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { GlobalContext } from "../context/GlobalState";

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

export default function NewRecipeForm() {
  const classes = useStyles();
  // const { login, user } = useContext(GlobalContext);

  const [title, setTitle] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  const [link, setLink] = useState('')
  return (
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
          <Typography component="h1" variant="h5">
          submit a new recipe idea
          </Typography>
          <form className={classes.form} noValidate>
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="title"
              label="Recipe Title"
              name="title"
              autoComplete="title"
              autoFocus
              onChange = {e => setTitle(e.target.value)}
          />
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="imgUrl"
              label="Image URL"
              type="imgUrl"
              id="imgUrl"
              autoComplete="current-imgUrl"
              onChange = {e => setImgUrl(e.target.value)}

          />
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="link"
              label="Link to recipe"
              type="link"
              id="link"
              autoComplete="current-link"
              onChange = {e => setLink(e.target.value)}

          />
          <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={e => {
                  e.preventDefault();
                  console.log(title, imgUrl, link);
              }}
          >
              submit
          </Button>
          </form>
      </div>
      </Container>
  );
}