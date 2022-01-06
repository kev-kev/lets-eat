import React, { createContext, useReducer, useEffect } from "react";
import { AppReducer } from "./AppReducer";
import { startOfWeek } from "date-fns";

const initialState = {
  user: null,
  isLoggingIn: false,
  recipes: [],
  isSubmittingRecipe: false,
  isLoading: false,
  errors: {
    login: null,
    submit: null,
    grid: null,
    inbox: null,
  },
  selectedWeek: startOfWeek(new Date()),
  groceryList: null,
};
const rootURL = process.env.REACT_APP_API_URL;

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    dispatch({
      type: "FETCH_RECIPES",
    });
    fetch(rootURL + "/recipes/")
      .then(handleErrors)
      .then((r) => r.json())
      .then((data) => {
        dispatch({
          type: "FETCH_RECIPES_SUCCESS",
          payload: {
            recipes: data.recipes,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: "FETCH_RECIPES_FAILURE",
          payload: error,
        });
      });
  }, []);

  function loginUser(username, password) {
    dispatch({
      type: "LOGIN_USER",
    });
    fetch(rootURL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: { username, password } }),
    })
      .then(handleErrors)
      .then((r) => r.json())
      .then((data) => {
        localStorage.setItem("token", data.jwt);
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            user: data.user,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: error,
        });
      });
  }

  function fetchRecipes(week) {
    dispatch({
      type: "FETCH_RECIPES",
    });
    fetch(rootURL + `/recipes/?week=${week}`)
      .then(handleErrors)
      .then((r) => r.json())
      .then((data) => {
        dispatch({
          type: "FETCH_RECIPES_SUCCESS",
          payload: { recipes: data.recipes, weeklyRecipes: data.weeklyRecipes },
        });
      })
      .catch((error) => {
        dispatch({
          type: "FETCH_RECIPES_FAILURE",
          payload: error,
        });
      });
  }

  function submitRecipe(name, link, notes, imgUrl, ingredients) {
    dispatch({
      type: "SUBMITTING_RECIPE",
    });
    fetch(rootURL + "/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipe: {
          name: name,
          link: link,
          notes: notes,
          user_id: state.user.id,
          img_url: imgUrl,
          ingredients: ingredients,
        },
      }),
    })
      .then(handleErrors)
      .then((r) => r.json())
      .then((data) => {
        dispatch({
          type: "SUBMIT_RECIPE_SUCCESS",
          payload: data.recipe,
        });
      })
      .catch((error) => {
        dispatch({
          type: "SUBMIT_RECIPE_FAILURE",
          payload: error,
        });
      });
  }

  function deleteRecipe(recipe_id) {
    fetch(rootURL + `/recipes/${recipe_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipe: {
          id: recipe_id,
        },
      }),
    })
      .then(handleErrors)
      .then((r) => r.json())
      .then((data) => {
        dispatch({
          type: "DELETE_RECIPE_SUCCESS",
          payload: data.recipess,
        });
      })
      .catch((error) => {
        dispatch({
          type: "DELETE_RECIPE_FAILURE",
          payload: error,
        });
      });
  }

  function changeRecipeStatus(recipe_id, recipe_status) {
    fetch(rootURL + `/recipes/${recipe_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipe: {
          status: recipe_status,
        },
      }),
    })
      .then(handleErrors)
      .then((r) => r.json())
      .then((data) => {
        dispatch({
          type: "STATUS_UPDATE_SUCCESS",
          payload: data.recipes,
        });
      })
      .catch((error) => {
        dispatch({
          type: "STATUS_UPDATE_FAILURE",
          payload: error,
        });
      });
  }

  function toggleFavorite(recipe_id, value) {
    fetch(rootURL + `/recipes/${recipe_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipe: {
          is_favorited: value,
          id: recipe_id,
        },
      }),
    })
      .then(handleErrors)
      .then((r) => {
        if (r.status === 200)
          dispatch({
            type: "FAVORITE_UPDATE_SUCCESS",
            payload: { recipe_id, value },
          });
      })
      .catch((error) => {
        dispatch({
          type: "FAVORITE_UPDATE_FAILURE",
          payload: error,
        });
      });
  }

  function setWeeks(recipe_id, value) {
    fetch(rootURL + `/recipes/${recipe_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipe: {
          weeks: value,
        },
        page: 1,
      }),
    })
      .then(handleErrors)
      .then((r) => {
        if (r.status === 200)
          dispatch({
            type: "WEEKS_UPDATE_SUCCESS",
            payload: { recipe_id, value },
          });
      })
      .catch((error) => {
        dispatch({
          type: "WEEKS_UPDATE_FAILURE",
          payload: error,
        });
      });
  }

  function getGroceryList() {
    fetch(rootURL + `/grocery_list/?week=${state.selectedWeek}`)
      .then(handleErrors)
      .then((r) => r.json())
      .then((data) => {
        dispatch({
          type: "GET_GROCERY_LIST_SUCCESS",
          payload: { groceryList: data.groceryList },
        });
      })
      .catch((error) => {
        dispatch({
          type: "GET_GROCERY_LIST_FAILURE",
          payload: error,
        });
      });
  }

  function changeSelectedWeek(week) {
    dispatch({
      type: "CHANGE_SELECTED_WEEK",
      payload: week,
    });
  }

  function logoutUser() {
    dispatch({
      type: "LOGOUT_USER",
    });
  }

  function clearErrors() {
    dispatch({
      type: "CLEAR_ERRORS",
    });
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
        isLoading: state.isLoading,
        selectedWeek: state.selectedWeek,
        changeSelectedWeek,
        setWeeks,
        toggleFavorite,
        getGroceryList,
        groceryList: state.groceryList,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
