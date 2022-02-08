import React from "react";
import {
  Box,
  MenuItem,
  TextField,
  IconButton,
  Select,
} from "@material-ui/core";
import { CloseRounded } from "@material-ui/icons/";

const IngredientForm = (props) => {
  return (
    <Box display="flex">
      <TextField
        type="number"
        placeholder="quantity"
        onChange={(e) => props.setCount(parseInt(e.target.value))}
        value={props.ingredientInput.count}
        inputProps={{ min: 0 }}
        key={props.index + "count"}
      />
      <Select
        labelId="select-label"
        variant="filled"
        onChange={(e) => props.setUnit(e.target.value)}
        value={props.ingredientInput.unit}
        key={props.index + "unit"}
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
        onChange={(e) => props.setName(e.target.value)}
        value={props.ingredientInput.name}
        key={props.index + "name"}
      />
      <IconButton onClick={() => props.handleDeleteIngredient(props.index)}>
        <CloseRounded color="primary" />
      </IconButton>
    </Box>
  );
};

export default IngredientForm;
