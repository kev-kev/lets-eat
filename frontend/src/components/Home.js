import React, { useContext, useEffect } from "react";
import { Box, Container, CssBaseline } from "@material-ui/core";
import Sidebar from "./Sidebar";
import Copyright from "./Copyright";
import { GlobalContext } from "../context/GlobalState";
import { Switch, Route } from "react-router-dom";
import { homeStyle } from "../muiStyling";
import RecipeGrid from "./RecipeGrid";
import Title from "./Title";
import { RecipeFormNew } from "./RecipeFormNew";
import LoginForm from "./LoginForm";

const Home = () => {
  const classes = homeStyle();
  const { user, fetchRecipes } = useContext(GlobalContext);

  useEffect(() => {
    user && fetchRecipes(user);
  }, [user]); //eslint-disable-line

  if (user) {
    return (
      <div className={classes.root}>
        <CssBaseline />
        <Sidebar />
        <main className={classes.content}>
          <Container maxWidth={false} className={classes.container}>
            <Switch>
              <Route path="/new">
                <Title className={classes.pageTitle}>New Recipe</Title>
                <div className={classes.mainContent}>
                  <RecipeFormNew />
                </div>
              </Route>
              <Route path="/inbox">
                <Title className={classes.pageTitle}>Inbox</Title>
                <div className={classes.mainContent}>
                  <RecipeGrid type="inbox" />
                </div>
              </Route>
              <Route path="/favorites">
                <Title className={classes.pageTitle}>Favorites</Title>
                <div className={classes.mainContent}>
                  <RecipeGrid type="favorites" />
                </div>
              </Route>
              <Route path="/rejected">
                <Title className={classes.pageTitle}>Rejected</Title>
                <div className={classes.mainContent}>
                  <RecipeGrid type="rejected" />
                </div>
              </Route>
              <Route path="/">
                <Title className={classes.pageTitle}>Let's Eat!</Title>
                <div className={classes.mainContent}>
                  <RecipeGrid type="index" />
                </div>
              </Route>
            </Switch>
            <Copyright className={classes.copyright} />
          </Container>
        </main>
      </div>
    );
  }
  return <LoginForm />;
};

export default Home;
