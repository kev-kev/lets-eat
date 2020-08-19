export default (state, action) => {
    switch (action.type) {
      case "LOGIN_USER":
          return {
            ...state,
            isLoggingIn: true
          }
      case "LOGIN_SUCCESS":
        return {
          ...state,
          isLoggingIn: false,
          user: action.payload.user
        };
      case "LOGIN_FAILURE":
        return {
          ...state,
          errors: {
            ...state.errors,
            login: action.payload
          },
          isLoggingIn: false,
        };
      case "SUBMITTING_RECIPE":
        return {
          ...state,
          isSubmittingRecipe: true
        };
      case "SUBMIT_RECIPE_SUCCESS":
        return {
          ...state,
          recipes: action.payload,
          isSubmittingRecipe: false
        };
      case "SUBMIT_RECIPE_FAILURE":
        return {
          ...state,
          errors: {
            ...state.errors,
            submit: action.payload
          },
          isSubmittingRecipe: false
        };
      case "FETCH_RECIPES":
        return {
          ...state,
          isFetchingRecipes: true
        };
      case "FETCH_RECIPES_SUCCESS":
        return {
          ...state,
          recipes: action.payload,
          isFetchingRecipes: false
        };
      case "FETCH_RECIPES_FAILURE":
        return {
          ...state,
          errors: {
            ...state.errors,
            grid: action.payload
          },
          isFetchingRecipes: false
        };
      case "STATUS_UPDATE_SUCCESS":
        return {
          ...state,
          recipes: action.payload
        };
      case "STATUS_UPDATE_FAILURE":
        return {
          ...state,
          errors: {
            ...state.errors,
            grid: action.payload
          }
        };
      case "FAVORITE_UPDATE_SUCCESS":
        return {
          ...state,
          recipes: action.payload
        };
      case "FAVORITE_UPDATE_FAILURE":
        return {
          ...state,
          errors: {
            ...state.errors,
            grid: action.payload
          }
        }
      case "DELETE_RECIPE_SUCCESS":
        return {
          ...state,
          recipes: action.payload
        };
      case "DELETE_RECIPE_FAILURE":
        return {
          ...state,
          errors: {
            ...state.errors,
            grid: action.payload
          }
        };
      case "LOGOUT_USER": 
        return {
          ...state,
          user: null
        };
      case "CLEAR_ERRORS":
        return {
          ...state,
          errors: {
            login: null,
            submit: null,
            grid: null,
            inbox: null
          }
        };
      default:
        return state;
    }
  };