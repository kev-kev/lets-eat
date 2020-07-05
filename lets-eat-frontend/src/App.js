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
                  <RecipeGrid/>
                </Dashboard>
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
