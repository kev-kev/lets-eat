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
        upcoming={recipe.upcoming}
      />
    </Grid>
  );
};

const renderRecipeGrid = (recipes) => {
  return recipes.map((recipe) => {
    return renderRecipeCard(recipe);
  });
};

export default function RecipeGrid() {
  const { user, recipes } = useContext(GlobalContext);
  // filter recipes into upcoming and non-upcoming
  const approvedRecipes = recipes.filter(
    (recipe) => recipe.status === "approved"
  );
  const upcoming = approvedRecipes.filter((recipe) => recipe.upcoming);
  const nonUpcoming = approvedRecipes.filter((recipe) => !recipe.upcoming);
  if (!user) {
    return <Redirect to="/login" />;
  } else
    return (
      <div>
        <h2>upcoming</h2>
        <Grid
          wrap="wrap"
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          spacing={1}
          container
        >
          {renderRecipeGrid(upcoming)}
        </Grid>
        <h2>not upcoming</h2>
        <Grid
          wrap="wrap"
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          spacing={1}
          container
        >
          {renderRecipeGrid(nonUpcoming)}
        </Grid>
      </div>
    );
}
