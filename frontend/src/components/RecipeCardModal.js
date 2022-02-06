import React, { useContext, useEffect, useState } from "react";
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
import { DeleteForeverRounded, EditRounded } from "@material-ui/icons";
import { modalStyle } from "../muiStyling";
import NewRecipeForm from "./NewRecipeForm";

const CardModal = (props) => {
  const classes = modalStyle();
  const { deleteRecipe } = useContext(GlobalContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const renderCardModalBody = () => {
    if (isEditing) {
      return (
        <>
          <NewRecipeForm recipe={props.recipe} />
          <Button onClick={() => setIsEditing(false)}>back</Button>
        </>
      );
    } else {
      return (
        <>
          <Typography variant="subtitle1">Ingredients:</Typography>
          <Typography variant="body2" style={{ whiteSpace: "pre-line" }}>
            {renderIngredientTypography()}
          </Typography>
          <Typography variant="subtitle1">Notes:</Typography>
          <Typography variant="body2" style={{ whiteSpace: "pre-line" }}>
            {props.recipe.notes}
          </Typography>
          <br />
          <Typography variant="caption">
            submitted by: {props.recipe.submittedBy}
          </Typography>
          {renderEditBtn()}
          {renderDeleteBtn()}
        </>
      );
    }
  };

  const renderIngredientTypography = () => {
    return props.recipe.ingredients.map((ing) => {
      return (
        <>
          {ing.name}: {ing.count} {ing.unit}
        </>
      );
    });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const renderEditBtn = () => {
    if (props.recipe.status === "approved")
      return (
        <>
          <IconButton onClick={handleEditClick}>
            <EditRounded color="primary" />
          </IconButton>
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
        {renderCardModalBody()}
      </div>
    </Modal>
  );
};

export default CardModal;
