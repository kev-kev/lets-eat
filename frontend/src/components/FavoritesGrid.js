import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import { GlobalContext } from '../context/GlobalState';
import uuid from 'react-uuid';
import NewRecipeCard from './NewRecipeCard'

const renderRecipeCard = (recipe) => {
  return (
    <Grid item xs key={recipe.name+uuid()} >
      <NewRecipeCard
        id={recipe.id}
        isRecipeVoteCard={false}
        name={recipe.name}
        imgUrl={recipe.imgUrl}
        link={recipe.link}
        submittedBy={recipe.submittedBy}
        isFavorited={recipe.isFavorited} 
        notes={recipe.notes}
        />
    </Grid>
  );
}

const renderRecipeGrid = (recipes) => {
  const favoritedRecipes = recipes.filter(recipe => recipe.isFavorited)
  return favoritedRecipes.map(recipe => {
      return renderRecipeCard(recipe);
  });
}

export default function RecipeGrid() {
  const { recipes } = useContext(GlobalContext)
  return (
    <Grid 
      container
      wrap="wrap"
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
      spacing={1}
      >
        {renderRecipeGrid(recipes)}
    </Grid>
  );
}