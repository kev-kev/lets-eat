import React, { useContext, useState, useEffect } from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Typography,
  Container,
  CircularProgress,
  Snackbar,
} from "@material-ui/core/";
import { newRecipeFormStyle } from "../muiStyling";
import { GlobalContext } from "../context/GlobalState";
import { Alert } from "@material-ui/lab/";
import IngredientInputForm from "./IngredientInputForm";

const successMessage = "ヽ(*・ω・)ﾉ   Recipe Submitted!   ～('▽^人)";
const errorMessage = "Submission Failed (っ´ω`)ﾉ (╥ω╥)";

const NewRecipeForm = () => {
  const classes = newRecipeFormStyle();
  const { submitRecipe, isSubmittingRecipe, errors, clearErrors } =
    useContext(GlobalContext);

  const [title, setTitle] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [link, setLink] = useState("");
  const [notes, setNotes] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [successSnackbar, setSuccessSnackbar] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState(false);

  useEffect(() => {
    if (errors.submit) setErrorSnackbar(true);
  }, [errors.submit]);

  const handleClose = () => {
    setErrorSnackbar(false);
    setSuccessSnackbar(false);
    clearErrors();
  };

  const handleSubmit = (title, link) => {
    if (title === "" || link === "") {
      setSuccessSnackbar(false);
      setErrorSnackbar(true);
    } else {
      submitRecipe(title, link, notes, imgUrl, ingredients);
    }
  };

  const handleAddIngredientInput = () => {
    setIngredients([...ingredients, { name: "", count: 0, unit: "" }]);
  };

  const setAttributeForIngredient = (index, attribute, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][attribute] = value;
    setIngredients(updatedIngredients);
  };

  const handleDeleteIngredient = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  const renderIngredients = () => {
    return ingredients.map((ingredientInput, index) => {
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
          handleDeleteIngredient={(index) => handleDeleteIngredient(index)}
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
            <Button
              color="primary"
              variant="contained"
              onClick={handleAddIngredientInput}
              className={classes.button}
            >
              New Ingredient
            </Button>
            <br />
            {renderIngredients()}
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
              className={classes.submit + " " + classes.button}
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
};

export default NewRecipeForm;
