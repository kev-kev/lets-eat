import React, { useContext } from "react";
import { Button, Box, IconButton, Paper, TextField, Select, MenuItem, InputLabel, FormControl } from "@material-ui/core/";
import { CloseRounded, AddRounded } from "@material-ui/icons/";
import { recipeFormStyle } from "../muiStyling";
import { GlobalContext } from "../context/GlobalState";
import { Formik, Form, FieldArray, FastField } from "formik";
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
  return hasEmptyIngredientInput() || hasEmptyInput;
};

const validationSchema = Yup.object({
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
});



export const RecipeFormNew = ({ recipe }) => {
  const classes = recipeFormStyle();
  const { editRecipe, submitRecipe } = useContext(GlobalContext);
  
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
    onSubmit={(values, { setSubmitting }) => {
      if (recipe) editRecipe({ ...recipe, ...values });
      else submitRecipe(values);
      setSubmitting(false);
    }}
  >
    {(formik) => (
      <Paper className={classes.paper}>
        <Form className={classes.formContainer}>
            <div className={classes.mainForm}>
             <FastField
                component={TextField}
                required
                className={classes.field}
                id="name"
                name="name"
                label="Recipe Title"
                {...formik.getFieldProps("name")}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                variant="outlined"
              />
              <FastField
                component={TextField}
                required
                className={classes.field}
                name="imgUrl"
                id="imgUrl"
                {...formik.getFieldProps("imgUrl")}
                error={formik.touched.imgUrl && Boolean(formik.errors.imgUrl)}
                helperText={formik.touched.imgUrl && formik.errors.imgUrl}
                label="Image URL"
                variant="outlined"
              />
              <FastField
                component={TextField}
                required
                className={classes.field}
                id="link"
                name="link"
                error={formik.touched.link && Boolean(formik.errors.link)}
                helperText={formik.touched.link && formik.errors.link}
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
                        <Box key={index} className={classes.ingredientFormContainer}>
                          <FastField
                            component={TextField}
                            id={`ingredients[${index}].count`}
                            required
                            className={classes.ingField + ' ' + classes.specialField}
                            name={`ingredients[${index}].count`}
                            type="number"
                            label="Count"
                            InputProps={{
                              inputProps: { 
                                  max: 9999, min: 1
                              }
                            }}
                            variant="outlined"
                            {...formik.getFieldProps(`ingredients[${index}].count`)}
                          />
                          <FormControl className={classes.formControl}>
                            <FastField
                              component={TextField}
                              required
                              select 
                              label="Unit"
                              // labelId="measurement-select-label"
                              className={classes.ingField + ' ' + classes.specialField}
                              name={`ingredients[${index}].unit`} 
                              id={`ingredients[${index}].unit`} 
                              variant="outlined"
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
                        </Box>
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
          <div className={classes.submitContainer}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitDisabled(formik.values)}
              className={classes.button + ' ' + classes.submit}
            >
              {recipe ? "Edit Recipe" : "Submit Recipe"}
            </Button>
          </div>
        </Form>
      </Paper>
    )}
  </Formik>
  );
 };