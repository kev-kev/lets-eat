import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import RecipeCard from './RecipeCard';
import { GlobalContext } from '../context/GlobalState';


const renderRecipeCard = (recipe) => {
    return (
        <Grid item xs={12} sm={6} md={3} xl={2} key={recipe.name} >
          <RecipeCard
            isRecipeVoteCard={true}
            name={recipe.name}
            imgUrl={recipe.img_url}
            link={recipe.link}
            submittedBy={recipe.submittedBy} />
        </Grid>
    );
}

const renderRecipeGrid = (recipes) => {
  const pendingRecipes = recipes.filter(recipe => recipe.status === "pending")
    return pendingRecipes.map(recipe => {
        return renderRecipeCard(recipe);
    });
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