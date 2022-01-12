import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import uuid from "react-uuid";
import RecipeCard from "./RecipeCard";
import { Redirect } from "react-router-dom";
import { format, differenceInDays, parseISO, add, sub } from "date-fns";
import { any } from "underscore";
import ChevronRightRoundedIcon from "@material-ui/icons/ChevronRightRounded";
import ChevronLeftRoundedIcon from "@material-ui/icons/ChevronLeftRounded";
import { IconButton, Grid } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { gridMui } from "../muiStyling";
import Modal from "@material-ui/core/Modal";

const RECIPES_PER_PAGE = 20;
const populateRecipeGrid = (recipes, type) => {
  return recipes.map((recipe) => {
    return (
      <Grid item xs key={recipe.name + uuid()}>
        <RecipeCard type={type} recipe={recipe} />
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
      {populateRecipeGrid(recipes, type)}
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

const getModalStyle = () => {
  return {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
};

export default function RecipeGrid(props) {
  const classes = gridMui();
  const {
    user,
    recipes,
    selectedWeek,
    changeSelectedWeek,
    isLoading,
    groceryList,
    getGroceryList,
  } = useContext(GlobalContext);

  const [page, setPage] = useState(1);
  const [shouldShowBackBtn, setShouldShowBackBtn] = useState(false);
  const [shouldShowFwdBtn, setShouldShowFwdBtn] = useState(true);
  const [shouldShowModal, setShouldShowModal] = useState(false);
  const approvedRecipes = [];
  const pendingRecipes = [];
  const rejectedRecipes = [];
  const favoritedRecipes = [];

  recipes.forEach((recipe) => {
    if (recipe.status === "approved") {
      approvedRecipes.push(recipe);
      if (recipe.isFavorited) favoritedRecipes.push(recipe);
    } else if (
      recipe.status === "pending" &&
      recipe.submittedBy !== user.username
    )
      pendingRecipes.push(recipe);
    else if (recipe.status === "rejected") rejectedRecipes.push(recipe);
  });

  approvedRecipes.filter((recipe) => recipe.isFavorited);

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

    nextPage <= recipes.length / RECIPES_PER_PAGE
      ? setShouldShowFwdBtn(true)
      : setShouldShowFwdBtn(false);
  };

  const handleGetGroceryList = () => {
    getGroceryList();
    setShouldShowModal(true);
  };

  const renderAmountsList = (amounts) => {
    return amounts.map((amount) => {
      return (
        <>
          <span>
            {amount.count} {amount.unit}
          </span>{" "}
        </>
      );
    });
  };

  const renderGroceryList = () => {
    if (groceryList) {
      return Object.entries(groceryList).map(([name, amounts]) => {
        return (
          <div>
            {name}: {renderAmountsList(amounts)}
          </div>
        );
      });
    }
  };

  if (!user) return <Redirect to="/login" />;

  if (isLoading) {
    return <CircularProgress className={classes.loading} />;
  } else {
    if (props.type === "index") {
      return (
        <>
          <h2>
            <IconButton onClick={() => handleChangeWeek("back")}>
              <ChevronLeftRoundedIcon color="primary" />
            </IconButton>
            Week of: {format(selectedWeek, "LLL do")} -{" "}
            {format(add(selectedWeek, { days: 6 }), "LLL do")}
            <IconButton onClick={() => handleChangeWeek("fwd")}>
              <ChevronRightRoundedIcon color="primary" />
            </IconButton>
          </h2>
          {weeklyRecipes.length > 0 && (
            <>
              <button onClick={() => handleGetGroceryList()}>
                Get Grocery List
              </button>
              <Modal
                open={shouldShowModal}
                onClose={() => setShouldShowModal(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
              >
                <div
                  style={getModalStyle()}
                  className={classes.modal}
                  mx="auto"
                >
                  <h2 id="simple-modal-title">Grocery List</h2>
                  <div id="simple-modal-description">{renderGroceryList()}</div>
                </div>
              </Modal>
            </>
          )}
          {renderGridContainer(weeklyRecipes, props.type)}
          <h2>non-weekly recipes</h2>
          {renderGridContainer(otherRecipes, props.type)}
          <div className={classes.pageNav}>
            {shouldShowBackBtn && (
              <IconButton onClick={() => handlePageClick("back")}>
                <ChevronLeftRoundedIcon color="primary" />
              </IconButton>
            )}
            {page}
            {shouldShowFwdBtn && (
              <IconButton onClick={() => handlePageClick("fwd")}>
                <ChevronRightRoundedIcon color="primary" />
              </IconButton>
            )}
          </div>
        </>
      );
    } else {
      if (props.type === "inbox")
        return <>{renderGridContainer(pendingRecipes, props.type)}</>;
      if (props.type === "favorites")
        return <>{renderGridContainer(favoritedRecipes, props.type)}</>;
    }
  }
}
