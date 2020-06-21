import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Sidebar from './Sidebar';
import Copyright from './Copyright';
import Title from './Title';
import RecipeGrid from './RecipeGrid';
import RecipeInboxGrid from './RecipeInboxGrid';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    padding: '1vh',
  },
  container: {
    width: '100%',
    paddingBottom: theme.spacing(4),
    margin: 0
  },
}));

const PLACEHOLDER_RECIPES = [
    {
        name: "strawberry, blueberry & kiwi mini fruit tarts",
        link: "https://google.com",
        imgUrl: "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/vimdb/261128.jpg",
        submittedBy: "miranda"
    },
    {
        name: "oven baked chicken shwarma",
        link: "https://apple.com",
        imgUrl: "https://www.cookingclassy.com/wp-content/uploads/2017/12/oven-roasted-chicken-shawarma-6.jpg",
        submittedBy: "miranda"
    },
    {
        name: "strawberry & blueberry mini fruit tarts",
        link: "https://etsy.com",
        imgUrl: "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/vimdb/261128.jpg",
        submittedBy: "miranda"
    },
    {
      name: "strawberry, blueberry & kiwi mini fruit tarts2",
      link: "https://google.com",
      imgUrl: "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/vimdb/261128.jpg",
      submittedBy: "miranda"
  },
  {
      name: "oven baked chicken shwarma2",
      link: "https://apple.com",
      imgUrl: "https://www.cookingclassy.com/wp-content/uploads/2017/12/oven-roasted-chicken-shawarma-6.jpg",
      submittedBy: "miranda"
  },
]

export default function Dashboard() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Sidebar />
      <main className={classes.content}>
        <Container maxWidth={false} className={classes.container}>
          <Title>Recipe Inbox</Title>
          <RecipeInboxGrid inbox={PLACEHOLDER_RECIPES} />
          <Title>Recipe Vault</Title>
          <RecipeGrid recipes={PLACEHOLDER_RECIPES} />
        </Container>
        <Box pt={4}>
          <Copyright />
        </Box>
      </main>
    </div>
  );
}