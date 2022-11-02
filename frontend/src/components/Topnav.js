import React, { useState } from 'react';
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core/";
import { Menu as MenuIcon } from '@material-ui/icons';
import { topnavStyle } from "../muiStyling"


export default function MenuAppBar() {
  const classes = topnavStyle();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton 
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            className={classes.menu}
          >
            <MenuItem
              className={classes.menuItem}
              onClick={handleClose}
              component={Link}
              to="/"

            >
              Home
            </MenuItem>
            <MenuItem
              className={classes.menuItem}
              onClick={handleClose}
              component={Link}
              to="/inbox"
            >
              Inbox
            </MenuItem>
            <MenuItem
              className={classes.menuItem}
              onClick={handleClose}
              component={Link}
              to="/new"
            >
              New
            </MenuItem>
            <MenuItem
              className={classes.menuItem}
              onClick={handleClose}
              component={Link}
              to="/favorites"
            >
              Favorites
            </MenuItem>
            <MenuItem
              className={classes.menuItem}
              onClick={handleClose}
              component={Link}
              to="/rejected"
            >
              Rejected
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}