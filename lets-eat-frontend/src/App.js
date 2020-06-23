import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { GlobalProvider } from './context/GlobalState';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import theme from './theme';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import GlobalOverrides from './GlobalOverrides';
import Dashboard from './components/Dashboard';
import RecipeGrid from './components/RecipeGrid';
import RecipeInboxGrid from './components/RecipeInboxGrid';
import Title from './components/Title';
import NewRecipeForm from './components/NewRecipeForm';


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
];

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalOverrides />
      <GlobalProvider>
        <Router>
          <div>
            {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/home">
                <Dashboard>
                  <Title>Recipe Index</Title>
                  <RecipeGrid recipes={PLACEHOLDER_RECIPES} />
                </Dashboard>
              </Route>
              <Route path="/inbox">
                <Dashboard>
                  <Title>Recipe Inbox</Title>
                  <RecipeInboxGrid inbox={PLACEHOLDER_RECIPES} />
                </Dashboard>
              </Route>
              <Route path="/new">
                <Dashboard>
                  <NewRecipeForm />
                </Dashboard>
              </Route>
              <Route path="/login">
                <LoginForm />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>
      </GlobalProvider>
    </ThemeProvider>
  );
}
