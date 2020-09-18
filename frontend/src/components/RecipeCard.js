import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import RecipeVoteBody from './RecipeVoteBody';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import IconButton from '@material-ui/core/IconButton';
import { GlobalContext } from "../context/GlobalState";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Collapse from '@material-ui/core/Collapse'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded'
import { Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  recipeCard: {
    width: "275px",
    height: "350px",
    "border-radius": "20px",
    "background-color": "#fff",
    "box-shadow": "0px 0px 20px #eee",
    overflow: "hidden",
    transition: "box-shadow 0.5s",
    position: "relative",
  },
  recipeCardImg: props => ({
    backgroundImage: `url(${props.imgUrl});`,
    backgroundSize: "cover",
    height: "150px",
    width: "100%",
    opacity: "1",
    transform: "scale(1)",
    transition: "opacity 0.5s, transform 0.2s",
    "&:hover": {
      transform: "scale(1.1)"
    }
  }),
  recipeCardBody: {
    width: "100%",
    height: "200px",
    padding: "5%",
    display: "flex",
    "flex-direction": "column",
    "justify-content": "space-around",
    "font-family": "'Muli', sans-serif",
  },
  recipeCardTitle: {
    "justify-self": "flex-start",
    "text-align": "left",
    "font-size": "20px",
    "font-family": "'Ovo', serif",
    height: "6rem"
  },
  recipeCardLink: {
    height: "4rem",
  },
  recipeCardFooter: {
    "justify-self": "flex-end",
    "align-self": "center",
    margin: "1.5rem 0",
    height: "2rem"
  },
  deleteRecipeIcon: {
    position: "absolute",
    top: "6px",
    right: "6px",
    "background-color": "white",
    "&:hover": {
      "background-color": "#eee"
    },
    width: "32px",
    height: "32px",
    "& svg": {
      "font-size": "1rem"
    },
    border: '2px solid pink'
  }
}));

export default function RecipeCard(props) {
  const classes = useStyles(props);
  const { deleteRecipe, changeFavorite } = useContext(GlobalContext)
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }
  
  const handleClose= () => {
    setOpen(false)
  }
  
  const handleDeleteRecipe = (id) => {
    deleteRecipe(id)
  }

  const handleChangeFavorite = (id, value) => {
    changeFavorite(id, value)
  }

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const renderFavoriteOrBorder = () => {
    if (props.isFavorited) {
      return (
        <IconButton onClick={() => {handleChangeFavorite(props.id, false)}}>
          <FavoriteIcon/>
        </IconButton>
      )
    } else {
      return (
        <IconButton onClick={() => {handleChangeFavorite(props.id, true)}}>
          <FavoriteBorderIcon/>
        </IconButton>
      )   
    }
  }

  const renderVoteBodyOrFooter = () => {
    if (props.isRecipeVoteCard) {
      return <RecipeVoteBody id={props.id} />
    } else {
      return (
      <div className={classes.recipeCardFooter}>
        {renderFavoriteOrBorder()}
        submitted by: {props.submittedBy}
      </div>
      )
    }
  }

  const renderCollapse = () => {
    if (props.notes) { 
      return (
        <div>
          <IconButton onClick={handleExpandClick}
          >
            <ExpandMoreRoundedIcon />
          </IconButton>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Notes:</Typography>
              <Typography paragraph>{props.notes}</Typography>
            </CardContent>
          </Collapse>
        </div>
      )
    }
  }



  const renderDeleteButton = () => {
    if (props.isRecipeVoteCard || props.isFavorited) {
      return
    } else {
      return (
        <div>
          <IconButton className={classes.deleteRecipeIcon} onClick={handleClickOpen}>
            <CloseRoundedIcon color="primary" variant="outlined"/>
          </IconButton>
          <Dialog
            open={open}
            onClose={handleClose}
            >
            <DialogTitle>{"Delete Recipe?"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Recipe will be deleted forever.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button color="primary" variant="outlined" autoFocus onClick={handleClose}>
                Nevermind...
              </Button>
              <Button color="primary" variant="outlined" onClick={() => {
                handleDeleteRecipe(props.id)
                handleClose()
              }}>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )
    }
  }

  return (
    <Card className={classes.recipeCard}>
        <div className={classes.recipeCardImg} />
        {renderDeleteButton()}
        <div className={classes.recipeCardBody}>
        <h2 className={classes.recipeCardTitle}>
            {props.name}
        </h2>
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
        {renderCollapse()}
        </div>
      </Card>
  );
}