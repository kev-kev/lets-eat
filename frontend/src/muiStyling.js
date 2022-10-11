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
    margin: "0px"
  },
  recipeGridSectionContainer: {
    display: "flex",
    flexDirection: "column",
    padding: "0% 2% 0% 2%"
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
  },
  divider: {
    margin: "1rem 0rem"
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
    margin: 0,
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  mainContent: {
    flexGrow: 1,
  },
  copyright: {
    justifySelf: "flex-end",
    paddingBottom: "1rem"
  },
}), {index: 1});

export const titleStyle = makeStyles((theme) => ({
  pageTitle: {
    paddingTop: theme.spacing(2),
    textAlign: "center",
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
    borderRadius: "5%",
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
  modalContent: {
    backgroundColor: theme.palette.secondary.light,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: theme.spacing(2, 6, 3),
    overflow: "scroll",
    border: "2px solid #aaa",
    borderRadius: "3%",
    minWidth: "40%"
  },
  modalFormContainer: {
    maxHeight: "85%",
    width: "80%",
  },
  button: {
    color: "white",
    fontWeight: "bolder"
  },
  editButton: { 
    color: theme.palette.secondary.light,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark
    }
  },
  modalTitle: {
    textAlign: "center",
    marginBottom: 0
  },
  backArrow: {
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row-reverse",
    paddingTop: theme.spacing(2)
  },
  ingredientTypography: {
    marginLeft: theme.spacing(1)
  },
  deleteContainer: {

  },
  deleteTypography: {
    margin: theme.spacing(1)
  },
  deleteButtonContainer: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(3, 0, 1)
  },
  noteTypography: {
    marginLeft: theme.spacing(1)
  },
  submittedBy: {
    paddingTop: theme.spacing(2),
  },
  submittedByTypography: {
    fontStyle: "italic",
  },
  modalHeader: {
    marginBottom: theme.spacing(1)
  },
}), {index: 1});

export const recipeFormStyle = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "center",    
  },
  formContainer: {
    width: "60%",
  },
  mainForm: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  button: {
    fontWeight: "bolder",
    width: "auto",
  },
  field: {
    // margin: `${theme.spacing(1)}px 0px ${theme.spacing(1)}px`
    margin: theme.spacing(1, 0, 1)
  },
  unitSelect: {
    width: "6rem",
  },
  numInput: {
    width: "6rem",
  },
  ingredientFormContainer: {
    marginTop: theme.spacing(1), 
    display: "flex",
    flexWrap: "wrap",
    marginBottom: theme.spacing(1),
    alignItems: "center",    
  },
  ingField:{
  },
  submit: {
    color: "white",
    fontWeight: "bolder",
    marginTop: theme.spacing(1),
  },
  submitContainer: {
    display: "flex",
    flexDirection: "row-reverse"
  },
  formControl: {
    margin: theme.spacing(0, 1)
  },
  loading: {
    position: "absolute",
    margin: "auto",
    bottom: "0px",
    top: "0px",
    left: "50%",
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
