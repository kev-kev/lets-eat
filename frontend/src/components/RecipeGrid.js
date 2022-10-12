import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import uuid from "react-uuid";
import RecipeCard from "./RecipeCard";
import SearchBar from "./SearchBar";
import { format, add, sub } from "date-fns";
import { ChevronRightRounded, ChevronLeftRounded } from "@material-ui/icons/";
import { IconButton, Grid, CircularProgress, Divider } from "@material-ui/core";
import { gridStyle } from "../muiStyling";
import GroceryListModal from "./GroceryListModal";

const RECIPES_PER_PAGE = 20;

const renderRecipeCards = (recipes, type) => {
  return recipes.map((recipe) => {
    return (
      <Grid
        item
        xs={6}
        md={4}
        lg={3}
        xl={2}
        key={recipe.name + uuid()}
      >
        <RecipeCard type={type} recipe={recipe} />
      </Grid>
    );
  });
};

const renderGridContainer = (recipes, type, classes) => {
  return (
    <Grid
      container
      spacing={2}
      className={classes.gridContainer} 
    >
      {renderRecipeCards(recipes, type)}
    </Grid>
  );
};

export default function RecipeGrid(props) {
  const classes = gridStyle();
  const {
    weeklyRecipes,
    indexRecipes,
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
  const [shouldShowFwdBtn, setShouldShowFwdBtn] = useState(false);

  useEffect(() => {
    if (indexRecipes.length / RECIPES_PER_PAGE > 1) {
      setShouldShowFwdBtn(true);
    }
  }, [indexRecipes]);

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
    nextPage < indexRecipes.length / RECIPES_PER_PAGE
      ? setShouldShowFwdBtn(true)
      : setShouldShowFwdBtn(false);
  };

  const renderIndexRecipes = () => {
    const indexRecipePage = indexRecipes.slice(
      (page - 1) * RECIPES_PER_PAGE,
      page * RECIPES_PER_PAGE
    );
    return renderGridContainer(indexRecipePage, "index", classes);
  };

  const renderGroceryListModal = () => {
    if (weeklyRecipes.length > 0) return <GroceryListModal />;
  };

  if (isFetchingRecipes) {
    return(
    <div className={classes.loadingContainer}>
      <CircularProgress className={classes.loading} />;
    </div>
    )
  }

  //eslint-disable-next-line
  switch (props.type) {
    case "index":
      return (
        <>
          <div className={classes.recipeGridSectionContainer}>
            <h2 className={classes.sectionTitle}>
              <IconButton onClick={() => handleChangeWeek("back")}>
                <ChevronLeftRounded color="primary" />
              </IconButton>
              Week of: {format(selectedWeek, "LLL do")} -{" "}
              {format(add(selectedWeek, { days: 6 }), "LLL do")}
              <IconButton onClick={() => handleChangeWeek("fwd")}>
                <ChevronRightRounded color="primary" />
              </IconButton>
            </h2>
            {renderGridContainer(weeklyRecipes, "weekly", classes)}
            {renderGroceryListModal()}
          </div>
          <Divider className={classes.divider} />
          <div className={classes.recipeGridSectionContainer}>
            <h2 className={classes.sectionTitle}>Other Recipes</h2>
            <div className={classes.searchBar}><SearchBar /></div>
            {renderIndexRecipes()}
            <div className={classes.pageNav}>
              <IconButton classes={!shouldShowBackBtn ? {root: classes.hideVisibility} : {}} onClick={() => handlePageClick("back")}>
                <ChevronLeftRounded color="primary" />
              </IconButton>
              {page}
              <IconButton classes={!shouldShowFwdBtn ? {root: classes.hideVisibility} : {}} onClick={() => handlePageClick("fwd")}>
                <ChevronRightRounded color="primary" />
              </IconButton>
            </div>
          </div>
        </>
      );
    case "inbox":
      return (
        <>
          <h2 className={classes.sectionTitle}>Pending Recipes</h2>
          <div className={classes.recipeGridSectionContainer}>
            {renderGridContainer(inboxRecipes, props.type, classes)}
          </div>
          <Divider className={classes.divider}/>
          <h2 className={classes.sectionTitle}>Your Submitted Recipes</h2>
          <div className={classes.recipeGridSectionContainer}>
            {renderGridContainer(pendingRecipes, "pending", classes)}
          </div>
        </>
      );
    case "favorites":
      return (
        <div className={classes.recipeGridSectionContainer}>
          {renderGridContainer(favoritedRecipes, props.type, classes)}
        </div>
      )
    case "rejected":
      return (
        <div className={classes.recipeGridSectionContainer}>
          {renderGridContainer(rejectedRecipes, props.type, classes)}
        </div>
      )
  }
}
