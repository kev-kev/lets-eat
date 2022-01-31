import { makeStyles } from "@material-ui/core/styles";

export const gridStyle = makeStyles((theme) => ({
  loading: {
    margin: "40vh",
  },
  pageNav: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "no-wrap",
    justifyContent: "center",
  },
  button: {
    color: "white",
  },
}));

export const homeStyle = makeStyles((theme) => ({
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
}));

export const loginStyle = makeStyles((theme) => ({
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

export const recipeCardStyle = makeStyles((theme) => ({
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
  addOrRemoveBtn: {
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
  badge: {
    color: "white",
    "font-weight": "bolder",
    left: 45,
    top: 25,
    height: 22,
    "font-size": "0.8rem",
  },
}));

export const modalStyle = makeStyles((theme) => ({
  modal: {
    width: 400,
    backgroundColor: theme.palette.secondary.light,
    border: "2px solid #000",
    boxShadow: 2,
    padding: theme.spacing(2, 4, 3),
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  button: {
    color: "white",
  },
}));

export const newRecipeFormStyle = makeStyles((theme) => ({
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
  button: {
    color: "white",
    "font-weight": "bolder",
  },
}));

export const sidebarStyle = makeStyles((theme) => ({
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

export const voteBodyStyle = makeStyles((theme) => ({
  voteBox: {
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
  },
}));
