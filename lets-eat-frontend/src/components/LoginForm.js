import React, { Fragment, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const LoginForm = () => {
  const { login } = useContext(GlobalContext);
  return (
      <div>
        Login<br />
        <button onClick={e => {
            e.preventDefault();
            login("mirmir", "123456");
        }}>Click Me To Login</button>
      </div>
  );
};

export default LoginForm;