import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import { GlobalContext } from "../context/GlobalState";
import uuid from "react-uuid";
import RecipeCard from "./RecipeCard";
import { Redirect } from "react-router-dom";
import { format, differenceInDays, parseISO } from "date-fns";
import { any, all } from "underscore";

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
        isUpcoming={recipe.isUpcoming}
        ingredients={recipe.ingredients}
        weeks={recipe.weeks}
      />
    </Grid>
  );
};

const renderRecipeGrid = (recipes) => {
  return recipes.map((recipe) => {
    return renderRecipeCard(recipe);
  });
};

export const isWeeklyRecipe = (recipeWeeks, selectedWeek) => {
  return any(
    recipeWeeks.map((week) => {
      return differenceInDays(parseISO(week), selectedWeek) === 0;
    })
  );
};

export default function RecipeGrid() {
  const { user, recipes, selectedWeek } = useContext(GlobalContext);
  // filter recipes into upcoming and non-upcoming
  const approvedRecipes = recipes.filter(
    (recipe) => recipe.status === "approved"
  );

  const weeklyRecipes = approvedRecipes.filter((recipe) => {
    return isWeeklyRecipe(recipe.weeks, selectedWeek);
  });

  const otherRecipes = approvedRecipes.filter((recipe) => {
    return !isWeeklyRecipe(recipe.weeks, selectedWeek);
  });

  if (!user) {
    return <Redirect to="/login" />;
  } else
    return (
      <>
        <h2>Week of: {format(selectedWeek, "LLL do")}</h2>
        <Grid
          wrap="wrap"
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          spacing={1}
          container
        >
          {renderRecipeGrid(weeklyRecipes)}
        </Grid>
        <h2>non-weekly recipes</h2>
        <Grid
          wrap="wrap"
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          spacing={1}
          container
        >
          {renderRecipeGrid(otherRecipes)}
        </Grid>
      </>
    );
}
