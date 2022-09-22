import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core/";
import { titleStyle } from "../muiStyling"

const Title = (props) => {
  const classes = titleStyle();

  return (
    <Typography 
      className={classes.pageTitle}
      component="h1" 
      variant="h3" 
      color="primary" 
      gutterBottom
      >
      {props.children}
    </Typography>
  );
};

Title.propTypes = {
  children: PropTypes.node,
};

export default Title;
