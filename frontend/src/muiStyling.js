import { makeStyles } from "@material-ui/core/styles";

export const dashboardMui = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    padding: "1vh",
  },
  container: {
    width: "100%",
    paddingBottom: theme.spacing(4),
    margin: 0,
    justifyContent: "center",
  },
  loading: {
    margin: "40vh",
  },
}));

export const loginMui = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  kirby: {
    width: "auto",
    height: theme.spacing(12),
    margin: "20px",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  loading: {
    margin: "20%",
  },
}));

export const newRecipeCardMui = makeStyles((theme) => ({
  root: {
    width: 225,
    position: "relative",
    margin: 10,
    overflow: "hidden",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  deleteRecipeIcon: {
    position: "absolute",
    top: "6px",
    right: "6px",
    "background-color": "white",
    "&:hover": {
      "background-color": "#eee",
    },
    width: "25px",
    height: "25px",
    "& svg": {
      "font-size": "1rem",
    },
    border: "2px solid pink",
  },
}));

export const newRecipeFormMui = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  kirby: {
    width: "auto",
    height: theme.spacing(12),
    margin: "20px",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  loading: {
    justifyContent: "center",
  },
});

export const recipeCardMui = makeStyles((theme) => ({
  recipeCard: {
    width: "275px",
    height: "350px",
    "border-radius": "20px",
    "background-color": "#fff",
    "box-shadow": "0px 0px 20px #eee",
    overflow: "hidden",
    transition: "box-shadow 0.5s",
    position: "relative",
  },
  recipeCardImg: (props) => ({
    backgroundImage: `url(${props.imgUrl});`,
    backgroundSize: "cover",
    height: "150px",
    width: "100%",
    opacity: "1",
    transform: "scale(1)",
    transition: "opacity 0.5s, transform 0.2s",
    "&:hover": {
      transform: "scale(1.1)",
    },
  }),
  recipeCardBody: {
    width: "100%",
    height: "200px",
    padding: "5%",
    display: "flex",
    "flex-direction": "column",
    "justify-content": "space-around",
    "font-family": "'Muli', sans-serif",
  },
  recipeCardTitle: {
    "justify-self": "flex-start",
    "text-align": "left",
    "font-size": "20px",
    "font-family": "'Ovo', serif",
    height: "6rem",
  },
  recipeCardLink: {
    height: "4rem",
  },
  recipeCardFooter: {
    "justify-self": "flex-end",
    "align-self": "center",
    margin: "1.5rem 0",
    height: "2rem",
  },
  deleteRecipeIcon: {
    position: "absolute",
    top: "6px",
    right: "6px",
    "background-color": "white",
    "&:hover": {
      "background-color": "#eee",
    },
    width: "32px",
    height: "32px",
    "& svg": {
      "font-size": "1rem",
    },
    border: "2px solid pink",
  },
}));

export const sidebarMui = makeStyles((theme) => ({
  root: {
    display: "flex",
    "background-color": "#fff",
    height: "100vh",
    "border-right": "1px solid #eee",
  },
  list: {
    display: "flex",
    padding: "0",
    "flex-direction": "column",
  },
  sidebarItem: {
    "justify-content": "center",
    padding: "10px 0",
  },
  sidebarBottom: {
    "margin-top": "auto",
    display: "flex",
    "flex-direction": "column",
    "align-items": "center",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  userAvatar: {
    "padding-top": "15%",
    "padding-bottom": "30%",
  },
}));
