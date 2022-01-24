import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Modal, Button } from "@material-ui/core";
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
        startIcon={<ShoppingBasketRounded />}
        style={{ fontWeight: "bolder" }}
      >
        get grocery list
      </Button>
      <Modal
        open={shouldShowModal}
        onClose={() => setShouldShowModal(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.modal} mx="auto">
          <h2 id="simple-modal-title">Grocery List</h2>
          <div id="simple-modal-description">{renderGroceryListBody()}</div>
        </div>
      </Modal>
    </>
  );
};

export default GroceryListModal;
