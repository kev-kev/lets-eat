import React, { createContext, useReducer } from "react";
import { AppReducer } from "./AppReducer";
import { startOfWeek, differenceInDays, parseISO } from "date-fns";

const initialState = {
  user: null,
  isLoggingIn: false,
  isSubmittingRecipe: false,
  isFetchingRecipes: false,
  isFetchingRecipeList: false,
  isEditing: false,
  errors: {
    login: null,
    submit: null,
    grid: null,
    inbox: null,
  },
  selectedWeek: startOfWeek(new Date()),
  groceryList: null,
  favoritedRecipes: [],
  weeklyRecipes: [],
  approvedRecipes: [],
  inboxRecipes: [],
  pendingRecipes: [],
  rejectedRecipes: [],
  indexRecipes: [],
};
const rootURL = process.env.REACT_APP_API_URL;

const handleErrors = (response) => {
  if (!response.ok) throw Error(response.statusText);
  return response;
};

export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const getRecipesFromType = (type) => {
    //eslint-disable-next-line
    switch (type) {
      case "weekly":
        return [...state.weeklyRecipes];
      case "approved":
        return [...state.approvedRecipes];
      case "favorited":
        return [...state.favoritedRecipes];
      case "inbox":
        return [...state.inboxRecipes];
      case "pending":
        return [...state.pendingRecipes];
      case "rejected":
        return [...state.rejectedRecipes];
    }
  };

  const isWeeklyRecipe = (recipeWeeks, newWeek = state.selectedWeek) => {
    return recipeWeeks.some(
      (week) => differenceInDays(parseISO(week), newWeek) === 0
    );
  };

  const fetchRecipes = (user) => {
    dispatch({
      type: "FETCH_RECIPES",
    });
    fetch(rootURL + `/recipes`)
      .then(handleErrors)
      .then((r) => r.json())
      .then((data) => {
        filterAndSetRecipes(data.recipes, user);
        dispatch({
          type: "FETCH_RECIPES_SUCCESS",
        });
      })
      .catch((error) => {
        dispatch({
          type: "FETCH_RECIPES_FAILURE",
          payload: error,
        });
      });
  };

  const editRecipe = (recipe) => {
    const subType = isWeeklyRecipe(recipe.weeks) ? "weekly" : "approved";
    fetch(rootURL + `/recipes/${recipe.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipe),
    })
      .then(handleErrors)
      .then(() => {
        const updatedRecipes = getRecipesFromType(subType);
        const recipeIndex = updatedRecipes.findIndex(
          (target) => target.id === recipe.id
        );
        updatedRecipes[recipeIndex] = recipe;

        dispatch({
          type: "EDIT_RECIPE_SUCCESS",
          payload: {
            updatedRecipes: updatedRecipes,
            type: subType,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: "EDIT_RECIPE_FAILURE",
          payload: error,
        });
      });
  };

  const setIndexRecipes = (term) => {
    if (term.length < 1) {
      dispatch({
        type: "SET_RECIPES",
        payload: ["index", state.approvedRecipes],
      });
    } else {
      const filteredApprovedRecipes = state.approvedRecipes.filter((recipe) => {
        return recipe.name.toLowerCase().includes(term.toLowerCase());
      });
      dispatch({
        type: "SET_RECIPES",
        payload: ["index", filteredApprovedRecipes],
      });
    }
  };

  const filterAndSetRecipes = (recipes, user) => {
    const weeklyRecipes = [];
    const approvedRecipes = [];
    const favoritedRecipes = [];
    const inboxRecipes = [];
    const pendingRecipes = [];
    const rejectedRecipes = [];

    recipes.forEach((recipe) => {
      //eslint-disable-next-line
      switch (recipe.status) {
        case "approved":
          if (isWeeklyRecipe(recipe.weeks)) weeklyRecipes.push(recipe);
          else approvedRecipes.push(recipe);
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
      ["weekly", weeklyRecipes],
      ["approved", approvedRecipes],
      ["index", approvedRecipes],
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
    fetch(rootURL + "/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: { username, password } }),
    })
      .then(handleErrors)
      .then((r) => r.json())
      .then((data) => {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("username", data.user.username);
        localStorage.setItem("id", data.user.id);
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

  function persistentLogin() {
    if (localStorage.getItem("authToken")) {
      dispatch({
        type: "LOGIN_USER",
      });
      const username = localStorage.getItem("username");
      const id = localStorage.getItem("id");
      if (username) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            user: {
              username,
              id,
            },
          },
        });
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: {
            error: "Something went wrong! Please try logging back in.",
          },
        });
      }
    }
  }

  function submitRecipe({ name, link, notes, imgUrl, ingredients }) {
    dispatch({
      type: "SUBMITTING_RECIPE",
    });
    fetch(rootURL + "/recipes/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipe: {
          name,
          link,
          notes,
          user_id: state.user.id,
          img_url: imgUrl,
          ingredients,
        },
      }),
    })
      .then(handleErrors)
      .then(() => {
        dispatch({
          type: "SUBMIT_RECIPE_SUCCESS",
          payload: {
            name,
            link,
            notes,
            imgUrl,
            ingredients,
            submittedBy: state.user.username,
          },
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
    fetch(rootURL + `/recipes/${recipe_id}/`, {
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
      .then(() => {
        dispatch({
          type: "STATUS_UPDATE_SUCCESS",
          payload: { recipe_status, recipe_id },
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
        if (r.status === 204)
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

  function setWeeks(recipe_id, weeks) {
    fetch(rootURL + `/recipes/${recipe_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipe: {
          weeks: weeks,
        },
      }),
    })
      .then(handleErrors)
      .then((r) => {
        if (r.status === 204)
          dispatch({
            type: "WEEKS_UPDATE_SUCCESS",
            payload: { recipe_id, weeks },
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
    const newWeeklyRecipes = [];
    const newApprovedRecipes = [];
    [...state.approvedRecipes, ...state.weeklyRecipes].forEach((recipe) => {
      if (isWeeklyRecipe(recipe.weeks, week)) newWeeklyRecipes.push(recipe);
      else newApprovedRecipes.push(recipe);
    });
    dispatch({
      type: "CHANGE_SELECTED_WEEK",
      payload: { week, newWeeklyRecipes, newApprovedRecipes },
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
        isFetchingRecipeList: state.isFetchingRecipeList,
        selectedWeek: state.selectedWeek,
        changeSelectedWeek,
        setWeeks,
        toggleFavorite,
        getGroceryList,
        groceryList: state.groceryList,
        fetchRecipes,
        editRecipe,
        favoritedRecipes: state.favoritedRecipes,
        weeklyRecipes: state.weeklyRecipes,
        approvedRecipes: state.approvedRecipes,
        inboxRecipes: state.inboxRecipes,
        pendingRecipes: state.pendingRecipes,
        rejectedRecipes: state.rejectedRecipes,
        indexRecipes: state.indexRecipes,
        setIndexRecipes,
        persistentLogin,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
