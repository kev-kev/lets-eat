import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Badge,
  Avatar
} from "@material-ui/core/";
import { Menu as MenuIcon, MailOutlineRounded as MailIcon } from '@material-ui/icons';
import { topnavStyle } from "../muiStyling"
import { GlobalContext } from "../context/GlobalState";
import avatar from "../assets/avatar.png"
import { useHistory } from "react-router-dom";

export default function MenuAppBar() {
  const classes = topnavStyle();
  const { inboxRecipes, logoutUser } = useContext(GlobalContext)
  const [anchorEl, setAnchorEl] = useState(null);
  let history = useHistory();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = () => {
    document.querySelector("main").scrollTo(0,0);
    setAnchorEl(null);
  }

  const handleLogout = () => {
    logoutUser();
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <IconButton 
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleMenuClick}
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
            onClose={handleMenuClose}
            className={classes.menu}
          >
            <div className={classes.menuItemContainer}>
              <MenuItem
                className={classes.menuItem}
                onClick={handleItemClick}
                component={Link}
                to="/"
              >
                Home
              </MenuItem>
              <MenuItem
                onClick={handleItemClick}
                component={Link}
                to="/inbox"
              >
                Inbox 
                &nbsp;{inboxRecipes.length > 0 && <MailIcon color="primary" style={{ fontSize: "1rem", marginTop: "2px" }} />}
              </MenuItem>
              <MenuItem
                className={classes.menuItem}
                onClick={handleItemClick}
                component={Link}
                to="/new"
              >
                New
              </MenuItem>
              <MenuItem
                className={classes.menuItem}
                onClick={handleItemClick}
                component={Link}
                to="/favorites"
              >
                Favorites
              </MenuItem>
              <MenuItem
                className={classes.menuItem}
                onClick={handleItemClick}
                component={Link}
                to="/rejected"
              >
                Rejected
              </MenuItem>
              <MenuItem
                className={classes.menuItem}
                onClick={handleLogout}
              >
                Log out
              </MenuItem>
            </div>
          </Menu>
          <Avatar
                alt="user"
                src={avatar}
                className={classes.large}
              />
        </Toolbar>
      </AppBar>
    </div>
  );
}