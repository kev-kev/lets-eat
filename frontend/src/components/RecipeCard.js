import React, { useContext, useState } from "react";
import { recipeCardMui } from "../muiStyling";
import Button from "@material-ui/core/Button";
import RecipeVoteBody from "./RecipeVoteBody";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import IconButton from "@material-ui/core/IconButton";
import { GlobalContext } from "../context/GlobalState";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function RecipeCard(props) {
  const { deleteRecipe, changeFavorite } = useContext(GlobalContext);
  const classes = recipeCardMui(props);
  const [open, setOpen] = useState(false);

  const displayFavoriteBtn = () => {
    return (
      <IconButton
        onClick={() => {
          changeFavorite(props.id, !props.isFavorited);
        }}
      >
        {props.isFavorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
    );
  };

  const renderVoteBodyOrFooter = () => {
    if (props.isRecipeVoteCard) {
      return <RecipeVoteBody id={props.id} />;
    } else {
      return (
        <div className={classes.recipeCardFooter}>
          {displayFavoriteBtn()}
          submitted by: {props.submittedBy}
        </div>
      );
    }
  };

  const renderDeleteButton = () => {
    if (!props.isRecipeVoteCard || !props.isFavorited) {
      return (
        <div>
          <IconButton
            className={classes.deleteRecipeIcon}
            onClick={setOpen(true)}
          >
            <CloseRoundedIcon color="primary" variant="outlined" />
          </IconButton>
          <Dialog open={open} onClose={setOpen(false)}>
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
                onClick={setOpen(false)}
              >
                Nevermind...
              </Button>
              <Button
                color="primary"
                variant="outlined"
                onClick={() => {
                  deleteRecipe(props.id);
                  setOpen(false);
                }}
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
  };

  return (
    <div className={classes.recipeCard}>
      <div className={classes.recipeCardImg} />
      {renderDeleteButton()}
      <div className={classes.recipeCardBody}>
        <h2 className={classes.recipeCardTitle}>{props.name}</h2>
        <Button
          variant="outlined"
          color="primary"
          className={classes.recipeCardLink}
          disableElevation
          href={props.link}
          target="_blank"
        >
          visit recipe
        </Button>
        {renderVoteBodyOrFooter()}
      </div>
    </div>
  );
}
