import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { GlobalProvider } from './context/GlobalState';
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
import FavoritesGrid from './components/FavoritesGrid'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalOverrides />
      <GlobalProvider>
        <Router>
          <div>
            <Switch>
              <Route path="/login">
                <LoginForm />
              </Route>
              <Route path="/inbox">
                <Dashboard>
                  <Title>Recipe Inbox</Title>
                  <RecipeInboxGrid />
                </Dashboard>
              </Route>
              <Route path="/new">
                <Dashboard>
                  <NewRecipeForm />
                </Dashboard>
              </Route>
              <Route path="/favorites">
                <Dashboard>
                  <Title>Favorites</Title>
                  <FavoritesGrid />
                </Dashboard>
              </Route>
              <Route path="/">
                <Dashboard>
                  <Title>Recipe Index</Title>
                  <RecipeGrid/>
                </Dashboard>
              </Route>
            </Switch>
          </div>
        </Router>
      </GlobalProvider>
    </ThemeProvider>
  );
}
