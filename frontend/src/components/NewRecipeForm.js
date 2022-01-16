import React, { useContext, useState, useEffect, useRef } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { newRecipeFormMui } from "../muiStyling";
import Container from "@material-ui/core/Container";
import { GlobalContext } from "../context/GlobalState";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import IngredientInputForm from "./IngredientInputForm";
import uuid from "react-uuid";

export default function NewRecipeForm() {
  const classes = newRecipeFormMui();
  const { submitRecipe, isSubmittingRecipe, recipes, errors, clearErrors } =
    useContext(GlobalContext);

  const [title, setTitle] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [link, setLink] = useState("");
  const [notes, setNotes] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [ingredientInputs, setIngredientInputs] = useState([]);
  const [successSnackbar, setSuccessSnackbar] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState(false);

  // const refContainer = useRef(true);

  const successMessage = "ヽ(*・ω・)ﾉ   Recipe Submitted!   ～('▽^人)";
  const errorMessage = "Submission Failed (っ´ω`)ﾉ (╥ω╥)";

  useEffect(() => {
    if (errors.submit) {
      setErrorSnackbar(true);
    }
  }, [errors.submit]);

  // note
  // here im using useEffect to set the ref to false on pageload
  //   so the snackbar doesn't load on initial render.
  // any change to recipes will trigger the success snackbar,
  //   since a change must mean the fetch was successful
  // useEffect(() => {
  //   if (refContainer.current) {
  //     refContainer.current = false;
  //   } else {
  //     setSuccessSnackbar(true);
  //   }
  // }, [recipes]);

  const handleClose = () => {
    setErrorSnackbar(false);
    setSuccessSnackbar(false);
    clearErrors();
  };

  const handleSubmit = (title, link) => {
    console.log(ingredientInputs);
    if (title === "" || link === "") {
      setSuccessSnackbar(false);
      setErrorSnackbar(true);
    } else {
      submitRecipe(title, link, notes, imgUrl, ingredientInputs);
    }
  };

  const handleAddIngredientInput = () => {
    setIngredientInputs([
      ...ingredientInputs,
      { name: "", count: 0, unit: "" },
    ]);
  };

  const setAttributeForIngredient = (index, attribute, value) => {
    const newIngredientInputs = [...ingredientInputs];
    newIngredientInputs[index][attribute] = value;
    setIngredientInputs(newIngredientInputs);
  };

  const renderIngredientInputs = () => {
    return ingredientInputs.map((ingredientInput, index) => {
      return (
        <IngredientInputForm
          ingredientInput={ingredientInput}
          setName={(ingredientName) =>
            setAttributeForIngredient(index, "name", ingredientName)
          }
          setCount={(count) => setAttributeForIngredient(index, "count", count)}
          setUnit={(unit) => setAttributeForIngredient(index, "unit", unit)}
          key={index}
          index={index}
        />
      );
    });
  };

  if (isSubmittingRecipe) {
    return (
      <div className={classes.paper}>
        <CircularProgress className={classes.loading} />
      </div>
    );
  } else {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Snackbar open={errorSnackbar} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {errorMessage}
          </Alert>
        </Snackbar>
        <Snackbar open={successSnackbar} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            {successMessage}
          </Alert>
        </Snackbar>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            submit a new recipe idea
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="title"
              label="Recipe Title"
              name="title"
              autoComplete="title"
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="imgUrl"
              label="Image URL"
              type="imgUrl"
              id="imgUrl"
              autoComplete="current-imgUrl"
              onChange={(e) => setImgUrl(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="link"
              label="Link to recipe"
              type="link"
              id="link"
              autoComplete="current-link"
              onChange={(e) => setLink(e.target.value)}
            />
            ingredient format: name, count, unit of measurement
            <TextField
              className="textAreas"
              variant="outlined"
              margin="normal"
              multiline
              fullWidth
              rows={4}
              name="ingredients"
              label="Ingredients"
              type="ingredients"
              id="ingredients"
              autoComplete="ingredients"
              onChange={(e) => setIngredients(e.target.value)}
            />
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                handleAddIngredientInput();
              }}
            >
              New Ingredient
            </Button>
            <br />
            {renderIngredientInputs()}
            <TextField
              className="textAreas"
              variant="outlined"
              margin="normal"
              multiline
              fullWidth
              rows={4}
              name="notes"
              label="Notes"
              type="notes"
              id="notes"
              autoComplete="notes"
              onChange={(e) => setNotes(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(e) => {
                e.preventDefault();
                handleSubmit(title, link);
              }}
            >
              submit
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}
