import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalState";
import LoginForm from "./components/LoginForm";
import theme from "./theme";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import GlobalOverrides from "./GlobalOverrides";
import Dashboard from "./components/Dashboard";
import RecipeGrid from "./components/RecipeGrid";
import Title from "./components/Title";
import NewRecipeForm from "./components/NewRecipeForm";
import GridParent from "./components/GridParent";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalOverrides />
      <GlobalProvider>
        <Router>
          <>
            <Switch>
              <Route path="/login">
                <LoginForm />
              </Route>
              <Route path="/new">
                <Dashboard>
                  <NewRecipeForm />
                </Dashboard>
              </Route>
              <GridParent>
                <Route path="/inbox/:page?">
                  <Dashboard>
                    <Title>Recipe Inbox</Title>
                    <RecipeGrid type="inbox" />
                  </Dashboard>
                </Route>
                <Route path="/favorites/:page?">
                  <Dashboard>
                    <Title>Favorite Recipes</Title>
                    <RecipeGrid type="favorites" />
                  </Dashboard>
                </Route>
                <Route path="/:page?">
                  <Dashboard>
                    <Title>Recipe Index</Title>
                    <RecipeGrid type="index" />
                  </Dashboard>
                </Route>
              </GridParent>
            </Switch>
          </>
        </Router>
      </GlobalProvider>
    </ThemeProvider>
  );
}
