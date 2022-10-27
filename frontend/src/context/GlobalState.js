import React, { createContext, useReducer } from "react";
import { AppReducer } from "./AppReducer";
import { startOfWeek, differenceInDays, parseISO } from "date-fns";

const initialState = {
  user: null,
  isLoggingIn: false,
  isSubmittingRecipe: false,
  isFetchingRecipes: false,
  isFetchingRecipeList: false,
  isEditingRecipe: false,
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
  openRecipeId: null,
  showSuccessSnackbar: false,
  showErrorSnackbar: false,
  showEditForm: false,
  submitClicked: false,
  snackbarMessage: "",
};
const rootURL = process.env.REACT_APP_API_URL;

export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const isWeeklyRecipe = (recipeWeeks, newWeek = state.selectedWeek) => {
    return recipeWeeks.some(
      (week) => differenceInDays(parseISO(week), newWeek) === 0
    );
  };


const handleErrors = async (response, errorType) => {
  const resObj = await response.json();
  if (!response.ok) {
    if (resObj.error) {
      setShowSnackbar("error");
      setSnackbarMessage(resObj.error);
      dispatch({
        type: errorType,
        payload: resObj.error,
      });
    } else {
      // Error occurred without message
      setShowSnackbar("error");
      setSnackbarMessage("Oops something went wrong! Please try again.");
    }
  } else {
    return resObj;
  }
};


  const fetchRecipes = (user) => {
    dispatch({
      type: "FETCHING_RECIPES",
    });
    fetch(rootURL + `/recipes`)
      .then(r => handleErrors(r, "FETCH_RECIPES_FAILURE"))
      .then((data) => {
        if (data) {
          filterAndSetRecipes(data.recipes, user);
          dispatch({
            type: "FETCH_RECIPES_SUCCESS",
          });
        }
      })
  };

  const editRecipe = (recipe) => {
    const subType = isWeeklyRecipe(recipe.weeks) ? "weekly" : "approved";
    fetch(rootURL + `/recipes/${recipe.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: recipe.id,
        name: recipe.name,
        link: recipe.link,
        status: recipe.status,
        notes: recipe.notes,
        user_id: recipe.user?.id,
        img_url: recipe.imgUrl,
        is_favorited: recipe.isFavorited,
        ingredients: recipe.ingredients,
      }),
    })
    .then((r) => handleErrors(r, "EDIT_RECIPE_FAILURE"))
    .then((data) => {
      if (data) {
        if(isWeeklyRecipe(recipe.weeks)){
          // update weeklyRecipe
          const updatedWeeklyRecipes = state.weeklyRecipes
          const recipeIndex = updatedWeeklyRecipes.findIndex(
            (target) => target.id === recipe.id
          );
          updatedWeeklyRecipes[recipeIndex] = recipe;
          dispatch({
            type: "EDIT_RECIPE_SUCCESS",
            payload: {
              updatedWeeklyRecipes,
              type: subType,
            },
          });
        } else {
          // update approved and index
          const updatedApprovedRecipes = state.approvedRecipes;
          let recipeIndex = updatedApprovedRecipes.findIndex(
            (target) => target.id === recipe.id
          );
          updatedApprovedRecipes[recipeIndex] = recipe;
          const updatedIndexRecipes = state.indexRecipes;
          recipeIndex = updatedIndexRecipes.findIndex(
            (target) => target.id === recipe.id
          );
          updatedIndexRecipes[recipeIndex] = recipe;
          dispatch({
            type: "EDIT_RECIPE_SUCCESS",
            payload: {
              updatedApprovedRecipes,
              updatedIndexRecipes
            },
          });
        }
        setShowSnackbar("success");
        setSnackbarMessage("Recipe updated");
        setShowEditForm(false);
      }
    })
  };

  const setIndexRecipes = (term) => {
    if (term.length < 1) {
      dispatch({
        type: "SET_RECIPES",
        payload: ["index", state.approvedRecipes.sort((a, b) => b.id - a.id)],
      });
    } else {
      const filteredApprovedRecipes = state.approvedRecipes.filter((recipe) => {
        return recipe.name.toLowerCase().includes(term.toLowerCase());
      });
      dispatch({
        type: "SET_RECIPES",
        payload: ["index", filteredApprovedRecipes.sort((a, b) => b.id - a.id)],
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
      .then((r) => handleErrors(r, "LOGIN_FAILURE"))
      .then((data) => {
        if (data) {
          localStorage.setItem("authToken", data.token);
          localStorage.setItem("username", data.user?.username);
          localStorage.setItem("id", data.user?.id);
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: {
              user: data.user,
            },
          });
        }
      })
    }


  function persistentLogin() {
    if (localStorage.getItem("authToken")) {
      dispatch({
        type: "LOGIN_USER",
      });
      const username = localStorage.getItem("username");
      const id = localStorage.getItem("id");
      if (username && id) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            user: {
              username,
              id,
            },
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
      .then(r => handleErrors(r, "SUBMIT_RECIPE_FAILURE"))
      .then((data) => {
        if (data) {
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
          setShowSnackbar("success");
          setSnackbarMessage("Recipe successfully submitted");
        }
      })
  }

  function deleteRecipe(recipeId, type) {
    fetch(rootURL + `/recipes/${recipeId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipe: {
          id: recipeId,
        },
      }),
    })
      .then((r) => handleErrors(r, "DELETE_RECIPE_FAILURE"))
      .then((data) => {
        if (data) {
          dispatch({
            type: "DELETE_RECIPE_SUCCESS",
            payload: {recipeId, type}
          });
          setShowSnackbar("success");
          setSnackbarMessage("Recipe has been deleted");
        }
      })
  }

  function changeRecipeStatus(recipeId, recipe_status) {
    fetch(rootURL + `/recipes/${recipeId}/`, {
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
      .then((r) => handleErrors(r, "STATUS_UPDATE_FAILURE"))
      .then((data) => {
        if (data) {
          dispatch({
            type: "STATUS_UPDATE_SUCCESS",
            payload: { recipe_status, recipeId },
          });
          setShowSnackbar("success");
          setSnackbarMessage("Recipe updated");
        }
      })
  }

  function setWeeks(recipeId, weeks) {
    fetch(rootURL + `/recipes/${recipeId}`, {
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
      .then((r) => handleErrors(r, "WEEKS_UPDATE_FAILURE"))
      .then((resObj) => {
        if (resObj) {
          dispatch({
            type: "WEEKS_UPDATE_SUCCESS",
            payload: { recipeId, weeks },
          });
        }
      })
  }

  function getGroceryList() {
    fetch(rootURL + `/grocery_list/?week=${state.selectedWeek}`)
      .then((r) => handleErrors(r, "GET_GROCERY_LIST_FAILURE"))
      .then((data) => {
        if (data) {
          dispatch({
            type: "GET_GROCERY_LIST_SUCCESS",
            payload: data.groceryList,
          });  
        }
      })
  }

  function changeSelectedWeek(week) {
    const newWeeklyRecipes = [];
    const newApprovedRecipes = [];
    const indexRecipes = [...state.approvedRecipes, ...state.weeklyRecipes]
    indexRecipes.forEach((recipe) => {
      if (isWeeklyRecipe(recipe.weeks, week)) {
        newWeeklyRecipes.push(recipe);
      } else {
        newApprovedRecipes.push(recipe);
      }
    });
    dispatch({
      type: "CHANGE_SELECTED_WEEK",
      payload: { week, newWeeklyRecipes, newApprovedRecipes },
    });
  }

  const setOpenRecipeId = (id) => {
    dispatch({
      type: "SET_OPEN_RECIPE_ID",
      payload: id
    });
  }

  const setShowSnackbar = (type, bool=true) => {
    dispatch({
      type: "SET_SHOW_SNACKBAR",
      payload: { type, bool }
    });
  }

  const setShowEditForm = (bool=true) => {
    dispatch({
      type: "SET_SHOW_EDIT_FORM",
      payload: bool
    });
  }

  const setSubmitClicked = (bool=true) => {
    dispatch({
      type: "SET_SUBMIT_CLICKED",
      payload: bool,
    });
  }

  const setSnackbarMessage = (msg) => {
    dispatch({
      type: "SET_SNACKBAR_MESSAGE",
      payload: msg
    })
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
        getGroceryList,
        groceryList: state.groceryList,
        fetchRecipes,
        editRecipe,
        isEditingRecipe: state.isEditingRecipe,
        favoritedRecipes: state.favoritedRecipes,
        weeklyRecipes: state.weeklyRecipes,
        approvedRecipes: state.approvedRecipes,
        inboxRecipes: state.inboxRecipes,
        pendingRecipes: state.pendingRecipes,
        rejectedRecipes: state.rejectedRecipes,
        indexRecipes: state.indexRecipes,
        setIndexRecipes,
        persistentLogin,
        openRecipeId: state.openRecipeId,
        setOpenRecipeId,
        setShowSnackbar,
        showSuccessSnackbar: state.showSuccessSnackbar,
        showErrorSnackbar: state.showErrorSnackbar,
        showEditForm: state.showEditForm,
        setShowEditForm,
        submitClicked: state.submitClicked,
        setSubmitClicked,
        snackbarMessage: state.snackbarMessage,
        setSnackbarMessage

      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
