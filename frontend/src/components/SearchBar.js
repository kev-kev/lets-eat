import React, { useContext, useEffect, useState } from "react";
import { TextField } from "@material-ui/core";
import { GlobalContext } from "../context/GlobalState";

export default function SearchBar() {
  const { setIndexRecipes } = useContext(GlobalContext);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIndexRecipes(searchTerm);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [searchTerm]);

  return (
    <TextField
      placeholder="search for a recipe"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      variant="outlined"
    />
  );
}
