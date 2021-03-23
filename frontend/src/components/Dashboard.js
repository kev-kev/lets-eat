import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Sidebar from "./Sidebar";
import Copyright from "./Copyright";
import { GlobalContext } from "../context/GlobalState";
import { Redirect } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    padding: "1vh",
  },
  container: {
    width: "100%",
    paddingBottom: theme.spacing(4),
    margin: 0,
    justifyContent: "center",
  },
  loading: {
    margin: "40vh",
  },
}));

export default function Dashboard(props) {
  const classes = useStyles();
  const { user, fetchRecipes, isFetchingRecipes } = useContext(GlobalContext);

  useEffect(fetchRecipes, []);

  const renderLoadingOrChildren = () => {
    if (isFetchingRecipes) {
      return <CircularProgress className={classes.loading} />;
    } else {
      return props.children;
    }
  };

  // if (user) {
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
  // } else {
  //   return <Redirect to={"/login"} />;
  // }
}
