import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import MailIcon from '@material-ui/icons/MailOutline';
import FavoriteIcon from '@material-ui/icons/FavoriteBorder';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    'background-color': '#fff',
    height: '100vh',
    'border-right': '1px solid #eee',
  },
  list: {
      display: 'flex',
      padding: '0',
      'flex-direction': 'column'
  },
  sidebarItem: {
      'justify-content': 'center',
      padding: '10px 0',
  },
  sidebarBottom: {
    'margin-top': 'auto',
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  userAvatar: {
      'padding-top': '15%',
      'padding-bottom': '30%'
  }
}));

export default function Dashboard() {
  const classes = useStyles();
  const PLACEHOLDER_IMG_URL = "https://patriotpower.ogsd.net/wp-content/uploads/2018/03/Profile_Kirby.aead314d435d8e52d9a4e92a6f799c4eee08081e.jpg";

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
                    <MailIcon />
                </ListItemIcon>
            </ListItem>
            <ListItem button component={Link} to="/home" key={"favorites"}>
                <ListItemIcon className={classes.sidebarItem}>
                    <FavoriteIcon />
                </ListItemIcon>
            </ListItem>
            <ListItem button component={Link} to="/home" key={"new-recipe"}>
                <ListItemIcon className={classes.sidebarItem}>
                    <AddIcon />
                </ListItemIcon>
            </ListItem>
            <div className={classes.sidebarBottom}>
                <Divider />
                <ListItem button component={Link} to="/login" key={"user-icon"} className={classes.userAvatar}>
                    <ListItemIcon>
                        <Avatar alt="user" src={PLACEHOLDER_IMG_URL} className={classes.large} />
                    </ListItemIcon>
                </ListItem>
            </div>
        </List>
    </div>
  );
}