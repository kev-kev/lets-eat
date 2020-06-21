import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import RecipeCard from './RecipeCard';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const renderRecipeCard = (recipe, classes) => {
    return (
        <Grid item xs key={recipe} >
          <RecipeCard
            name={recipe.name}
            imgUrl={recipe.imgUrl}
            link={recipe.link}
            submittedBy={recipe.submittedBy} />
        </Grid>
    );
}

const renderRecipeGrid = (props, classes) => {
    return props.recipes.map(recipe => {
        return renderRecipeCard(recipe, classes);
    });
}

export default function RecipeGrid(props) {
  const classes = useStyles();
  return (
    <Grid container spacing={3}>
        {renderRecipeGrid(props, classes)}
    </Grid>
  );
}