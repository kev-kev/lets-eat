import React from "react";
import { Typography, Link } from "@material-ui/core/";

const Copyright = ({copyrightClass}) => {
  return (
    <Typography variant="body2" color="textSecondary" align="center" className={copyrightClass}>
      {"Copyright © "}
      <Link color="inherit" href="#">
        KevMir Productions
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Copyright;
