import React, { useContext, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Sidebar from "./Sidebar";
import Copyright from "./Copyright";
import { GlobalContext } from "../context/GlobalState";
import { Redirect } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { dashboardMui } from "../muiStyling";

export default function Dashboard(props) {
  const classes = dashboardMui();
  const { user, fetchRecipes, isFetchingRecipes } = useContext(GlobalContext);

  useEffect(fetchRecipes, []);

  const renderLoadingOrChildren = () => {
    if (isFetchingRecipes) {
      return <CircularProgress className={classes.loading} />;
    } else {
      return props.children;
    }
  };

  if (user) {
    return (
      <div className={classes.root}>
        <CssBaseline />
        <Sidebar />
        <main className={classes.content}>
          <Container maxWidth={false} className={classes.container}>
            {renderLoadingOrChildren()}
          </Container>
          <Box pt={4}>
            <Copyright />
          </Box>
        </main>
      </div>
    );
  } else {
    return <Redirect to={"/login"} />;
  }
}
