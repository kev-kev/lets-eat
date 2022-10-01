import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Modal, Button, Typography } from "@material-ui/core";
import { ShoppingBasketRounded } from "@material-ui/icons/";
import pluralize from "pluralize";
import { modalStyle } from "../muiStyling";

const GroceryListModal = () => {
  const classes = modalStyle();
  const { getGroceryList, groceryList } = useContext(GlobalContext);
  const [shouldShowModal, setShouldShowModal] = useState(false);

  const handleGetGroceryList = () => {
    getGroceryList();
    setShouldShowModal(true);
  };

  const renderAmountsList = (amounts) => {
    return amounts.map((amount) => {
      return (
        <span key={amount.unit}>
          {amount.count} {pluralize(amount.unit, amount.count)}
        </span>
      );
    });
  };

  const renderGroceryListBody = () => {
    if (groceryList) {
      return Object.entries(groceryList).map(([name, amounts]) => {
        return (
          <div>
            {name}: {renderAmountsList(amounts)}
          </div>
        );
      });
    }
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
