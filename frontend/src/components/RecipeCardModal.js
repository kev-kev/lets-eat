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
import { DeleteForeverRounded, EditRounded, ArrowBackRounded } from "@material-ui/icons";
import { modalStyle } from "../muiStyling";
import { RecipeFormNew } from "./RecipeFormNew";

const renderIngredientTypography = (ingredients) => {
  return ingredients.map((ing, i) => {
    return (
      <div key={i}>
        - {ing.name}: {ing.count} {ing.unit}
      </div>
    );
  });
};

const CardModal = (props) => {
  const classes = modalStyle();
  const { openRecipeId, deleteRecipe } = useContext(GlobalContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [shouldShowEditForm, setShouldShowEditForm] = useState(false);

  const renderCardModalBody = () => {
    if (shouldShowEditForm) {
      return (
        <div key={props.recipe.id}>
          <RecipeFormNew recipe={props.recipe} modal/>
          <Button 
            onClick={() => setShouldShowEditForm(false)}
            startIcon={<ArrowBackRounded color="primary.light" className={classes.backArrow}/>}
          >
            Back
          </Button>
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
            Submitted by: {props.recipe.submittedBy}
          </Typography>
          {renderEditButton()}
          {renderDeleteButton()}
        </div>
      );
    }
  };

  const renderEditButton = () => {
    if (props.recipe.status === "approved")
      return (
        <IconButton onClick={() => setShouldShowEditForm(true)}>
          <EditRounded color="primary" />
        </IconButton>
      );
  };

  const handleClose = () => {
    setShouldShowEditForm(false);
    props.onClose();
  };

  const renderDeleteButton = () => {
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
                Recipe will be deleted forever.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                color="primary"
                variant="outlined"
                autoFocus
                onClick={() => setIsDialogOpen(false)}
              >
                Nevermind...
              </Button>
              <Button
                color="primary"
                variant="outlined"
                onClick={() => {
                  deleteRecipe(props.recipe.id);
                  setIsDialogOpen(false);
                }}
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
  };

  const getModalClass = () => {
    let res = classes.modalContent;
    if(shouldShowEditForm) res += ` ${classes.modalForm}`
    return res;
  }
  return (
    <Modal 
      open={props.recipe.id === openRecipeId} 
      onClose={handleClose} 
      aria-labelledby="modal-title"
    >
      <div className={getModalClass()}>
        <h2 id="modal-title" className={classes.modalTitle}>{props.recipe.name}</h2>
        {renderCardModalBody()}
      </div>
    </Modal>
  );
};

export default CardModal;
