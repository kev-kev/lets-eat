import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import {
  Modal,
  Button,
  Typography,
} from "@material-ui/core";
import { DeleteForeverRounded, EditRounded, ArrowBackRounded } from "@material-ui/icons";
import { modalStyle } from "../muiStyling";
import { RecipeForm } from "./RecipeForm";

const renderIngredientTypography = (ingredients, classes) => {
  if(ingredients.length > 0){
    return ingredients.map((ing, i) => {
      return (
        <Typography key={i} variant="body2" className={classes.ingredientTypography}>
          - {ing.name}: {ing.count} {ing.unit}
       </Typography>
      );
    });
  } else {
    return (
      <Typography variant="body2" className={classes.ingredientTypography}>
        none, add some now
      </Typography>
    )
  }
};

const renderNotes = (notes, classes) => {
  if(notes?.trim().length === 0){
    return (
        "no notes have been added yet!"
    )
  } else {
    return notes;
  }
}

const CardModal = (props) => {
  const classes = modalStyle();
  const { openRecipeId, deleteRecipe } = useContext(GlobalContext);
  const [shouldShowDelete, setShouldShowDelete] = useState(false);
  const [shouldShowEdit, setShouldShowEdit] = useState(false);

  const renderCardModalBody = () => {
    if (shouldShowEdit) {
      return (
        <div key={props.recipe.id}>
          <RecipeForm recipe={props.recipe} modal/>
          <Button 
            onClick={() => setShouldShowEdit(false)}
            startIcon={<ArrowBackRounded className={classes.backArrow}/>}
          >
            Back
          </Button>
        </div>
      );
    } else if (shouldShowDelete) {
      return(
        <div className={classes.deleteContainer}>
          <Typography variant={"body1"} className={classes.deleteTypography}>Delete Recipe?</Typography>
          <Typography variant={"body2"} className={classes.deleteTypography}>Recipe will be deleted forever.</Typography>
            <div className={classes.deleteButtonContainer}>
              <Button
                className={classes.button}
                color="primary"
                variant="contained"
                autoFocus
                startIcon={<ArrowBackRounded className={classes.backArrow}/>}
                onClick={() => setShouldShowDelete(false)}
              >
                Nevermind...
              </Button>
              <Button
                className={classes.button}
                color="primary"
                variant="contained"
                onClick={() => {
                  deleteRecipe(props.recipe.id);
                  setShouldShowDelete(false);
                }}
                startIcon={<DeleteForeverRounded/>}
              >
                Delete Forever
              </Button>
            </div>
        </div>
      )
    } else {
      return (
        <div key={props.recipe.id}>
          <Typography variant="caption" className={classes.submittedBy}>
            Submitted by: {props.recipe.submittedBy}
          </Typography>
          <Typography variant="subtitle1">Ingredients:</Typography>
          <div className={classes.ingredientContainer}>
            {renderIngredientTypography(props.recipe.ingredients, classes)}
          </div>
          <Typography variant="subtitle1">Notes:</Typography>
          <Typography variant="body2" className={classes.noteTypography}>
            {renderNotes(props.recipe.notes, classes)}
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
        <div className={classes.buttonContainer}>
          <Button 
            onClick={() => setShouldShowEdit(true)}
            startIcon={<EditRounded />}
            variant={"contained"}
            className={classes.editButton + ' ' + classes.button}
          >
            Edit Recipe
          </Button>
        </div>
      );
  };

  const handleClose = () => {
    setShouldShowEdit(false);
    props.onClose();
  };

  const renderDeleteButton = () => {
    if (props.type === "index" && !props.recipe.isFavorited)
      return (
          <Button
            startIcon={<DeleteForeverRounded/>}
            onClick={() => setShouldShowDelete(true)}
            variant="outlined"
            color="primary"
            size="small"
          >
            Delete Recipe
          </Button>
      );
  };

  const getModalClass = () => {
    let res = classes.modalContent;
    if(shouldShowEdit) res += ` ${classes.modalFormContainer}`
    else if(shouldShowDelete) res += ` ${classes.deleteContainer}`
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
