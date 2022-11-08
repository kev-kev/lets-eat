import React, { useContext, useEffect, createRef } from "react";
import { Container, CssBaseline, Snackbar, Portal, useMediaQuery } from "@material-ui/core";
import { Alert } from "@material-ui/lab/";
import Sidebar from "./Sidebar";
import { GlobalContext } from "../context/GlobalState";
import { Switch, Route } from "react-router-dom";
import { homeStyle } from "../muiStyling";
import RecipeGrid from "./RecipeGrid";
import Title from "./Title";
import { RecipeForm } from "./RecipeForm";
import LoginForm from "./LoginForm";
import Topnav from "./Topnav"

const Home = () => {
  const classes = homeStyle();
  const { 
    user,
    fetchRecipes,
    clearErrors,
    showErrorSnackbar,
    showSuccessSnackbar,
    setShowSnackbar,
    snackbarMessage
  } = useContext(GlobalContext);
  const successRef = createRef();
  const errorRef = createRef();
  const mobile = useMediaQuery('(max-width:600px)')

  useEffect(() => {
    user && fetchRecipes(user);
  }, [user]); //eslint-disable-line

  const handleSnackbarClose = (type) => {
    setShowSnackbar(type, false);
    clearErrors();
  };

  if (user) {
    return (
      <div className={mobile ? "" : classes.root}>
        <CssBaseline />
        {!mobile && <Sidebar />}
        <main className={classes.content}>
          {mobile && <Topnav />}
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
                  <RecipeGrid type="index" mobile={mobile}/>
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
          </Container>
        </main>
      </div>
    );
  }
  return <LoginForm />;
};

export default Home;
