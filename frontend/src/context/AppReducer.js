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
      case "LOGIN_FAILED":
        return {
          ...state,
          isLoggingIn: false,
          error: action.payload.error
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
          error: action.payload,
          isSubmittingRecipe: false
        }
      case "FETCH_RECIPES_SUCCESS":
        return {
          ...state,
          recipes: action.payload
        };
      case "STATUS_UPDATE_SUCCESS":
        return {
          ...state,
          recipes: action.payload
        }
      case "DELETE_RECIPE_SUCCESS":
        return {
          ...state,
          recipes: action.payload
        }
      case "LOGOUT_USER": 
        return {
          ...state,
          user: null
        }
      default:
        return state;
    }
  };