import React, { useContext, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Sidebar from "./Sidebar";
import Copyright from "./Copyright";
import { GlobalContext } from "../context/GlobalState";
import { Redirect } from "react-router-dom";
import { dashboardMui } from "../muiStyling";

export default function Dashboard(props) {
  const classes = dashboardMui();
  const { user } = useContext(GlobalContext);

  if (user) {
    return (
      <div className={classes.root}>
        <CssBaseline />
        <Sidebar />
        <main className={classes.content}>
          <Container maxWidth={false} className={classes.container}>
            {props.children}
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
