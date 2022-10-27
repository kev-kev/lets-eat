import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Modal, Button, Typography } from "@material-ui/core";
import { ShoppingBasketRounded } from "@material-ui/icons/";
import pluralize from "pluralize";
import { modalStyle } from "../muiStyling";
import uuid from "react-uuid";


const GroceryListModal = () => {
  const classes = modalStyle();
  const { getGroceryList, groceryList, weeklyRecipes } = useContext(GlobalContext);
  const [shouldShowModal, setShouldShowModal] = useState(false);
  const [hasRecipeWithEmptyIngs, setHasRecipeWithEmptyIngs] = useState(false);

  const handleGetGroceryList = () => {
    getGroceryList();
    setShouldShowModal(true);
  };

  const renderAmountsList = (amounts) => {
    return amounts.map((amount) => {
      if (amount.unit && amount.count) {
        return (
          <span key={amount.unit + uuid()}>
            {amount.count} {pluralize(amount.unit, amount.count)}
          </span>
        )
      } else if (amount.count) {
        return (
          <span key={amount.count + uuid()}>
            {amount.count}
          </span>
        );  
      }
    });
  };

  const getWeeklyRecipeNames = () => {
    return weeklyRecipes.map((recipe) => {
      if(recipe.ingredients.length === 0 && !hasRecipeWithEmptyIngs) setHasRecipeWithEmptyIngs(true);
      return(
        <Typography key={recipe.id}>
         - {recipe.name}
        </Typography>
      ) 
    })
  }

  const renderGroceryListBody = () => {
    let res = [
      <React.Fragment key="your-recipes-title">
        <Typography variant="h6">
          Your recipes this week:
        </Typography>
        {getWeeklyRecipeNames()}
      </React.Fragment>
    ]
    
    if (groceryList) {  
      res.push(
      <Typography variant="h6" key="your-grocery-list-title">
        Your grocery list:
      </Typography>
      )
      Object.entries(groceryList).map(([name, amounts]) => {
        res.push(
          <Typography key={name + uuid()}>
            - {name}{amounts.some(amount => amount.count || (amount.count && amount.unit)) ? ": " : " " }{renderAmountsList(amounts)}
          </Typography>
        );
      });
      if(hasRecipeWithEmptyIngs){
        res.push(
          <Typography varaint="subtitle" key="ingredients-subtitle">
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
        onClick={() => handleGetGroceryList()}
        className={classes.button}
        style={{alignSelf: "flex-end"}}
        startIcon={<ShoppingBasketRounded />}
      >
        get grocery list
      </Button>
      <Modal
        open={shouldShowModal}
        onClose={() => setShouldShowModal(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.modalContent} mx="auto">
        <Typography variant="h3" className={classes.modalTitle}>Grocery List</Typography>
          <div id="simple-modal-description">{renderGroceryListBody()}</div>
        </div>
      </Modal>
    </>
  );
};

export default GroceryListModal;
