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
      default:
        return state;
    }
  };