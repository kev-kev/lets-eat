import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import { GlobalContext } from "../context/GlobalState";
import uuid from "react-uuid";
import RecipeCard from "./RecipeCard";
import { Redirect } from "react-router-dom";
import { format, differenceInDays, parseISO } from "date-fns";
import { any } from "underscore";

const populateRecipeGrid = (recipes) => {
  return recipes.map((recipe) => {
    return (
      <Grid item xs key={recipe.name + uuid()}>
        <RecipeCard isRecipeVoteCard={false} recipe={recipe} />
      </Grid>
    );
  });
};

const renderGridContainer = (recipes) => {
  return (
    <Grid
      wrap="wrap"
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      spacing={1}
      container
    >
      {populateRecipeGrid(recipes)}
    </Grid>
  );
};

export const isWeeklyRecipe = (recipeWeeks, selectedWeek) => {
  return any(
    recipeWeeks.map((week) => {
      return differenceInDays(parseISO(week), selectedWeek) === 0;
    })
  );
};

export default function RecipeGrid(props) {
  const { user, recipes, selectedWeek } = useContext(GlobalContext);
  const approvedRecipes = [];
  const pendingRecipes = [];
  const rejectedRecipes = [];

  recipes.forEach((recipe) => {
    if (recipe.status === "approved") approvedRecipes.push(recipe);
    else if (
      recipe.status === "pending" &&
      recipe.submittedBy !== user.username
    )
      pendingRecipes.push(recipe);
    else if (recipe.status === "rejected") rejectedRecipes.push(recipe);
  });

  const weeklyRecipes = approvedRecipes.filter((recipe) => {
    return isWeeklyRecipe(recipe.weeks, selectedWeek);
  });

  const otherRecipes = approvedRecipes.filter((recipe) => {
    return !isWeeklyRecipe(recipe.weeks, selectedWeek);
  });

  if (user) {
    if (props.type === "index") {
      return (
        <>
          <h2>Week of: {format(selectedWeek, "LLL do")}</h2>
          {renderGridContainer(weeklyRecipes)}
          <h2>non-weekly recipes</h2>
          {renderGridContainer(otherRecipes)}
        </>
      );
    } else if (props.type === "inbox") {
    }
  } else return <Redirect to="/login" />;
}
