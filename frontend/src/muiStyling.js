import { makeStyles } from "@material-ui/core/styles";

export const gridStyle = makeStyles((theme) => ({
  loading: {  
    margin: "40vh",
  },
  pageNav: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    color: "white",
  },
  sectionTitle: {
    "text-align": "center"
  },
  recipeGridSectionContainer: {
    display: "flex",
    "flex-direction": "column",
    padding: "2% 2% 5% 5%"
  },
  gridContainer: {
    marginTop: "10px",
    marginBottom: "10px",
  },
  searchBar: {
    alignSelf: "flex-start"
  },
  hideVisibility: {
    visibility: "hidden"
  }
}), {index: 1});

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
    paddingBottom: theme.spacing(4),
    margin: 0,
  },
}), {index: 1});

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
}), {index: 1});

export const recipeCardStyle = makeStyles((theme) => ({
  root: {
    position: "relative",
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
  title: {
    "white-space": "nowrap",
    overflow: "hidden",
    "text-overflow": "ellipsis",
  }
}), {index: 1});

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
    "align-self": "flex-end"
  },
}), {index: 1});

export const recipeFormStyle = makeStyles((theme) => ({
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
    marginTop: theme.spacing(2),
    padding: "5vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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
}), {index: 1});

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
}), {index: 1});

export const voteBodyStyle = makeStyles((theme) => ({
  voteBox: {
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
  },
}), {index: 1});
