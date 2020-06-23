import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  user: null,
  isLoggingIn: false,
  recipes: []
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
  }

  function submitRecipe(name, link, notes){
    fetch("http://localhost:4000/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({recipe: 
        {
          name: name,
          link: link,
          notes: notes,
          user_id: state.user.id
        }
      })
    })
    .then(r => r.json())
    .then(data => {
      dispatch({
        type: "SUBMIT_RECIPE_SUCCESS",
        payload: {
          recipes: data
        }
      })
    })
  }

  function fetchRecipes(){
    fetch("http://localhost:4000/recipes")
      .then(r => r.json())
      .then(data =>  {
        console.log(data)
        dispatch({
          type: "FETCH_RECIPES_SUCCESS",
          payload: {
            recipes: data.recipes
          }
        })
      })
  }

  return (
    <GlobalContext.Provider
      value={{
          user: state.user,
          isLoggingIn: state.isLoggingIn,
          login: loginUser,
          recipes: state.recipes,
          submitRecipe: submitRecipe,
          fetchRecipes: fetchRecipes
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};