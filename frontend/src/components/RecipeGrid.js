import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import RecipeCard from './RecipeCard';
import { GlobalContext } from '../context/GlobalState';
import uuid from 'react-uuid'

// cards (or grids?) are overlapping when screen is a certain size
// want to put a margin on the grid/recipe card to test, but can only use styles in the export...


const renderRecipeCard = (recipe) => {
    return (
        <Grid item xs key={recipe.name+uuid()} >
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
      spacing={2}
      container>
        {renderRecipeGrid(recipes)}
    </Grid>
  );
}