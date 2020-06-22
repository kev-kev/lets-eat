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
    dispatch({
      type: "LOGIN_USER",
      payload: {
        isLoggingIn: true
      }
    });
    fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({user: {username, password}})
    })
      .then(r => {
        return r.json()
      })
      .then(data => {
        if (data.error) {
          console.log(data.error);
          dispatch({
            type: "LOGIN_FAILED",
            payload: {
              error: "Login failed"
            }
          })
        } else {
          localStorage.setItem('token', data.jwt)
          dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            user: data.user
          } 
        })
        }
    })

      
    // dispatch({
    //    type: "LOGIN_SUCCESS",
    //    payload: {
    //        user: {
    //            username: "mirmir"
    //        }
    //    }
    // });
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