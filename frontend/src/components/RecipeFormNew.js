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

const isSubmitDisabled = ({ name, link, imgUrl, ingredients }) => {
  const hasEmptyIngredientInput = () => {
    for (const ingredient of ingredients) {
      if (Object.values(ingredient).some((value) => !value)) return true;
    }
    return false;
  };
  const hasEmptyInput = Object.values({ name, link, imgUrl }).some(
    (value) => !value
  );
  console.log(hasEmptyIngredientInput(), hasEmptyInput);
  return hasEmptyIngredientInput() || hasEmptyInput;
};

export const RecipeFormNew = ({ recipe }) => {
  const classes = recipeFormStyle();
  const { editRecipe } = useContext(GlobalContext);
  return (
    <Formik
      initialValues={{
        name: recipe.name,
        imgUrl: recipe.imgUrl,
        link: recipe.link,
        notes: recipe.notes,
        ingredients: recipe.ingredients,
      }}
      validationSchema={Yup.object({
        name: Yup.string().required("Required"),
        imgUrl: Yup.string().required("Required"),
        link: Yup.string().required("Required"),
        notes: Yup.string(),
        ingredients: Yup.array().of(
          Yup.object({
            name: Yup.string().required(),
            unit: Yup.string().required(),
            count: Yup.number().required().positive().integer(),
          })
        ),
      })}
      onSubmit={(values, { setSubmitting }) => {
        editRecipe({ ...recipe, ...values });
        setSubmitting(false);
      }}
    >
      {(formik) => (
        <Form>
          <Field
            id="name"
            name="name"
            {...formik.getFieldProps("name")}
            autoFocus
            placeholder="Recipe Title"
          />
          <ErrorMessage name="name" />
          <br />
          <Field
            id="imgUrl"
            name="imgUrl"
            {...formik.getFieldProps("imgUrl")}
            placeholder="Image URL"
          />
          <ErrorMessage name="imgUrl" />
          <br />
          <Field
            id="link"
            name="link"
            {...formik.getFieldProps("link")}
            placeholder="Link to Recipe"
          />
          <ErrorMessage name="link" />
          <br />

          <FieldArray
            name="ingredients"
            render={(arrayHelpers) => (
              <div>
                {formik.values.ingredients.map((_, index) => {
                  return (
                    <Box key={index}>
                      <Field
                        name={`ingredients[${index}].count`}
                        type="number"
                        placeholder="count"
                      />
                      <Field name={`ingredients[${index}].unit`} as="select">
                        <option
                          value=""
                          disabled
                          hidden
                          style={{ color: "#000" }}
                        >
                          quantity
                        </option>
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
                        placeholder="name"
                      />
                      <IconButton onClick={() => arrayHelpers.remove(index)}>
                        <CloseRounded color="primary" />
                      </IconButton>
                    </Box>
                  );
                })}

                <Button
                  color="primary"
                  variant="contained"
                  onClick={() =>
                    arrayHelpers.push({ name: "", unit: "", count: "" })
                  }
                  className={classes.button}
                >
                  New Ingredient
                </Button>
              </div>
            )}
          />
          <Field
            id="notes"
            name="notes"
            as="textarea"
            {...formik.getFieldProps("notes")}
            placeholder="Notes"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ color: "white", fontWeight: "bolder" }}
            disabled={isSubmitDisabled(formik.values)}
          >
            Edit Recipe
          </Button>
        </Form>
      )}
    </Formik>
  );
};
