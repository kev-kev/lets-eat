import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import RecipeVoteBody from "./RecipeVoteBody";
import { isWeeklyRecipe } from "./RecipeGrid";
import { recipeCardStyle } from "../muiStyling";
import {
  Favorite,
  FavoriteBorder,
  CloseRounded,
  OpenInNewRounded,
  AddRounded,
  DeleteForeverRounded,
  MoreHoriz,
} from "@material-ui/icons/";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Modal,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
} from "@material-ui/core";
import { differenceInDays, formatISO, parseISO } from "date-fns";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

export default function RecipeCard(props) {
  const classes = recipeCardStyle();

  const { deleteRecipe, toggleFavorite, setWeeks, selectedWeek } =
    useContext(GlobalContext);

  // const [expanded, setExpanded] = useState(false);
  const [shouldShowModal, setShouldShowModal] = useState(false);
  const [open, setOpen] = useState(false);

  const renderIndexCardBody = () => {
    return (
      <IconButton
        onClick={() => {
          toggleFavorite(props.recipe.id, !props.recipe.isFavorited);
        }}
      >
        {props.recipe.isFavorited ? (
          <Favorite color="primary" />
        ) : (
          <FavoriteBorder color="primary" />
        )}
      </IconButton>
    );
  };

  const renderVoteBodyOrFooter = () => {
    if (props.type === "inbox") {
      return (
        <RecipeVoteBody id={props.recipe.id} className={classes.voteBody} />
      );
    } else {
      return renderIndexCardBody();
    }
  };

  const addOrRemoveWeek = (weeks, selectedWeek) => {
    // Use function to set weekly recipes in the GlobalState
    if (isWeeklyRecipe(weeks, selectedWeek)) {
      return weeks.filter((week) => {
        return differenceInDays(parseISO(week), selectedWeek) !== 0;
      });
    } else {
      return weeks.concat([formatISO(selectedWeek)]);
    }
  };

  const renderAddOrRemoveBtn = () => {
    if (props.type === "index")
      return (
        <IconButton
          className={classes.addOrRemoveBtn}
          onClick={() => {
            setWeeks(
              props.recipe.id,
              addOrRemoveWeek(props.recipe.weeks, selectedWeek)
            );
          }}
        >
          {isWeeklyRecipe(props.recipe.weeks, selectedWeek) ? (
            <CloseRounded color="primary" />
          ) : (
            <AddRounded color="primary" />
          )}
        </IconButton>
      );
  };

  const renderDeleteBtn = () => {
    if (props.type === "inbox" && !props.recipe.isFavorited)
      return (
        <>
          <IconButton onClick={() => setOpen(true)}>
            <DeleteForeverRounded color="primary" />
          </IconButton>
          <Dialog open={open} onClose={() => setOpen(false)}>
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
                onClick={() => setOpen(false)}
              >
                nevermind...
              </Button>
              <Button
                color="primary"
                variant="outlined"
                onClick={() => {
                  deleteRecipe(props.recipe.id);
                  setOpen(false);
                }}
              >
                delete
              </Button>
            </DialogActions>
          </Dialog>
        </>
      );
  };

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

  return (
    <Card className={classes.root}>
      {renderAddOrRemoveBtn()}
      <CardMedia
        className={classes.media}
        image={props.recipe.imgUrl}
        title={props.recipe.name}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="h2">
          {props.recipe.name}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        {renderVoteBodyOrFooter()}
        <IconButton href={props.recipe.link}>
          <OpenInNewRounded color="primary" />
        </IconButton>
        <IconButton
          onClick={() => setShouldShowModal(true)}
          aria-label="show more"
        >
          <MoreHoriz color="primary" />
        </IconButton>
        <Modal
          open={shouldShowModal}
          onClose={() => setShouldShowModal(false)}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div style={modalStyle} className={classes.modal} mx="auto">
            <h2 id="simple-modal-title">{props.recipe.name}</h2>
            <div id="simple-modal-description">{renderCardModalBody()}</div>
          </div>
        </Modal>
      </CardActions>
    </Card>
  );
}
