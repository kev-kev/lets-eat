import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import uuid from "react-uuid";
import RecipeCard from "./RecipeCard";
import { Redirect } from "react-router-dom";
import { format, differenceInDays, parseISO, add, sub } from "date-fns";
import { any } from "underscore";
import ChevronRightRoundedIcon from "@material-ui/icons/ChevronRightRounded";
import ChevronLeftRoundedIcon from "@material-ui/icons/ChevronLeftRounded";
import { IconButton, Grid } from "@material-ui/core";

const populateRecipeGrid = (recipes, isVoteCard) => {
  return recipes.map((recipe) => {
    return (
      <Grid item xs key={recipe.name + uuid()}>
        <RecipeCard isVoteCard={isVoteCard} recipe={recipe} />
      </Grid>
    );
  });
};

const renderGridContainer = (recipes, isVoteCard) => {
  return (
    <Grid
      wrap="wrap"
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      spacing={1}
      container
    >
      {populateRecipeGrid(recipes, isVoteCard)}
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
  const { user, recipes, selectedWeek, changeSelectedWeek } =
    useContext(GlobalContext);
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

  const handleChangeWeek = (dir) => {
    dir === "back"
      ? changeSelectedWeek(sub(selectedWeek, { days: 7 }))
      : changeSelectedWeek(add(selectedWeek, { days: 7 }));
  };

  if (user) {
    if (props.type === "index") {
      return (
        <>
          <h2>
            Week of: {format(selectedWeek, "LLL do")} -{" "}
            {format(add(selectedWeek, { days: 6 }), "LLL do")}
          </h2>
          <IconButton onClick={() => handleChangeWeek("back")}>
            <ChevronLeftRoundedIcon color="primary" />
          </IconButton>
          <IconButton onClick={() => handleChangeWeek("fwd")}>
            <ChevronRightRoundedIcon color="primary" />
          </IconButton>
          {renderGridContainer(weeklyRecipes, false)}
          <h2>non-weekly recipes</h2>
          {renderGridContainer(otherRecipes, false)}
        </>
      );
    } else if (props.type === "inbox") {
      return <>{renderGridContainer(pendingRecipes, true)}</>;
    } else if (props.type === "favorites") {
      const favoritedRecipes = approvedRecipes.filter(
        (recipe) => recipe.isFavorited
      );
      return <>{renderGridContainer(favoritedRecipes, false)}</>;
    }
  } else return <Redirect to="/login" />;
}
