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
                <RecipeFormNew />
              </Route>
              <Route path="/inbox">
                <Title>Recipe Inbox</Title>
                <RecipeGrid type="inbox" />
              </Route>
              <Route path="/favorites">
                <Title>Favorite Recipes</Title>
                <RecipeGrid type="favorites" />
              </Route>
              <Route path="/rejected">
                <Title>Rejected Recipes</Title>
                <RecipeGrid type="rejected" />
              </Route>
              <Route path="/">
                <Title>Let's Eat!</Title>
                <RecipeGrid type="index" />
              </Route>
            </Switch>
          </Container>
          <Box pt={4}>
            <Copyright />
          </Box>
        </main>
      </div>
    );
  }
  return <LoginForm />;
};

export default Home;
