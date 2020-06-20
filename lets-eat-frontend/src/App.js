import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { GlobalProvider } from './context/GlobalState';
import Home from './components/Home';
import LoginForm from './components/LoginForm';

export default function App() {
  return (
    <GlobalProvider>
      <Router>
        <div>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/login">
              <LoginForm />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </GlobalProvider>
  );
}
