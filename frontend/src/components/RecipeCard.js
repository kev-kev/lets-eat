import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import RecipeVoteBody from "./RecipeVoteBody";
import RecipeCardModal from "./RecipeCardModal";
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
  const { setWeeks, selectedWeek, editRecipe, setOpenRecipeId } = useContext(GlobalContext);
  const [raised, setRaised] = useState(false);

  const renderIndexCardBody = () => {
    return (
      <IconButton
        onClick={() => {
          editRecipe({
            ...props.recipe,
            isFavorited: !props.recipe.isFavorited,
          });
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
        <RecipeVoteBody
          id={props.recipe.id}
          className={classes.voteBody}
        />
      );
    } else if (props.type === "index" || props.type === "weekly") {
      return renderIndexCardBody();
    }
  };

  const addOrRemoveWeek = (weeks, selectedWeek) => {
    if (props.type === "weekly") {
      return weeks.filter((week) => {
        return differenceInDays(parseISO(week), selectedWeek) !== 0;
      });
    } else {
      return weeks.concat([
        formatISO(selectedWeek, { representation: "date" }),
      ]);
    }
  };

  const renderAddOrRemoveBtn = () => {
    if (props.type === "index" || props.type === "weekly")
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
          {props.type === "weekly" ? (
            <CloseRounded color="primary" />
          ) : (
            <AddRounded color="primary" />
          )}
        </IconButton>
      );
  };

  return (
    <>
      <Card 
        className={classes.root}
        raised={raised}
        onMouseOver={() => setRaised(true)}
        onMouseOut={() => setRaised(false)}
      >
        {renderAddOrRemoveBtn()}
        <CardMedia
          className={classes.media}
          image={props.recipe.imgUrl}
          title={props.recipe.name}
          onClick={() => setOpenRecipeId(props.recipe.id)}
        />

        <CardContent>
          <Typography
            variant="body2"
            color="textSecondary"
            component="h2"
            onClick={() => setOpenRecipeId(props.recipe.id)}
            className={classes.title}
          >
            {props.recipe.name}
          </Typography>
        </CardContent>
        <CardActions disableSpacing className={classes.cardActions}>
          {renderCardBody()}
          {
            props.recipe.link && (
              <IconButton 
                href={props.recipe.link}
                target="_blank"
              >
                <OpenInNewRounded color="primary" />
              </IconButton>
            )
          }
          <IconButton
            onClick={() => setOpenRecipeId(props.recipe.id)}
            aria-label="show more"
          >
            <MoreHoriz color="primary" />
          </IconButton>
        </CardActions>
      </Card>
      <RecipeCardModal
        key={props.recipe.id}
        recipe={props.recipe}
        type={props.type}
      />
    </>
  );
};
export default RecipeCard;
