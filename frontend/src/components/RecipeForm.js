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
      debugger;
      if (props.recipe)
        editRecipe({
          name: name,
          link: link,
          notes: notes,
          imgUrl: imgUrl,
          ingredients: ingredients,
          id: props.recipe.id,
          type: "approved",
          weeks: props.recipe.weeks,
          status: props.recipe.status,
        });
      else submitRecipe(name, link, notes, imgUrl, ingredients);
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
              onChange={(e) => setTitle(e.target.value)}
              defaultValue={props.recipe && props.recipe.name}
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
              defaultValue={props.recipe && props.recipe.imgUrl}
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
              defaultValue={props.recipe && props.recipe.link}
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
              defaultValue={props.recipe && props.recipe.notes}
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

export default RecipeForm;
