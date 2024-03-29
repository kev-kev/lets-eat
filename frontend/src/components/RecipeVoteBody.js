import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { voteBodyStyle } from "../muiStyling";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import XCircleIcon from "@material-ui/icons/HighlightOff";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";

const RecipeVoteBody = (props) => {
  const classes = voteBodyStyle(props);
  const { changeRecipeStatus } = useContext(GlobalContext);

  return (
    <Box className={classes.voteBox}>
      <IconButton
        onClick={(e) => {
          e.preventDefault();
          changeRecipeStatus(props.id, "rejected");
        }}
      >
        <XCircleIcon style={{ fontSize: 30 }} color="primary" />
      </IconButton>
      <IconButton
        onClick={(e) => {
          e.preventDefault();
          changeRecipeStatus(props.id, "approved");
        }}
      >
        <CheckCircleOutlineIcon style={{ fontSize: 30 }} color="primary" />
      </IconButton>
    </Box>
  );
};

export default RecipeVoteBody;
