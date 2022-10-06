import React, { useContext, useState } from "react";
import { Button, IconButton, TextField, MenuItem, FormControl, CircularProgress, } from "@material-ui/core/";
import { CloseRounded, AddRounded } from "@material-ui/icons/";
import { recipeFormStyle } from "../muiStyling";
import { GlobalContext } from "../context/GlobalState";
import { Formik, Form, FieldArray, FastField } from "formik";
import * as Yup from "yup";

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

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),  
  imgUrl: Yup.string(),
  link: Yup.string(),
  notes: Yup.string(),
  ingredients: Yup.array().of(
    Yup.object({
      name: Yup.string().required("Required"),
      unit: Yup.string(),
      count: Yup.number().positive().integer(),
    })
  ),
});

export const RecipeForm = ({ recipe }) => {
  const classes = recipeFormStyle();
  const { editRecipe, submitRecipe, isSubmittingRecipe, isEditingRecipe } = useContext(GlobalContext);
  const [submitDisabled, setSubmitDisabled] = useState(false);

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
          {getButtonText()}
        </Button>
      </div>
    )
  }

  const getButtonText = () => {
    if(submitDisabled){
      return "Submitting..."
    } else if(recipe){
      return "Edit Recipe"
    } else return "Submit Recipe"
  }

  const handleFormSubmit = (values, setSubmitting) => {
    setSubmitDisabled(true)
      if (recipe) {
        editRecipe({ ...recipe, ...values });
      } else {
        submitRecipe(values);
        setSubmitting(false);
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
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => handleFormSubmit(values, setSubmitting)}
    >
      {(formik) => (
        <div className={recipe ? "" : classes.paper}>
          <Form className={recipe ? "" : classes.formContainer}>
            <div className={classes.mainForm}>
              <FastField
                  component={TextField}
                  required
                  className={classes.field}
                  id="name"
                  name="name"
                  label="Recipe Title"
                  {...formik.getFieldProps("name")}
                  error={formik.touched.name && !!formik.errors.name}
                  helperText={formik.touched.name && formik.errors.name}
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
                              component={TextField}
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
                                component={TextField}
                                variant="outlined"
                                select 
                                label="Unit"
                                className={classes.ingField + ' ' + classes.unitSelect}
                                name={`ingredients[${index}].unit`} 
                                id={`ingredients[${index}].unit`} 
                                {...formik.getFieldProps(`ingredients[${index}].unit`)}
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
                              </FastField>
                            </FormControl>
                            <FastField
                              required
                              error={formik.touched.ingredients?.[index]?.name && !!formik.errors.ingredients?.[index]?.name}
                              helperText={formik.touched.ingredients?.[index]?.name && formik.errors.ingredients?.[index]?.name}
                              className={classes.ingField}
                              name={`ingredients[${index}].name`}
                              id={`ingredients[${index}].name`}
                              variant="outlined"
                              label="Name"
                              component={TextField}
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