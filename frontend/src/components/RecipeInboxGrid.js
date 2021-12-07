import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
// import RecipeVoteBody from "./RecipeVoteBody";
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
    console.log(recipe);
    return (
      <Grid item xs key={recipe.name + uuid()}>
        <RecipeCard
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
};

export default function RecipeGrid() {
  const { recipes, user } = useContext(GlobalContext);
  return (
    <Grid
      flexWrap="wrap"
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
