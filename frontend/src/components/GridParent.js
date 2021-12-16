import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import { useParams } from "react-router-dom/";

const GridParent = (props) => {
  const { fetchRecipes } = useContext(GlobalContext);
  const { page } = useParams();
  useEffect(() => fetchRecipes(page), []);

  return props.children;
};

export default GridParent;
