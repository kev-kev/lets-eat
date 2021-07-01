import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { makeStyles } from "@material-ui/core/styles";
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

const useStyles = makeStyles((theme) => ({
  root: {
    width: 225,
    position: "relative",
    margin: 10,
    overflow: "hidden",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  deleteRecipeIcon: {
    position: "absolute",
    top: "6px",
    right: "6px",
    "background-color": "white",
    "&:hover": {
      "background-color": "#eee",
    },
    width: "25px",
    height: "25px",
    "& svg": {
      "font-size": "1rem",
    },
    border: "2px solid pink",
  },
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();

  const { deleteRecipe, changeFavorite } = useContext(GlobalContext);

  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDeleteRecipe = (id) => {
    deleteRecipe(id);
  };

  const handleChangeFavorite = (id, value) => {
    changeFavorite(id, value);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const displayFavoriteOrBorder = () => {
    if (props.isFavorited) {
      return (
        <IconButton
          onClick={() => {
            handleChangeFavorite(props.id, false);
          }}
        >
          <FavoriteIcon color="primary" />
        </IconButton>
      );
    } else {
      return (
        <IconButton
          onClick={() => {
            handleChangeFavorite(props.id, true);
          }}
        >
          <FavoriteBorderIcon color="primary" />
        </IconButton>
      );
    }
  };

  const renderVoteBodyOrFooter = () => {
    if (props.isRecipeVoteCard) {
      return <RecipeVoteBody id={props.id} className={classes.voteBody} />;
    } else {
      return displayFavoriteOrBorder();
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderDeleteButton = () => {
    if (props.isRecipeVoteCard || props.isFavorited) {
      return;
    } else {
      return (
        <div>
          <IconButton
            className={classes.deleteRecipeIcon}
            onClick={handleClickOpen}
          >
            <CloseRoundedIcon color="primary" variant="outlined" />
          </IconButton>
          <Dialog open={open} onClose={handleClose}>
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
                onClick={handleClose}
              >
                Nevermind...
              </Button>
              <Button
                color="primary"
                variant="outlined"
                onClick={() => {
                  handleDeleteRecipe(props.id);
                  handleClose();
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
    <Card className={classes.root}>
      {renderDeleteButton()}
      <CardMedia
        className={classes.media}
        image={props.imgUrl}
        title={props.name}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="h2">
          {props.name}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        {renderVoteBodyOrFooter()}
        <IconButton href={props.link}>
          <OpenInNewRoundedIcon color="primary" />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon color="primary" />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="subtitle2">Notes:</Typography>
          <Typography variant="body2">{props.notes}</Typography>
          <br />
          <Typography variant="caption" className={classes.submittedBy}>
            submitted by: {props.submittedBy}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
