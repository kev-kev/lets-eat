import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import RecipeCard from "./RecipeCard";
import { GlobalContext } from "../context/GlobalState";
import uuid from "react-uuid";

const renderRecipeGrid = (recipes, currentUser) => {
  const pendingRecipes = recipes.filter(
    (recipe) => recipe.status === "pending"
  );
  return pendingRecipes.map((recipe) => {
    return renderRecipeCard(recipe, currentUser);
  });
};

const renderRecipeCard = (recipe, currentUser) => {
  if (recipe.submittedBy !== currentUser.username) {
    return (
      <Grid item xs key={recipe.name + uuid()}>
        <RecipeCard recipe isRecipeVoteCard={true} />
      </Grid>
    );
  }
};

export default function RecipeGrid() {
  const { recipes, user } = useContext(GlobalContext);
  return (
    <Grid
      flexwrap="wrap"
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
      spacing={1}
      container
    >
      {renderRecipeGrid(recipes, user)}
    </Grid>
  );
}
