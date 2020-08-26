import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import RecipeCard from './RecipeCard';
import { GlobalContext } from '../context/GlobalState';

const renderRecipeCard = (recipe, currentUser) => {
  if (recipe.submittedBy !== currentUser.username) {
    return (
      <Grid item xs key={recipe.name} >
        <RecipeCard
          id={recipe.id}
          isRecipeVoteCard={true}
          name={recipe.name}
          imgUrl={recipe.imgUrl}
          link={recipe.link}
          submittedBy={recipe.submittedBy} />
      </Grid>
    );
  }
}

const renderRecipeGrid = (recipes, currentUser) => {
  const pendingRecipes = recipes.filter(recipe => recipe.status === "pending")
  return pendingRecipes.map(recipe => {
      return renderRecipeCard(recipe, currentUser);
  });
}

export default function RecipeGrid() {
  const { recipes, user } = useContext(GlobalContext)
  return (
    <Grid 
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
      spacing={2}
      container>
        {renderRecipeGrid(recipes, user)}
    </Grid>
  );
}