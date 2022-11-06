import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Modal, Button, Typography } from "@material-ui/core";
import { ShoppingBasketRounded } from "@material-ui/icons/";
import pluralize from "pluralize";
import { modalStyle } from "../muiStyling";
import uuid from "react-uuid";

const renderAmountsList = (amounts) => {
  return amounts.map((amount) => {
    if (amount.unit && amount.count) {
      return (
        `${amount.count} ${pluralize(amount.unit, amount.count)}`
      )
    } else if (amount.count) {
      return (
          amount.count
      );
    } else {
      return "";
    }
  });
};

const GroceryListModal = () => {
  const classes = modalStyle();
  const { 
    getGroceryList,
    groceryList,
    weeklyRecipes,
    isFetchingGroceryList,
   } = useContext(GlobalContext);
  const [shouldShowModal, setShouldShowModal] = useState(false);
  const [hasRecipeWithEmptyIngs, setHasRecipeWithEmptyIngs] = useState(false);

  const handleGetGroceryListClick = () => {
    const hasEmpty = weeklyRecipes.some((recipe) => {
      return recipe.ingredients.length === 0;
    });
    if(hasEmpty){
      setHasRecipeWithEmptyIngs(true);
    } else {
      setHasRecipeWithEmptyIngs(false);
    }
    getGroceryList();
    setShouldShowModal(true);
  };

  const getWeeklyRecipeNames = () => {
    return weeklyRecipes.map((recipe) => {
      return(
        <Typography key={recipe.id}>
         - {recipe.name[0].toUpperCase() + recipe.name.slice(1)}
        </Typography>
      ) 
    })
  }

  const getGroceryListIngredientsMarkup = (groceryList) => {
    const groceryListItems = Object.entries(groceryList);
    return (
      <div className={classes.groceryListBodyItems}>
      {groceryListItems.map(([name, amounts]) => (
        <Typography key={name + uuid()}>
          -{name[0].toUpperCase() + name.slice(1)}{amounts.some(amount => amount.count || (amount.count && amount.unit))?": ":" "}
            {renderAmountsList(amounts)}
        </Typography>))
      }
      </div>
    );
  }

  const renderGroceryListBody = () => {
    let res = [
      <React.Fragment key="your-recipes-title">
        <Typography variant="h6">
          Your recipes this week:
        </Typography>
        <div className={classes.groceryListBodyItems}>
          {getWeeklyRecipeNames()}
        </div>
      </React.Fragment>
    ]
    
    if (groceryList) {
      const hasNoIngredients = weeklyRecipes.every(recipe => recipe.ingredients.length === 0)
      if(!hasNoIngredients){
        res.push(
          <Typography variant="h6" key="your-grocery-list-title">
            Your grocery list:
          </Typography>
        )
      }
      res.push(getGroceryListIngredientsMarkup(groceryList));
      if(hasRecipeWithEmptyIngs){
        res.push(
          <Typography variant="caption" key="ingredients-subtitle" className={classes.emptyIngNotice}>
            You have one or more recipes without any ingredients listed, so this list may be incomplete!
          </Typography>
        )
      }
    } else {
      res.push(
        <Typography key="ingredients-empty">
          Your haven't added any ingredients to your weekly recipes yet...
        </Typography>
      )
    }
    return res;
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleGetGroceryListClick()}
        className={classes.button}
        style={{alignSelf: "flex-end"}}
        startIcon={<ShoppingBasketRounded />}
        disabled={isFetchingGroceryList}
      >
        {isFetchingGroceryList ? "getting..." : "get grocery list"}
      </Button>
      {!isFetchingGroceryList &&
        <Modal
          open={shouldShowModal}
          onClose={() => setShouldShowModal(false)}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className={classes.modalContent} mx="auto">
          <Typography variant="h3" className={classes.modalTitle}>Grocery List</Typography>
          {renderGroceryListBody()}
          </div>
        </Modal>
      }
    </>
  );
};

export default GroceryListModal;
