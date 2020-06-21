import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    // stuff
  },
  recipeCard: {
    width: "20rem",
    height: "25rem",
    "border-radius": "20px",
    "background-color": "#fff",
    "box-shadow": "0px 0px 20px #ddd",
    overflow: "hidden",
    transition: "box-shadow 0.5s",
  },
  recipeCardImg: props => ({
    backgroundImage: `url(${props.imgUrl});`,
    backgroundSize: "cover",
    height: "13rem",
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
    height: "12rem",
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
  }
}));

export default function RecipeCard(props) {
const classes = useStyles(props);
return (
      <div className={classes.recipeCard}>
          <div className={classes.recipeCardImg} />
          <div className={classes.recipeCardBody}>
          <h2 className={classes.recipeCardTitle}>
              {props.name}
          </h2>
          <Button variant="outlined" color="primary" className={classes.recipeCardLink} disableElevation href={props.link}>
            visit recipe
          </Button>
          <div className={classes.recipeCardFooter}>
              submitted by: {props.submittedBy}
          </div>
          </div>
      </div>
  );
}