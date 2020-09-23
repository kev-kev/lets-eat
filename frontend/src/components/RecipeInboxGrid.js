import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import NewRecipeCard from './NewRecipeCard';
import { GlobalContext } from '../context/GlobalState';
import uuid from 'react-uuid'

const renderRecipeCard = (recipe, currentUser) => {
  if (recipe.submittedBy !== currentUser.username) {
    return (
      <Grid item xs key={recipe.name+uuid()} >
        <NewRecipeCard
          id={recipe.id}
          isRecipeVoteCard={true}
          name={recipe.name}
          imgUrl={recipe.imgUrl}
          link={recipe.link}
          submittedBy={recipe.submittedBy}
          notes={recipe.notes}
        />
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
      flexWrap="wrap"
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
      spacing={1}
      container>
        {renderRecipeGrid(recipes, user)}
    </Grid>
  );
}