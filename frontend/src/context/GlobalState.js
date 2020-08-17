import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  user: null,
  isLoggingIn: false,
  recipes: [],
  isSubmittingRecipe: false,
  isFetchingRecipes: false,
  errors: {
    login: null,
    submit: null,
    grid: null,
    inbox: null
  },
};

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}

export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function loginUser(username, password) {
    dispatch({
      type: "LOGIN_USER"
    });
    fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({user: {username, password}})
    })
      .then(handleErrors)
      .then(r => r.json())
      .then(data => {
        localStorage.setItem('token', data.jwt)
        dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: data.user
        } 
      })
    })
    .catch(error => {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: error
      })
    })
  }

  function fetchRecipes(){
    dispatch({
      type: "FETCH_RECIPES"
    })
    fetch("http://localhost:4000/recipes")
      .then(handleErrors)
      .then(r => r.json())
      .then(data =>  {
        dispatch({
          type: "FETCH_RECIPES_SUCCESS",
          payload: data.recipes
        })
      })
      .catch(error => {
        dispatch({
          type: "FETCH_RECIPES_FAILURE",
          payload: error
        })
      })
  }

  function submitRecipe(name, link, notes, imgUrl){
    dispatch({
      type: "SUBMITTING_RECIPE"
    })
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
          user_id: state.user.id,
          img_url: imgUrl
        }
      })
    })
    .then(handleErrors)
    .then(r => r.json())
    .then(data => {
      dispatch({
        type: "SUBMIT_RECIPE_SUCCESS",
        payload: data.recipes
      })  
    })
    .catch(error => {
      dispatch({
        type: "SUBMIT_RECIPE_FAILURE",
        payload: error
      })
    })
  }

  function deleteRecipe(recipe_id){
    fetch(`http://localhost:4000/recipes/${recipe_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({recipe: 
        {
          id: recipe_id
        }
      })
    })
    .then(handleErrors)
    .then(r => r.json())
    .then(data => {
      dispatch({
        type: "DELETE_RECIPE_SUCCESS",
        payload: data.recipes
      })
    })
    .catch(error => {
      dispatch({
        type: "DELETE_RECIPE_FAILURE",
        payload: error
      })
    })
  }

  function changeRecipeStatus(recipe_id, recipe_status){
    fetch(`http://localhost:4000/recipes/${recipe_id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        recipe: {
        status: recipe_status,
        id: recipe_id }
      })
    })
      .then(handleErrors)
      .then(r => r.json())
      .then(data => {
        dispatch({
          type: "STATUS_UPDATE_SUCCESS",
          payload: data.recipes
        })
      })
      .catch(error => {
        dispatch({
          type: "STATUS_UPDATE_FAILURE"
        })
      })
  }

  function logoutUser() {
    dispatch({
      type: "LOGOUT_USER"
    });
  }

  function clearErrors() {
    dispatch({
      type: "CLEAR_ERRORS"
    })
  }

  return (
    <GlobalContext.Provider
      value={{
          user: state.user,
          isLoggingIn: state.isLoggingIn,
          isSubmittingRecipe: state.isSubmittingRecipe,
          login: loginUser,
          recipes: state.recipes,
          submitRecipe,
          fetchRecipes,
          deleteRecipe,
          changeRecipeStatus,
          logoutUser,
          errors: state.errors,
          clearErrors,
          isFetchingRecipes: state.isFetchingRecipes
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};