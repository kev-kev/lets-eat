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
import { recipeFormStyle } from "../muiStyling";
import { GlobalContext } from "../context/GlobalState";
import { Alert } from "@material-ui/lab/";
import IngredientForm from "./IngredientForm";

const successMessage = "ヽ(*・ω・)ﾉ   Recipe Submitted!   ～('▽^人)";
const errorMessage = "Submission Failed (っ´ω`)ﾉ (╥ω╥)";

const compareArrs = (arr1, arr2) => {
  arr1.length === arr2.length &&
    arr1.every((value, index) => value === arr2[index]);
};

const RecipeForm = (props) => {
  const classes = recipeFormStyle();
  const { submitRecipe, isSubmittingRecipe, errors, clearErrors, editRecipe } =
    useContext(GlobalContext);

  const [title, setTitle] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [link, setLink] = useState("");
  const [notes, setNotes] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [successSnackbar, setSuccessSnackbar] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(!!props.recipe);

  useEffect(() => {
    if (errors.submit) setErrorSnackbar(true);
  }, [errors.submit]);

  useEffect(() => {
    if (props.recipe) {
      setTitle(props.recipe.title);
      setImgUrl(props.recipe.imgUrl);
      setLink(props.recipe.link);
      setNotes(props.recipe.notes);
      setIngredients(props.recipe.ingredients);
    }
  }, []);

  const handleClose = () => {
    setErrorSnackbar(false);
    setSuccessSnackbar(false);
    setIngredients([]);
    clearErrors();
  };

  const handleSubmit = (name, link) => {
    if (name === "" || link === "") {
      setSuccessSnackbar(false);
      setErrorSnackbar(true);
    } else {
      if (props.recipe)
        editRecipe({
          ...props.recipe,
          name: title,
          link: link,
          notes: notes,
          imgUrl: imgUrl,
          ingredients: ingredients,
          type: "approved",
        });
      else submitRecipe(name, link, notes, imgUrl, ingredients);
    }
  };

  const checkIngredientArrs = () => {
    if (compareArrs(props.recipe.ingredients, ingredients))
      setDisableSubmit(true);
    else setDisableSubmit(false);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: "", count: 0, unit: "" }]);
  };

  const handleDeleteIngredient = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
    checkIngredientArrs();
  };

  const setAttributeForIngredient = (index, attribute, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][attribute] = value;
    setIngredients(updatedIngredients);
    if (Object.values(updatedIngredients[index]).every((attr) => !!attr))
      checkIngredientArrs();
    else setDisableSubmit(true);
  };

  const handleChange = (field, value) => {
    //eslint-disable-next-line
    switch (field) {
      case "title":
        setTitle(value);
        if (value !== props.recipe.name) setDisableSubmit(false);
        else setDisableSubmit(true);
        break;
      case "imgUrl":
        setImgUrl(value);
        if (value !== props.recipe.imgUrl) setDisableSubmit(false);
        else setDisableSubmit(true);
        break;
      case "link":
        setLink(value);
        if (value !== props.recipe.link) setDisableSubmit(false);
        else setDisableSubmit(true);
        break;
      case "notes":
        setNotes(value);
        if (value !== props.recipe.notes) setDisableSubmit(false);
        else setDisableSubmit(true);
        break;
    }
  };

  const renderIngredients = () => {
    return ingredients.map((ingredientInput, index) => {
      return (
        <IngredientForm
          ingredientInput={ingredientInput}
          setName={(ingredientName) =>
            setAttributeForIngredient(index, "name", ingredientName)
          }
          setCount={(count) => setAttributeForIngredient(index, "count", count)}
          setUnit={(unit) => setAttributeForIngredient(index, "unit", unit)}
          key={index}
          index={index}
          handleDeleteIngredient={() => handleDeleteIngredient(index)}
        />
      );
    });
  };

  const renderFormHeader = () => {
    if (props.recipe) return "editing recipe";
    else return "submit a new recipe idea";
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
            {renderFormHeader()}
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
              onChange={(e) => handleChange("title", e.target.value)}
              defaultValue={props.recipe?.name}
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
              onChange={(e) => handleChange("imgUrl", e.target.value)}
              defaultValue={props.recipe?.imgUrl}
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
              onChange={(e) => handleChange("link", e.target.value)}
              defaultValue={props.recipe?.link}
            />
            <Button
              color="primary"
              variant="contained"
              onClick={handleAddIngredient}
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
              onChange={(e) => handleChange("notes", e.target.value)}
              defaultValue={props.recipe?.notes}
            />
            <Button
              type="submit"
              disabled={disableSubmit}
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

export default RecipeForm;
