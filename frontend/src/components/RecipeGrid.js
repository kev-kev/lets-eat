import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import { GlobalContext } from "../context/GlobalState";
import uuid from "react-uuid";
import RecipeCard from "./RecipeCard";
import { Redirect } from "react-router-dom";

const renderRecipeCard = (recipe) => {
  return (
    <Grid item xs key={recipe.name + uuid()}>
      <RecipeCard
        isRecipeVoteCard={false}
        name={recipe.name}
        imgUrl={recipe.imgUrl}
        link={recipe.link}
        submittedBy={recipe.submittedBy}
        id={recipe.id}
        isFavorited={recipe.isFavorited}
        notes={recipe.notes}
      />
    </Grid>
  );
};

const renderRecipeGrid = (recipes) => {
  const approvedRecipes = recipes.filter(
    (recipe) => recipe.status === "approved"
  );
  return approvedRecipes.map((recipe) => {
    return renderRecipeCard(recipe);
  });
};

export default function RecipeGrid() {
  const { user, recipes } = useContext(GlobalContext);
  if (!user) {
    return <Redirect to="/login" />;
  } else
    return (
      <Grid
        wrap="wrap"
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        spacing={1}
        container
      >
        {renderRecipeGrid(recipes)}
      </Grid>
    );
}
