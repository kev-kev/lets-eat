import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    // stuff
  },
  recipeCard: {
    width: "20rem",
    height: "25rem",
    margin: "2rem",
    "border-radius": "20px",
    "background-color": "#fff",
    "box-shadow": "0px 0px 20px #ddd",
    overflow: "hidden",
    transition: "box-shadow 0.5s",
  },
  recipeCardImg: {
    backgroundImage: "url('https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/vimdb/261128.jpg');",
    backgroundSize: "cover",
    height: "50%",
    width: "100%",
    opacity: "1",
    transform: "scale(1)",
    transition: "opacity 0.5s, transform 0.2s",
    "&:hover": {
      transform: "scale(1.1)"
    }
  },
  recipeCardBody: {
    width: "100%",
    height: "50%",
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
  },
  recipeCardLink: {
    height: "30%",
  },
  recipeCardFooter: {
    "justify-self": "flex-end",
    "align-self": "center",
    margin: "1.5rem 0"
  }
}));

export default function RecipeCard(props) {
const classes = useStyles();
return (
      <div className={classes.recipeCard}>
          <div className={classes.recipeCardImg} />
          <div className={classes.recipeCardBody} >
          <h2 className="recipe-card-title">
              strawberry, blueberry, & kiwi mini fruit tarts
          </h2>
          <Button variant="outlined" color="primary" disableElevation>
            visit recipe
          </Button>
          <div className={classes.recipeCardFooter}>
              submitted by: miranda
          </div>
          </div>
      </div>
  );
}