import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { recipeCardMui } from "../muiStyling";
import clsx from "clsx";
import RecipeVoteBody from "./RecipeVoteBody";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import OpenInNewRoundedIcon from "@material-ui/icons/OpenInNewRounded";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import { isWeeklyRecipe } from "./RecipeGrid";
import { differenceInDays, formatISO, parseISO } from "date-fns";

export default function RecipeCard(props) {
  const classes = recipeCardMui();

  const { deleteRecipe, toggleFavorite, setWeeks, selectedWeek } =
    useContext(GlobalContext);

  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);

  const renderIndexCardBody = () => {
    return (
      <IconButton
        onClick={() => {
          toggleFavorite(props.recipe.id, !props.recipe.isFavorited);
        }}
      >
        {props.recipe.isFavorited ? (
          <FavoriteIcon color="primary" />
        ) : (
          <FavoriteBorderIcon color="primary" />
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
            <CloseRoundedIcon color="primary" />
          ) : (
            <AddRoundedIcon color="primary" />
          )}
        </IconButton>
      );
  };

  const renderDeleteBtn = () => {
    if (props.type === "inbox" && !props.recipe.isFavorited)
      return (
        <>
          <IconButton onClick={() => setOpen(true)}>
            <DeleteForeverRoundedIcon color="primary" />
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
          <OpenInNewRoundedIcon color="primary" />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon color="primary" />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="subtitle2">Ingredients:</Typography>
          <Typography variant="body2" style={{ whiteSpace: "pre-line" }}>
            {props.recipe.ingredients}
          </Typography>
          <Typography variant="subtitle2">Notes:</Typography>
          <Typography variant="body2" style={{ whiteSpace: "pre-line" }}>
            {props.recipe.notes}
          </Typography>
          <br />
          <Typography variant="caption" className={classes.submittedBy}>
            submitted by: {props.recipe.submittedBy}
          </Typography>
          {renderDeleteBtn()}
        </CardContent>
      </Collapse>
    </Card>
  );
}
