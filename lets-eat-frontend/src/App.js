import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { GlobalProvider } from './context/GlobalState';
import LoginForm from './components/LoginForm';

export default function App() {
  return (
    <GlobalProvider>
      <Router>
        <Link to="/login">Login</Link>
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

function Home() {
  return <h2>Home</h2>;
}
