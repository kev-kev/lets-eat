import React, { useContext, useEffect } from "react";
import { Box, Container, CssBaseline } from "@material-ui/core";
import Sidebar from "./Sidebar";
import Copyright from "./Copyright";
import { GlobalContext } from "../context/GlobalState";
import { Switch, Route } from "react-router-dom";
import { dashboardStyle } from "../muiStyling";
import RecipeGrid from "./RecipeGrid";
import Title from "./Title";
import NewRecipeForm from "./NewRecipeForm";
import LoginForm from "./LoginForm";

const Home = () => {
  const classes = dashboardStyle();
  const { user, fetchRecipes } = useContext(GlobalContext);

  useEffect(() => {
    fetchRecipes(user);
  }, []);

  if (user) {
    return (
      <div className={classes.root}>
        <CssBaseline />
        <Sidebar />
        <main className={classes.content}>
          <Container maxWidth={false} className={classes.container}>
            <Switch>
              <Route path="/new">
                <NewRecipeForm />
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
                <Title>Recipe Index</Title>
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
  } else {
    return <LoginForm />;
  }
};

export default Home;
