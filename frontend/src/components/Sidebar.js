import React, { useContext } from "react";
import { sidebarStyle } from "../muiStyling";
import {
  List,
  ListItem,
  ListItemIcon,
  Avatar,
  Divider,
  Badge,
} from "@material-ui/core/";
import { Link } from "react-router-dom";
import {
  ExitToAppRounded,
  DeleteOutlineRounded,
  HomeOutlined,
  MailOutline,
  FavoriteBorder,
  AddCircleOutline,
} from "@material-ui/icons/";
import { GlobalContext } from "../context/GlobalState";
import { startOfWeek } from "date-fns";
import { useHistory } from "react-router-dom";
import avatar from "../assets/avatar.png"

const Sidebar = () => {
  const classes = sidebarStyle();
  const { logoutUser, inboxRecipes, changeSelectedWeek } =
    useContext(GlobalContext);
  let history = useHistory();

  const handleResetWeek = () => {
    changeSelectedWeek(startOfWeek(new Date()));
  };

  const handleLogout = () => {
    logoutUser();
    history.push("/");
  };

  const handleClick = () => {
    document.querySelector("main").scrollTo(0,0);
  }

  return (
    <div className={classes.root}>
      <List className={classes.list}>
        <div onClick={handleResetWeek}>
          <ListItem button component={Link} to="/" onClick={handleClick}>
            <ListItemIcon className={classes.sidebarItem}>
              <HomeOutlined />
            </ListItemIcon>
          </ListItem>
          <ListItem button component={Link} to="/inbox" onClick={handleClick}>
            <ListItemIcon className={classes.sidebarItem}>
            <Badge color="primary" variant="dot" invisible={inboxRecipes.length === 0}>
              <MailOutline />
            </Badge>
            </ListItemIcon>
          </ListItem>
          <ListItem button component={Link} to="/new" onClick={handleClick}>
            <ListItemIcon className={classes.sidebarItem}>
              <AddCircleOutline />
            </ListItemIcon>
          </ListItem>
          <ListItem button component={Link} to="/favorites" onClick={handleClick}>
            <ListItemIcon className={classes.sidebarItem}>
              <FavoriteBorder />
            </ListItemIcon>
          </ListItem>
          <ListItem button component={Link} to="/rejected" onClick={handleClick}>
            <ListItemIcon className={classes.sidebarItem}>
              <DeleteOutlineRounded />
            </ListItemIcon>
          </ListItem>
        </div>
        <div className={classes.sidebarBottom}>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon className={classes.sidebarItem}>
              <ExitToAppRounded />
            </ListItemIcon>
          </ListItem>
          <Divider />
          <ListItem
            button
            component={Link}
            to="/login"
            key={"user-icon"}
            className={classes.userAvatar}
          >
            <ListItemIcon>
              <Avatar
                alt="user"
                src={avatar}
                className={classes.avatarImg}
              />
            </ListItemIcon>
          </ListItem>
        </div>
      </List>
    </div>
  );
};

export default Sidebar;
