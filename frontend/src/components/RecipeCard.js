import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import RecipeVoteBody from './RecipeVoteBody';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import IconButton from '@material-ui/core/IconButton';
import { GlobalContext } from "../context/GlobalState";


const useStyles = makeStyles((theme) => ({
  recipeCard: {
    width: "275px",
    height: "350px",
    "border-radius": "20px",
    "background-color": "#fff",
    "box-shadow": "0px 0px 20px #eee",
    overflow: "hidden",
    transition: "box-shadow 0.5s",
    position: "relative"
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
    "font-family": "'Muli', sans-serif"
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
    width: "30px",
    height: "30px",
    "& svg": {
      "font-size": "1rem"
    }
  }
}));

export default function RecipeCard(props) {
  const { deleteRecipe } = useContext(GlobalContext)
  const classes = useStyles(props);
  const handleDeleteRecipe = (id) => {
    deleteRecipe(id)
  }
  return (
    <div className={classes.recipeCard}>
        <div className={classes.recipeCardImg} />
        <IconButton className={classes.deleteRecipeIcon}>
            <CloseRoundedIcon
              color="primary"
              onClick={() => handleDeleteRecipe(props.id)}/>
          </IconButton>
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
        {props.isRecipeVoteCard ?
          <RecipeVoteBody id={props.id} /> :
          (<div className={classes.recipeCardFooter}>
                submitted by: {props.submittedBy}
            </div>)
        }
        </div>
      </div>
  );
}