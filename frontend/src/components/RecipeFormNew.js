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
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";

const handleAddIngredient = (values, setValues) => {
  // debugger;
  // const ingredients = [...values.ingredients];
};

const handleDeleteIngredient = () => {};

export const RecipeFormNew = ({
  recipe: { name, imgUrl, link, ingredients, notes },
}) => {
  const classes = recipeFormStyle();
  const { submitRecipe, isSubmittingRecipe, errors, clearErrors, editRecipe } =
    useContext(GlobalContext);
  return (
    <Formik
      initialValues={{ title: name, imgUrl, link, notes, ingredients }}
      validationSchema={Yup.object({
        title: Yup.string().required("Required"),
        imgUrl: Yup.string().required("Required"),
        link: Yup.string().required("Required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        setSubmitting(false);
      }}
    >
      {(formik) => (
        <Form>
          <TextField
            id="title"
            name="title"
            type="text"
            {...formik.getFieldProps("title")}
            fullWidth
            autoFocus
            margin="normal"
            variant="outlined"
            color="primary"
            placeholder="Recipe Title"
          />
          <ErrorMessage name="title" />

          <TextField
            id="imgUrl"
            name="imgUrl"
            type="text"
            {...formik.getFieldProps("imgUrl")}
            fullWidth
            margin="normal"
            variant="outlined"
            color="primary"
            placeholder="Image URL"
          />
          <ErrorMessage name="imgUrl" />

          <TextField
            id="link"
            name="link"
            type="text"
            {...formik.getFieldProps("link")}
            fullWidth
            margin="normal"
            variant="outlined"
            color="primary"
            placeholder="Link to Recipe"
          />
          <ErrorMessage name="link" />
          <Button
            color="primary"
            variant="contained"
            onClick={handleAddIngredient(formik.values, formik.setValues)}
            className={classes.button}
          >
            New Ingredient
          </Button>
          <FieldArray name="ingredients">
            {() =>
              formik.values.ingredients.map((ingredient, index) => {
                return (
                  <Box display="flex">
                    <Field
                      name={`ingredients[${index}].count`}
                      type="number"
                      placeholder="quantity"
                    />
                    <Field as="select" name={`ingredients[${index}].unit`}>
                      <option value={"gram"}>Grams</option>
                      <option value={"kilograms"}>Kilograms</option>
                      <option value={"ounces"}>Ounces</option>
                      <option value={"pounds"}>Pounds</option>
                      <option value={"milliliters"}>Milliliters</option>
                      <option value={"liters"}>Liters</option>
                      <option value={"teaspoon"}>Teaspoons</option>
                      <option value={"tablespoon"}>Tablespoons</option>
                      <option value={"cup"}>Cups</option>
                      <option value={"pint"}>Pints</option>
                      <option value={"quart"}>Quarts</option>
                      <option value={"gallon"}>Gallons</option>
                    </Field>
                    <Field
                      name={`ingredients[${index}].name`}
                      type="text"
                      placeholder="name"
                      key={index + "name"}
                    />
                    <IconButton onClick={() => handleDeleteIngredient(index)}>
                      <CloseRounded color="primary" />
                    </IconButton>
                  </Box>
                );
              })
            }
          </FieldArray>

          <TextField
            id="notes"
            name="notes"
            type="text"
            {...formik.getFieldProps("notes")}
            fullWidth
            margin="normal"
            variant="outlined"
            color="primary"
            placeholder="Notes"
          />
          <ErrorMessage name="notes" />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ color: "white", fontWeight: "bolder" }}
          >
            Edit Recipe
          </Button>
        </Form>
      )}
    </Formik>
  );
};
