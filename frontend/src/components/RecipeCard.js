import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import RecipeVoteBody from "./RecipeVoteBody";
import RecipeCardModal from "./RecipeCardModal";
import { isWeeklyRecipe } from "./RecipeGrid";
import { recipeCardStyle } from "../muiStyling";
import {
  Favorite,
  FavoriteBorder,
  CloseRounded,
  OpenInNewRounded,
  AddRounded,
  MoreHoriz,
} from "@material-ui/icons/";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
} from "@material-ui/core";
import { differenceInDays, formatISO, parseISO } from "date-fns";

export default function RecipeCard(props) {
  const classes = recipeCardStyle();

  const { toggleFavorite, setWeeks, selectedWeek } = useContext(GlobalContext);

  const [shouldShowModal, setShouldShowModal] = useState(false);

  useEffect(() => {
    console.log(shouldShowModal);
  }, [shouldShowModal]);

  const renderIndexCardBody = () => {
    return (
      <IconButton
        onClick={() => {
          toggleFavorite(props.recipe.id, !props.recipe.isFavorited);
        }}
      >
        {props.recipe.isFavorited ? (
          <Favorite color="primary" />
        ) : (
          <FavoriteBorder color="primary" />
        )}
      </IconButton>
    );
  };

  const renderVoteBodyOrFooter = () => {
    if (props.type === "inbox") {
      return (
        <RecipeVoteBody id={props.recipe.id} className={classes.voteBody} />
      );
    } else {
      return renderIndexCardBody();
    }
  };

  const addOrRemoveWeek = (weeks, selectedWeek) => {
    if (isWeeklyRecipe(weeks, selectedWeek)) {
      return weeks.filter((week) => {
        return differenceInDays(parseISO(week), selectedWeek) !== 0;
      });
    } else {
      return weeks.concat([formatISO(selectedWeek)]);
    }
  };

  const renderAddOrRemoveBtn = () => {
    if (props.type === "index")
      return (
        <IconButton
          className={classes.addOrRemoveBtn}
          onClick={() => {
            setWeeks(
              props.recipe.id,
              addOrRemoveWeek(props.recipe.weeks, selectedWeek)
            );
          }}
        >
          {isWeeklyRecipe(props.recipe.weeks, selectedWeek) ? (
            <CloseRounded color="primary" />
          ) : (
            <AddRounded color="primary" />
          )}
        </IconButton>
      );
  };

  return (
    <>
      <Card className={classes.root} onClick={() => setShouldShowModal(true)}>
        {renderAddOrRemoveBtn()}
        <CardMedia
          className={classes.media}
          image={props.recipe.imgUrl}
          title={props.recipe.name}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="h2">
            {props.recipe.name}
          </Typography>
        </CardContent>
        <CardActions disableSpacing className={classes.cardActions}>
          {renderVoteBodyOrFooter()}
          <IconButton href={props.recipe.link}>
            <OpenInNewRounded color="primary" />
          </IconButton>
          <IconButton
            onClick={() => setShouldShowModal(true)}
            aria-label="show more"
          >
            <MoreHoriz color="primary" />
          </IconButton>
        </CardActions>
      </Card>
      <RecipeCardModal
        recipe={props.recipe}
        type={props.type}
        shouldShowModal={shouldShowModal}
        onClose={() => {
          console.log("onClose called!");
          setShouldShowModal(false);
        }}
      />
    </>
  );
}
