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

const renderRecipeCard = (recipes, recipe, classes) => {
    return (
        <Grid item xs={recipes.length / 12} key={recipe.name} >
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
        return renderRecipeCard(props.recipes, recipe, classes);
    });
}

export default function RecipeGrid(props) {
  const classes = useStyles();
  return (
    <Grid 
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
      spacing={3}
      container>
        {renderRecipeGrid(props, classes)}
    </Grid>
  );
}