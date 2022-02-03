import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalState";
import theme from "./theme";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import GlobalOverrides from "./GlobalOverrides";
import Home from "./components/Home";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalOverrides />
      <GlobalProvider>
        <Router>
          <Route path="/">
            <Home />
          </Route>
        </Router>
      </GlobalProvider>
    </ThemeProvider>
  );
};

export default App;
