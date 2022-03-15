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
import RecipeForm from "./RecipeForm";
import { RecipeFormNew } from "./RecipeFormNew";

const renderIngredientTypography = (ingredients) => {
  return ingredients.map((ing, i) => {
    return (
      <span key={i}>
        - {ing.name}: {ing.count} {ing.unit}
        <br />
      </span>
    );
  });
};

const CardModal = (props) => {
  const classes = modalStyle();
  const { deleteRecipe } = useContext(GlobalContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const renderCardModalBody = () => {
    if (isEditing) {
      return (
        <div key={props.recipe.id}>
          <RecipeFormNew recipe={props.recipe} />
          <Button onClick={() => setIsEditing(false)}>back</Button>
        </div>
      );
    } else {
      return (
        <div key={props.recipe.id}>
          <Typography variant="subtitle1">Ingredients:</Typography>
          <Typography variant="body2" style={{ whiteSpace: "pre-line" }}>
            {renderIngredientTypography(props.recipe.ingredients)}
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
        </div>
      );
    }
  };

  const renderEditBtn = () => {
    if (props.recipe.status === "approved")
      return (
        <IconButton onClick={() => setIsEditing(true)}>
          <EditRounded color="primary" />
        </IconButton>
      );
  };

  const handleClose = () => {
    setIsEditing(false);
    props.onClose();
  };

  const renderDeleteBtn = () => {
    if (props.type === "index" && !props.recipe.isFavorited)
      return (
        <div key={props.recipe.id}>
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
        </div>
      );
  };

  return (
    <Modal open={props.shouldShowModal} onClose={handleClose}>
      <div className={classes.modal} mx="auto">
        <h2>{props.recipe.name}</h2>
        {renderCardModalBody()}
      </div>
    </Modal>
  );
};

export default CardModal;
