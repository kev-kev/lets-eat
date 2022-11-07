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
    page,
    setPage
  } = useContext(GlobalContext);

  const [shouldShowBackBtn, setShouldShowBackBtn] = useState(false);
  const [shouldShowFwdBtn, setShouldShowFwdBtn] = useState(false);

  useEffect(() => {
    if (props.type === "index") {
      if (indexRecipes.length / RECIPES_PER_PAGE > 1) {
        setShouldShowFwdBtn(true);
      } else {
        setShouldShowFwdBtn(false);
      }  
    } else if(props.type === "favorite") {
      const favs = [...weeklyRecipes, ...indexRecipes].filter(recipe => recipe.isFavorited);
      if(favs.length / RECIPES_PER_PAGE >1) {
        setShouldShowFwdBtn(true);
      } else {
        setShouldShowFwdBtn(false)
      }
    }
  }, [indexRecipes, props.type]);

  useEffect(() => {
    if (props.type === "inbox") {
      if (pendingRecipes.length / RECIPES_PER_PAGE > 1) {
        setShouldShowFwdBtn(true);
      } else {
        setShouldShowFwdBtn(false);
      }  
    }
  }, [pendingRecipes, props.type]);

  useEffect(() => {
    if (props.type === "rejected") {
      if (rejectedRecipes.length / RECIPES_PER_PAGE > 1) {
        setShouldShowFwdBtn(true);
      } else {
        setShouldShowFwdBtn(false);
      }  
    }
  }, [rejectedRecipes, props.type]);

  useEffect(() => {
    setPage(1);
  }, []); // eslint-disable-line

  useEffect(() => {
    page === 1 && setShouldShowBackBtn(false);
  }, [page]);

  useEffect(() => {
    setPageNavBtns(page, indexRecipes)
  }, [indexRecipes])

  const handleChangeWeek = (dir) => {
    dir === "back"
      ? changeSelectedWeek(sub(selectedWeek, { days: 7 }))
      : changeSelectedWeek(add(selectedWeek, { days: 7 }));
  };

  const handlePageClick = (dir, recipes) => {
    let nextPage = page;
    dir === "back" ? (nextPage -= 1) : (nextPage += 1);
    setPage(nextPage);
    setPageNavBtns(nextPage, recipes);
  };

  const setPageNavBtns = (page, recipes) => {
    page > 1 ? setShouldShowBackBtn(true) : setShouldShowBackBtn(false);
    page < recipes.length / RECIPES_PER_PAGE
      ? setShouldShowFwdBtn(true)
      : setShouldShowFwdBtn(false);
  }

  const renderRecipes = (recipes, type) => {
    const recipePage = recipes.slice(
      (page - 1) * RECIPES_PER_PAGE,
      page * RECIPES_PER_PAGE
    );
    return renderGridContainer(recipePage, type, classes);
  };

  const renderGroceryListModal = () => {
    if (weeklyRecipes.length > 0) return <GroceryListModal />;
  };

  const renderPageNav = (recipes) => {
    if(recipes.length > RECIPES_PER_PAGE || recipes.length === RECIPES_PER_PAGE && page !== 1){
      return (
        <div className={classes.pageNav}>
          <IconButton disabled={!shouldShowBackBtn} onClick={() => handlePageClick("back", recipes)}>
            <ChevronLeftRounded color={shouldShowBackBtn ? "primary" : "disabled"} />
          </IconButton>
          {page}
          <IconButton disabled={!shouldShowFwdBtn} onClick={() => handlePageClick("fwd", recipes)}>
            <ChevronRightRounded color={shouldShowFwdBtn ? "primary" : "disabled"} />
          </IconButton>
        </div>
      )
    }
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
            <Typography variant="h5" className={classes.sectionTitle}>Recipe Collection</Typography>
            <div className={classes.searchBar}><SearchBar /></div>
            {renderRecipes(indexRecipes, "index")}
            {renderPageNav(indexRecipes)}
          </div>
        </>
      );
    case "inbox":
      return (
        <>
          <div className={classes.recipeGridSectionContainer}>
            {renderGridContainer(inboxRecipes, "inbox", classes)}
          </div>
          <Divider className={classes.divider}/>
          <Typography variant="h5" className={classes.sectionTitle}>Your Submitted Recipes</Typography>
          <div className={classes.recipeGridSectionContainer}>
            {renderRecipes(pendingRecipes, "pending")}
            {renderPageNav(pendingRecipes)}
          </div>
        </>
      );
    case "favorites":
      return (
        <div className={classes.recipeGridSectionContainer}>
          {renderRecipes([...weeklyRecipes, ...indexRecipes].filter(recipe => recipe.isFavorited), "favorites")}
          {renderPageNav([...weeklyRecipes, ...indexRecipes].filter(recipe => recipe.isFavorited))}
        </div>
      )
    case "rejected":
      return (
        <div className={classes.recipeGridSectionContainer}>
          {renderRecipes(rejectedRecipes, "rejected")}
          {renderPageNav(rejectedRecipes)}
        </div>
      )
  }
}
