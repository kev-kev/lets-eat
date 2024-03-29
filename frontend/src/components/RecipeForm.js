import React, { useContext, useEffect, useState } from "react";
import { Button, IconButton, TextField, MenuItem, FormControl } from "@material-ui/core/";
import { CloseRounded, AddRounded } from "@material-ui/icons/";
import { recipeFormStyle } from "../muiStyling";
import { GlobalContext } from "../context/GlobalState";
import { Formik, Form, FieldArray, FastField } from "formik";

const DEFAULT_IMG_URLS = [
  "https://lets-eat-imgs.s3.amazonaws.com/recipe_1.jpg",
  "https://lets-eat-imgs.s3.amazonaws.com/recipe_2.png",
  "https://lets-eat-imgs.s3.amazonaws.com/recipe_3.jpeg",
  "https://lets-eat-imgs.s3.amazonaws.com/recipe_4.jpeg",
  "https://lets-eat-imgs.s3.amazonaws.com/recipe_5.jpeg",
];

const isSubmitDisabled = (values, recipe) => {
  const changedFields = () => {
    if(!recipe) return false;
    for (const key of Object.keys(values)){
      if(recipe[key] !== values[key]) return true;
    }
  }
  const hasEmptyIngredientInput = () => {
    for (const ingredient of values.ingredients) {
      if(ingredient.name.length === 0) return true;
    }
    return false;
  }
  return hasEmptyIngredientInput() || values.name.length === 0 || (recipe && !changedFields());
};

export const RecipeForm = ({ recipe }) => {
  const classes = recipeFormStyle();
  const { editRecipe, submitRecipe, isSubmittingRecipe, isEditingRecipe } = useContext(GlobalContext);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [buttonText, setButtonText] = useState("");

  useEffect(() => {
    if(recipe) setButtonText("Edit")
    else setButtonText("Submit")
  }, [recipe])

  useEffect(() => {
    if(!isSubmittingRecipe && !isEditingRecipe){
      if(recipe) setButtonText("Edit")
      else setButtonText("Submit")
    }
  }, [isSubmittingRecipe, isEditingRecipe, recipe])

  const renderSubmitButton = (values) => {
    return(
      <div className={classes.submitContainer}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitDisabled(values, recipe) || submitDisabled}
          className={classes.button + ' ' + classes.submit}
        >
          {buttonText}
        </Button>
      </div>
    )
  }

  const handleFormSubmit = (values, setSubmitting, resetForm) => {
    if(!values.imgUrl.trim()){
      const defaultImgUrl = DEFAULT_IMG_URLS[Math.floor(Math.random()*DEFAULT_IMG_URLS.length)];
      values.imgUrl = defaultImgUrl;
    }
    setButtonText("Submitting")
    setSubmitDisabled(true);
      if (recipe) {
        editRecipe({ ...recipe, ...values });
      } else {
        submitRecipe(values)
        setSubmitDisabled(false);
        setSubmitting(false);
        resetForm();
      }
  }

  return (
    <Formik
      initialValues={{
        name: recipe?.name || "",
        imgUrl: recipe?.imgUrl || "",
        link: recipe?.link || "",
        notes: recipe?.notes || "",
        ingredients: recipe?.ingredients || [],
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => handleFormSubmit(values, setSubmitting, resetForm)}
    >
      {(formik) => (
        <div className={recipe ? "" : classes.paper}>
          <Form className={recipe ? "" : classes.formContainer}>
            <div className={classes.mainForm}>
              <FastField
                  as={TextField}
                  required
                  className={classes.field}
                  id="name"
                  name="name"
                  label="Recipe Title"
                  {...formik.getFieldProps("name")}
                  error={formik.touched.name && !!formik.errors.name}
                  variant="outlined"
                />
                <FastField
                  component={TextField}
                  className={classes.field}
                  name="imgUrl"
                  id="imgUrl"
                  {...formik.getFieldProps("imgUrl")}
                  label="Image URL"
                  variant="outlined"
                />
                <FastField
                  component={TextField}
                  className={classes.field}
                  id="link"
                  name="link"
                  {...formik.getFieldProps("link")}
                  label="Link to Recipe"
                  variant="outlined"
                />
                <FastField
                  component={TextField}
                  className={classes.field}
                  id="notes"
                  name="notes"
                  multiline
                  {...formik.getFieldProps("notes")}
                  label="Notes"
                  variant="outlined"
                />
              </div>
              <div className={classes.ingForm}>
                <FieldArray
                  name="ingredients"
                  render={(arrayHelpers) => (
                    <>
                      {formik.values.ingredients.map((_, index) => {
                        return (
                          <div key={index} className={classes.ingredientFormContainer}>
                            <FastField
                              as={TextField}
                              id={`ingredients[${index}].count`}
                              className={classes.ingField + ' ' + classes.numInput}
                              name={`ingredients[${index}].count`}
                              type="number"
                              label="Count"
                              variant="outlined"
                              {...formik.getFieldProps(`ingredients[${index}].count`)}
                            />
                            <FormControl className={classes.formControl}>
                              <FastField
                                as={TextField}
                                variant="outlined"
                                select
                                label="Unit"
                                className={classes.ingField + ' ' + classes.unitSelect}
                                name={`ingredients[${index}]_unit`} 
                                id={`ingredients[${index}]_unit`} 
                                {...formik.getFieldProps(`ingredients[${index}].unit`)}
                              >
                                <MenuItem value="">None</MenuItem> 
                                <MenuItem value={"gram"}>Grams</MenuItem>
                                <MenuItem value={"kilogram"}>Kilograms</MenuItem>
                                <MenuItem value={"ounce"}>Ounces</MenuItem>
                                <MenuItem value={"pound"}>Pounds</MenuItem>
                                <MenuItem value={"milliliter"}>Milliliters</MenuItem>
                                <MenuItem value={"liter"}>Liters</MenuItem>
                                <MenuItem value={"teaspoon"}>Teaspoons</MenuItem>
                                <MenuItem value={"tablespoon"}>Tablespoons</MenuItem>
                                <MenuItem value={"cup"}>Cups</MenuItem>
                                <MenuItem value={"pint"}>Pints</MenuItem>
                                <MenuItem value={"quart"}>Quarts</MenuItem>
                                <MenuItem value={"gallon"}>Gallons</MenuItem>
                              </FastField>
                            </FormControl>
                            <FastField
                              required
                              error={formik.touched.ingredients?.[index]?.name && !!formik.errors.ingredients?.[index]?.name}
                              className={classes.ingField}
                              name={`ingredients[${index}].name`}
                              id={`ingredients[${index}].name`}
                              variant="outlined"
                              label="Name"
                              as={TextField}
                              {...formik.getFieldProps(`ingredients[${index}].name`)}
                            />
                            <IconButton onClick={() => arrayHelpers.remove(index)}>
                              <CloseRounded color="primary"/>
                            </IconButton>
                          </div>
                        );
                      })}
                      <Button
                        color="primary"
                        variant="outlined"
                        size="medium"
                        onClick={() =>
                          arrayHelpers.push({ name: "", unit: "", count: "" })
                        }
                        className={classes.button}
                        startIcon={<AddRounded/>}
                      >
                        Add Ingredient
                      </Button>
                    </>
                  )}
                />
              </div>
              {renderSubmitButton(formik.values)}
          </Form>
        </div>
      )}
    </Formik>
  );
 };