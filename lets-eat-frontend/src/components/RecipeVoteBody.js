import React, { useContext } from 'react';
import { GlobalContext } from "../context/GlobalState";
import { makeStyles } from '@material-ui/core/styles';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import XCircleIcon from '@material-ui/icons/HighlightOff';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles((theme) => ({
  voteBox: {
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
    "margin": "10px"
  }
}));

export default function RecipeCard(props) {
const classes = useStyles(props);
const { changeRecipeStatus } = useContext(GlobalContext);

return (
    <Box className={classes.voteBox}>
      <IconButton onClick={ e => {
          e.preventDefault()
          changeRecipeStatus(props.id, "rejected")
        }
      }>
        <XCircleIcon fontSize="large" color="primary" />
      </IconButton>
      <IconButton onClick={ e => {
          e.preventDefault()
          changeRecipeStatus(props.id, "approved")
        }
      }>
        <CheckCircleOutlineIcon fontSize="large" color="primary" />
      </IconButton>
    </Box>
  );
}