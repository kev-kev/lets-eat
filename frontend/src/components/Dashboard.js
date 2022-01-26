import React, { useContext } from "react";
import { Box, Container, CssBaseline } from "@material-ui/core";
import Sidebar from "./Sidebar";
import Copyright from "./Copyright";
import { GlobalContext } from "../context/GlobalState";
import { Redirect } from "react-router-dom";
import { dashboardStyle } from "../muiStyling";

const Dashboard = (props) => {
  const classes = dashboardStyle();
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
};

export default Dashboard;
