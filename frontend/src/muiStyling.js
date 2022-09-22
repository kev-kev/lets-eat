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
    textAlign: "center",
  },
  recipeGridSectionContainer: {
    display: "flex",
    flexDirection: "column",
    padding: "0% 2% 5% 5%"
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

export const titleStyle = makeStyles((theme) => ({
  pageTitle: {
    paddingTop: theme.spacing(2)
  }
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
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "#eee",
    },
    width: "25px",
    height: "25px",
    "& svg": {
      fontSize: "1rem",
    },
    border: "2px solid pink",
  },
  title: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
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
    alignSelf: "flex-end"
  },
}), {index: 1});

export const recipeFormStyle = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    justifyContent: "center",
    height: "70vh",
    alignItems: "center"
  },
  // kirby: {
  //   width: "auto",
  //   height: theme.spacing(12),
  //   margin: "20px",
  // },
  formContainer: {
    width: "60%",
  },
  mainForm: {
    // padding: "5vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  button: {
    fontWeight: "bolder",
    width: "auto",
  },
  // fieldContainer: {
  //   margin: theme.spacing(1) 
  // },
  field: {
    margin: `${theme.spacing(1)}px 0px ${theme.spacing(1)}px`
  },
  specialField: {
    width: "6rem",
  },
  // error: {
  //   alignSelf: "flex-end",
  // },
  ingredientFormContainer: {
    marginTop: theme.spacing(1), 
    display: "flex",
    marginBottom: theme.spacing(1)
  },
  ingField:{
    // margin: theme.spacing(1),
  },
  submit: {
    color: "white",
    fontWeight: "bolder",
  },
  submitContainer: {
    display: "flex",
    flexDirection: "row-reverse"
  },
  formControl: {
    margin: `0 ${theme.spacing(1)}px`
  }
}), {index: 1});

export const sidebarStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: "#fff",
    height: "100vh",
    borderRight: "1px solid #eee",
  },
  list: {
    display: "flex",
    padding: "0",
    flexDirection: "column",
  },
  sidebarItem: {
    justifyContent: "center",
    padding: "10px 0",
  },
  sidebarBottom: {
    marginTop: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  userAvatar: {
    paddingTop: "15%",
    paddingBottom: "30%",
  },
}), {index: 1});

export const voteBodyStyle = makeStyles((theme) => ({
  voteBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}), {index: 1});
