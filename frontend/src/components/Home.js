import React, { useContext, useEffect, useState, createRef } from "react";
import { Container, CssBaseline, Snackbar, Portal } from "@material-ui/core";
import { Alert } from "@material-ui/lab/";
import Sidebar from "./Sidebar";
import Copyright from "./Copyright";
import { GlobalContext } from "../context/GlobalState";
import { Switch, Route } from "react-router-dom";
import { homeStyle } from "../muiStyling";
import RecipeGrid from "./RecipeGrid";
import Title from "./Title";
import { RecipeFormNew } from "./RecipeFormNew";
import LoginForm from "./LoginForm";

const successMessage = "ヽ(*・ω・)ﾉ   Recipe Submitted!   ～('▽^人)";
const errorMessage = "Submission Failed (っ´ω`)ﾉ (╥ω╥)";


const Home = () => {
  const classes = homeStyle();
  const { user, fetchRecipes, errors, isSubmittingRecipe, clearErrors, isEditingRecipe } = useContext(GlobalContext);
  
  const [successSnackbar, setSuccessSnackbar] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState(false);
  const snackbarRef = createRef();

  useEffect(() => {
    user && fetchRecipes(user);
  }, [user]); //eslint-disable-line

  useEffect(() => {
    if (Object.values(errors).some(error => error)) setErrorSnackbar(true);
  }, [errors]);

  useEffect(() => {
    if((isSubmittingRecipe || isEditingRecipe) && Object.values(errors).every(error => !error)){
      setSuccessSnackbar(true);
    }
  }, [isSubmittingRecipe, isEditingRecipe])

  const handleSnackbarClose = () => {
    setErrorSnackbar(false);
    setSuccessSnackbar(false);
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
            <Portal>
              <Snackbar open={errorSnackbar} onClose={handleSnackbarClose} ref={snackbarRef}>
                <Alert onClose={handleSnackbarClose} severity="error">
                  {errorMessage}
                </Alert>
              </Snackbar>
              <Snackbar open={successSnackbar} onClose={handleSnackbarClose} ref={snackbarRef}>
                <Alert onClose={handleSnackbarClose} severity="success">
                  {successMessage}
                </Alert>
              </Snackbar>
            </Portal>
            <Copyright className={classes.copyright} />
          </Container>
        </main>
      </div>
    );
  }
  return <LoginForm />;
};

export default Home;
