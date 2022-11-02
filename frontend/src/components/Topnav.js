import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Badge
} from "@material-ui/core/";
import { Menu as MenuIcon } from '@material-ui/icons';
import { topnavStyle } from "../muiStyling"
import { GlobalContext } from "../context/GlobalState";

export default function MenuAppBar() {
  const classes = topnavStyle();
  const { inboxRecipes } = useContext(GlobalContext)
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
            <Badge 
              color="secondary"
              variant="dot" 
              invisible={inboxRecipes.length === 0}
            >
              <MenuIcon />
            </Badge>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            className={classes.menu}
          >
            <div className={classes.menuItemContainer}>
              <MenuItem
                className={classes.menuItem}
                onClick={handleClose}
                component={Link}
                to="/"
              >
                Home
              </MenuItem>
              <MenuItem
                className={inboxRecipes.length > 0 ? `${classes.menuItem} ${classes.menuInbox}` : classes.menuItem }
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
            </div>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}