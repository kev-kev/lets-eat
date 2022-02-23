const findRecipeById = (recipes, id) => {
  return recipes.find((recipe) => recipe.id === id);
};

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
      switch (action.payload[0]) {
        case "weekly":
          return {
            ...state,
            weeklyRecipes: action.payload[1],
          };
        case "other":
          return {
            ...state,
            otherRecipes: action.payload[1],
          };
        case "favorited":
          return {
            ...state,
            favoritedRecipes: action.payload[1],
          };
        case "inbox":
          return {
            ...state,
            inboxRecipes: action.payload[1],
          };
        case "pending":
          return {
            ...state,
            pendingRecipes: action.payload[1],
          };
        case "rejected":
          return {
            ...state,
            rejectedRecipes: action.payload[1],
          };
      }
      break;
    case "EDIT_RECIPE_SUCCESS":
      return {
        ...state,
        approvedRecipes: action.payload.updatedRecipes,
      };
    case "EDIT_RECIPE_FAILURE":
      return {
        ...state,
        errors: {
          ...state.errors,
          grid: action.payload,
        },
      };
    case "STATUS_UPDATE_SUCCESS":
      return {
        ...state,
        recipes: action.payload,
      };
    case "STATUS_UPDATE_FAILURE":
      return {
        ...state,
        errors: {
          ...state.errors,
          grid: action.payload,
        },
      };
    case "FAVORITE_UPDATE_SUCCESS":
      updatedRecipe = findRecipeById(
        state.approvedRecipes,
        action.payload.recipe_id
      );
      updatedRecipe.isFavorited = action.payload.value;
      return {
        ...state,
        recipes: state.recipes,
      };
    case "FAVORITE_UPDATE_FAILURE":
      return {
        ...state,
        errors: {
          ...state.errors,
          grid: action.payload,
        },
      };
    case "WEEKS_UPDATE_SUCCESS":
      updatedRecipe = findRecipeById(state.recipes, action.payload.recipe_id);
      updatedRecipe.weeks = action.payload.value;
      return {
        ...state,
        recipes: state.recipes,
      };
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
        selectedWeek: action.payload,
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
