import React, { useState } from "react";
import Select from "@material-ui/core/Select";
import { Box, MenuItem, TextField } from "@material-ui/core";

const IngredientInputForm = (props) => {
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
        <MenuItem value={"grams"}>Grams</MenuItem>
        <MenuItem value={"kilograms"}>Kilograms</MenuItem>
        <MenuItem value={"ounces"}>Ounces</MenuItem>
        <MenuItem value={"pounds"}>Pounds</MenuItem>
        <MenuItem value={"milliliters"}>Milliliters</MenuItem>
        <MenuItem value={"liters"}>Liters</MenuItem>
        <MenuItem value={"teaspoon"}>Teaspoon</MenuItem>
        <MenuItem value={"tablespoon"}>Tablespoon</MenuItem>
        <MenuItem value={"cup"}>Cup</MenuItem>
        <MenuItem value={"pint"}>Pint</MenuItem>
        <MenuItem value={"quart"}>Quart</MenuItem>
        <MenuItem value={"gallon"}>Gallon</MenuItem>
      </Select>
      <TextField
        type="text"
        placeholder="name"
        onChange={(e) => props.setName(e.target.value)}
        value={props.ingredientInput.name}
        key={props.index + "name"}
      />
    </Box>
  );
};

export default IngredientInputForm;
