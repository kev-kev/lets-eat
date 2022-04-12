export const AppReducer = (state, action) => {
  let updatedRecipe;
  switch (action.type) {
    case "LOGIN_USER":
      return {
        ...state,
        isLoggingIn: true,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoggingIn: false,
        user: action.payload.user,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        errors: {
          ...state.errors,
          login: action.payload,
        },
        isLoggingIn: false,
      };
    case "SUBMITTING_RECIPE":
      return {
        ...state,
        isSubmittingRecipe: true,
      };
    case "SUBMIT_RECIPE_SUCCESS":
      return {
        ...state,
        pendingRecipes: [...state.pendingRecipes, action.payload],
        isSubmittingRecipe: false,
      };
    case "SUBMIT_RECIPE_FAILURE":
      return {
        ...state,
        errors: {
          ...state.errors,
          submit: action.payload,
        },
        isSubmittingRecipe: false,
      };
    case "FETCH_RECIPES":
      return {
        ...state,
        isFetchingRecipes: true,
      };
    case "FETCH_RECIPES_SUCCESS":
      return {
        ...state,
        isFetchingRecipes: false,
      };
    case "FETCH_RECIPES_FAILURE":
      return {
        ...state,
        errors: {
          ...state.errors,
          grid: action.payload,
        },
        isFetchingRecipes: false,
      };
    case "SET_RECIPES":
      //eslint-disable-next-line
      const sortedRecipes = action.payload[1].sort((a, b) => b.id - a.id);
      switch (action.payload[0]) {
        case "weekly":
          return {
            ...state,
            weeklyRecipes: sortedRecipes,
          };
        case "approved":
          return {
            ...state,
            approvedRecipes: sortedRecipes,
          };
        case "index":
          return {
            ...state,
            indexRecipes: sortedRecipes,
          };
        case "favorited":
          return {
            ...state,
            favoritedRecipes: sortedRecipes,
          };
        case "inbox":
          return {
            ...state,
            inboxRecipes: sortedRecipes,
          };
        case "pending":
          return {
            ...state,
            pendingRecipes: sortedRecipes,
          };
        case "rejected":
          return {
            ...state,
            rejectedRecipes: sortedRecipes,
          };
      }
      break;
    case "EDIT_RECIPE_SUCCESS":
      if (action.payload.type === "weekly") {
        return {
          ...state,
          weeklyRecipes: action.payload.updatedRecipes,
        };
      } else {
        return {
          ...state,
          approvedRecipes: action.payload.updatedRecipes,
        };
      }
    case "EDIT_RECIPE_FAILURE":
      return {
        ...state,
        errors: {
          ...state.errors,
          grid: action.payload,
        },
      };
    case "STATUS_UPDATE_SUCCESS":
      updatedRecipe = state.inboxRecipes.find(
        (recipe) => recipe.id === action.payload.recipe_id
      );
      const indexToRemove = state.inboxRecipes.indexOf(updatedRecipe);
      state.inboxRecipes.splice(indexToRemove, 1);
      const updatedapprovedRecipes = [
        ...state.approvedRecipes,
        updatedRecipe,
      ].sort((a, b) => a.id - b.id);
      if (action.payload === "approved") {
        return {
          ...state,
          approvedRecipes: updatedapprovedRecipes,
        };
      } else {
        return {
          ...state,
          rejectedRecipes: [...state.rejectedRecipes, updatedRecipe],
        };
      }

    case "STATUS_UPDATE_FAILURE":
      return {
        ...state,
        errors: {
          ...state.errors,
          grid: action.payload,
        },
      };
    case "WEEKS_UPDATE_SUCCESS":
      updatedRecipe = state.approvedRecipes.find(
        (recipe) => recipe.id === action.payload.recipe_id
      );
      if (updatedRecipe) {
        updatedRecipe.weeks = action.payload.weeks;
        const indexToRemove = state.indexRecipes.indexOf(updatedRecipe);
        state.indexRecipes.splice(indexToRemove, 1);
        const updatedWeeklyRecipes = [
          ...state.weeklyRecipes,
          updatedRecipe,
        ].sort((a, b) => b.id - a.id);
        return {
          ...state,
          weeklyRecipes: updatedWeeklyRecipes,
        };
      } else {
        updatedRecipe = state.weeklyRecipes.find(
          (recipe) => recipe.id === action.payload.recipe_id
        );
        updatedRecipe.weeks = action.payload.weeks;
        const indexToRemove = state.weeklyRecipes.indexOf(updatedRecipe);
        state.weeklyRecipes.splice(indexToRemove, 1);
        const updatedIndexRecipes = [...state.indexRecipes, updatedRecipe].sort(
          (a, b) => b.id - a.id
        );
        return {
          ...state,
          indexRecipes: updatedIndexRecipes,
        };
      }
    case "WEEKS_UPDATE_FAILURE":
      return {
        ...state,
        errors: {
          ...state.errors,
          grid: action.payload,
        },
      };
    case "DELETE_RECIPE_SUCCESS":
      return {
        ...state,
        approvedRecipes: action.payload,
      };
    case "DELETE_RECIPE_FAILURE":
      return {
        ...state,
        errors: {
          ...state.errors,
          grid: action.payload,
        },
      };
    case "CHANGE_SELECTED_WEEK":
      return {
        ...state,
        selectedWeek: action.payload.week,
        weeklyRecipes: action.payload.newWeeklyRecipes,
        indexRecipes: action.payload.newApprovedRecipes,
      };
    case "GET_GROCERY_LIST_SUCCESS":
      return {
        ...state,
        groceryList: action.payload,
      };
    case "GET_GROCERY_LIST_FAILURE":
      return {
        ...state,
        errors: {
          ...state.errors,
          grid: action.payload,
        },
      };
    case "LOGOUT_USER":
      localStorage.clear();
      return {
        ...state,
        user: null,
      };
    case "CLEAR_ERRORS":
      return {
        ...state,
        errors: {
          login: null,
          submit: null,
          grid: null,
          inbox: null,
        },
      };
    default:
      return state;
  }
};
