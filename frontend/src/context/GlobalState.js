import React, { createContext, useReducer } from "react";
import { AppReducer } from "./AppReducer";
import { startOfWeek } from "date-fns";

const initialState = {
  user: null,
  isLoggingIn: false,
  isSubmittingRecipe: false,
  isFetchingRecipes: false,
  errors: {
    login: null,
    submit: null,
    grid: null,
    inbox: null,
  },
  selectedWeek: startOfWeek(new Date()),
  groceryList: null,
  favoritedRecipes: [],
  approvedRecipes: [],
  inboxRecipes: [],
  pendingRecipes: [],
  rejectedRecipes: [],
};
const rootURL = process.env.REACT_APP_API_URL;

const handleErrors = (response) => {
  if (!response.ok) throw Error(response.statusText);
  return response;
};

export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const fetchRecipes = (user) => {
    dispatch({
      type: "FETCH_RECIPES",
    });
    fetch(rootURL + `/recipes/`)
      .then(handleErrors)
      .then((r) => r.json())
      .then((data) => {
        filterAndSetRecipes(data.recipes, user);
        dispatch({
          type: "FETCH_RECIPES_SUCCESS",
          payload: { recipes: data.recipes },
        });
      })
      .catch((error) => {
        dispatch({
          type: "FETCH_RECIPES_FAILURE",
          payload: error,
        });
      });
  };

  const filterAndSetRecipes = (recipes, user) => {
    const approvedRecipes = [];
    const favoritedRecipes = [];
    const inboxRecipes = [];
    const pendingRecipes = [];
    const rejectedRecipes = [];

    recipes.forEach((recipe) => {
      //eslint-disable-next-line
      switch (recipe.status) {
        case "approved":
          approvedRecipes.push(recipe);
          if (recipe.isFavorited) favoritedRecipes.push(recipe);
          break;
        case "pending":
          recipe.submittedBy === user.username
            ? pendingRecipes.push(recipe)
            : inboxRecipes.push(recipe);
          break;
        case "rejected":
          rejectedRecipes.push(recipe);
          break;
      }
    });
    const allRecipes = [
      ["approved", approvedRecipes],
      ["favorited", favoritedRecipes],
      ["inbox", inboxRecipes],
      ["pending", pendingRecipes],
      ["rejected", rejectedRecipes],
    ];
    for (const subArr of allRecipes) {
      dispatch({
        type: "SET_RECIPES",
        payload: subArr,
      });
    }
  };

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
          payload: data.recipes.filter(
            (recipe) => recipe.status === "approved"
          ),
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
          payload: data.groceryList,
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
        deleteRecipe,
        changeRecipeStatus,
        logoutUser,
        errors: state.errors,
        clearErrors,
        isFetchingRecipes: state.isFetchingRecipes,
        selectedWeek: state.selectedWeek,
        changeSelectedWeek,
        setWeeks,
        toggleFavorite,
        getGroceryList,
        groceryList: state.groceryList,
        fetchRecipes,
        favoritedRecipes: state.favoritedRecipes,
        approvedRecipes: state.approvedRecipes,
        inboxRecipes: state.inboxRecipes,
        pendingRecipes: state.pendingRecipes,
        rejectedRecipes: state.rejectedRecipes,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
