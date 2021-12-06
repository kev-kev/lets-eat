import React, { useContext } from "react";
import { sidebarMui } from "../muiStyling";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import MailIcon from "@material-ui/icons/MailOutline";
import FavoriteIcon from "@material-ui/icons/FavoriteBorder";
import AddIcon from "@material-ui/icons/AddCircleOutline";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import { GlobalContext } from "../context/GlobalState";
import Badge from "@material-ui/core/Badge";

const renderInboxBadge = (recipes, currentUser) => {
  const pendingRecipes = recipes.filter(
    (recipe) => recipe.status === "pending"
  );
  const currentUserPendingRecipes = pendingRecipes.filter(
    (recipe) => recipe.submittedBy !== currentUser.username
  );

  if (currentUserPendingRecipes.length > 0) {
    return (
      <Badge color="primary" variant="dot">
        <MailIcon />
      </Badge>
    );
  } else {
    return <MailIcon />;
  }
};

export default function Dashboard() {
  const classes = sidebarMui();
  const { logoutUser, recipes, user } = useContext(GlobalContext);
  const PLACEHOLDER_IMG_URL =
    "https://patriotpower.ogsd.net/wp-content/uploads/2018/03/Profile_Kirby.aead314d435d8e52d9a4e92a6f799c4eee08081e.jpg";

  return (
    <div className={classes.root}>
      <List className={classes.list}>
        <ListItem button component={Link} to="/home" key={"home"}>
          <ListItemIcon className={classes.sidebarItem}>
            <HomeIcon />
          </ListItemIcon>
        </ListItem>
        <ListItem button component={Link} to="/inbox" key={"inbox"}>
          <ListItemIcon className={classes.sidebarItem}>
            {renderInboxBadge(recipes, user)}
          </ListItemIcon>
        </ListItem>
        <ListItem button component={Link} to="/favorites" key={"favorites"}>
          <ListItemIcon className={classes.sidebarItem}>
            <FavoriteIcon />
          </ListItemIcon>
        </ListItem>
        <ListItem button component={Link} to="/new" key={"new-recipe"}>
          <ListItemIcon className={classes.sidebarItem}>
            <AddIcon />
          </ListItemIcon>
        </ListItem>
        <div className={classes.sidebarBottom}>
          <ListItem button onClick={logoutUser}>
            <ListItemIcon className={classes.sidebarItem}>
              <ExitToAppRoundedIcon />
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
                src={PLACEHOLDER_IMG_URL}
                className={classes.large}
              />
            </ListItemIcon>
          </ListItem>
          <ListItem>{user.username}</ListItem>
        </div>
      </List>
    </div>
  );
}
