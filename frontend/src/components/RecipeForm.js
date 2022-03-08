import React, { useContext, useState, useEffect, useRef } from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Typography,
  Container,
  CircularProgress,
  Snackbar,
  Box,
  Select,
  MenuItem,
  IconButton,
} from "@material-ui/core/";
import { CloseRounded } from "@material-ui/icons/";
import { recipeFormStyle } from "../muiStyling";
import { GlobalContext } from "../context/GlobalState";
import { Alert } from "@material-ui/lab/";
import IngredientForm from "./IngredientForm";

const successMessage = "ヽ(*・ω・)ﾉ   Recipe Submitted!   ～('▽^人)";
const errorMessage = "Submission Failed (っ´ω`)ﾉ (╥ω╥)";

const compareArrs = (arr1, arr2) => {
  return (
    arr1.length === arr2.length &&
    arr1.every((value, index) => value === arr2[index])
  );
};

const RecipeForm = (props) => {
  const classes = recipeFormStyle();
  const { submitRecipe, isSubmittingRecipe, errors, clearErrors, editRecipe } =
    useContext(GlobalContext);

  const [title, setTitle] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [link, setLink] = useState("");
  const [notes, setNotes] = useState("");
  const [formIngredients, setFormIngredients] = useState([]);
  const [successSnackbar, setSuccessSnackbar] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(true);

  const ingredientFormEl = useRef(null);

  useEffect(() => {
    if (errors.submit) setErrorSnackbar(true);
  }, [errors.submit]);

  useEffect(() => {
    if (props.recipe) {
      setTitle(props.recipe.name);
      setImgUrl(props.recipe.imgUrl);
      setLink(props.recipe.link);
      setNotes(props.recipe.notes);
      setFormIngredients(props.recipe.ingredients);
    }
  }, []);

  const setAttributeForIngredient = (index, attribute, value) => {
    const updatedIngredients = [...formIngredients];
    updatedIngredients[index][attribute] = value;
    setFormIngredients(updatedIngredients);
  };

  const handleClose = () => {
    setErrorSnackbar(false);
    setSuccessSnackbar(false);
    setFormIngredients([]);
    clearErrors();
  };

  const handleSubmit = () => {
    if (title === "" || link === "") {
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
          ingredients: formIngredients,
          type: "approved",
        });
      else submitRecipe(title, link, notes, imgUrl, formIngredients);
    }
  };

  const handleAddIngredient = () => {
    setFormIngredients([...formIngredients, { name: "", count: 0, unit: "" }]);
  };

  const handleDeleteIngredient = (index) => {
    const updatedIngredients = [...formIngredients];
    updatedIngredients.splice(index, 1);
    setFormIngredients(updatedIngredients);
  };

  const handleChange = (field, value) => {
    //eslint-disable-next-line
    switch (field) {
      case "title":
        if (value !== props.recipe?.name) {
          setDisableSubmit(false);
          setTitle(value);
        } else setDisableSubmit(true);
        break;
      case "imgUrl":
        if (value !== props.recipe?.imgUrl) {
          setDisableSubmit(false);
          setImgUrl(value);
        } else setDisableSubmit(true);
        break;
      case "link":
        if (value !== props.recipe?.link) {
          setDisableSubmit(false);
          setLink(value);
        } else setDisableSubmit(true);
        break;
      case "notes":
        if (value !== props.recipe?.notes) {
          setDisableSubmit(false);
          setNotes(value);
        } else setDisableSubmit(true);
        break;
    }
  };

  const renderIngredients = () => {
    return formIngredients.map((ingredientInput, index) => {
      return (
        // <IngredientForm
        //   ingredientInput={ingredientInput}
        //   setName={(ingredientName) => {
        //     setAttributeForIngredient(index, "name", ingredientName);
        //   }}
        //   setCount={(count) => setAttributeForIngredient(index, "count", count)}
        //   setUnit={(unit) => setAttributeForIngredient(index, "unit", unit)}
        //   key={"id- " + ingredientInput + index}
        //   index={index}
        //   handleDeleteIngredient={() => handleDeleteIngredient(index)}
        // />
        <form ref={ingredientFormEl}>
          <Box display="flex" key={`id-${ingredientInput["name"]}${index}`}>
            <TextField
              type="number"
              placeholder="quantity"
              onChange={(e) => {
                checkIngAttributeChanged(
                  parseInt(e.target.value),
                  "count",
                  index
                );
              }}
              defaultValue={ingredientInput.count}
              inputProps={{ min: 0 }}
              key={index + "count"}
            />
            <Select
              labelId="select-label"
              variant="filled"
              onChange={(e) =>
                checkIngAttributeChanged(e.target.value, "unit", index)
              }
              defaultValue={ingredientInput.unit}
              key={index + "unit"}
            >
              <MenuItem value={"gram"}>Grams</MenuItem>
              <MenuItem value={"kilograms"}>Kilograms</MenuItem>
              <MenuItem value={"ounces"}>Ounces</MenuItem>
              <MenuItem value={"pounds"}>Pounds</MenuItem>
              <MenuItem value={"milliliters"}>Milliliters</MenuItem>
              <MenuItem value={"liters"}>Liters</MenuItem>
              <MenuItem value={"teaspoon"}>Teaspoons</MenuItem>
              <MenuItem value={"tablespoon"}>Tablespoons</MenuItem>
              <MenuItem value={"cup"}>Cups</MenuItem>
              <MenuItem value={"pint"}>Pints</MenuItem>
              <MenuItem value={"quart"}>Quarts</MenuItem>
              <MenuItem value={"gallon"}>Gallons</MenuItem>
            </Select>
            <TextField
              type="text"
              placeholder="name"
              onChange={(e) => {
                checkIngAttributeChanged(e.target.value, "name", index);
              }}
              defaultValue={ingredientInput.name}
              key={index + "name"}
            />
            <IconButton onClick={() => handleDeleteIngredient(index)}>
              <CloseRounded color="primary" />
            </IconButton>
            {/* Testy Button for the weird props/ingredients change issue  */}
            {/* <IconButton onClick={() => setTitle("YABABABA")}>
              <CloseRounded color="secondary" />
            </IconButton> */}
          </Box>
        </form>
      );
    });
  };

  const checkIngAttributeChanged = (
    changedValue,
    attribute,
    ingredientIndex
  ) => {
    if (
      props.recipe?.ingredients[ingredientIndex] &&
      props.recipe.ingredients[ingredientIndex][attribute] !== changedValue
    ) {
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }
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
                handleSubmit();
                console.log(e);
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
