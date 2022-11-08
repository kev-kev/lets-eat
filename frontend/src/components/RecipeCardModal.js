import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import {
  Modal,
  Button,
  Typography,
  Fade,
  Backdrop
} from "@material-ui/core";
import { DeleteForeverRounded, EditRounded, ArrowBackRounded } from "@material-ui/icons";
import { modalStyle } from "../muiStyling";
import { RecipeForm } from "./RecipeForm";
import pluralize from "pluralize";

const renderIngredientTypography = (ingredients, classes) => {
  if(ingredients.length > 0){
    return ingredients.map((ing, i) => {
      return (
        <Typography key={i} className={classes.ingredientTypography}>
          - {ing.name[0].toUpperCase() + ing.name.slice(1)}{ing.count || (ing.count && ing.unit) ? ":" : ""} {ing.count} {(ing.unit && ing.count) && pluralize(ing.unit, ing.count)}
       </Typography>
      );
    });
  } else {
    return (
      <Typography className={classes.ingredientTypography} style={{ fontStyle: 'italic' }} variant="body2">
        none, add some by editing this recipe
      </Typography>
    )
  }
};

const CardModal = (props) => {
  const classes = modalStyle();
  const { openRecipeId, deleteRecipe, setOpenRecipeId, showEditForm, setShowEditForm, user } = useContext(GlobalContext);
  const [showDelete, setShowDelete] = useState(false);

  const renderCardModalBody = () => {
    if (showEditForm) {
      return (
        <div key={props.recipe.id}>
          <RecipeForm recipe={props.recipe}/>
          <Button 
            onClick={() => setShowEditForm(false)}
            startIcon={<ArrowBackRounded className={classes.backArrow}/>}
          >
            Back
          </Button>
        </div>
      );
    } else if (showDelete) {
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
                onClick={() => setShowDelete(false)}
              >
                Nevermind...
              </Button>
              <Button
                className={classes.button}
                color="primary"
                variant="contained"
                onClick={() => {
                  deleteRecipe(props.recipe.id, props.type);
                  setShowDelete(false);
                  setOpenRecipeId(null);
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
          <Typography variant="h6">Ingredients:</Typography>
          <div className={classes.ingredientContainer}>
            {renderIngredientTypography(props.recipe.ingredients, classes)}
          </div>
          <Typography variant="h6">Notes:</Typography>
          {renderNotes(props.recipe.notes)}
          <div className={classes.submittedBy}>
            <Typography variant="caption" className={classes.submittedByTypography}>
              Submitted by: {props.recipe.submittedBy}
            </Typography>
          </div>
          {renderEditButton()}
          {renderDeleteButton()}
        </div>
      );
    }
  };

  const renderNotes = (notes) => {
    if(notes?.trim().length === 0){
      return (
        <Typography className={classes.noteTypography} style={{ fontStyle: "italic" }} variant="body2">none</Typography>
      );
    } else {
      return(
        <Typography className={classes.noteTypography}>{notes}</Typography>
      ); 
    }
  }

  const renderEditButton = () => {
    debugger
    if (props.recipe.status === "approved" || props.recipe.submittedBy === user.username){
      return (
        <div className={classes.buttonContainer}>
          <Button 
            onClick={() => setShowEditForm()}
            startIcon={<EditRounded />}
            variant={"contained"}
            className={classes.editButton + ' ' + classes.button}
          >
            Edit Recipe
          </Button>
        </div>
      );
    }
  };

  const handleClose = () => {
    setOpenRecipeId(null);
    setShowEditForm(false);
  };

  const renderDeleteButton = () => {
    if ((props.type === "index" && !props.recipe.isFavorited) || (props.type === "pending" && props.recipe.submittedBy === user.username))
      return (
        <Button
          startIcon={<DeleteForeverRounded/>}
          onClick={() => setShowDelete(true)}
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
    if(showEditForm) res += ` ${classes.modalFormContainer}`
    else if(showDelete) res += ` ${classes.deleteContainer}`
    return res;
  }
  return (
    <Modal 
      open={props.recipe.id === openRecipeId} 
      onClose={handleClose} 
      aria-labelledby="modal-title"
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.recipe.id === openRecipeId}>
        <div className={getModalClass()}>
          <Typography variant="h5" id="modal-title" className={classes.modalTitle}>{props.recipe.name}</Typography>
          {renderCardModalBody()}
        </div>
      </Fade>
    </Modal>
  );
};

export default CardModal;
