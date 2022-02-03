import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import uuid from "react-uuid";
import RecipeCard from "./RecipeCard";
import { format, add, sub, differenceInDays, parseISO } from "date-fns";
import { ChevronRightRounded, ChevronLeftRounded } from "@material-ui/icons/";
import { IconButton, Grid, CircularProgress } from "@material-ui/core";
import { gridStyle } from "../muiStyling";
import GroceryListModal from "./GroceryListModal";

const RECIPES_PER_PAGE = 20;

const renderRecipeCards = (recipes, type) => {
  return recipes.map((recipe) => {
    return (
      <Grid item xs key={recipe.name + uuid()}>
        <RecipeCard
          type={type}
          recipe={recipe}
          isWeeklyRecipe={isWeeklyRecipe}
        />
      </Grid>
    );
  });
};

const renderGridContainer = (recipes, type) => {
  return (
    <Grid
      wrap="wrap"
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      spacing={1}
      container
    >
      {renderRecipeCards(recipes, type)}
    </Grid>
  );
};

const isWeeklyRecipe = (recipeWeeks, selectedWeek) => {
  return recipeWeeks.some(
    (week) => differenceInDays(parseISO(week), selectedWeek) === 0
  );
};

export default function RecipeGrid(props) {
  const classes = gridStyle();
  const {
    approvedRecipes,
    inboxRecipes,
    pendingRecipes,
    rejectedRecipes,
    favoritedRecipes,
    selectedWeek,
    changeSelectedWeek,
    isFetchingRecipes,
  } = useContext(GlobalContext);

  const [page, setPage] = useState(1);
  const [shouldShowBackBtn, setShouldShowBackBtn] = useState(false);
  const [shouldShowFwdBtn, setShouldShowFwdBtn] = useState(true);

  const weeklyRecipes = approvedRecipes.filter((recipe) => {
    return isWeeklyRecipe(recipe.weeks, selectedWeek);
  });

  const otherRecipes = approvedRecipes
    .filter((recipe) => {
      return !isWeeklyRecipe(recipe.weeks, selectedWeek);
    })
    .slice((page - 1) * RECIPES_PER_PAGE, page * RECIPES_PER_PAGE);

  const handleChangeWeek = (dir) => {
    dir === "back"
      ? changeSelectedWeek(sub(selectedWeek, { days: 7 }))
      : changeSelectedWeek(add(selectedWeek, { days: 7 }));
  };

  const handlePageClick = (dir) => {
    let nextPage = page;
    dir === "back" ? (nextPage -= 1) : (nextPage += 1);
    setPage(nextPage);
    nextPage > 1 ? setShouldShowBackBtn(true) : setShouldShowBackBtn(false);
    nextPage <= otherRecipes.length / RECIPES_PER_PAGE
      ? setShouldShowFwdBtn(true)
      : setShouldShowFwdBtn(false);
  };

  const renderGroceryListModal = () => {
    if (weeklyRecipes.length > 0) {
      return <GroceryListModal />;
    }
  };

  if (isFetchingRecipes) {
    return <CircularProgress className={classes.loading} />;
  } else {
    if (props.type === "index") {
      return (
        <>
          <h2>
            <IconButton onClick={() => handleChangeWeek("back")}>
              <ChevronLeftRounded color="primary" />
            </IconButton>
            Week of: {format(selectedWeek, "LLL do")} -{" "}
            {format(add(selectedWeek, { days: 6 }), "LLL do")}
            <IconButton onClick={() => handleChangeWeek("fwd")}>
              <ChevronRightRounded color="primary" />
            </IconButton>
          </h2>
          {renderGridContainer(weeklyRecipes, props.type)}
          {renderGroceryListModal()}
          <h2>non-weekly recipes</h2>
          {renderGridContainer(otherRecipes, props.type)}
          <div className={classes.pageNav}>
            {shouldShowBackBtn && (
              <IconButton onClick={() => handlePageClick("back")}>
                <ChevronLeftRounded color="primary" />
              </IconButton>
            )}
            {page}
            {shouldShowFwdBtn && (
              <IconButton onClick={() => handlePageClick("fwd")}>
                <ChevronRightRounded color="primary" />
              </IconButton>
            )}
          </div>
        </>
      );
    } else {
      if (props.type === "inbox")
        return (
          <>
            {renderGridContainer(inboxRecipes, "inbox")}
            <h2>pending recipes</h2>
            {renderGridContainer(pendingRecipes, "pending")}
          </>
        );
      else if (props.type === "favorites")
        return renderGridContainer(favoritedRecipes, props.type);
      else if (props.type === "rejected")
        return renderGridContainer(rejectedRecipes, "rejected");
    }
  }
}
