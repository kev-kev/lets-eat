import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import RecipeVoteBody from "./RecipeVoteBody";
import RecipeCardModal from "./RecipeCardModal";
import { isWeeklyRecipe } from "./RecipeGrid";
import { recipeCardStyle } from "../muiStyling";
import {
  AddRounded,
  CloseRounded,
  Favorite,
  FavoriteBorder,
  MoreHoriz,
  OpenInNewRounded,
} from "@material-ui/icons/";
import {
  Badge,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
} from "@material-ui/core";
import { differenceInDays, formatISO, parseISO } from "date-fns";

const RecipeCard = (props) => {
  const classes = recipeCardStyle();
  const { toggleFavorite, setWeeks, selectedWeek } = useContext(GlobalContext);
  const [shouldShowModal, setShouldShowModal] = useState(false);
  const [badgeInfo, setBadgeInfo] = useState([]);

  useEffect(() => {
    switch (props.recipe.status) {
      case "pending":
        setBadgeInfo(["Pending", "primary"]);
        break;
      case "rejected":
        setBadgeInfo(["Rejected", "error"]);
        break;
      default:
        setBadgeInfo([0, ""]);
        break;
    }
  }, []);

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

  const renderCardBody = () => {
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
      <Badge
        badgeContent={badgeInfo[0]}
        classes={{ badge: classes.badge }} //overriding MUI badge color
        color={badgeInfo[1]}
        overlap="circular"
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
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
            {renderCardBody()}
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
      </Badge>
      <RecipeCardModal
        recipe={props.recipe}
        type={props.type}
        shouldShowModal={shouldShowModal}
        onClose={() => {
          setShouldShowModal(false);
        }}
      />
    </>
  );
};
export default RecipeCard;
