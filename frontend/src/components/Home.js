import React, { useContext, useEffect, useState, createRef } from "react";
import { Container, CssBaseline, Snackbar, Portal, CircularProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab/";
import Sidebar from "./Sidebar";
import Copyright from "./Copyright";
import { GlobalContext } from "../context/GlobalState";
import { Switch, Route } from "react-router-dom";
import { homeStyle } from "../muiStyling";
import RecipeGrid from "./RecipeGrid";
import Title from "./Title";
import { RecipeForm } from "./RecipeForm";
import LoginForm from "./LoginForm";

const Home = () => {
  const classes = homeStyle();
  const { user, fetchRecipes, clearErrors, showErrorSnackbar, showSuccessSnackbar, setShowSnackbar, snackbarMessage } = useContext(GlobalContext);
  const successRef = createRef();
  const errorRef = createRef();

  useEffect(() => {
    user && fetchRecipes(user);
  }, [user]); //eslint-disable-line

  const handleSnackbarClose = (type) => {
    setShowSnackbar(type, false);
    clearErrors();
  };

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
                  <RecipeForm />
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
            <Portal>
              <Snackbar open={showErrorSnackbar} onClose={() => handleSnackbarClose("error")} ref={errorRef}>
                <Alert onClose={() => handleSnackbarClose("error")} severity="error">
                  {snackbarMessage || "Something went wrong. Please try again."}
                </Alert>
              </Snackbar>
            </Portal>
            <Portal>
              <Snackbar open={showSuccessSnackbar} onClose={() => handleSnackbarClose("success")} ref={successRef}>
                <Alert onClose={() => handleSnackbarClose("success")} severity="success">
                  {snackbarMessage}
                </Alert>
              </Snackbar>
            </Portal>
            <Copyright copyrightClass={classes.copyright} />
          </Container>
        </main>
      </div>
    );
  }
  return <LoginForm />;
};

export default Home;
