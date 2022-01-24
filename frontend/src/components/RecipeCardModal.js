import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import {
  Modal,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  Typography,
  IconButton,
} from "@material-ui/core";
import { DeleteForeverRounded } from "@material-ui/icons";
import { modalStyle } from "../muiStyling";

const CardModal = (props) => {
  const classes = modalStyle();
  const { deleteRecipe } = useContext(GlobalContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const renderCardModalBody = () => {
    return (
      <>
        <Typography variant="subtitle2">Ingredients:</Typography>
        <Typography variant="body2" style={{ whiteSpace: "pre-line" }}>
          {props.recipe.ingredients}
        </Typography>
        <Typography variant="subtitle2">Notes:</Typography>
        <Typography variant="body2" style={{ whiteSpace: "pre-line" }}>
          {props.recipe.notes}
        </Typography>
        <br />
        <Typography variant="caption">
          submitted by: {props.recipe.submittedBy}
        </Typography>
        {renderDeleteBtn()}
      </>
    );
  };

  const renderDeleteBtn = () => {
    if (props.type === "index" && !props.recipe.isFavorited)
      return (
        <>
          <IconButton onClick={() => setIsDialogOpen(true)}>
            <DeleteForeverRounded color="primary" />
          </IconButton>
          <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
            <DialogTitle>{"Delete Recipe?"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                recipe will be deleted forever.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                color="primary"
                variant="outlined"
                autoFocus
                onClick={() => setIsDialogOpen(false)}
              >
                nevermind...
              </Button>
              <Button
                color="primary"
                variant="outlined"
                onClick={() => {
                  deleteRecipe(props.recipe.id);
                  setIsDialogOpen(false);
                }}
              >
                delete
              </Button>
            </DialogActions>
          </Dialog>
        </>
      );
  };
  return (
    <Modal open={props.shouldShowModal} onClose={props.onClose}>
      <div className={classes.modal} mx="auto">
        <h2>{props.recipe.name}</h2>
        <div>{renderCardModalBody()}</div>
      </div>
    </Modal>
  );
};

export default CardModal;
