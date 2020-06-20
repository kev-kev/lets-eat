import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  user: null,
  isLoggingIn: false
};

export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function loginUser(username, password) {
    // Set isLoggingIn to true
    dispatch({
      type: "LOGIN_USER",
      payload: {}
    });
    console.log(username, password);
    // Send request to backend to login user
    // If success:
    dispatch({
       type: "LOGIN_SUCCESS",
       payload: {
           user: {
               username: "mirmir"
           }
       }
    });
    // Else:
    // dispatch({
    //    type: "LOGIN_FAILED",
    //    payload: {error}
    // })
  }

  return (
    <GlobalContext.Provider
      value={{
          user: state.user,
          isLoggingIn: state.isLoggingIn,
          login: loginUser
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};