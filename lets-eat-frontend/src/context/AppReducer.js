export default (state, action) => {
    switch (action.type) {
      case "LOGIN_USER":
          return {
              ...state,
              isLoggingIn: true,
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
      case "SUBMIT_RECIPE_SUCCESS":
        return {
          ...state,
          recipes: action.payload
        };
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
      default:
        return state;
    }
  };