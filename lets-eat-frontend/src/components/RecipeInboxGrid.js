import React from 'react';
import Grid from '@material-ui/core/Grid';
import RecipeCard from './RecipeCard';

const renderRecipeCard = (recipes, recipe) => {
    return (
        <Grid item xs={12} sm={6} md={3} xl={2} key={recipe.name} >
          <RecipeCard
            isRecipeVoteCard={true}
            name={recipe.name}
            imgUrl={recipe.imgUrl}
            link={recipe.link}
            submittedBy={recipe.submittedBy} />
        </Grid>
    );
}

const renderRecipeGrid = (props) => {
    return props.inbox.map(recipe => {
        return renderRecipeCard(props.recipes, recipe);
    });
}

export default function RecipeGrid(props) {
  return (
    <Grid 
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
      spacing={3}
      container>
        {renderRecipeGrid(props)}
    </Grid>
  );
}