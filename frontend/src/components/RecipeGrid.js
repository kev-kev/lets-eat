import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import uuid from "react-uuid";
import RecipeCard from "./RecipeCard";
import SearchBar from "./SearchBar";
import { format, add, sub } from "date-fns";
import { ChevronRightRounded, ChevronLeftRounded, MoodBadRounded } from "@material-ui/icons/";
import { IconButton, Grid, CircularProgress, Divider, Typography } from "@material-ui/core";
import { gridStyle } from "../muiStyling";
import GroceryListModal from "./GroceryListModal";

const RECIPES_PER_PAGE = 12;
const EMPTY_GRID_STR = {
  inbox: "Your inbox is empty...",
  favorites: "You haven't favorited any recipes yet...",
  rejected: "There's nothing here...",
  weekly: "No weekly recipes... Add some below!",
  index: "There's nothing here...",
  pending: "There's nothing here..."
}

const renderRecipeCards = (recipes, type, className) => {
  if (recipes.length === 0){
    return(
      <Typography variant="subtitle1" align="center" className={className} style={{width: "100%", color: "gray"}}>
        <MoodBadRounded color="primary"/> <br/>
        {EMPTY_GRID_STR[type]}
      </Typography>
    )
  }
  return recipes.map((recipe) => {
    return (
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        lg={3}
        xl={3}
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
      {renderRecipeCards(recipes, type, classes.emptyMessage)}
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
    } else {
      setShouldShowFwdBtn(false);
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

  const renderPageNav = () => {
    return (
      <div className={classes.pageNav}>
        <IconButton disabled={!shouldShowBackBtn} onClick={() => handlePageClick("back")}>
          <ChevronLeftRounded color={shouldShowBackBtn ? "primary" : "disabled"} />
        </IconButton>
        {page}
        <IconButton disabled={!shouldShowFwdBtn} onClick={() => handlePageClick("fwd")}>
          <ChevronRightRounded color={shouldShowFwdBtn ? "primary" : "disabled"} />
        </IconButton>
      </div>
    )
  }
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
            <Typography variant="h5" className={props.mobile ? classes.mobileTypography + ' ' + classes.sectionTitle : classes.sectionTitle}>
              <IconButton onClick={() => handleChangeWeek("back")}>
                <ChevronLeftRounded color="primary" />
              </IconButton>
              Week of: {format(selectedWeek, "LLL do")} -{" "}
              {format(add(selectedWeek, { days: 6 }), "LLL do")}
              <IconButton onClick={() => handleChangeWeek("fwd")}>
                <ChevronRightRounded color="primary" />
              </IconButton>
            </Typography>
            {renderGridContainer(weeklyRecipes, "weekly", classes)}
            {renderGroceryListModal()}
          </div>
          <Divider className={classes.divider} />
          <div className={classes.recipeGridSectionContainer}>
            <Typography variant="h5" className={classes.sectionTitle}>Other Recipes</Typography>
            <div className={classes.searchBar}><SearchBar /></div>
            {renderIndexRecipes()}
            {renderPageNav()}
          </div>
        </>
      );
    case "inbox":
      return (
        <>
          <Typography variant="h5" className={classes.sectionTitle}>Pending Recipes</Typography>
          <div className={classes.recipeGridSectionContainer}>
            {renderGridContainer(inboxRecipes, props.type, classes)}
          </div>
          <Divider className={classes.divider}/>
          <Typography variant="h5" className={classes.sectionTitle}>Your Submitted Recipes</Typography>
          <div className={classes.recipeGridSectionContainer}>
            {renderGridContainer(pendingRecipes, "pending", classes)}
          </div>
        </>
      );
    case "favorites":
      return (
        <div className={classes.recipeGridSectionContainer}>
          {renderGridContainer(indexRecipes.filter(recipe => recipe.isFavorited), props.type, classes)}
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
