const removeRecipeFromArr = (arr, recipeId) => {
  const recipeToDelete = arr.find(recipe => {
    return recipe.id === recipeId;
  })
  const index = arr.indexOf(recipeToDelete);
  return [
    ...arr.slice(0, index),
    ...arr.slice(index+1)
  ]
}

export const AppReducer = (state, action) => {
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
    case "FETCHING_RECIPES":
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
        default: 
          return {
            ...state
          };
      }
    case "EDITING_RECIPE":
      return {
        ...state,
        isEditingRecipe: true
      };
    case "EDIT_RECIPE_SUCCESS":
      if (action.payload.type === "weekly") {
        return {
          ...state,
          isEditingRecipe: false,
          weeklyRecipes: action.payload.updatedWeeklyRecipes,
        };
      } else {
        return {
          ...state,
          isEditingRecipe: false,
          approvedRecipes: action.payload.updatedApprovedRecipes,
          indexRecipes: action.payload.updatedIndexRecipes
        };
      }
    case "EDIT_RECIPE_FAILURE":
      return {
        ...state,
        isEditingRecipe: false,
        errors: {
          ...state.errors,
          grid: action.payload,
        },
      };
    case "STATUS_UPDATE_SUCCESS":
      const updatedRecipe = state.inboxRecipes.find(
        (recipe) => recipe.id === action.payload.recipeId
      );
      const indexToRemove = state.inboxRecipes.indexOf(updatedRecipe);
      const updatedInboxRecipes = [
          ...state.inboxRecipes.slice(0, indexToRemove),
          ...state.inboxRecipes.slice(indexToRemove + 1)
        ]
        // On approve/reject we remove from the inbox
      if (action.payload.recipe_status === "approved") {
        const updatedIndexRecipes = [
          ...state.indexRecipes,
          updatedRecipe,
        ].sort((a, b) => a.id - b.id);
        const updatedApprovedRecipes = [
          ...state.approvedRecipes,
          updatedRecipe,
        ].sort((a, b) => a.id - b.id);
        return {
          ...state,
          inboxRecipes: updatedInboxRecipes,
          indexRecipes: updatedIndexRecipes,
          approvedRecipes: updatedApprovedRecipes,
        };
      } else {
        const updatedRejectedRecipes = [
          ...state.rejectedRecipes,
           updatedRecipe
          ].sort((a, b) => b.id - a.id);
        return {
          ...state,
          inboxRecipes: updatedInboxRecipes,
          rejectedRecipes: updatedRejectedRecipes,
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

    case "WEEKS_UPDATE_SUCCESS": {
      let recipe, isInWeeklyRecipes, updatedWeeklyRecipes, updatedApprovedRecipes, updatedIndexRecipes;
      // Backend returned successful update with action.payload.recipeId
      // Find the recipe in state so we can use it
      // Is it in index?
      recipe = state.indexRecipes.find(recipe => recipe.id === action.payload.recipeId);
      if (!recipe) {
        // Look in weekly if it's not in index
        recipe = state.weeklyRecipes.find(recipe => recipe.id === action.payload.recipeId);
        if (recipe) {
          isInWeeklyRecipes = true;
        } else {
          console.error("RECIPE NOT FOUND IN INDEX OR WEEKLY");
        }
      } else {
        // We found it in the index recipes so it's not a weekly recipe
        isInWeeklyRecipes = false;
      }
      if (!isInWeeklyRecipes) {
        // Recipe got added to week
        updatedWeeklyRecipes = [
          ...state.weeklyRecipes,
          recipe,
        ].sort((a, b) => b.id - a.id);
        // Remove from approved recipes
        updatedApprovedRecipes = removeRecipeFromArr(state.approvedRecipes, recipe.id)
        // Remove from index recipes
        updatedIndexRecipes = removeRecipeFromArr(state.indexRecipes, recipe.id)
      } else {
        // Recipe got removed from week
        const indexToRemove = state.weeklyRecipes.indexOf(recipe);
        updatedWeeklyRecipes = [
          ...state.weeklyRecipes.slice(0, indexToRemove),
          ...state.weeklyRecipes.slice(indexToRemove + 1)
        ];
        // Add to approved recipes
        updatedApprovedRecipes = [
          ...state.approvedRecipes,
          recipe,
        ].sort((a, b) => b.id - a.id);
        // Add to index recipes
        updatedIndexRecipes = [
          ...state.indexRecipes,
          recipe,
        ].sort((a, b) => b.id - a.id);
      }
      return {
        ...state,
        approvedRecipes: updatedApprovedRecipes,
        weeklyRecipes: updatedWeeklyRecipes,
        indexRecipes: updatedIndexRecipes
      };
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
      if(action.payload.type === "pending"){
        return {
          ...state,
          pendingRecipes: removeRecipeFromArr(state.pendingRecipes, action.payload.recipeId),
        }
      } else if(action.payload.type === "index") {
        return {
          ...state,
          indexRecipes: removeRecipeFromArr(state.indexRecipes, action.payload.recipeId),
        } 
      }
      break;
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
    case "SET_OPEN_RECIPE_ID":
      return {
        ...state,
        openRecipeId: action.payload
      };
    case "SET_SHOW_SNACKBAR":
      if(action.payload.type === "error"){
        return {
          ...state,
          showErrorSnackbar: action.payload.bool
        }
      } else {
        return {
          ...state,
          showSuccessSnackbar: action.payload.bool,
        }
      };
    case "SET_SNACKBAR_MESSAGE": 
      return {
        ...state,
        snackbarMessage: action.payload
      }
    case "SET_SHOW_EDIT_FORM":
      return {
        ...state,
        showEditForm: action.payload
      };
    case "SET_SUBMIT_CLICKED":
      return {
        ...state,
        submitClicked: action.payload
      }
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
