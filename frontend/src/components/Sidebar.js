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

const Sidebar = () => {
  const classes = sidebarStyle();
  const { logoutUser, recipes, user, inboxRecipes, changeSelectedWeek } =
    useContext(GlobalContext);
  let history = useHistory();

  const renderInboxBadge = () => {
    if (inboxRecipes.length > 0) {
      return (
        <Badge color="primary" variant="dot">
          <MailOutline />
        </Badge>
      );
    } else {
      return <MailOutline />;
    }
  };

  const handleResetWeek = () => {
    changeSelectedWeek(startOfWeek(new Date()));
  };

  const handleLogout = () => {
    logoutUser();
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <List className={classes.list}>
        <div onClick={handleResetWeek}>
          <ListItem button component={Link} to="/">
            <ListItemIcon className={classes.sidebarItem}>
              <HomeOutlined />
            </ListItemIcon>
          </ListItem>
          <ListItem button component={Link} to="/inbox">
            <ListItemIcon className={classes.sidebarItem}>
              {renderInboxBadge(recipes, user)}
            </ListItemIcon>
          </ListItem>
          <ListItem button component={Link} to="/favorites">
            <ListItemIcon className={classes.sidebarItem}>
              <FavoriteBorder />
            </ListItemIcon>
          </ListItem>
          <ListItem button component={Link} to="/new">
            <ListItemIcon className={classes.sidebarItem}>
              <AddCircleOutline />
            </ListItemIcon>
          </ListItem>
          <ListItem button component={Link} to="/rejected">
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
            <ListItemIcon className={classes.sidebarItem}>
              <Avatar
                alt={user.username}
                src={"/assets/avatar.png"}
                className={classes.avatar}
              />
            </ListItemIcon>
          </ListItem>
        </div>
      </List>
    </div>
  );
};

export default Sidebar;
