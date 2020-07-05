import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import RecipeCard from './RecipeCard';
import { GlobalContext } from '../context/GlobalState';

const renderRecipeCard = (recipe) => {
    return (
        <Grid item xs={12} sm={6} md={3} xl={2} key={recipe.name} >
          <RecipeCard
            isRecipeVoteCard={false}
            name={recipe.name}
            imgUrl={recipe.imgUrl}
            link={recipe.link}
            submittedBy={recipe.submittedBy}
            id={recipe.id}
            />
        </Grid>
    );
}

const renderRecipeGrid = (recipes) => {
  const approvedRecipes = recipes.filter(recipe => recipe.status === "approved")
  return approvedRecipes.map(recipe => {
    return renderRecipeCard(recipe)
  })
}

export default function RecipeGrid() {
  const { recipes } = useContext(GlobalContext)
  return (
    <Grid 
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
      spacing={3}
      container>
        {renderRecipeGrid(recipes)}
    </Grid>
  );
}